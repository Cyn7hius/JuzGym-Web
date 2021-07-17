import React from "react";
import left from '../data/left.gif'; 
import right from '../data/right.gif'; 

export default function CommonTips() {
  return (
    <div>
      <h1> Welcome to Dillon's Steam Profile!</h1>
      <img src={left} alt="IMAGE LEFT"/>
      <img src={right} alt="IMAGE RIGHT"/>
    </div>
  );
}
