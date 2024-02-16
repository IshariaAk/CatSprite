import React, { useEffect, useState } from "react";
import CatSprite from "./CatSprite";

export default function PreviewArea({ onMove,onleftRotate ,onRightRotate,setShowHello,handleSayHello,showHello,message }) {
  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [rotationRight, setRotationRight] = useState(0);

  useEffect(() => {
    setRotation((prevRotation) => prevRotation + onleftRotate);
},[onleftRotate])
 
useEffect(() => {
  setRotationRight((prevRotation) => prevRotation + onRightRotate);
},[onRightRotate])

  useEffect(() => {
    setCatPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 10 }));
  }, [onMove]);
  // useEffect(() => {
  //   setCatPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + onMove }));
  // }, [onMove]);
 

  return (
    <div className="flex-none h-full p-4 ">
      <CatSprite key={catPosition.x} position={onMove} rotation={rotation} rotationRight={rotationRight} handleSayHello={handleSayHello} showHello={showHello} setShowHello={setShowHello} message={message}/>

    </div>
  );
}
