import { useContext, useEffect } from "react";
import { DraggableContext } from "swash";
import { EraserIcon } from "lucide-react";
import { SetPayload } from "../lib/payloads";

/**
 * Displays a box that can be dragged to produce a {@link SetPayload} with a
 * value of 0.
 */
export function Clear() {
  const {
    states: { dragging },
    setPayload,
  } = useContext(DraggableContext);

  useEffect(() => {
    setPayload(new SetPayload(0));
  }, [setPayload]);

  return (
    <div
      className={`rounded-md px-4 py-2 transition hover:text-primary ${dragging ? "bg-primary text-white" : "bg-slate-100"}`}
    >
      <EraserIcon />
    </div>
  );
}

export default Clear;
