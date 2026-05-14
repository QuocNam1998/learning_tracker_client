import type { Middleware, HttpClientConfig, HttpClientOptions, ApiResult } from './types';

function compose(middlewares: Middleware[], terminal: (req: Request) => Promise<Response>) {
  return (req: Request): Promise<Response> => {
    const dispatch = (i: number) => (r: Request): Promise<Response> => {
      if (i >= middlewares.length) return terminal(r);
      return middlewares[i](r, dispatch(i + 1));
    };
    return dispatch(0)(req);
  };
}

async function parseResponse<T>(res: Response): Promise<ApiResult<T>> {
  const ct = res.headers.get('content-type') ?? '';
  let data: T | null = null;
  let error: string | null = null;

  if (!res.ok) {
    try {
      const body = ct.includes('application/json') ? await res.json() : await res.text();
      error = typeof body === 'string' ? body : (body?.message ?? `HTTP ${res.status}`);
    } catch {
      error = `HTTP ${res.status}`;
    }
  } else if (ct.includes('application/json')) {
    data = (await res.json()) as T;
  }

  return { data, error, status: res.status, ok: res.ok };
}

export function createHttpClient(config: HttpClientConfig) {
  const { baseURL, defaultHeaders = {}, middlewares = [] } = config;
  const execute = compose(middlewares, (req) => fetch(req));

  async function request<T>(method: string, path: string, options: HttpClientOptions = {}): Promise<ApiResult<T>> {
    const { params, body, headers, ...rest } = options;

    const url = new URL(path, baseURL);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const req = new Request(url.toString(), {
      method,
      headers: { 'Content-Type': 'application/json', ...defaultHeaders, ...(headers as Record<string, string>) },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...rest,
    });

    const res = await execute(req);
    return parseResponse<T>(res);
  }

  return {
    get:    <T>(path: string, options?: HttpClientOptions) => request<T>('GET', path, options),
    post:   <T>(path: string, body?: unknown, options?: HttpClientOptions) => request<T>('POST', path, { ...options, body }),
    put:    <T>(path: string, body?: unknown, options?: HttpClientOptions) => request<T>('PUT', path, { ...options, body }),
    patch:  <T>(path: string, body?: unknown, options?: HttpClientOptions) => request<T>('PATCH', path, { ...options, body }),
    delete: <T>(path: string, options?: HttpClientOptions) => request<T>('DELETE', path, options),
  };
}
