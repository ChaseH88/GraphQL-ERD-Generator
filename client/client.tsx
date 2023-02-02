import React from "react";
import ReactDOM from "react-dom";

// Components
import { Form } from "./components/Form";

export const App: React.FC = () => (
  <>
    <Form />
  </>
);

if (typeof document !== "undefined") {
  ReactDOM.render(<App />, document.getElementById("root"));
}
