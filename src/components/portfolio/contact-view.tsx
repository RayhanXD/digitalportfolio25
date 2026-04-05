"use client";

import { ShaderAnimation } from "@/components/ui/shader-lines";

export function ContactView() {
  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden">
      <ShaderAnimation className="absolute inset-0 z-0 h-full w-full" />
      <div className="relative z-10 pt-6 md:pt-8">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-6 md:px-8 lg:grid-cols-12 lg:gap-24">
          <div className="relative flex flex-col justify-center lg:col-span-5">
          <h1 className="font-headline mb-8 text-5xl font-black leading-[0.9] tracking-tighter text-white md:text-7xl lg:text-8xl">
            GET IN
            <br />
            TOUCH.
          </h1>
          <p className="mb-12 max-w-md text-xl font-light leading-relaxed text-on-surface-variant">
            Email or call me about internships, research, or product engineering — especially ML,
            full-stack systems, and data-heavy applications. Online: rayhanm.com ·
            github.com/RayhanXD · linkedin.com/in/rayhan-mohammad1
          </p>
          <div className="font-label flex flex-col gap-6 text-xs uppercase tracking-[0.2em]">
            <div className="group flex items-center gap-4">
              <div className="h-px w-8 bg-outline-variant transition-all group-hover:w-12 group-hover:bg-secondary-singularity" />
              <span className="text-neutral-500 transition-colors group-hover:text-white">
                rayhanm@utexas.edu
              </span>
            </div>
            <div className="group flex items-center gap-4">
              <div className="h-px w-8 bg-outline-variant transition-all group-hover:w-12 group-hover:bg-secondary-singularity" />
              <span className="text-neutral-500 transition-colors group-hover:text-white">
                +1 972 821 3646
              </span>
            </div>
          </div>
          </div>

          <div className="relative flex items-center lg:col-span-7">
          <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-black/80 p-8 md:p-12 lg:p-16">
            <form action="#" className="relative z-10 flex flex-col gap-8 md:gap-10">
              <div className="group flex flex-col gap-3">
                <label
                  className="font-label text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors group-focus-within:text-white"
                  htmlFor="name"
                >
                  Identity / Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="rounded-none border-2 border-white/10 bg-black p-4 font-headline text-lg text-white transition-all placeholder:text-neutral-800 focus:border-white focus:ring-0 md:p-5"
                />
              </div>
              <div className="group flex flex-col gap-3">
                <label
                  className="font-label text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors group-focus-within:text-white"
                  htmlFor="email"
                >
                  Destination / Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@domain.com"
                  className="rounded-none border-2 border-white/10 bg-black p-4 font-headline text-lg text-white transition-all placeholder:text-neutral-800 focus:border-white focus:ring-0 md:p-5"
                />
              </div>
              <div className="group flex flex-col gap-3">
                <label
                  className="font-label text-[10px] uppercase tracking-[0.3em] text-neutral-500 transition-colors group-focus-within:text-white"
                  htmlFor="message"
                >
                  Manifest / Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Briefly describe the objective..."
                  className="resize-none rounded-none border-2 border-white/10 bg-black p-4 font-headline text-lg text-white transition-all placeholder:text-neutral-800 focus:border-white focus:ring-0 md:p-5"
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="font-headline w-full bg-white py-5 text-lg font-black uppercase tracking-widest text-black transition-all duration-300 hover:bg-secondary-singularity active:scale-[0.98] md:py-6 md:text-xl"
                >
                  Send message
                </button>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="size-1.5 rounded-full bg-tertiary-singularity shadow-[0_0_8px_rgba(255,181,153,0.8)]" />
                <span className="font-label text-[10px] uppercase tracking-[0.1em] text-tertiary-singularity">
                  I usually reply within a day.
                </span>
              </div>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
