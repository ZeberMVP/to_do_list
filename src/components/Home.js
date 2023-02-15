import React from 'react';
import Nav from './Nav';

function Home() {
    return ( 
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            <Nav />
            <h2>Welcome</h2>
            <p><a href="/to-do-list">Start</a></p>
        </div>
    )
}

export default Home;
