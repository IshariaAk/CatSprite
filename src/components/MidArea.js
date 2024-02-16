
import React, { useState } from "react";
import Icon from "./Icon";


export default function MidArea({ onDrop, onDragOver,onMove,onleftRotate,onRightRotate,handleSayHello }) {
  const [droppedItems, setDroppedItems] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [rotationRight, setRotationRight] = useState(0);

  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
 
  const handleRotate1 = () => {
    setRotation((prevRotation) => prevRotation + 15);
  };
  const handleRightRotate=()=>{
    setRotationRight((prevRotation)=>prevRotation-15)
  }


const style = {
      border: "1px solid #ccc",
      margin: "5px",
      padding: "10px",
    };
    const handleDrop = (event) => {
      event.preventDefault();
      const droppedItem = JSON.parse(event.dataTransfer.getData('application/json'));
    
      if (droppedItem.type === 'TURN') {
        const degrees = droppedItem.degrees;
        const rotationDirection = droppedItem.rotationDirection;
        if (rotationDirection === 'clockwise') {
          setRotation((prevRotation) => prevRotation + degrees);
        } else if (rotationDirection === 'anticlockwise') {
          setRotationRight((prevRotation) => prevRotation - degrees);
        }
      }
     
    
      setDroppedItems((prevItems) => [...prevItems, droppedItem]);
      onDrop && onDrop(droppedItem);
    };
    
    const handlePlay = () => {
      droppedItems.forEach((item) => {
        if (item.type === 'MOVE') {
          // console.log(`Move ${item.steps} steps`);
          onMove(item.steps)
        } 
        else if (item.type === 'TURN' && item.rotationDirection == 'clockwise') {
          onleftRotate()
          // handleRotate(item.degrees)
        }
        else if (item.type === 'TURN' && item.rotationDirection == 'anticlockwise') {
          onRightRotate()
        }
        else if (item.type === 'SAY') {
          handleSayHello(item.text)
          // handleRotate(item.degrees)
        }
        
      });
    };
   const handleDragOver = (event) => {
      event.preventDefault();
    };
   
  return (

    <div className="flex-1 h-full overflow-auto" onDrop={handleDrop} onDragOver={handleDragOver}>
    {droppedItems.map((item) => (
        <div className={`flex flex-row flex-wrap text-white px-2 py-1 my-2 text-sm cursor-pointer 
        ${item.type === 'SAY' ? 'bg-yellow-500' : 'bg-blue-500'}`}
        style={{ borderRadius: '8px' }} key={item.id}>
     
         {item.type == 'SAY'? 'Say '+item.text+' for 2 seconds' : item.type} - 
        {item.type === 'TURN' && (
          <div className="flex">
            {item.rotationDirection === 'clockwise' && (
              <Icon name="undo" size={15} className="text-white mx-2" />
            )}
            {item.rotationDirection === 'anticlockwise' && (
              <Icon name="redo" size={15} className="text-white mx-2" />
            )}
            {item.degrees && (
              <span>{item.degrees} degrees</span>
            )}
          </div>
        )}
        {item.steps && (
          <span>{item.steps} steps</span>
        )}
       
      </div>
    ))}
      <button onClick={handlePlay}> <Icon name="flag" size={15} className="text-green-600 mx-2" /></button>
  </div>
);

 
}

