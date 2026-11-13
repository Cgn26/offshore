export default async function handler(req, res) {
  try {
    const { app } = await import('../server/index.js');
    return app(req, res);
  } catch (err) {
    console.error('CRITICAL BACKEND ERROR:', err);
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      return res.status(500).json({
        error: 'CRITICAL_INITIALIZATION_ERROR',
        message: err.message,
        stack: err.stack,
      });
    }
  }
}
