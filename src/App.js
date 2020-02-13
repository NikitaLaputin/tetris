import React from "react";
import Game from "./components/game";
import { Provider } from "react-redux";
import store from "./redux/store";
import Version from "./components/version";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Game />
      <Version />
    </Provider>
  );
}

export default App;
