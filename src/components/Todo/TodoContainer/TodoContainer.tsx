// Importa los módulos necesarios de React y react-beautiful-dnd
import { useContext } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

// Importa el contexto y las interfaces relacionadas desde el archivo TodoContext.tsx
import todoContext, { TodoContextProps } from "../../../utilites/TodoContext";

// Importa el componente Todo utilizado en la lista de tareas
import Todo from "../Todo"; 

// Componente funcional TodoContainer
export default function TodoContainer() {

    // Obtiene las propiedades relevantes del contexto usando useContext
  const { todos, setTodos, filter } = useContext(todoContext) as TodoContextProps;

  // Filtra los todos basados en el filtro actual (All, Active, Completed)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  // Maneja el evento cuando se arrastran y sueltan los elementos en la lista
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;  // Si no hay destino, no hay acción necesaria

    // Copia la lista de todos filtrada para no afectar a la lista original
    const updatedTodos = Array.from(filteredTodos);
    
    // Obtiene y remueve el elemento que se está reordenando de la lista
    const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
    
    // Inserta el elemento reordenado en la nueva posición
    updatedTodos.splice(result.destination.index, 0, reorderedItem);

    // Actualiza el estado con la lista reordenada
    setTodos(updatedTodos);
  }

  // Si no hay tareas filtradas, muestra un mensaje indicando que no hay tareas
  if (filteredTodos.length === 0) {
    return <h2 className="h2-no-todo">No Todos Yet! Add a new task to get started</h2>;
  }
  // Renderiza el componente
  return (
    <>
      {/* Componente para manejar el arrastrar y soltar */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Lista contenedora de tareas, identificada por "todos" */}
        <Droppable droppableId="todos">
          {(provided) => (
            // Renderiza la lista contenedora, proporcionando propiedades y referencias
            <div {...provided.droppableProps} ref={provided.innerRef} className="todo-container">
              {/* Mapea y renderiza las tareas filtradas como elementos arrastrables */}
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    // Renderiza una tarea como un elemento arrastrable
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {/* Renderiza el componente Todo para mostrar la tarea */}
                      <Todo
                        key={todo.id}
                        id={todo.id}
                        todoText={todo.text}
                        completed={todo.completed}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* Espacio reservado para elementos arrastrables */}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* Si hay tareas filtradas, muestra un encabezado para estadísticas */}
      {filteredTodos.length > 0 && <h1>Todos Stats</h1>}
    </>
  );
}
