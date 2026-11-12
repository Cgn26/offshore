/**
 * Automated In-Process & E2E Backend Test Suite for GreensLeaf Core APIs
 * Tests:
 *  1. GET /api/health
 *  2. POST /api/inquiry (validation & error handling)
 *  3. POST /api/inquiry (valid complete payload & database storage)
 *  4. GET /api/inquiry (retrieval and schema verification)
 *  5. POST /api/newsletter (validation & subscription)
 *  6. GET /api/newsletter (subscriber listing verification)
 */

import { app } from './index.js';

process.env.NO_LISTEN = 'true';

async function runTests() {
  console.log(`\n==================================================`);
  console.log(`Starting GreensLeaf API Comprehensive Test Suite`);
  console.log(`==================================================\n`);

  let server;
  let BASE_URL;

  // Start in-process server on dynamic port
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      BASE_URL = `http://127.0.0.1:${port}`;
      console.log(`[TEST RUNNER] In-process server listening on ${BASE_URL}`);
      resolve();
    });
  });

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`  ✓ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. Health Check
    console.log(`[TEST 1] Testing Health Endpoint`);
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200, `Health check returns HTTP 200 OK`);
    assert(healthData.status === 'healthy', `Status property equals "healthy"`);

    // 2. Inquiry Validation Check (Missing required fields)
    console.log(`\n[TEST 2] Testing Inquiry Validation (Missing Fields)`);
    const badInquiryRes = await fetch(`${BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'Only Name' }),
    });
    const badInquiryData = await badInquiryRes.json();
    assert(badInquiryRes.status === 400, `Rejects incomplete inquiry with HTTP 400`);
    assert(Boolean(badInquiryData.error), `Returns descriptive error message: "${badInquiryData.error}"`);

    // 3. Inquiry Valid Submission Check
    console.log(`\n[TEST 3] Testing Valid Inquiry Submission`);
    const testInquiryPayload = {
      fullName: 'Dr. James Harrison',
      email: 'james.harrison@londonfintech.co.uk',
      phone: '02034884882',
      companyName: 'Harrison Wealth Technologies',
      companySize: '51-200',
      industry: 'FinTech & Banking',
      subject: 'AI Chatbot & Core Cloud Infrastructure Migration',
      message: 'We require an enterprise RAG chatbot integrated with our internal knowledge base and customer onboarding portal under UK GDPR.',
      consent: true,
    };

    const goodInquiryRes = await fetch(`${BASE_URL}/api/inquiry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testInquiryPayload),
    });
    const goodInquiryData = await goodInquiryRes.json();
    assert(goodInquiryRes.status === 201, `Valid inquiry returns HTTP 201 Created`);
    assert(goodInquiryData.success === true, `Response flag success is true`);
    assert(typeof goodInquiryData.inquiryId === 'string', `Inquiry ID generated: ${goodInquiryData.inquiryId}`);

    // 4. Inquiries Admin Retrieval Check
    console.log(`\n[TEST 4] Testing Inquiry Retrieval & Persistence`);
    const getInquiriesRes = await fetch(`${BASE_URL}/api/inquiry`);
    const getInquiriesData = await getInquiriesRes.json();
    assert(getInquiriesRes.status === 200, `GET /api/inquiry returns HTTP 200`);
    assert(Array.isArray(getInquiriesData.inquiries), `Returns array of inquiries`);
    const found = getInquiriesData.inquiries.some((i) => i.email === 'james.harrison@londonfintech.co.uk');
    assert(found, `Persisted inquiry found in database records`);

    // 5. Newsletter Subscription Check
    console.log(`\n[TEST 5] Testing Newsletter Subscription`);
    const newsletterRes = await fetch(`${BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'cto@greentech.org.uk' }),
    });
    const newsletterData = await newsletterRes.json();
    assert(newsletterRes.status === 201 || newsletterRes.status === 200, `Newsletter subscribe returns 200/201`);
    assert(newsletterData.success === true, `Newsletter subscription confirmed`);

    // 6. Newsletter Duplicate Prevention Check
    console.log(`\n[TEST 6] Testing Newsletter Duplicate Prevention`);
    const dupRes = await fetch(`${BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'cto@greentech.org.uk' }),
    });
    const dupData = await dupRes.json();
    assert(dupRes.status === 200, `Duplicate subscription handled gracefully with HTTP 200`);
    assert(dupData.message.includes('already subscribed'), `Informs subscriber they are already subscribed`);

    console.log(`\n==================================================`);
    console.log(`API Test Results: ${passed} Passed, ${failed} Failed`);
    console.log(`==================================================\n`);

    server.unref();
    setTimeout(() => {
      process.exit(failed > 0 ? 1 : 0);
    }, 100);
  } catch (err) {
    console.error(`\n[CRITICAL ERROR] Test suite encountered an exception:`, err);
    if (server) server.unref();
    setTimeout(() => process.exit(1), 100);
  }
}

runTests();
