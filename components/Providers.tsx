'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import Cursor from './Cursor';
import Loader from './Loader';
import SmoothScroll from './SmoothScroll';

const ReadyContext = createContext(false);
/** true setelah loading screen selesai; dipakai untuk memulai animasi entrance hero. */
export const useReady = () => useContext(ReadyContext);

export default function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const done = useCallback(() => setReady(true), []);
  return (
    <ReadyContext.Provider value={ready}>
      <Loader onDone={done} />
      <SmoothScroll />
      <Cursor />
      {children}
    </ReadyContext.Provider>
  );
}
