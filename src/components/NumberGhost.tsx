/** Properties for the {@link NumberGhost} component. */
export interface NumberGhostProperties {
  /** Value of the number. */
  value: number;
}

/**
 * Displays a ghost for the Number component.
 * @param properties - Properties of the component.
 */
export function NumberGhost(properties: NumberGhostProperties) {
  return (
    <div className="rounded-md bg-slate-100 px-4 py-2 opacity-25">
      {properties.value}
    </div>
  );
}

export default NumberGhost;
