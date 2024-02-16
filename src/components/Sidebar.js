import React, { useState } from "react";
import Icon from "./Icon";
export default function Sidebar({ onMove,onDrop,onleftRotate,onRightRotate,handleSayHello  }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [showHello, setShowHello] = useState(false);

 
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragStart = (item, rotationDirection) => (event) => {
    const id = `${item.type}-${Date.now()}`;
    const item_Id = { ...item, id: id, rotationDirection };
    const jsonString = JSON.stringify(item_Id);
    event.dataTransfer.setData("application/json", jsonString);
    setDraggedItem(item_Id);
    event.target.classList.add("dragged-item");
    // console.log("Dragged item:", item_Id);
  };

  const handleMove = (steps) => {
       onMove(steps);
  };

  const handleLeftRotate = () => {
      onleftRotate && onleftRotate(15);
  };

  const handleRightRotate = () => {
      onRightRotate && onRightRotate(-15);
  };
  // handleSayHello = () =>{
  //   setShowHello(true);

  //   // Wait for 2 seconds and then hide the message
  //   setTimeout(() => {
  //     setShowHello(false);
  //   }, 2000);
  // }
 
  

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer" style={{ borderRadius: '10px' }}>
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer" style={{ borderRadius: '10px' }} >
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
<div
        draggable
        onDragStart={(event) => handleDragStart({ type: 'MOVE', steps: 10 })(event)}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        style={{ borderRadius: '10px' }}
        onClick={() => handleMove(10)}
      >
 {"Move 10 steps"}
 </div> 

<div
  className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
  style={{ borderRadius: '10px' }}
  onDragStart={(event) => handleDragStart({ type: 'TURN', degrees: 15 }, 'clockwise')(event)}
  onClick={handleLeftRotate}
>
  {"Turn "}
  <Icon name="redo" size={15} className="text-white mx-2" />
  {"15 degrees"}
</div>

<div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        style={{ borderRadius: '10px' }}
        onDragStart={handleDragStart({ type: 'TURN', degrees: -15 }, 'anticlockwise')}
        onClick={handleRightRotate}
      >
  {"Turn "}
  <Icon name="undo" size={15} className="text-white mx-2" />
  {"15 degrees"}
</div>
<div className="font-bold"> {"Looks"} </div>
      <div 
       draggable
       onDragStart={handleDragStart({ type: 'SAY', text: 'Hello' })}
       className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer" 
       style={{ borderRadius: '10px' }}
      onClick={()=>handleSayHello('Hello')}
    >
        {"Say Hello for 2 seconds "}
      </div>
      <div
       draggable
       onDragStart={handleDragStart({ type: 'SAY', text: 'Hmm' })}
       className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer" 
       style={{ borderRadius: '10px' }}
      onClick={()=>handleSayHello('Hmm')}
    >
        {"Say Hmm for 2 seconds "}
       
      </div>

    </div>
    
  );
}
