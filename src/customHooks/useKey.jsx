import React, { useEffect } from "react";

function useKey(key, actions) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          actions();
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [actions, key]
  );
}

export default useKey;
