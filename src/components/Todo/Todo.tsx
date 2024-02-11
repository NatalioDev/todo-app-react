// Importa el hook del contexto de react
import { useContext } from "react";
//Importa el contexto de nuestros todos
import todoContext, { TodoContextProps } from "../../utilites/TodoContext";
// Importa el modulo para arrastrar y soltar nuestros todos
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
// Importa los estilos
import "./Todo.css"
// Importa el contexto de nuestro Theme
import { useTheme } from "../../utilites/context/UseTheme";

// Declaramos los tipos necesarios para los props que le pasamos al componente
interface TodoProps {
  todoText: string;
  completed: boolean;
  index: number;
  id: string;
}

export default function Todo({ todoText, completed, index, id }: TodoProps) {
  // Utiliza la interfaz TodoContextProps para asegurar la tipificación correcta
  const { setCompleted, clearTodo } = useContext(todoContext) as TodoContextProps;

  // Obtiene el contexto del Theme
  const { theme } = useTheme();


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
        // Renderiza la tarea como un elemento arrastrable, con una clase condicional para cambiar los estilos según el tema y cambiar los estilos si un todo esta completado
        <div
          className={`todo${completed ? " completed" : ""} ${theme.name === "dark" ? "todo-dark" : "todo-light"}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          data-index={index}
        >
          {/* Círculo para indicar el estado de completado */}
          <div className={`circle${completed ? " circle-gradient" : ""}`} onClick={handleClick}></div>
          
          {/* Texto de la tarea, con una clase condicional para cambiar los estilos según el tema */}
          <p className={`todo-text${theme.name === "dark" ? "text-dark" : "text-light"}`}>{todoText}</p>
          
          {/* Icono de la cruz para eliminar la tarea */}
          <img src="icon/icon-cross.svg" alt="cross" onClick={handleDelete} />
        </div>
      )}
    </Draggable>
  );
}
