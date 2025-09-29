import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * ClientOnly is a component that only renders its children on the client-side.
 * This is useful for components that use browser APIs or need client-side state.
 *
 * @component
 * @example
 * // Basic usage
 * <ClientOnly>
 *   <ComponentThatNeedsClientSide />
 * </ClientOnly>
 *
 * // With loading fallback
 * <ClientOnly fallback={<LoadingSpinner />}>
 *   <ComponentThatNeedsClientSide />
 * </ClientOnly>
 */
const ClientOnly = ({
  children,
  fallback = null,
  delay = 0,
  onMount = () => {},
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Handle delayed mounting if specified
    const timer = setTimeout(() => {
      setHasMounted(true);
      onMount();
    }, delay);

    // Prevent flash of loading state
    const animFrame = requestAnimationFrame(() => {
      setShouldRender(true);
    });

    // Cleanup
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animFrame);
    };
  }, [delay, onMount]);

  // Don't render anything until after first animation frame
  if (!shouldRender) {
    return null;
  }

  // Show fallback while mounting
  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
};

ClientOnly.propTypes = {
  /** The content to render on client-side */
  children: PropTypes.node.isRequired,
  /** Optional content to show while mounting */
  fallback: PropTypes.node,
  /** Optional delay before mounting (in milliseconds) */
  delay: PropTypes.number,
  /** Optional callback function called after mounting */
  onMount: PropTypes.func,
};

export default ClientOnly;
