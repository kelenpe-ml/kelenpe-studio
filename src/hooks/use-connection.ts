import { useEffect, useState } from "react";

type NetworkInformation = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

function readSlow(): boolean {
  const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  const et = conn.effectiveType ?? "";
  return et.includes("2g") || et.includes("3g");
}

/** True when the user is on a slow/data-saver connection. */
export function useSlowConnection() {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const update = () => setSlow(readSlow());
    update();
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    conn?.addEventListener?.("change", update);
    return () => conn?.removeEventListener?.("change", update);
  }, []);

  return slow;
}
