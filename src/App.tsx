// Importa los estilos
import "./App.css";
// Importa el componete Header
import Header from "./components/Header/Header";
// Importa el componente TodoContainer
import TodoContainer from "./components/Todo/TodoContainer/TodoContainer";
// Importa el componente TodoInput
import TodoInput from "./components/Todo/Todoinput/TodoInput";
// Importa el proveedor de contexto de nuestros todos
import { TodoProvider } from "./utilites/TodoContext";

function App() {
  return (
    <main>
      <Header/>
      <div className="container">
        <TodoProvider>
          <TodoInput/>
          <TodoContainer/>
        </TodoProvider>
      </div>
    </main>
  )
}

export default App
