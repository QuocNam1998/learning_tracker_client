import type { Middleware } from './types';

export const loggingMiddleware: Middleware = async (req, next) => {
  const start = Date.now();
  console.info(`[HTTP] → ${req.method} ${req.url}`);
  const res = await next(req);
  console.info(`[HTTP] ← ${res.status} ${req.url} (${Date.now() - start}ms)`);
  return res;
};

// Catches network-level failures and wraps them in a synthetic 0-status Response
// so callers always get an ApiResult instead of an unhandled exception.
export const errorMiddleware: Middleware = async (req, next) => {
  try {
    return await next(req);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Network error';
    console.error(`[HTTP] ✕ ${req.method} ${req.url}:`, message);
    return new Response(JSON.stringify({ message }), {
      status: 0,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const authMiddleware = (getToken: () => string | null): Middleware =>
  async (req, next) => {
    const token = getToken();
    if (!token) return next(req);
    const headers = new Headers(req.headers);
    headers.set('Authorization', `Bearer ${token}`);
    return next(new Request(req, { headers }));
  };

// Retries 5xx responses with exponential back-off; leaves 4xx alone.
export const retryMiddleware = (maxRetries = 2, baseDelayMs = 500): Middleware =>
  async (req, next) => {
    let attempt = 0;
    while (true) {
      const res = await next(req.clone());
      if (res.ok || res.status < 500 || attempt >= maxRetries) return res;
      attempt++;
      await new Promise((r) => setTimeout(r, baseDelayMs * attempt));
    }
  };
