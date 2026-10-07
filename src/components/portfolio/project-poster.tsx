import type { CSSProperties } from "react";
import type { Project } from "@/components/portfolio/projects-data";
import { cn } from "@/lib/utils";

const ACCENT_RGB = {
  blue: "120 180 232",
  orange: "255 181 153",
} as const;

/**
 * A project's media frame. Plays `project.video` when set; otherwise renders a generated
 * horizon — a tilted planet edge lit in the project's accent — so the slot never looks empty.
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
        {project.video ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={project.video} type="video/mp4" />
          </video>
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
