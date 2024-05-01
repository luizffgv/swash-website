import { HTMLAttributeAnchorTarget } from "react";

/** Properties for the {@link Link} component. */
export interface LinkProperties {
  children: React.ReactNode;

  /** URL to visit when the link is clicked. */
  href: string;

  /**
   * Same as `target` in <a>.
   * @default "_blank"
   */
  target?: HTMLAttributeAnchorTarget | undefined;

  /**
   * Same as `rel` in <a>.
   * @default "noopener noreferrer"
   */
  rel?: string | undefined;
}

/**
 * A link that navigates to a URL on click.
 * @param properties - Properties of the component.
 */
export function Link(properties: LinkProperties) {
  const { children, href, target = "_blank" } = properties;

  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="text-primary underline"
    >
      {children}
    </a>
  );
}

export default Link;
