import { createHttpClient } from '@/libs/http';
import type { DailySession } from './types';

const client = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL_DEV ?? '',
});

export const dailySessionServices = {
  getDailySession: (startedAt: Date) => client.get<DailySession[]>('daily-session', { params: {startedAt: JSON.stringify(startedAt)} }),
};
