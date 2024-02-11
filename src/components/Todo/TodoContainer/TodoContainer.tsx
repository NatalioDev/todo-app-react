// Importa los módulos necesarios de React y react-beautiful-dnd
import { useContext } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

//Styles
import "./TodoContainer.css"

// Importa el contexto y las interfaces relacionadas desde el archivo TodoContext.tsx
import todoContext, { TodoContextProps } from "../../../utilites/TodoContext";

// Importa el componente Todo utilizado en la lista de tareas
import Todo from "../Todo"; 
import TodoStats from "../TodoStats/TodoStats";

// Importa el contexto del Theme
import { useTheme } from "../../../utilites/context/UseTheme";

// Componente funcional TodoContainer
export default function TodoContainer() {

    // Obtiene las propiedades relevantes del contexto usando useContext
  const { todos, setTodos, filter } = useContext(todoContext) as TodoContextProps;

  // Obtiene el contexto del theme
  const { theme } = useTheme();

  // Filtra los todos basados en el filtro actual (All, Active, Completed)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  // Mensaje cuando no se encuentren tareas según el filtro
let noTodosMessage = "";
switch (filter) {
  case "All":
    noTodosMessage = "No se encontraron tareas.";
    break;
  case "Active":
    noTodosMessage = "No se encontraron tareas activas.";
    break;
  case "Completed":
    noTodosMessage = "No se encontraron tareas completadas.";
    break;
  default:
    noTodosMessage = "No se encontraron tareas.";
    break;
}

  // Maneja el evento cuando se arrastran y sueltan los elementos en la lista
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;  // Si no hay destino, no hay acción necesaria

    // Copia la lista de todos filtrada para no afectar a la lista original
    const updatedTodos = Array.from(todos);
    
    // Obtiene y remueve el elemento que se está reordenando de la lista
    const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
    
    // Inserta el elemento reordenado en la nueva posición
    updatedTodos.splice(result.destination.index, 0, reorderedItem);

    // Actualiza el estado con la lista reordenada
    setTodos(updatedTodos);
  } 

  // Si no hay tareas filtradas, muestra un mensaje indicando que no hay tareas
  if (todos.length === 0) {
    // Devuelve un h2 con un mensaje y con una clase condicional para cambiar los estilos según el tema 
    return <h2 className={`${theme.name === "dark" ? "h2-no-todo dark-h2-no-todo" : "h2-no-todo light-h2-no-todo"}`}>No Todos Yet! <br/> Add a new task to get started</h2>;
  }
  // Renderiza el componente
  return (
    <>
      {/* Componente para manejar el arrastrar y soltar */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Lista contenedora de tareas, identificada por "todos" */}
        {/* Lista de tareas o mensaje cuando no se encuentren */}
        {filteredTodos.length > 0 ? (
    <Droppable droppableId="todos">
      {(provided) => (
        // Renderiza la lista contenedora, proporcionando propiedades y referencias
        <div {...provided.droppableProps} ref={provided.innerRef} className="todo-container">
          
          {/* Mapea y renderiza las tareas filtradas como elementos arrastrables */}
          {filteredTodos.map((todo, index) => (
            // Pasamos los datos para que lo renderize el componente Todo
            <Todo
              key={todo.id}
              id={todo.id}
              todoText={todo.text}
              completed={todo.completed}
              index={index}
            />
          ))}
          {provided.placeholder} {/* Espacio reservado para elementos arrastrables */}
        </div>
      )}
        </Droppable>
        ):(
          // Mostramos un mensaje si cuando filtra no encuentra ningun todo, con una clase condicional para cambiar los estilos según el tema 
          <div className={`no-todos-message ${theme.name === "dark" ? "no-todos-message-dark" : "no-todos-message-light"}`}>
            <h2>{noTodosMessage}</h2>
          </div>
      )}
      </DragDropContext>
      {/* Si hay tareas filtradas, muestra un encabezado para estadísticas */}
      {todos.length > 0 && <TodoStats/>}
    </>
  );
}
