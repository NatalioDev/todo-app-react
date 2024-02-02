import { useState } from "react";
// Estyles
import "./Header.css"

export default function Header() {
  const [theme, setTheme] = useState(false);

  return (
    <div>
      <h1>Todo</h1>
      <button className="button-header" onClick={() => setTheme(!theme)}>
        {theme ? (
          <img src="icon/icon-moon.svg"alt="Moon Icon" />
        ) : (
          <img src="icon/icon-sun.svg" alt="Sun Icon" />
        )}
      </button>
    </div>
  );
}
