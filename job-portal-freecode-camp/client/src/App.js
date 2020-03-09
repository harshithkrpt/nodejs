import React from "react";
import Jobs from "./Jobs";
import "./App.css";

function App() {
  const mockJOBS = [{ title: "Hello", id: 1, company: "Google" }];
  return (
    <div className="App">
      <Jobs jobs={mockJOBS} />
    </div>
  );
}

export default App;
