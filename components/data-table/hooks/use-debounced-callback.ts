import * as React from "react";

// Source: https://github.com/sadmann7/tablecn/blob/2d74ac5827aa7abf60e334759e38cf7cdcb24d54/src/hooks/use-debounced-callback.ts
// Upstream: sadmann7/tablecn@2d74ac5827aa7abf60e334759e38cf7cdcb24d54
// Copied: 2026-11-04
// Licence: MIT (see THIRD_PARTY.md)

export function useDebouncedCallback<T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number,
) {
  const callbackRef = React.useRef(callback);
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const debounceTimerRef = React.useRef(0);

  React.useEffect(
    () => () => window.clearTimeout(debounceTimerRef.current),
    [],
  );

  return React.useMemo(() => {
    function cancel() {
      window.clearTimeout(debounceTimerRef.current);
    }

    function debounced(...args: Parameters<T>) {
      cancel();
      debounceTimerRef.current = window.setTimeout(
        () => callbackRef.current(...args),
        delay,
      );
    }

    debounced.cancel = cancel;
    return debounced;
  }, [delay]);
}
