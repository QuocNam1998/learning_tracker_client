import dateTimeHandler from '@/app/shared/dateTimeHandler';
import { LABELS } from '../../constants';
import type { Category, DailySession, SessionType, Store } from '../../types';
import { Edit, Eye } from '@deemlol/next-icons';
import ScheduleActions from './actions';
import AppDialog from '@/app/shared/components/Dialog';
import { Button, Dialog, Portal } from '@chakra-ui/react';
import { useState } from 'react';

const SESSION_CATEGORY: Record<SessionType, Category> = {
  technical: 'tech',
  calisthenics: 'calisthenics',
  english: 'english',
};

export interface ScheduleProps {
  schedule: DailySession[];
  store: Store;
  pending: Set<number>;
  onToggle: (id: number, isCompleted: boolean) => void;
}

export function Schedule({ schedule, store, pending, onToggle }: ScheduleProps) {
  const { onViewDetail } = ScheduleActions;
  const [open, setOpen] = useState<boolean>(false);
  const [showingTask, setShowingTask] = useState<DailySession>();
  return (
    <div className="card text-sm" style={{ marginBottom: 12 }}>
      <div className="sec"> Schedule</div>
      <div className="flex flex-col gap-y-2">
        {schedule.map((task) => {
          const key = String(task.id);
          const done = task.is_completed || !!store.dayDone[key];
          const { time } = dateTimeHandler.toVietnamTime(task.date);
          const isNow = dateTimeHandler.getCurrentHour() >= time;
          const cat = SESSION_CATEGORY[task.session_type];
          const isPending = pending.has(task.id);
          return (
            <section
              key={key}
              style={{ pointerEvents: isPending ? 'none' : undefined, opacity: isPending ? 0.6 : undefined }}
              onClick={() => onToggle(task.id, task.is_completed)}
              className="flex justify-between gap-4 flex-nowrap items-center"
            >
              <div className="flex gap-x-4 cursor-pointer">
                <div className={`circ${done ? ' on' : ''}${isNow && !done ? ' pulse' : ''}`}>
                  {done ? '✓' : isNow ? '▸' : ''}
                </div>
                <div className={`${done ? 'text-(--muted) line-through' : 'text-(--text)'}`}>
                  <span>
                    {time} / {LABELS[cat]}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                    setShowingTask(task);
                  }}
                >
                  <Eye />
                </Button>
              </div>
            </section>
          );
        })}
      </div>
      <Dialog.Root placement="center" lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="p-4! gap-y-2!">
              <div className="flex justify-center">
                <h2 className="font-bold! text-2xl! capitalize">{showingTask?.session_type}</h2>
              </div>
              <Dialog.Body>
                <span className="font-bold!">Target:</span> {showingTask?.notes}
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline" className="p-2!">
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Button className="p-2!">Save</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
}
