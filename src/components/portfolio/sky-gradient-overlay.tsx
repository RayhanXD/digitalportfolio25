"use client";

/** Three cycles of space blue → white → horizon orange, 9 stops on the diagonal. */
export const SKY_TINT_MULTIPLY =
  "linear-gradient(135deg, #0f2848 0%, #ffffff 12.5%, #ffb599 25%, #0f2848 37.5%, #ffffff 50%, #ffb599 62.5%, #0f2848 75%, #ffffff 87.5%, #ffb599 100%)";

export const SKY_TINT_COLOR =
  "linear-gradient(135deg, rgba(61, 110, 168, 0.4) 0%, rgba(255, 255, 255, 0.35) 12.5%, rgba(255, 181, 153, 0.45) 25%, rgba(61, 110, 168, 0.4) 37.5%, rgba(255, 255, 255, 0.35) 50%, rgba(255, 181, 153, 0.45) 62.5%, rgba(61, 110, 168, 0.4) 75%, rgba(255, 255, 255, 0.35) 87.5%, rgba(255, 181, 153, 0.45) 100%)";

/** Softer blue / dusty peach — same pattern, less saturation and lower color-pass alpha. */
const SKY_TINT_MULTIPLY_SUBTLE =
  "linear-gradient(135deg, #1c3550 0%, #f8fafc 12.5%, #e5cbb8 25%, #1c3550 37.5%, #f8fafc 50%, #e5cbb8 62.5%, #1c3550 75%, #f8fafc 87.5%, #e5cbb8 100%)";

const SKY_TINT_COLOR_SUBTLE =
  "linear-gradient(135deg, rgba(95, 135, 178, 0.22) 0%, rgba(248, 250, 252, 0.2) 12.5%, rgba(232, 196, 175, 0.26) 25%, rgba(95, 135, 178, 0.22) 37.5%, rgba(248, 250, 252, 0.2) 50%, rgba(232, 196, 175, 0.26) 62.5%, rgba(95, 135, 178, 0.22) 75%, rgba(248, 250, 252, 0.2) 87.5%, rgba(232, 196, 175, 0.26) 100%)";

/** Same diagonal pattern as default — slightly richer stops for multiply + stronger color pass (about + matrix). */
const SKY_TINT_MULTIPLY_VIBRANT =
  "linear-gradient(135deg, #0a3a6e 0%, #ffffff 12.5%, #ff9a6b 25%, #0a3a6e 37.5%, #ffffff 50%, #ff9a6b 62.5%, #0a3a6e 75%, #ffffff 87.5%, #ff9a6b 100%)";

const SKY_TINT_COLOR_VIBRANT =
  "linear-gradient(135deg, rgba(61, 110, 168, 0.55) 0%, rgba(255, 255, 255, 0.45) 12.5%, rgba(255, 140, 100, 0.58) 25%, rgba(61, 110, 168, 0.55) 37.5%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 140, 100, 0.58) 62.5%, rgba(61, 110, 168, 0.55) 75%, rgba(255, 255, 255, 0.45) 87.5%, rgba(255, 140, 100, 0.58) 100%)";

export type SkyGradientOverlayProps = {
  /** `subtle` = muted blue/peach. `vibrant` = stronger blue/white/orange (e.g. about + matrix). */
  variant?: "default" | "subtle" | "vibrant";
};

/**
 * Multiply + color + bottom vignette stack (projects waves or about matrix).
 * Sits above z-0; content should stay z-10+.
 */
export function SkyGradientOverlay({ variant = "default" }: SkyGradientOverlayProps) {
  const multiply =
    variant === "subtle"
      ? SKY_TINT_MULTIPLY_SUBTLE
      : variant === "vibrant"
        ? SKY_TINT_MULTIPLY_VIBRANT
        : SKY_TINT_MULTIPLY;
  const color =
    variant === "subtle"
      ? SKY_TINT_COLOR_SUBTLE
      : variant === "vibrant"
        ? SKY_TINT_COLOR_VIBRANT
        : SKY_TINT_COLOR;
  const vignette =
    variant === "subtle"
      ? "from-transparent via-transparent to-black/22"
      : variant === "vibrant"
        ? "from-transparent via-transparent to-black/14"
        : "from-transparent via-transparent to-black/30";

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[1] mix-blend-multiply"
        style={{ background: multiply }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-color"
        style={{ background: color }}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-0 z-[3] bg-gradient-to-b ${vignette}`}
        aria-hidden
      />
    </>
  );
}
