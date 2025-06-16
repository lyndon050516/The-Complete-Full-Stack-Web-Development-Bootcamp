import React from "react";
import { useState } from "react";



function App() {
  const [items, setItems] = useState(["A Item"]);
  const [newItem, setNewItem] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setNewItem(newValue);
  }

  function handleClick() {
    setItems([...items, newItem]);
    setNewItem("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleChange} value={newItem}/>
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
