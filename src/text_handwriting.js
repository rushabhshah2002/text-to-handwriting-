import React, { useState, useRef, useEffect } from "react";
import "./text_handwriting.scss";
import domtoimage from "dom-to-image";
import lines from "./images/temp.png";
import dec from "./images/deco.jpeg"
const Text_handwritnig = () => {
  const [count, setCount] = useState("");
  const data = useRef();
  const click = () => {
    console.log(1213);

    if (!data.current) {
      return;
    }
    domtoimage
      .toPng(data.current)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        console.log(img.src);
        document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <div className="">
        <div className="selector">
            <img src={lines} alt="" height="100px" width="100px" onClick={()=>{
                setCount(lines)
            }} />

            <img src={dec} alt="" height="100px" width="100px"  onClick={()=>{
                setCount(dec)
            }}/>
        </div>
      <div className="mainpage" ref={data}>
        <div className="margintop" contentEditable></div>

        <div className="marginside" contentEditable></div>
        <div
          className="content"
          contentEditable
          style={{
            backgroundImage: `url(${count})`,
          }}
        ></div>
      </div>
      <button className="capture" onClick={click}></button>
    </div>
  );
};

export default Text_handwritnig;
