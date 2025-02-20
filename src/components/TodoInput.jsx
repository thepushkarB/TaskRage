import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts";

export function TodoInput() {
    const { handleAddTodo } = useContext(TodoContext);
    const [todoVal, setTodoVal] = useState("");
    return (
        <header>
            <input type="text" placeholder="Enter todo..." value={todoVal} onChange={(e) => {setTodoVal(e.target.value)}}/>
            <button onClick={() => {
                handleAddTodo(todoVal);
                setTodoVal("");
            }} >Add</button>
        </header>
    )
}