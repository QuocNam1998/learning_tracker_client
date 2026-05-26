'use client';

import { useCallback, useEffect, useReducer } from 'react';
import { dailySessionServices } from '../services';
import type { DailySession } from '../types';

type State = {
  loading: boolean;
  data: DailySession[] | null;
  error: string | null;
  status: number;
};

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: DailySession[]; status: number }
  | { type: 'FETCH_ERROR'; payload: string; status: number }
  | { type: 'UPDATE_TASK'; id: number; isCompleted: boolean };

const initial: State = { loading: false, data: null, error: null, status: 0 };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { loading: false, data: action.payload, error: null, status: action.status };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload, status: action.status };
    case 'UPDATE_TASK':
      return {
        ...state,
        data: state.data
          ? state.data.map((t) => (t.id === action.id ? { ...t, is_completed: action.isCompleted } : t))
          : state.data,
      };
    default:
      return state;
  }
}

export function useDailySession() {
  const [state, dispatch] = useReducer(reducer, initial);

  const fetchData = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    const startedAt = new Date();
    const { data, error, status, ok } = await dailySessionServices.getDailySession(startedAt);
    if (ok && data) {
      dispatch({ type: 'FETCH_SUCCESS', payload: data, status });
    } else {
      dispatch({ type: 'FETCH_ERROR', payload: error ?? 'Unknown error', status });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const optimisticUpdateTask = (id: number, isCompleted: boolean) => {
    dispatch({ type: 'UPDATE_TASK', id, isCompleted });
  };

  return { ...state, refetch: fetchData, optimisticUpdateTask };
}
