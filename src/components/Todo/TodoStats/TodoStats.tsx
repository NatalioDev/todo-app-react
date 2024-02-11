// Importa el hook useContext
import { useContext } from "react"

// Importa el contexto que maneja los todo
import todoContext, { TodoContextProps, TodoType } from "../../../utilites/TodoContext"

// Importa el componente que filtra los todo
import Filter from "../Filter/Filter";

// Importa los estilos
import "./TodoStats.css"

// Importa el contexto del Theme
import { useTheme } from "../../../utilites/context/UseTheme";


// Componente que maneja los estados de los todo
export default function TodoStats() {

    // Obtiene las funciones necesarias desde el contexto todoContext
    const {todos, clearCompleted, handleFilter} = useContext(todoContext) as TodoContextProps;

    // Obtiene el contexto del Theme
    const { theme } = useTheme();

    // Función para contar los todos completados
    const countCompletedTodos = (todos: TodoType[]): number =>{
        // Filtra los todos completados y devuelve su longitud
        return todos.filter(todo => todo.completed).length
    };

     // Función para contar los todos restantes
    const countRemainingTodos = (todos: TodoType[]): number => {
        // Calcula la diferencia entre todos los todos y los completados
        return todos.length - countCompletedTodos(todos);
    }

    // Renderiza nuestro componente
    return (
        // Envuelve nuestro componente con una clase condicional para cambiar los estilos según el tema
        <div className={`stats-todo${theme.name === "dark" ? " stats-todo-dark" : " stats-todo-light"}`}>
            {/* Muestra la cantidad de todos restantes */}
            <div className="left-todo-stats">
                {/* Utiliza la función countRemainingTodos para mostrar el número de todos restantes */}
                {countRemainingTodos(todos)}
                items left
            </div>
            {/* Renderiza el componente Filter y le pasa la función de filtro del contexto */}
            <Filter
                setFilter={handleFilter}
            />
            {/* Renderiza el botón "Clear Completed" solo si hay todos completados */}
            {countCompletedTodos(todos) > 0 && (
                <div className="clear-completed" onClick={clearCompleted}>
                    Clear Completed
                </div>
            )}
        </div>
  )
}
