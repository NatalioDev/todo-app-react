import "./Header.css";
import { useTheme } from "../../utilites/context/UseTheme";


export default function Header() {
  // Obtén el tema y la función para cambiarlo del contexto
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>Todo</h1>
      {/* Botón para cambiar entre temas */}
      <button 
        aria-pressed={theme.name === "dark"}
        className="button-header" onClick={toggleTheme}>
        {/* Muestra el icono correspondiente al tema actual */}
        {theme.name === "dark" ? (
          <img src="icon/icon-moon.svg" alt="Moon Icon" />
        ) : (
          <img src="icon/icon-sun.svg" alt="Sun Icon" />
        )}
      </button>
    </header>
  );
}