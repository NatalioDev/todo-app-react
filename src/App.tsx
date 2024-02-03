import "./App.css";
import Header from "./components/Header/Header";
import TodoInput from "./components/Todo/Todoinput/TodoInput";
import { TodoProvider } from "./utilites/TodoContext";

function App() {
  return (
    <main>
      <Header/>
      <div className="container">
        <TodoProvider>
          <TodoInput/>
        </TodoProvider>
        
      </div>
    </main>
  )
}

export default App
