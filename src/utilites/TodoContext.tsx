import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';

// Definición de tipos
export interface Todo {
  text: string;
  completed: boolean;
  id: string;
}

type FilterOptions = 'All' | 'Completed' | 'Active';

export interface TodoContextProps {
  todos: Todo[];
  filter: FilterOptions;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (item: Todo) => void;
  setCompleted: (item: string) => void;
  clearTodo: (item: string) => void;
  clearCompleted: () => void;
  handleFilter: (item: FilterOptions) => void;
}

const todoContext = createContext<TodoContextProps | undefined>(undefined);

const getTodoList = (): Todo[] => {
  const todoList = localStorage.getItem('todo-list');
  return todoList ? JSON.parse(todoList) : [];
};

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(getTodoList);
  const [filter, setFilter] = useState<FilterOptions>('All');

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (item: Todo) => {
    const isDuplicate = todos.some((todo) => todo.text === item.text);
    if (!isDuplicate) {
      setTodos([item, ...todos]);
    }
  };

  const clearTodo = (item: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.text !== item));
  };

  const setCompleted = (item: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.text === item) {
          todo.completed = !todo.completed;
        }
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
