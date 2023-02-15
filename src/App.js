import React from "react";
import Main from "./components/Main";
import Home from "./components/Home";
import { Route, Routes } from 'react-router-dom';

function App() {
    const DATA = [
        { id: "todo-0", name: "Eat", completed: true },
        { id: "todo-1", name: "Sleep", completed: false },
        { id: "todo-2", name: "Repeat", completed: false }
    ];

    return (
        <div className="todoapp stack-large">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/to-do-list" element={<Main tasks={DATA} />}  />
            </Routes>
        </div>
    );
}

export default App;