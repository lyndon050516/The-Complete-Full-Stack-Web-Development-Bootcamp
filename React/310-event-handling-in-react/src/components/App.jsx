import React from "react";
import { useState } from "react";

function App() {
  const [name, setName] = useState("Hello");
  const [style, setStyle] = useState({backgroundColor: "white"});

  function handleClick() {
    setName("Submitted")
  }

  function handleMouseOver() {
    setStyle({backgroundColor: "black"});
  }

  function handleMouseOut() {
    setStyle({backgroundColor: "white"});
  }

  return (
    <div className="container">
      <h1>{name}</h1>
      <input type="text" placeholder="What's your name?" />
      <button style={style} onClick={handleClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Submit</button>
    </div>
  );
}

export default App;
