import React from "react";

export default function useClickOutside(
  elRef: React.MutableRefObject<any>,
  callback: () => void
) {
  const callbackRef = React.useRef() as React.MutableRefObject<any>;
  callbackRef.current = callback;

  React.useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!elRef?.current?.contains(e.target) && callback) {
        callbackRef.current(e);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elRef, callbackRef]); // eslint-disable-line
}
