import React, { useContext } from "react";
import todoContext, { FilterOptions, TodoContextProps } from "../../../utilites/TodoContext";
import "./Filter.css"

interface FilterProps {
  setFilter: (filter: FilterOptions) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilter }) => {
  const { filter, handleFilter } = useContext(todoContext) as TodoContextProps;

  const handleClick = (filterValue: FilterOptions) => {
    handleFilter(filterValue);
    setFilter(filterValue);
  };
  

  return (
    <div className="filter-todo">
      <p
        className={filter === "All" ? "active" : ""}
        onClick={() => handleClick("All")}
      >
        All
      </p>
      <p
        className={filter === "Active" ? "active" : ""}
        onClick={() => handleClick("Active")}
      >
        Active
      </p>
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
