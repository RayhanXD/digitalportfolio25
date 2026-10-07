"use client";

import { useEffect, useState } from "react";

const austinTime = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
});

/** Live Central Time, ticking every second; empty until mounted so server and client markup match. */
export function useAustinTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(austinTime.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
