"use client";

import {
  type FormEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ArrowDown, ArrowUpRight, Check, Copy } from "lucide-react";
import { ShaderAnimation, type ShaderLinesHandle } from "@/components/ui/shader-lines";
import { cn } from "@/lib/utils";
import { EASE, gsap, MQ, useGsap } from "@/lib/motion";
import { useAustinTime } from "@/lib/use-austin-time";
import { SplitChars } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { usePlayOnIntro } from "@/components/portfolio/intro-phase";

const CONTACT_EMAIL = "rayriz.mohammad@gmail.com";
const MAX_MESSAGE = 1200;
/** Only this much of the message is split into letters for the launch animation */
const BURST_CHARS = 160;

type Channel = {
  id: string;
  label: string;
  value: string;
  /** Colour the signal is retuned to while this channel is hovered */
  tint: [number, number, number];
} & ({ kind: "copy" } | { kind: "link"; href: string } | { kind: "download"; href: string });

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const prefersMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.motion).matches;

function openMail({ message, name, email }: { message: string; name: string; email: string }) {
  const subject = name ? `Portfolio message from ${name}` : "Portfolio message";
  const body = [message, "", "—", name ? `Name: ${name}` : null, email ? `Email: ${email}` : null]
    .filter((line): line is string => line !== null)
    .join("\n");
  window.open(
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    "_blank",
    "noopener,noreferrer"
  );
}

/** A small looping sine wave — the "frequency" a channel is tuned to */
function Waveform({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" className={cn("h-5 w-24 overflow-hidden", className)} aria-hidden>
      <g className="waveform-scroll">
        <path
          d="M0 12 Q 7.5 0 15 12 T 30 12 T 45 12 T 60 12 T 75 12 T 90 12 T 105 12 T 120 12 T 135 12 T 150 12 T 165 12 T 180 12 T 195 12 T 210 12 T 225 12 T 240 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        />
      </g>
    </svg>
  );
}

/**
 * Contact as a transmission. The background rings hold still at the page's center; you type
 * the message in display type and every keystroke sends a pulse. Transmitting collapses the words
 * into a point of light that launches over the top of the screen, and the visitor's mail app
 * opens with the message ready to send.
 */
export function ContactView({ resumeHref }: { resumeHref: string | null }) {
  const root = useRef<HTMLDivElement>(null);
  const shader = useRef<ShaderLinesHandle>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const intro = useRef<gsap.core.Timeline | null>(null);
  const introReady = usePlayOnIntro(intro);
  const time = useAustinTime();

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hint, setHint] = useState("");
  const [burst, setBurst] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const channels: Channel[] = [
    { id: "email", label: "Email", value: CONTACT_EMAIL, kind: "copy", tint: [0.8, 1, 1.35] },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "in/rayhan-mohammad1",
      kind: "link",
      href: "https://www.linkedin.com/in/rayhan-mohammad1",
      tint: [1.15, 1.15, 1.15],
    },
    {
      id: "github",
      label: "GitHub",
      value: "@RayhanXD",
      kind: "link",
      href: "https://github.com/RayhanXD",
      tint: [1.35, 1, 0.8],
    },
    ...(resumeHref
      ? [
          {
            id: "resume",
            label: "Résumé",
            value: "PDF",
            kind: "download" as const,
            href: resumeHref,
            tint: [1, 0.9, 1.25] as [number, number, number],
          },
        ]
      : []),
  ];

  // Entrance
  useGsap(
    (mm) => {
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: EASE.cinematic } });
        tl.fromTo("[data-ct-meta] > *", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, stagger: 0.06 }, 0)
          .fromTo(
            "[data-ct-title] [data-char]",
            { yPercent: 118 },
            { yPercent: 0, duration: 1.4, stagger: 0.035 },
            0.15
          )
          .fromTo("[data-ct-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.inOut" }, 0.5)
          .fromTo(
            "[data-ct-field]",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 },
            0.65
          )
          .fromTo("[data-ct-rule]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, stagger: 0.08 }, 0.9)
          .fromTo(
            "[data-ct-channel-inner]",
            { yPercent: 60, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 },
            0.95
          );
        intro.current = tl;
        if (introReady.current) tl.play();
        return () => {
          intro.current = null;
        };
      });
    },
    root
  );

  // Grow the message box with its content (field-sizing isn't everywhere yet)
  useIsomorphicLayoutEffect(() => {
    const el = messageRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [message, sent]);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  // Launch: the words collapse into a line, a point of light shoots up and away
  useIsomorphicLayoutEffect(() => {
    if (burst == null || !root.current) return;
    const el = root.current;
    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-ct-burst] [data-char]");
      const mid = (chars.length - 1) / 2;
      const spark = el.querySelector<HTMLElement>("[data-ct-spark]")!;
      const box = el.querySelector<HTMLElement>("[data-ct-burst]")!.getBoundingClientRect();
      const rootBox = el.getBoundingClientRect();
      const startX = box.left - rootBox.left + box.width / 2;
      const startY = box.top - rootBox.top + box.height / 2;

      shader.current?.setCenter(startX, startY);
      gsap
        .timeline({
          onComplete: () => {
            shader.current?.setGain(1);
            shader.current?.resetCenter();
            setBurst(null);
            setSent(true);
          },
        })
        .to(chars, {
          scaleY: 0.02,
          scaleX: 1.5,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          stagger: (i) => (mid - Math.abs(i - mid)) * (0.35 / Math.max(mid, 1)),
        })
        .set(spark, { x: startX, y: startY, opacity: 1, scaleY: 1 }, 0.55)
        .call(() => {
          shader.current?.pulse(32);
          shader.current?.setGain(2.4);
        }, [], 0.55)
        .to(spark, { scaleY: 14, duration: 0.25, ease: "power2.in" }, 0.6)
        .to(
          spark,
          {
            y: -rootBox.top - 120,
            duration: 0.85,
            ease: "expo.in",
            onUpdate: () => {
              shader.current?.setCenter(startX, Number(gsap.getProperty(spark, "y")));
            },
          },
          0.62
        )
        .set(spark, { opacity: 0 });
    }, el);
    return () => ctx.revert();
  }, [burst]);

  // Arriving at the "launched" state
  useIsomorphicLayoutEffect(() => {
    if (!sent || !root.current || !prefersMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: EASE.cinematic } })
        .fromTo("[data-ct-sent] [data-char]", { yPercent: 118 }, { yPercent: 0, duration: 1.3, stagger: 0.035 })
        .fromTo("[data-ct-sent-copy]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.3);
    }, root.current);
    return () => ctx.revert();
  }, [sent]);

  const transmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) {
      setHint("Type a message first — then transmit.");
      messageRef.current?.focus();
      if (prefersMotion()) {
        gsap.to(messageRef.current, {
          keyframes: { x: [-10, 8, -5, 2, 0] },
          duration: 0.45,
          ease: "power2.out",
        });
      }
      return;
    }
    setHint("");
    // Open the mail app inside the submit gesture so popup blockers allow it
    openMail({ message: message.trim(), name: name.trim(), email: email.trim() });
    if (prefersMotion()) setBurst(message.trim());
    else setSent(true);
  };

  const reset = () => {
    setSent(false);
    setMessage("");
    setName("");
    setEmail("");
    requestAnimationFrame(() => messageRef.current?.focus());
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      if (prefersMotion()) shader.current?.pulse(10);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  const retune = (channel: Channel) => {
    if (!prefersMotion()) return;
    shader.current?.setTint(...channel.tint);
    shader.current?.pulse(3);
  };
  const untune = () => shader.current?.setTint(1, 1, 1);

  const fieldClass =
    "min-w-0 border-b border-white/20 bg-transparent px-1 pb-1 font-headline text-white outline-none transition-colors placeholder:text-white/25 focus:border-tertiary-singularity";

  return (
    <div
      ref={root}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      <ShaderAnimation ref={shader} className="absolute inset-0 z-0 h-full w-full" />
      {/* Keeps the typed message legible over the brightest rings */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_75%_55%_at_35%_42%,rgba(0,0,0,0.6),transparent_75%)]" />

      <div
        data-ct-spark
        className="pointer-events-none absolute left-0 top-0 z-20 h-3 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_14px_4px_rgba(255,255,255,0.9),0_0_40px_10px_rgba(120,180,232,0.7)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-screen-2xl px-5 pb-16 pt-[calc(env(safe-area-inset-top)+5.5rem)] sm:px-6 md:px-8 md:pb-24 lg:px-10">
        <div
          data-ct-meta
          className="font-label flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.35em] text-neutral-400"
        >
          <span className="text-secondary-singularity">Open frequency</span>
          <span className="h-px w-10 bg-white/20" aria-hidden />
          <span className="tabular-nums">Austin, TX · {time ? `${time} CT` : "Central Time"}</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-tertiary-singularity shadow-[0_0_10px_rgba(255,181,153,0.7)] motion-reduce:animate-none" />
            Receiving
          </span>
        </div>

        {!sent ? (
          <form onSubmit={transmit} noValidate className="mt-12 md:mt-16">
            <h1
              data-ct-title
              className="font-headline text-[clamp(2.75rem,7.5vw,7rem)] font-black leading-[0.88] tracking-tighter text-white"
            >
              <span className="block [clip-path:inset(-30%_-5%_-0.08em_-5%)]">
                <SplitChars text="Send a signal." />
              </span>
            </h1>

            <div data-ct-field className="mt-10 flex items-center justify-between md:mt-14">
              <label
                htmlFor="ct-message"
                className="font-label text-[10px] uppercase tracking-[0.35em] text-neutral-400"
              >
                Transmission
              </label>
              <span className="font-label text-[10px] tabular-nums tracking-[0.25em] text-neutral-500">
                {message.length} / {MAX_MESSAGE}
              </span>
            </div>

            <div className="relative mt-3">
              <textarea
                id="ct-message"
                ref={messageRef}
                data-ct-field
                value={message}
                maxLength={MAX_MESSAGE}
                rows={2}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (hint) setHint("");
                  if (prefersMotion()) shader.current?.pulse(1.4);
                }}
                placeholder="Say hi, pitch a role, or ask about a project…"
                className={cn(
                  "block min-h-[2.3em] w-full resize-none overflow-hidden bg-transparent font-headline text-[clamp(1.6rem,3.4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white caret-tertiary-singularity outline-none placeholder:text-white/20",
                  burst != null && "text-transparent"
                )}
              />
              {burst != null ? (
                <p
                  data-ct-burst
                  className="pointer-events-none absolute inset-x-0 top-0 font-headline text-[clamp(1.6rem,3.4vw,3.25rem)] font-bold leading-[1.12] tracking-tight text-white"
                  aria-hidden
                >
                  <SplitChars
                    text={burst.length > BURST_CHARS ? `${burst.slice(0, BURST_CHARS)}…` : burst}
                    srLabel={false}
                  />
                </p>
              ) : null}
              <span className="relative mt-4 block h-px w-full bg-white/10" aria-hidden>
                <span data-ct-line className="horizon-line absolute inset-0 origin-left" />
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p
                data-ct-field
                className="flex flex-wrap items-baseline gap-x-3 gap-y-4 font-headline text-xl text-white/55 md:text-2xl"
              >
                <span>from</span>
                <label className="sr-only" htmlFor="ct-name">
                  Your name
                </label>
                <input
                  id="ct-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="your name"
                  autoComplete="name"
                  className={cn(fieldClass, "w-[11ch]")}
                />
                <span>at</span>
                <label className="sr-only" htmlFor="ct-email">
                  Your email
                </label>
                <input
                  id="ct-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={cn(fieldClass, "w-[16ch]")}
                />
              </p>
              <div data-ct-field className="flex flex-col items-start gap-3 md:items-end">
                <Magnetic strength={0.22}>
                  <button
                    type="submit"
                    disabled={burst != null}
                    className={cn(
                      "font-label flex items-center gap-3 whitespace-nowrap px-9 py-5 text-sm font-bold uppercase tracking-[0.25em] transition-[background-color,color,box-shadow,scale] duration-300 active:scale-[0.97]",
                      message.trim()
                        ? "bg-white text-black hover:shadow-[0_0_40px_rgba(120,180,232,0.5)]"
                        : "border border-white/20 bg-white/[0.04] text-white/70 hover:border-white/40 hover:text-white"
                    )}
                  >
                    Transmit
                    <ArrowUpRight className="size-4" aria-hidden />
                  </button>
                </Magnetic>
                <p
                  role="status"
                  aria-live="polite"
                  className="font-label min-h-[1em] text-[10px] uppercase tracking-[0.25em] text-tertiary-singularity"
                >
                  {hint}
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div data-ct-sent className="mt-12 md:mt-16" role="status">
            <p data-ct-sent-copy className="font-label text-[10px] uppercase tracking-[0.35em] text-secondary-singularity">
              Transmission away{time ? ` · ${time} CT` : ""}
            </p>
            <h1 className="font-headline mt-6 text-[clamp(2.75rem,7.5vw,7rem)] font-black leading-[0.88] tracking-tighter text-white">
              <span className="block [clip-path:inset(-30%_-5%_-0.08em_-5%)]">
                <SplitChars text="Signal launched." />
              </span>
            </h1>
            <p data-ct-sent-copy className="mt-8 max-w-xl text-lg font-light leading-relaxed text-neutral-300">
              Your mail app just opened with the message ready — hit send there and it lands in my
              inbox. Nothing opened? Copy my address from the channels below.
            </p>
            <button
              data-ct-sent-copy
              type="button"
              onClick={reset}
              className="font-label mt-10 border-b border-white/30 pb-1 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:border-tertiary-singularity hover:text-tertiary-singularity"
            >
              Transmit another
            </button>
          </div>
        )}

        <ul className="mt-20 md:mt-28" aria-label="Other channels">
          {channels.map((channel, i) => {
            const inner = (
              <>
                <span className="font-label w-12 shrink-0 text-[10px] uppercase tracking-[0.3em] text-neutral-500 md:w-16">
                  CH {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-headline text-[clamp(2rem,5.5vw,4.75rem)] font-black uppercase leading-none tracking-tighter text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 group-focus-visible:translate-x-3">
                  {channel.label}
                </span>
                <Waveform className="hidden text-secondary-singularity opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block" />
                <span className="ml-auto hidden truncate font-label text-xs tracking-[0.15em] text-neutral-400 sm:block">
                  {channel.kind === "copy" && copied ? "Copied — frequency locked" : channel.value}
                </span>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black md:size-12">
                  {channel.kind === "copy" ? (
                    copied ? (
                      <Check className="size-4" aria-hidden />
                    ) : (
                      <Copy className="size-4" aria-hidden />
                    )
                  ) : channel.kind === "download" ? (
                    <ArrowDown className="size-4" aria-hidden />
                  ) : (
                    <ArrowUpRight className="size-4" aria-hidden />
                  )}
                </span>
              </>
            );
            const rowClass =
              "group flex w-full items-center gap-4 py-6 text-left outline-none md:gap-8 md:py-8";
            return (
              <li
                key={channel.id}
                className="relative overflow-hidden"
                onPointerEnter={() => retune(channel)}
                onPointerLeave={untune}
              >
                <span
                  data-ct-rule
                  className="absolute inset-x-0 top-0 h-px origin-left bg-white/10"
                  aria-hidden
                />
                <div data-ct-channel-inner>
                  {channel.kind === "copy" ? (
                    <button
                      type="button"
                      onClick={copyEmail}
                      className={rowClass}
                      aria-label={`Copy email address ${channel.value}`}
                    >
                      {inner}
                    </button>
                  ) : (
                    <a
                      href={channel.href}
                      className={rowClass}
                      {...(channel.kind === "download"
                        ? { download: "" }
                        : { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {inner}
                    </a>
                  )}
                </div>
                {i === channels.length - 1 ? (
                  <span
                    data-ct-rule
                    className="absolute inset-x-0 bottom-0 h-px origin-left bg-white/10"
                    aria-hidden
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
        <p
          className="sr-only"
          aria-live="polite"
        >
          {copied ? "Email address copied" : ""}
        </p>

        <p className="font-label mt-8 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          Usually replies same day on weekdays · Open to Summer &apos;27 SWE / ML roles
        </p>
      </div>
    </div>
  );
}
