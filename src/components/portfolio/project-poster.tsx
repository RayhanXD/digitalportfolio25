"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import type { Project, ProjectMedia } from "@/components/portfolio/projects-data";
import { MQ } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ACCENT_RGB = {
  blue: "120 180 232",
  orange: "255 181 153",
} as const;

/** Clips open a couple of seconds in, once the shot has settled */
export const clipSrc = (video: string) => `${video}#t=2`;

/** A project's crop and grade, as inline styles for its <video> */
export function frameStyle({ crop, grade }: Pick<ProjectMedia, "crop" | "grade">): CSSProperties {
  return {
    transform: crop ? `scale(${crop.flip ? -crop.scale : crop.scale}, ${crop.scale})` : "",
    transformOrigin: crop?.origin ?? "",
    filter: grade ?? "",
  };
}

/**
 * Footage that only plays while its frame is on screen, and only once it is: a clip that starts
 * playing while it can't be seen can be left unpainted by Chrome. Under reduced motion it holds
 * a still. Fades in on its first frame so it never flashes black.
 */
function PosterVideo({ media }: { media: ProjectMedia }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const show = () => {
      video.style.opacity = "1";
    };
    if (video.readyState >= 2) show();
    video.addEventListener("loadeddata", show);

    const reduce = window.matchMedia(MQ.reduce).matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduce) return;
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("loadeddata", show);
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-out"
      style={frameStyle(media)}
      src={clipSrc(media.video)}
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}

/**
 * A project's media frame: its footage when it has some, otherwise a generated horizon (a tilted
 * planet edge lit in the project's accent) so the slot never looks empty.
 * `[data-poster-inner]` and `[data-poster-planet]` are animated by the gallery.
 */
export function ProjectPoster({ project, className }: { project: Project; className?: string }) {
  const style = {
    "--accent-rgb": ACCENT_RGB[project.accent],
    "--planet-top": project.horizon.top,
    "--planet-size": project.horizon.size,
    "--tilt": `${project.horizon.tilt}deg`,
  } as CSSProperties;

  return (
    <div
      className={cn("poster relative overflow-hidden rounded-lg border border-white/[0.06]", className)}
      style={style}
      aria-hidden
    >
      <div data-poster-inner className="absolute -inset-[8%]">
        {project.media ? (
          <PosterVideo media={project.media} />
        ) : (
          <>
            <div className="poster-stars absolute inset-0" />
            <div className="poster-scene absolute inset-0">
              <div data-poster-planet className="poster-planet">
                <div className="poster-sun" />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}
