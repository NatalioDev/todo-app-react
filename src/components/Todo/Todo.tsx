import { useContext } from "react";
import todoContext, { TodoContextProps } from "../../utilites/TodoContext";
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import "./Todo.css"

interface TodoProps {
  todoText: string;
  completed: boolean;
  index: number;
  id: string;
}

export default function Todo({ todoText, completed, index, id }: TodoProps) {
  // Utiliza la interfaz TodoContextProps para asegurar la tipificación correcta
  const { setCompleted, clearTodo } = useContext(todoContext) as TodoContextProps;

  // Maneja el clic en el círculo para cambiar el estado completado de la tarea
  const handleClick = () => {
    setCompleted(id);
    console.log(id)
  };

  // Maneja el clic en el icono de la cruz para eliminar la tarea
  const handleDelete = () => {
    clearTodo(id);
  };

  return (
    // Componente arrastrable usando Draggable de react-beautiful-dnd
    <Draggable key={id} draggableId={id} index={index}>
      {(provided: DraggableProvided) => (
        // Renderiza la tarea como un elemento arrastrable
        <div
          className={`todo${completed ? " completed" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-index={index}
        >
          {/* Círculo para indicar el estado de completado */}
          <div className={`circle${completed ? " circle-gradient" : ""}`} onClick={handleClick}></div>
          
          {/* Texto de la tarea */}
          <p className="todo-text">{todoText}</p>
          
          {/* Icono de la cruz para eliminar la tarea */}
          <img src="icon/icon-cross.svg" alt="cross" onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
}
