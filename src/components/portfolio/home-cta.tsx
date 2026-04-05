import Link from "next/link";

export function HomeCta() {
  return (
    <section className="relative overflow-hidden px-6 py-32 text-center md:py-48">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(255,181,153,0.1)_0%,transparent_50%)]" />
      <h2 className="font-headline mb-10 text-5xl font-black uppercase tracking-tighter text-white md:text-7xl lg:text-8xl">
        LET&apos;S <span className="text-outline">BUILD</span>
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-lg font-light italic text-on-surface-variant">
        Open to internships, research collaborations, and teams shipping ML and full-stack product.
      </p>
      <Link
        className="font-headline inline-block border-b-4 border-tertiary-singularity pb-2 text-2xl font-bold text-white transition-colors duration-300 hover:text-tertiary-singularity md:text-3xl"
        href="mailto:rayhanm@utexas.edu"
      >
        RAYHANM@UTEXAS.EDU
      </Link>
    </section>
  );
}
