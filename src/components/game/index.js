import React from "react";
import Field from "../field";
import Info from "../info";

export default function Game() {
  return (
    <div className="tetris-container">
      <Field />
      <Info />
    </div>
  );
}
