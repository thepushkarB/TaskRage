import React, { useContext } from "react";
import { TodoCard } from "./TodoCard";

export function TodoList() {

    return(
        <>
            <ul className="main">
                <TodoCard />
            </ul>
        </>
    )
}