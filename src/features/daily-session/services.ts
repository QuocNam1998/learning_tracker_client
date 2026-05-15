import { createHttpClient } from '@/libs/http';
import type { DailySessionData } from './types';

const client = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '',
});

export const dailySessionServices = {
  getDailySession: () => client.get<DailySessionData>('daily-session'),
};
