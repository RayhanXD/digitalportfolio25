import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders `text` as one inline-block span per character (`data-char`) for GSAP to stagger.
 * Screen readers get the intact string; the split copy is aria-hidden.
 * Pass `srLabel={false}` when a parent already provides the accessible text.
 */
export function SplitChars({
  text,
  className,
  charClassName,
  srLabel = true,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  srLabel?: boolean;
}) {
  return (
    <>
      {srLabel ? <span className="sr-only">{text}</span> : null}
      <span aria-hidden className={className}>
        {Array.from(text).map((char, i) => (
          <span key={i} data-char className={cn("inline-block", charClassName)}>
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </>
  );
}

/**
 * Renders `text` as inline-block words (`data-word`) separated by real spaces,
 * so wrapping and screen-reader output stay natural.
 */
export function SplitWords({
  text,
  wordClassName,
}: {
  text: string;
  wordClassName?: string;
}) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span data-word className={cn("inline-block", wordClassName)}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
