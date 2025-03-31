import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const match = window.matchMedia(query);
    setValue(match.matches);

    match.addEventListener("change", onChange);
    return () => {
      match.removeEventListener("change", onChange);
    };
  }, [query]);

  return value;
}