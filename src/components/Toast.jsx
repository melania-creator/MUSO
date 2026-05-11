import { useState, useCallback } from 'react';

export function useToast() {
  const [msg, setMsg] = useState(null);
  const show = useCallback((text, duration = 2800) => {
    setMsg(text);
    setTimeout(() => setMsg(null), duration);
  }, []);
  return [msg, show];
}

export default function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}
