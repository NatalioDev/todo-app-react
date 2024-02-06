import { useContext } from "react"
import todoContext, { TodoContextProps, TodoType } from "../../../utilites/TodoContext"
import Filter from "../Filter/Filter";
import "./TodoStats.css"



export default function TodoStats() {

    const {todos, clearCompleted, handleFilter} = useContext(todoContext) as TodoContextProps;

    const countCompletedTodos = (todos: TodoType[]): number =>{
        return todos.filter(todo => todo.completed).length
    };

    const countRemainingTodos = (todos: TodoType[]): number => {
        return todos.length - countCompletedTodos(todos);
    }


    return (
        <div className="stats-todo">
            <div className="left-todo-stats">
                {countRemainingTodos(todos)} items left
            </div>
            <Filter
                setFilter={handleFilter}
            />
            {countCompletedTodos(todos) > 0 && (
                <div className="clear-completed" onClick={clearCompleted}>
                    Clear Completed
                </div>
            )}
        </div>
  )
}
