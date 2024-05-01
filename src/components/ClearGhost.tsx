import { EraserIcon } from "lucide-react";

/**
 * Displays a ghost for the Clear component.
 * @param properties - Properties of the component.
 */
export function ClearGhost() {
  return (
    <div className="rounded-md bg-slate-100 px-4 py-2 opacity-25">
      <EraserIcon />
    </div>
  );
}

export default ClearGhost;
