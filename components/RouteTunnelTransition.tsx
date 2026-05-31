"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";

const EVENT_NAME = "fiber:tunnel-navigate";

export function tunnelNavigate(href: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { href } }));
}

type Phase = "idle" | "closing" | "opening";

export default function RouteTunnelTransition() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      for (const id of timersRef.current) window.clearTimeout(id);
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      for (const id of timersRef.current) window.clearTimeout(id);
      timersRef.current = [];
    };

    const handle = (ev: Event) => {
      const href = (ev as CustomEvent<{ href?: string }>).detail?.href;
      if (!href) return;

      clearTimers();
      setPhase("closing");

      timersRef.current.push(
        window.setTimeout(() => {
          router.push(href);
        }, 340)
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setPhase("opening");
        }, 520)
      );

      timersRef.current.push(
        window.setTimeout(() => {
          setPhase("idle");
        }, 920)
      );
    };

    window.addEventListener(EVENT_NAME, handle as EventListener);
    return () => {
      window.removeEventListener(EVENT_NAME, handle as EventListener);
      clearTimers();
    };
  }, [router]);

  const isActive = phase !== "idle";

  return (
    <AnimatePresence>
      {isActive ? (
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ pointerEvents: phase === "closing" ? "auto" : "none" }}
        >
          <div className="absolute inset-0 bg-slate-950" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "opening" ? 0.55 : 0.92 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.20),transparent_42%),radial-gradient(circle_at_25%_80%,rgba(124,58,237,0.20),transparent_46%),radial-gradient(circle_at_70%_15%,rgba(2,6,23,0.9),rgba(2,6,23,1)_60%)]"
          />

          <motion.div
            initial={{ scale: 0.65, opacity: 0.18 }}
            animate={{
              scale: phase === "opening" ? 0.9 : 5.8,
              opacity: phase === "opening" ? 0 : 0.78,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_170px_rgba(34,211,238,0.35)]"
          />

          <motion.div
            initial={{ scale: 0.6, opacity: 0.12 }}
            animate={{
              scale: phase === "opening" ? 0.8 : 7.2,
              opacity: phase === "opening" ? 0 : 0.6,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30 bg-blue-500/10 shadow-[0_0_130px_rgba(59,130,246,0.45)]"
          />

          <motion.div
            initial={{ opacity: 0.25 }}
            animate={{ opacity: phase === "opening" ? 0 : 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06)_0px,transparent_10px,transparent_22px)]"
          />

          <motion.div
            animate={{ x: ["140%", "-140%"] }}
            transition={{ duration: 1.05, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 h-px w-2/3 -translate-y-1/2 bg-gradient-to-l from-transparent via-cyan-200/70 to-transparent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

