import { createHttpClient } from '@/libs/http';
import type { DailySession } from './types';

const client = createHttpClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL_DEV ?? '',
});

export const dailySessionServices = {
  getDailySession: (startedAt?: string) =>
    client.get<DailySession>(startedAt ? `daily-session?startedAt=${encodeURIComponent(startedAt)}` : 'daily-session'),
  updateTask: (id: number, isCompleted: boolean) => client.patch<string>(`daily-session/${id}`, { isCompleted }),
};
