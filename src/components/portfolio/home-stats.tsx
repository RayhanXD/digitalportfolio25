import Link from "next/link";

export function HomeStats() {
  return (
    <section className="border-y border-white/5 px-5 py-24 sm:px-6 md:px-8 md:py-32 lg:px-10">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-12 md:flex-row md:gap-16">
        <div className="flex-1">
          <h4 className="font-label mb-8 text-sm uppercase tracking-[0.3em] text-secondary-singularity">
            In one line
          </h4>
          <p className="font-headline mb-12 text-3xl font-light leading-tight text-white md:text-4xl lg:text-5xl">
            &ldquo;SHIP END-TO-END — FROM{" "}
            <span className="font-black italic">EMBEDDINGS</span> AND APIs TO METRICS USERS TRUST.&rdquo;
          </p>
          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-10 md:gap-8 md:pt-12">
            <div>
              <span className="font-headline block text-xl font-bold text-white md:text-2xl">
                4.0
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-neutral-500">
                GPA
              </span>
            </div>
            <div>
              <span className="font-headline block text-xl font-bold text-white md:text-2xl">
                500+
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-neutral-500">
                ML learners (PGA)
              </span>
            </div>
            <div>
              <span className="font-headline block text-xl font-bold text-white md:text-2xl">
                100+
              </span>
              <span className="font-label text-[10px] uppercase tracking-widest text-neutral-500">
                Kairos founders
              </span>
            </div>
          </div>
        </div>
        <div className="glass-panel event-horizon-glow relative flex aspect-square w-full max-w-md flex-col justify-between rounded-lg border border-white/5 p-8 md:w-[400px] md:max-w-none">
          <div className="space-y-4">
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full w-2/3 bg-secondary-singularity" />
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
              <div className="h-full w-1/2 bg-tertiary-singularity" />
            </div>
          </div>
          <div className="py-6 text-center md:py-8">
            <div className="font-headline text-5xl font-black text-white md:text-6xl">00:00</div>
            <p className="font-label mt-2 text-[10px] uppercase tracking-widest text-neutral-500">
              UT Austin · dual degree
            </p>
          </div>
          <Link
            href="/contact"
            className="font-label w-full border border-secondary-singularity py-4 text-center text-xs uppercase tracking-widest text-secondary-singularity transition-all hover:bg-secondary-singularity hover:text-on-secondary-singularity"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
