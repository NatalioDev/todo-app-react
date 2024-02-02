import { useState } from "react";
// import { ReactComponent as IconSun} from ".svg"
import IconSun from "../../assets/images/icon-sun.svg?react";
import IconMoon from "../../assets/images/icon-moon.svg?react";
// Estyles
import "./Header.css"

export default function Header() {
  const [theme, setTheme] = useState(false);

  return (
    <div>
      <h1>Todo</h1>
      <button className="button-header" onClick={() => setTheme(!theme)}>
        {theme ? (
          <img src={IconMoon}alt="Moon Icon" />
        ) : (
          <img src={IconSun} alt="Sun Icon" />
        )}
      </button>
    </div>
  );
}
