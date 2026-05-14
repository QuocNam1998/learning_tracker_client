export type NextFn = (req: Request) => Promise<Response>;
export type Middleware = (req: Request, next: NextFn) => Promise<Response>;

export type HttpClientOptions = Omit<RequestInit, 'method' | 'body'> & {
  params?: Record<string, string>;
  body?: unknown;
};

export type ApiResult<T> = {
  data: T | null;
  error: string | null;
  status: number;
  ok: boolean;
};

export type HttpClientConfig = {
  baseURL: string;
  defaultHeaders?: Record<string, string>;
  middlewares?: Middleware[];
};
