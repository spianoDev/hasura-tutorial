import React, { useState } from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from 'graphql-tag';
// instead of a query, we are going to use a subscription


import Pixel from "./Pixel";
import ColorPicker from "./ColorPicker";

const pixels = new Array(400).fill("white");
const GET_PIXELS = gql`
subscription GetPixels {
  pixels(order_by: {id: asc}) {
    color
    id
  }
}
`;
function App() {
  const [color, changeColor] = useState("white");
  const {loading, error, data} = useSubscription(GET_PIXELS);

  if (loading) {
      return <div>Loading...</div>
  }
  return (
    <div className="content">
      <div className="logo">Draw</div>
      <p>Pick a Color</p>
      <ColorPicker changeColor={changeColor} />
      <p>Click a Pixel</p>
      <div className="container">
        {data.pixels.map((pixel, idx) => (
          <Pixel color={pixel.color} id={pixel.id} key={pixel.id} newColor={color} />
        ))}
      </div>
    </div>
  );
}

export default App;
