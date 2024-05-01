import { DragReceiver, EmptyPayload } from "swash";
import { MultiplyPayload } from "../lib/payloads";
import { useRef } from "react";

/** Properties for the {@link Multiplier} component. */
export interface MultiplierProperties {
  /** Multiplier value. */
  multiplier: number;
}

/**
 * Displays a multiplier that draggables can pass over to receive a
 * {@link MultiplyPayload}.
 * @param properties - Properties of the component.
 */
export function Multiplier(properties: MultiplierProperties) {
  const { multiplier } = properties;

  const element = useRef<HTMLDivElement>(null);

  return (
    <DragReceiver
      onSwashDragEnter={(event) => {
        if (event.payload instanceof EmptyPayload) {
          event.reply(new MultiplyPayload(multiplier));
          new Animation(
            new KeyframeEffect(
              element.current!,
              [
                {
                  scale: 1.15,
                },
                {},
              ],
              { duration: 250 },
            ),
          ).play();
        } else {
          new Animation(
            new KeyframeEffect(
              element.current!,
              [
                { transform: "translateX(0)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(0)" },
              ],
              { duration: 500 },
            ),
          ).play();
        }
      }}
    >
      <div
        ref={element}
        className={`rounded-md bg-slate-100 px-4 py-2 hover:text-primary`}
      >
        X{multiplier}
      </div>
    </DragReceiver>
  );
}

export default Multiplier;
