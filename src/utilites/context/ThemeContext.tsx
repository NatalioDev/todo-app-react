import { createContext, useState } from "react";

// Definimos los theme
const darkTheme: Theme = {name: "dark"};
const lightTheme: Theme = {name: "light"}

// Definimos el tipo
type Theme = { name: string};

// Creamos el contexto
export const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }> ({
    theme: darkTheme || lightTheme,
    toggleTheme: () => {},
});

// Proveedor de contexto para gestionar el tema
export const ThemeContextProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = JSON.parse(localStorage.getItem("theme") || "null");
        return savedTheme || darkTheme || lightTheme;
    });

     // Función para cambiar entre temas
    const toggleTheme = () => {
        const newTheme = theme.name === "dark" ? lightTheme : darkTheme;
        setTheme(newTheme);
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
