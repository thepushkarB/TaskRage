import { useEffect, useState } from "react";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { TodoProvider } from "./contexts";

function App() {
  // let todos = [
  //   "Hit the gym",
  //   "Pick up veges on the way to home",
  //   "Check emails",
  // ]
  
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState("");

  //? setting up local storage
  const saveData = (neoTodos) => {
    // localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('todos', JSON.stringify({todos: neoTodos}));
  }
  

  const handleAddTodo = (newTodo) => {
    const newTodoList = [...todos, newTodo]; // Add/append the new todo to the array
    saveData(newTodoList); // Store updated todos in localStorage
    setTodos(newTodoList); // Update state to reflect the change in UI.
  }

  const handleDeleteTodo = (delIndex) => {
    //* Method i:
    // Create a new array excluding the todo at `indexToDelete`
    // const newTodoList = todos.filter((todo, currentIndex) => {
    //   // Keep only the todos where the current index is NOT equal to the index to delete
    //   return currentIndex !== delIndex;
    // });

    //* Method ii:
    const newTodoList = [];
    for (let i = 0; i < todos.length; i++) {
        if (i !== delIndex) {
            newTodoList.push(todos[i]); // Add todo to new array if it's not the one to delete
        }
    }

    saveData(newTodoList); // Update localStorag
    setTodos(newTodoList); // Update UI
  }

  const handleEditTodo = (newTodo, index) => {
    const updatedTodos = todos.map((todo, i) => i === index ? newTodo : todo); // replace the todo at matched index with newTodo.
    saveData(updatedTodos); // Update localStorag
    setTodos(updatedTodos); // Update UI
  }

  useEffect(() => {
    // If localStorage is unavailable, exit function
    if(!localStorage) {
      return;
    }

    // Retrieve data
    let localTodos = localStorage.getItem('todos');
    // If no todos are stored, exit function
    if(!localTodos) {
      //? If localStorage is empty, todos is set to [] instead of undefined - prevents from crashing map()
      setTodos([])
      return;
    }

    // localTodos = JSON.parse(localTodos).todos;
    // // localTodos = JSON.parse(localTodos);
    // setTodos(localTodos); // Update UI
    try {
      // parse data to JSON so that it is easy to work with
      localTodos = JSON.parse(localTodos);

      // check if the `todos` in `localTodos` obj is an arr
      if(Array.isArray(localTodos.todos)) {
        setTodos(localTodos.todos);
      }
      else {
        // else set an empty arr
        setTodos([]);
      }
    }
    catch(err) {
      console.log("xud gaye guru! \n Error parsing todos from localStorage: ", err);
      // if JSON broken/not an arr, reset to an empty arr
      setTodos([]);
    }

    //? since dependecy arr dependency arr is empty, this will run whenever page relaods
  }, []);

  return (
    <TodoProvider value={{todos, setTodos, handleAddTodo, handleDeleteTodo, handleEditTodo, editedTodo, setEditedTodo }}>
      <h1 className="heading">Todo List</h1>
      <TodoInput/>
      <TodoList />
    </TodoProvider>
  )
}

export default App
