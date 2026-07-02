import clientRequestHandler from '@/app/shared/clientRequestHandler';
import type { DailySession } from './types';

export const dailySessionServices = {
  getDailySession: (start: string, end: string) =>
    clientRequestHandler.get<Array<DailySession>>(`daily-session`, {
      params: { start: encodeURIComponent(start), end: encodeURIComponent(end) },
    }),
  updateTask: (id: number, isCompleted: boolean) =>
    clientRequestHandler.patch<string>(`daily-session/${id}`, { isCompleted }),
};
