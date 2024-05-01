import { useContext } from "react";
import { DraggableContext } from "swash";

/** Properties for the {@link AnimateOnDrag} component. */
export interface AnimateOnDragProperties {
  children: React.ReactNode;
}

/**
 * Executes an animation that makes the draggable look like it was picked up
 * when it starts being dragged.
 * @param properties - Properties of the component.
 */
export function AnimateOnDrag(properties: AnimateOnDragProperties) {
  const { state } = useContext(DraggableContext);
  const dragging = state === "dragging";

  return (
    <div
      className={`transition ${dragging && "rotate-3 scale-110 [filter:drop-shadow(0_0_15px_theme(colors.primary/50%))]"}`}
    >
      {properties.children}
    </div>
  );
}

export default AnimateOnDrag;
