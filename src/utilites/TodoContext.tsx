// Importa los modulos y hooks de react
import React, { createContext, useState, useEffect, FC, ReactNode } from 'react';

// Definición de tipos para un todo
export interface TodoType {
  text: string;
  completed: boolean;
  id: string;
}

// Definición de tipos para las opciones de filtro
export type FilterOptions = 'All' | 'Completed' | 'Active';

// Definición de los props del contexto del todo
export interface TodoContextProps {
  todos: TodoType[]; // Lista de todos
  filter: FilterOptions; // Opción de filtro seleccionada
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>; // Función para establecer la lista de todos
  addTodo: (item: TodoType) => void; // Función para agregar un nuevo todo
  setCompleted: (item: string) => void; // Función para marcar un todo como completado
  clearTodo: (item: string) => void; // Función para eliminar un todo
  clearCompleted: () => void; // Función para eliminar los todos completados
  handleFilter: (item: FilterOptions) => void; // Función para cambiar la opción de filtro
}

// Creación del contexto del todo
const todoContext = createContext<TodoContextProps | undefined>(undefined);

// Función para obtener la lista de todos desde le almacenamiento local
const getTodoList = (): TodoType[] => {
  const todoList = localStorage.getItem('todo-list');
  return todoList ? JSON.parse(todoList) : [];
};

// Proveedor de contexto para manejar los todos
export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<TodoType[]>(getTodoList); // Estado para almacenar la lista de todos
  const [filter, setFilter] = useState<FilterOptions>('All'); // Estado para almacenar la opción de filtro seleccionada

  // Efecto para guardar la lista de todos en el almacenamiento local cuando cambia
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todos));
  }, [todos]);

  // Función para agregar un nuevo todo a la lista
  const addTodo = (item: TodoType) => {
    const isDuplicate = todos.some((todo) => todo.text === item.text);
    if (!isDuplicate) {
      setTodos([item, ...todos]);
    }
  };

  // Función para eliminar un todo de la lista
  const clearTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Función para marcar un todo como completado o no completado
  const setCompleted = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
        
      })
    );
  };

  // Función para eliminar todos los todos completados
  const clearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !todo.completed)
    );
  };

  // Función para cambiar la opción de filtro
  const handleFilter = (item: FilterOptions) => {
    setFilter(item);
  };

  // Valor del contexto
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

  // Proveedor de contexto que proporciona el contexto a los componentes hijos
  return (
    <todoContext.Provider value={contextValue}>
      {children}
    </todoContext.Provider>
  );
};

export default todoContext;
