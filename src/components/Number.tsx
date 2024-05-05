import { useContext, useEffect } from "react";
import { DraggableContext } from "swash";
import { AddPayload } from "../lib/payloads";

/** Properties for the {@link Number} component. */
export interface NumberProperties {
  /** Value of the number. */
  value: number;
}

/**
 * Displays a number that can be dragged to produce a {@link AddPayload}.
 * @param properties - Properties of the component.
 */
export function Number(properties: NumberProperties) {
  const {
    states: { dragging },
    setPayload,
  } = useContext(DraggableContext);

  useEffect(() => {
    setPayload(new AddPayload(properties.value));
  }, [properties.value, setPayload]);

  return (
    <div
      className={`rounded-md px-4 py-2 transition ${dragging ? " bg-primary text-white" : "bg-slate-100 hover:text-primary"}`}
    >
      {properties.value}
    </div>
  );
}

export default Number;
