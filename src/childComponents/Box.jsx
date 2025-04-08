import React, { Children, useState } from "react";
import MovieList from "./MovieList";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box scrollbar-hide">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Box;
