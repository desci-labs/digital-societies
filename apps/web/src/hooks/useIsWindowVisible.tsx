import { useCallback, useEffect, useState } from "react";

function isVisibilitySupported() {
  return "visibilityState" in document;
}

function isWindowVisible() {
  return !isVisibilitySupported() || document.visibilityState !== "hidden";
}

export default function useIsWindowVisible() {
  const [visible, setVisibility] = useState(false);

  const listener = useCallback(() => {
    setVisibility(isWindowVisible());
  }, [setVisibility]);

  useEffect(() => {
    if (!isVisibilitySupported()) return;
    setVisibility(() => isWindowVisible());
    document.addEventListener("visibilitychange", listener);
  }, [listener]);

  return visible;
}
