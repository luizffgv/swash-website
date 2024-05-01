import { DraggableContext } from "swash";
import { useContext, useEffect, useRef } from "react";

/** Properties for the {@link TransitionOnRelease} component. */
export interface TransitionOnReleaseProperties {
  /** Duration of the transition in milliseconds. */
  duration?: number | undefined;

  children: React.ReactNode;
}

/**
 * Transitions the draggable back to its original position when released.
 * @param properties - Properties of the component.
 */
export function TransitionOnRelease(properties: TransitionOnReleaseProperties) {
  const { children, duration = 500 } = properties;

  const {
    states: { dragging, returning },
    lastDragPosition,
    setReturnedPromise,
  } = useContext(DraggableContext);

  const resolveReturned = useRef<() => void>();

  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dragging)
      setReturnedPromise(
        new Promise((resolve) => (resolveReturned.current = resolve)),
      );
  }, [dragging, setReturnedPromise]);

  useEffect(() => {
    if (!returning) return;

    const { left, top } = element.current!.getBoundingClientRect();

    const offset = {
      x: lastDragPosition.x - left,
      y: lastDragPosition.y - top,
    };
    if (offset.x === 0 && offset.y === 0) {
      resolveReturned.current?.();
      return;
    }

    const animation = new Animation(
      new KeyframeEffect(
        element.current!,
        [
          {
            translate: `${offset.x}px ${offset.y}px`,
          },
          {
            translate: "none",
          },
        ],
        {
          duration,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
      ),
    );
    animation.addEventListener("cancel", () => resolveReturned.current?.());
    animation.addEventListener("finish", () => resolveReturned.current?.());
    animation.play();

    return () => {
      animation.cancel();
    };
  }, [returning]);

  return (
    <div
      onTouchStart={(event) => {
        if (returning) event.stopPropagation();
      }}
      onMouseDown={(event) => {
        if (returning) event.stopPropagation();
      }}
    >
      <div
        ref={element}
        style={{
          position: returning ? "absolute" : "static",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default TransitionOnRelease;
