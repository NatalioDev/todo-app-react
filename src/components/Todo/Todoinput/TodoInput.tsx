// Importa los modulos y hooks necesarios de react
import { useContext, useState, ChangeEvent, FormEvent } from "react";

// Importa la biblioteca uuid para los id
import {v4 as uuidv4 } from "uuid";

// Importa los estilos
import "./TodoInput.css"

// Importa el contexto de los todo y los tipos necesarios
import todoContext, { TodoType, TodoContextProps } from "../../../utilites/TodoContext";

// Importa el contexto del Theme
import { useTheme } from "../../../utilites/context/UseTheme";

// Componente Input
export default function TodoInput() {
    
    // Obtiene el estado del todo ingresado por el usuario
    const [text, setText] = useState<string>("");

    // Obtiene la funcion para agregar el nuevo todo al todoContext
    const { addTodo } = useContext(todoContext) as TodoContextProps;

    // Obtiene el contexto del Theme
    const { theme } = useTheme();

    // Función que maneja el evento cuando ingresa un nuevo todo y lo agrega al estado setText
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    // Función que envia el nuevo todo al Formulario
    const handleSubmit = (e: FormEvent) => {
        // Evita que se renderice de nuevo la pagina
        e.preventDefault();

        // MAaneja que no se repitan los todo ingresado y les agrega su respectivo id
        if (text.trim() !== "") {
            const newTodo: TodoType = {
                id: uuidv4(),
                completed: false,
                text,
            };
            // Agrega el nuevo todo
            addTodo(newTodo);
            // Reincica el input
            setText("");
        }
    };

    // Renderia el componente input
    return (
    <>
    {/* Envuelve nuestro componente input */}
    <div className="todo-input-wrapper">
        {/* Formulario para que envia nuestro nuevo todo */}
        <form onClick={handleSubmit}>
            {/* Envuleve nuestro input con una clase condicional para cambiar los estilos según el tema */}
            <div className={`${theme.name === "dark" ? "todo-input" : "todo-input light-input"}`}>
                {/* Botón para enviar el nuevo todo */}
                <button className="add-btn">Add</button>
                {/* Input con una clase condicional para cambiar los estilos según el tema */}
                <input 
                    className={`${theme.name === "dark" ? "input" : "input input-light"}`}
                    type="text" 
                    placeholder='Create a new Todo'
                    value={text}
                    onChange={handleChange}
                />
            </div>
        </form>
    </div>
    </>
)}
