import React, { memo } from "react";
import { render } from "react-dom";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  BOX: "box",
};

const style = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: ItemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={drag}
      style={{
        border: "1px dashed gray",
        backgroundColor: "white",
        padding: "0.5rem 1rem",
        marginRight: "1.5rem",
        marginBottom: "1.5rem",
        cursor: "move",
        float: "left",
        opacity,
      }}
    >
      {name}
    </div>
  );
};

const Dustbin = () => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "Dustbin" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive ? "Release to drop" : "Drag a box here"}
    </div>
  );
};

const Container = memo(function Container() {
  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <Dustbin />
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <Box name="Glass" />
        <Box name="Banana" />
        <Box name="Paper" />
      </div>
    </div>
  );
});

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
}

render(<App />, document.getElementById("root"));
