import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';

// Definición de tipos
export interface TodoType {
  text: string;
  completed: boolean;
  id: string;
}

export type FilterOptions = 'All' | 'Completed' | 'Active';

export interface TodoContextProps {
  todos: TodoType[];
  filter: FilterOptions;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  addTodo: (item: TodoType) => void;
  setCompleted: (item: string) => void;
  clearTodo: (item: string) => void;
  clearCompleted: () => void;
  handleFilter: (item: FilterOptions) => void;
}

const todoContext = createContext<TodoContextProps | undefined>(undefined);

const getTodoList = (): TodoType[] => {
  const todoList = localStorage.getItem('todo-list');
  return todoList ? JSON.parse(todoList) : [];
};

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>(getTodoList);
  const [filter, setFilter] = useState<FilterOptions>('All');

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (item: TodoType) => {
    const isDuplicate = todos.some((todo) => todo.text === item.text);
    if (!isDuplicate) {
      setTodos([item, ...todos]);
    }
  };

  const clearTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const setCompleted = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        console.log(todo)
        return todo;
        
      })
    );
  };

  const clearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !todo.completed)
    );
  };

  const handleFilter = (item: FilterOptions) => {
    setFilter(item);
  };

  const contextValue: TodoContextProps = {
    todos,
    filter,
    setTodos,
    addTodo,
    setCompleted,
    clearTodo,
    clearCompleted,
    handleFilter,
  };

  return (
    <todoContext.Provider value={contextValue}>
      {children}
    </todoContext.Provider>
  );
};

export default todoContext;
