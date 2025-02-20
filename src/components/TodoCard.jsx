import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts";

export function TodoCard() {

    const { todos, handleDeleteTodo, handleEditTodo, editedTodo, setEditedTodo } = useContext(TodoContext);
    console.log(todos);

    //? editingIndex is initialized as -1, meaning no todo is being edited at the start.
    const [editingIndex, setEditingIndex] = useState(-1); 

    //* Check if `todos` exists and is an array before using .map()
    if (!todos || !Array.isArray(todos)) {
        // Show "Loading todos..." instead of crashing.
        return <p>Loading todos...</p>; // Show a message while data is loading
    }


    return ( 
        todos.map((todo, index) => {
            return (
                <li className="todoItem" key={index}>
                    <div className="actionsContainer">

                        { 
                            editingIndex === index ? (
                                <div className="actionsContainer">
                                    <input 
                                        type="text"
                                        value={editedTodo} // ""
                                        onChange={(e) => setEditedTodo(e.target.value)}  // new todo from i/p
                                    />
                                    {/* Save btn */}
                                    <button onClick={() => {
                                        // setEditState(false);
                                        setEditingIndex(-1);
                                        handleEditTodo(editedTodo, index);
                                    }}
                                    >
                                        <i class="fa-solid fa-floppy-disk"></i>
                                    </button>
                                    {/* Cancel btn */}
                                    <button onClick={() => {
                                        // setEditState(false);
                                        // handleEditTodo(editedTodo, index);
                                        setEditingIndex(-1);
                                    }}
                                    className="saveBtn">
                                        <i class="fa-solid fa-ban"></i>
                                    </button>
                                </div>
                            )
                             : 
                            (
                                <div  className="actionsContainer">
                                    <p>{todo}</p>
                                    {/* Edit btn */}
                                    <button onClick={() => { 
                                        setEditingIndex(index); 
                                        setEditedTodo(todo); // Initialize input with current todo text
                                        }}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                    {/* Delete btn  */}
                                    <button onClick={() => { handleDeleteTodo(index) }}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            )
                        }

                    </div>
                </li>
            )
        })
    );
}