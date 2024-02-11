// Importa los hooks de react
import { FC, ReactNode, createContext, useState } from "react";

// Definimos los temas oscuro y claro
const darkTheme: Theme = {name: "dark"};
const lightTheme: Theme = {name: "light"}

// Definición de los tipos para los temas
type Theme = { name: string};

// Definición del tipo para el contexto del tema
type ThemeContextType = {
    theme: Theme; // El tema actual
    toggleTheme: () => void; // Función para cambiar entre temas
  };
  

// Creamos el contexto del tema
export const ThemeContext = createContext<ThemeContextType> ({
    theme: darkTheme, // Tema predeterminado: oscuro
    toggleTheme: () => {}, // Función vacía por defecto
});

// Proveedor de contexto para gestionar el tema
export const ThemeContextProvider : FC<{ children: ReactNode }> = ({ children }) => {
    // Estado para el tema actual y la función para cambiarlo
    const [theme, setTheme] = useState(() => {
        // Obtenemos el tema almacenado en el localStorage o usamos el tema oscuro por defecto
        const savedTheme = JSON.parse(localStorage.getItem("theme") || "null");
        return savedTheme || {name: "dark"};
    });

     // Función para cambiar entre temas
    const toggleTheme = () => {
        // Determinamos el nuevo tema basado en el tema actual
        const newTheme = theme.name === "dark" ? lightTheme : darkTheme;
        // Actualizamos el estado del tema
        setTheme(newTheme);
        // Añadimos o quitamos clases del body según el nuevo tema
        document.body.classList.toggle('dark-mode', newTheme.name === "dark");
        document.body.classList.toggle('light-mode', newTheme.name === "light");
    };

    // Valor que se pasa al contexto, incluyendo el tema y la función para cambiarlo
    const value = {
        theme,
        toggleTheme,
    };

    // Proveer el valor del contexto a los componentes hijos
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
};
