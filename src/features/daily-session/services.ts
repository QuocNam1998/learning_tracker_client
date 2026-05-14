import { createHttpClient, loggingMiddleware, errorMiddleware, retryMiddleware } from '@/libs/http';
import type { DailySessionData } from './types';

const client = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
  middlewares: [loggingMiddleware, retryMiddleware(2), errorMiddleware],
});

export const dailySessionServices = {
  getDailySession: () => client.get<DailySessionData>('daily-session'),
};
