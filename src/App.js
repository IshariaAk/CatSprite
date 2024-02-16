import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";


export default function App() {
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [droppedItem, setDroppedItem] = useState(null);
  const [rotation,setRotation]=useState(0)
  const [rotationRight,setRotationRight]=useState(0)
  const [showHello,setShowHello] = useState(false)
  const [showMessage,setShowMessage] = useState('')

 
  const handleMove = (steps) => {
    setCatPosition((prevPosition) => ({  x: prevPosition.x + steps }));
  };
  const handleRotate = () => {
    setRotation((prevRotation) => prevRotation + 15);
  };
  const handleRightRotate=()=>{
    setRotationRight((prevRotation)=>prevRotation-15)
  }
 
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (droppedItem) => {
    setDroppedItem(droppedItem);
  };
 function  handleSayHello(message) {
    setShowHello(true);
    setShowMessage(message)
    setTimeout(() => {
      setShowHello(false);
      setShowMessage('')
    }, 2000);
  }
  
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar onMove={handleMove} onleftRotate={handleRotate} onRightRotate={handleRightRotate} handleSayHello={handleSayHello} showHello={showHello} setShowHello={setShowHello} />
    <MidArea onDrop={handleDrop} onDragOver={handleDragOver} onMove={handleMove} onleftRotate={handleRotate}
     onRightRotate={handleRightRotate} handleSayHello={handleSayHello}   />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          {/* <PreviewArea  onMove={handleMove}  onleftRotate={handleRotate} onRightRotate={handleRightRotate} /> */}
          <PreviewArea  onMove={catPosition}  onleftRotate={rotation} onRightRotate={rotationRight}
            handleSayHello={handleSayHello} showHello={showHello} setShowHello={setShowHello} message= {showMessage} />
        </div>
      </div>
    </div>
  );
}
