import { useEffect, type RefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
  targetRef: RefObject<T>,
  handler: (event?: MouseEvent) => void,
  active: boolean = true,
  excludeRefs: RefObject<HTMLElement>[] = [],
) => {
  useEffect(() => {
    if (!active) return;

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      const element = targetRef.current;
      if (!element || !target) return;

      const isInsideTarget = element.contains(target);
      const isInsideExcluded = excludeRefs.some((ref) => ref.current?.contains(target));

      if (isInsideTarget || isInsideExcluded) return;
      handler(event);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [targetRef, handler, active, excludeRefs]);
};
