import React from "react";
import ReactDOM from "react-dom";

export const App: React.FC = () => <p>Hello from Client</p>;

if (typeof document !== "undefined") {
  ReactDOM.render(<App />, document.getElementById("root"));
}
