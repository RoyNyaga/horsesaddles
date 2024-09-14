import React from 'react'
import { LuArrowLeftSquare } from "react-icons/lu";

function BackButton() {
  return (
    <button style={{ fontSize: "2em" }}onClick={()=>{ window.history.back() }}>
      <LuArrowLeftSquare />
    </button>
  )
}

export default BackButton;
