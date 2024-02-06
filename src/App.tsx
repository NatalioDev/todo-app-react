import "./App.css";
import Header from "./components/Header/Header";
import TodoContainer from "./components/Todo/TodoContainer/TodoContainer";
import TodoInput from "./components/Todo/Todoinput/TodoInput";
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
