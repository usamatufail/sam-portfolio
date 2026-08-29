'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { saveInlineEdits } from '@/lib/actions/inline';
import { IDLE_STATUS, type EditStatus } from '@/lib/edit/types';
import { useDirtyValues } from './useDirtyValues';

/** Pending edits plus the save/discard cycle around them. */
export function useInlineEditor() {
  const router = useRouter();
  const { dirty, register, setValue, snapshot, reset } = useDirtyValues();
  const [status, setStatus] = useState<EditStatus>(IDLE_STATUS);

  const save = useCallback(() => {
    if (dirty === 0) return;
    const payload = snapshot();
    setStatus((current) => ({ ...current, saving: true, message: null }));

    void saveInlineEdits(payload).then((result) => {
      if (result.ok) {
        reset(true);
        setStatus({ dirty: 0, saving: false, message: result.message, ok: true });
        router.refresh();
      } else {
        setStatus((current) => ({ ...current, saving: false, message: result.message, ok: false }));
      }
    });
  }, [dirty, snapshot, reset, router]);

  const discard = useCallback(() => {
    reset();
    setStatus(IDLE_STATUS);
    router.refresh();
  }, [reset, router]);

  const setValueAndClearMessage = useCallback(
    (path: string, value: string) => {
      setValue(path, value);
      setStatus((current) => (current.message ? { ...current, message: null } : current));
    },
    [setValue],
  );

  return {
    status: { ...status, dirty },
    register,
    setValue: setValueAndClearMessage,
    save,
    discard,
  };
}
