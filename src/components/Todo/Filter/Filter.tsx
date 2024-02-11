// Importa el hook necesario para el contexto
import React, { useContext } from "react";

//Importa el contexto para manejar la informacion necesaria para los todos
import todoContext, { FilterOptions, TodoContextProps } from "../../../utilites/TodoContext";

// Importa los estilos
import "./Filter.css"

// Importa el contexto del Theme
import { useTheme } from "../../../utilites/context/UseTheme";

// Declaramos el tipo necesario para el setFilter
interface FilterProps {
  setFilter: (filter: FilterOptions) => void;
}

// Componente que maneja los filtros de los todos
const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  // Obtiene las propiedades relevantes del contexto usando useContext
  const { filter, handleFilter } = useContext(todoContext) as TodoContextProps;

  // Obtiene el contexto del theme
  const { theme } = useTheme();

  // Función que maneja el filter del componente
  const handleClick = (filterValue: FilterOptions) => {
    handleFilter(filterValue);
    setFilter(filterValue);
  };
  

  // Renderiza los todo filtrados
  return (
    // Envuelve nuestro componente Filter con una clase condicional para cambiar los estilos según el tema 
    <div className={`filter-todo${theme.name === "dark" ? " filter-todo-dark" : " filter-todo-light"}`}>
      {/* Filtra todos los todo */}
      <p
        className={filter === "All" ? "active" : ""}
        onClick={() => handleClick("All")}
      >
        All
      </p>
      {/* Filtra los todo activos */}
      <p
        className={filter === "Active" ? "active" : ""}
        onClick={() => handleClick("Active")}
      >
        Active
      </p>
      {/* Filtra los todo completados */}
      <p
        className={filter === "Completed" ? "active" : ""}
        onClick={() => handleClick("Completed")}
      >
        Completed
      </p>
    </div>
  );
};

export default Filter;
