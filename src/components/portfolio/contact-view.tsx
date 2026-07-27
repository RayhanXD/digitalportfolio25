"use client";

import type { FormEvent } from "react";
import { ExternalLink, Globe, Mail, Phone } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { cn } from "@/lib/utils";

const CONTACT_EMAIL = "rayriz.mohammad@gmail.com";

const channels = [
  {
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: Mail,
    primary: true,
  },
  {
    label: "Phone",
    value: "+1 972 821 3646",
    href: "tel:+19728213646",
    icon: Phone,
    primary: false,
  },
] as const;

function openMailtoFromForm(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  const subject = name ? `Portfolio message from ${name}` : "Portfolio message";
  const bodyLines = [
    message || "(No message provided)",
    "",
    "—",
    name ? `Name: ${name}` : null,
    email ? `Email: ${email}` : null,
  ].filter((line): line is string => line !== null);

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.open(mailto, "_blank", "noopener,noreferrer");
}

const online = [
  { label: "GitHub", href: "https://github.com/RayhanXD", icon: ExternalLink },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rayhan-mohammad1", icon: ExternalLink },
] as const;

export function ContactView() {
  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden">
      <ShaderAnimation className="absolute inset-0 z-0 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,180,232,0.08),transparent_55%)]" />

      <div className="relative z-10 pb-16 pt-[calc(env(safe-area-inset-top)+4.75rem)] md:pb-24 lg:pb-28">
        <div className="mx-auto max-w-screen-2xl px-5 sm:px-6 md:px-8 lg:px-10">
          <header className="mb-14 md:mb-20 lg:mb-24">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-3xl">
                <p className="font-label mb-5 text-xs uppercase tracking-[0.4em] text-secondary-singularity">
                  Contact
                </p>
                <h1 className="font-headline text-5xl font-black leading-[0.92] tracking-tighter text-white md:text-7xl lg:text-8xl">
                  Lines open.
                  <br />
                  <span className="bg-gradient-to-r from-white via-secondary-singularity to-tertiary-singularity bg-clip-text text-transparent">
                    Let&apos;s talk shop.
                  </span>
                </h1>
              </div>
              <p className="max-w-sm text-base leading-relaxed text-neutral-400 lg:max-w-md lg:pb-2 lg:text-right lg:text-lg">
                Software and ML engineering — agentic AI platforms, RAG infrastructure, and
                full-stack product. Internships, research, and founding-engineer work. Drop a note;
                I read everything.
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <aside className="flex flex-col gap-4 lg:col-span-4">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={ch.href}
                    href={ch.href}
                    {...(ch.href.startsWith("mailto:")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border p-6 transition-all duration-500 ease-out",
                      ch.primary
                        ? "border-secondary-singularity/35 bg-gradient-to-br from-secondary-singularity/10 to-transparent hover:border-secondary-singularity/60 hover:shadow-[0_0_40px_-8px_rgba(120,180,232,0.35)]"
                        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-label mb-2 text-[10px] uppercase tracking-[0.35em] text-neutral-500">
                          {ch.label}
                        </p>
                        <p className="font-headline text-lg text-white md:text-xl">{ch.value}</p>
                      </div>
                      <span
                        className={cn(
                          "flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
                          ch.primary
                            ? "border-secondary-singularity/40 bg-secondary-singularity/15 text-secondary-singularity group-hover:scale-105"
                            : "border-white/10 bg-black/30 text-neutral-400 group-hover:text-white"
                        )}
                      >
                        <Icon className="size-5" strokeWidth={2} aria-hidden />
                      </span>
                    </div>
                  </a>
                );
              })}

              <div className="rounded-2xl border border-dashed border-white/15 bg-black/20 p-5 backdrop-blur-sm">
                <p className="font-label mb-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Online
                </p>
                <div className="flex flex-wrap gap-2">
                  {online.map((item) => {
                    const ExtIcon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-label inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-widest text-neutral-300 transition-colors hover:border-secondary-singularity/40 hover:text-white"
                      >
                        <ExtIcon className="size-3.5 opacity-70" aria-hidden />
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <div className="relative">
                <div className="absolute -left-px top-8 bottom-8 hidden w-px bg-gradient-to-b from-transparent via-secondary-singularity/50 to-transparent lg:block" />

                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/50 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-2xl lg:rounded-[2rem]">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,rgba(120,180,232,0.06)_0%,transparent_45%,rgba(255,181,153,0.04)_100%)]" />
                  <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-secondary-singularity/10 blur-3xl" />

                  <form
                    onSubmit={openMailtoFromForm}
                    className="relative z-10 flex flex-col gap-7 p-8 md:gap-8 md:p-10 lg:p-12"
                  >
                    <div className="flex flex-col gap-2 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
                      <h2 className="font-headline text-2xl font-bold tracking-tight text-white md:text-3xl">
                        Message
                      </h2>
                      <span className="font-label text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                        Opens your email app · no spam, please
                      </span>
                    </div>

                    <div className="grid gap-7 md:grid-cols-2 md:gap-8">
                      <div className="group flex flex-col gap-2">
                        <label
                          className="font-label text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors group-focus-within:text-secondary-singularity"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          autoComplete="name"
                          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 font-headline text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-secondary-singularity/50 focus:ring-2 focus:ring-secondary-singularity/20 md:text-lg"
                        />
                      </div>
                      <div className="group flex flex-col gap-2">
                        <label
                          className="font-label text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors group-focus-within:text-secondary-singularity"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="you@domain.com"
                          autoComplete="email"
                          className="rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 font-headline text-base text-white outline-none transition-all placeholder:text-neutral-600 focus:border-secondary-singularity/50 focus:ring-2 focus:ring-secondary-singularity/20 md:text-lg"
                        />
                      </div>
                    </div>

                    <div className="group flex flex-col gap-2">
                      <label
                        className="font-label text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors group-focus-within:text-secondary-singularity"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="What are you building? Timeline, stack, goals…"
                        className="resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 font-headline text-base leading-relaxed text-white outline-none transition-all placeholder:text-neutral-600 focus:border-secondary-singularity/50 focus:ring-2 focus:ring-secondary-singularity/20 md:text-lg"
                      />
                    </div>

                    <div className="flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="submit"
                        className="font-headline group/btn relative overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-black uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-secondary-singularity hover:text-on-secondary-singularity active:scale-[0.98] md:px-10 md:py-5 md:text-lg"
                      >
                        <span className="relative z-10">Send</span>
                      </button>
                      <div className="flex items-center gap-3">
                        <span className="flex size-2 animate-pulse rounded-full bg-tertiary-singularity shadow-[0_0_12px_rgba(255,181,153,0.6)]" />
                        <span className="font-label text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                          Usually same-day on weekdays
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
