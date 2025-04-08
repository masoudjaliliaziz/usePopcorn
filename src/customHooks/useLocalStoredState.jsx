import React, { useEffect, useState } from "react";

function useLocalStoredState(initialState, key) {
  const [value, setValue] = useState(() => {
    const whatcedLocal = localStorage.getItem(key);
    return whatcedLocal ? JSON.parse(whatcedLocal) : initialState;
  });
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );
  return [value, setValue];
}

export default useLocalStoredState;
