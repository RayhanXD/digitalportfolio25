"use client";

/** Fixed, full-viewport video backdrop (covers entire screen including mobile dynamic viewport). */
export function HomePageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-[100dvh] min-h-screen w-screen max-w-[100vw] overflow-hidden bg-black"
      aria-hidden
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/campus-connect-ai.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
