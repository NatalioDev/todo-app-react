import { useContext, useState, ChangeEvent, FormEvent } from "react";
import {v4 as uuidv4 } from "uuid";
import "./TodoInput.css"
import todoContext, { TodoType, TodoContextProps } from "../../../utilites/TodoContext";

export default function TodoInput() {
    const [text, setText] = useState<string>("");
    const { addTodo } = useContext(todoContext) as TodoContextProps;

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (text.trim() !== "") {
            const newTodo: TodoType = {
                id: uuidv4(),
                completed: false,
                text,
            };
            addTodo(newTodo);
            setText("");
        }
    };

    return (
    <>
    <div className="todo-input-wrapper">
        <form onClick={handleSubmit}>
            <div className="todo-input">
                <button className="add-btn">Add</button>
                <input 
                    type="text" 
                    placeholder='Create a new Todo'
                    value={text}
                    onChange={handleChange}
                />
            </div>
        </form>
    </div>
    </>
  )
}
