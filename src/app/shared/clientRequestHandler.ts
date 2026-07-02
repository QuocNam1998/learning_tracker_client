import { createHttpClient } from '@/libs/http';

const clientRequestHandler = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL_DEV ?? '',
});

export default clientRequestHandler;
