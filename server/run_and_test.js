import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PATH = path.join(__dirname, 'index.js');
const TEST_PATH = path.join(__dirname, 'test_api.js');

console.log('[RUNNER] Spawning backend server...');
const serverProc = spawn('node', [SERVER_PATH], {
  stdio: 'inherit',
  env: { ...process.env, PORT: '5000' }
});

// Wait for server to become responsive
async function waitForServer(retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/health');
      if (res.ok) {
        console.log('[RUNNER] Server is healthy and ready on 127.0.0.1:5000.');
        return true;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 400));
    }
  }
  return false;
}

async function main() {
  const isUp = await waitForServer();
  if (!isUp) {
    console.error('[RUNNER FAIL] Server failed to start in time.');
    serverProc.kill();
    process.exit(1);
  }

  console.log('[RUNNER] Launching test suite...');
  const testProc = spawn('node', [TEST_PATH], { 
    stdio: 'inherit',
    env: { ...process.env, API_BASE_URL: 'http://127.0.0.1:5000' }
  });

  testProc.on('exit', (code) => {
    console.log(`[RUNNER] Test suite finished with code ${code}.`);
    serverProc.kill();
    process.exit(code || 0);
  });
}

main();
