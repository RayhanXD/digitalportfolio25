import Link from "next/link";

export function HomeCta() {
  return (
    <section className="relative overflow-hidden py-28 text-center md:py-40 lg:py-48">
      <div className="mx-auto max-w-screen-2xl px-5 sm:px-6 md:px-8 lg:px-10">
      <h2 className="font-headline mb-10 text-5xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl">
        LET&apos;S <span className="text-outline">BUILD</span>
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-lg font-light italic text-on-surface-variant">
        Open to internships, research, and teams shipping agentic AI, ML infrastructure, and
        full-stack product.
      </p>
      <Link
        className="font-headline inline-block border-b-4 border-tertiary-singularity pb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-tertiary-singularity md:text-3xl"
        href="mailto:rayriz.mohammad@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        RAYRIZ.MOHAMMAD@GMAIL.COM
      </Link>
      </div>
    </section>
  );
}
