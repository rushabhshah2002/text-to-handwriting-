import React, { useEffect, useState } from "react";
import lines from "./images/temp.png";
import sideMargin from "./images/side-margin.png";
import domtoimage from "dom-to-image";
import topMargin from "./images/margin.png";
import axios from "axios";
import content_resize from "./images/content-resize.jpg";
import topMarginResize from "./images/Top-Margin-resize.jpg";
import sideMarginResize from "./images/side-Margin-r.jpg";
import {
  PDFDownloadLink,
  Page,
  Image as Img,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import "./temp.scss";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
});

const MyDoc = ({ imgData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {Object.keys(imgData).map((index, i) => (
        <View style={styles.section}>
          <Img
            style={{
              marginVertical: 10,
              // marginHorizontal: 10,

              width: "108%",
              height: "100%",
            }}
            source={imgData[i]}
            src={imgData[i]}
          />
        </View>
      ))}
    </Page>
  </Document>
);

const Temp = () => {
  const [font, setFont] = useState("speed");
  const fontCase = {
    snake: 52,
    Strawberry: 46,
    speed: 50,
    unlucky: 35,
  };
  const [toogleResize, setToogleResize] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [spipArea, setSpinArea] = useState(false);
  const [dataObj, setDataObj] = useState({});
  const linesInPage = 27;
  const [CharPerLine, setCharPerLine] = useState(50);
  const [img, setImg] = useState();
  const [color, setColor] = useState("blue");
  const [maxPage, setMaxPage] = useState("");
  const [imgData, setImgData] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [showMargin, setShowMargin] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [value, setValue] = useState("Enter Text");
  useEffect(() => {
    if (toogleResize) {
      setCharPerLine(fontCase[font] - 10);
    }
    if (!toogleResize) {
      setCharPerLine(fontCase[font]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // eslint-disable-next-line
  }, [font, toogleResize]);
  const ImageGeneration = () => {
    let temp = {};

    for (let i = 0; i <= parseInt(maxPage); i++) {
      var node = document.getElementById(`${i}`);
      let c = node;
      domtoimage
        .toPng(c)
        .then(function (dataUrl) {
          var img = new Image();
          img.src = dataUrl;
          temp[i] = dataUrl;
          setImg(dataUrl);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
    }
    setImgData(temp);
    setShowImage(true);
  };

  const handleUpload = ({ target }) => {
    const abc = filencoder(target.files[0]).then((res) => {
      console.log(res, "post");
      ocr(res);
    });
    console.log(abc);
  };
  const filencoder = function readFileAsText(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  };
  const ocr = async (str) => {
    var data = new FormData();
    data.append("language", "eng");
    data.append("isOverlayRequired", "false");
    data.append("base64Image", str);
    data.append("issearchablepdfhidetextlayer", "false");

    var config = {
      method: "post",
      url: "https://apipro1.ocr.space/parse/image",
      headers: {
        apikey: "175c0599a788957",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        console.log(response.data.ParsedResults[0].ParsedText);
        setValue(response.data.ParsedResults[0].ParsedText);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  let dropArea = document.getElementById("drop-area");

  useEffect(() => {
    if (dropArea === null) return;
    // Prevent default drag behaviors
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area when item is dragged over it
    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, highlight, false);
    });
    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropArea.addEventListener("drop", handleDrop, false);

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    function highlight(e) {
      dropArea.classList.add("highlight");
    }

    function unhighlight(e) {
      dropArea.classList.remove("active");
    }

    function handleDrop(e) {
      var dt = e.dataTransfer;
      var files = dt.files;

      handleFiles(files);
    }

    function handleFiles(files) {
      files = [...files];
      console.log(files, "123");
      console.log(filencoder(files[0]));
      const abc = filencoder(files[0]).then((res) => {
        console.log(res, "post");
        ocr(res);
      });
      console.log(abc);
    }
  }, [dropArea]);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 540) {
        setToogleResize(true);
      }
      if (window.innerWidth > 540) {
        setToogleResize(false);
      }
    }

    window.addEventListener("resize", handleResize);
  });
  const spinBot = () => {
    const temp = document.getElementById("spinbot-data");

    const options = {
      method: "POST",
      url: "https://rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com/rewrite",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-key": "11a91194ddmsh40b8b75a23c8139p1678cbjsnb55058982266",
        "x-rapidapi-host":
          "rewriter-paraphraser-text-changer-multi-language.p.rapidapi.com",
      },
      data: {
        language: "en",
        strength: 3,
        text: temp.value,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.rewrite);
        setValue(response.data.rewrite);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const dataInLines = () => {
    var lines = [];
    var temp = document.getElementById("input");
  
    var d = temp.value.split(/\n/);
    for (let i in d) {
      if (d[i]) {
        if (d[i].length > CharPerLine) {
          var b = Math.ceil(d[i].length / CharPerLine);
          for (let j = 0; j <= b-1; j++) {
            lines.push(d[i].slice(CharPerLine * j, CharPerLine * (j + 1)));
          }
        } else {
          lines.push(d[i]);
        }
      }else  {
        lines.push("");
      }
    }

    if (!lines) return;

    var len = lines.length / 28;
    setMaxPage(len);
    var tempImg = {};
    for (let i = 0; i <= len; i++) {
      tempImg[i] = lines.slice(linesInPage * i, linesInPage * (i + 1));
    }
    setDataObj(tempImg);
  };
  useEffect(() => {
    dataInLines();
    // eslint-disable-next-line
  }, [value]);

  return (
    <div>
      {/* <nav class="nav">
          <div class="nav__brand">Logo</div>
          <div class="nav__items">
            <p class="nav__item">FEED</p>
            <p class="nav__item">AUTHORS</p>
            <p class="nav__item">EXPLORE</p>
            <p class="nav__item">BLOG</p>
            <p class="nav__item">CONTACT</p>
          </div>
        </nav> */}

      <div className="">
        <div className="welcome-input-container">
          <div className="welcome-text">
            <div className="welcome--heading">Welcome Text !</div>
            <div className="welcome--content"></div>
          </div>
          {/* <div className="test">
            <button>speech</button>
          </div> */}
          <div className="input-drag">
            <div className="input-title">Import your Files Here</div>
            <div id="drop-area">
              <form class="my-form">
                <p>Drag / Drop Files here</p>
                <input type="file" id="fileElem" onChange={handleUpload} />
                <label htmlFor="fileElem" className="btn upload">
                  <div className="cloud">
                    <div className="arrow"></div>
                  </div>
                </label>
                {/* <label class="button" for="fileElem">
                  Upload
                </label> */}
              </form>
            </div>
          </div>
        </div>
        <div className="settings">
          <div className="setting--fontchange">
            <div className="fontchange--text">Font Change</div>

            <select
              name=""
              id="select"
              style={{ fontFamily: `${font}` }}
              className="fontchange--selector"
              onChange={(e) => {
                setFont(e.target.value);
              }}
            >
               <option
                className="fontCopt"
                value="speed"
                style={{ fontFamily: "speed" }}
              >
                {" "}
                SpeedWritten
              </option>
              <option
                className="fontCopt"
                value="snake"
                style={{ fontFamily: "snake", fontSize: "25px" }}
              >
                Snake
              </option>
              <option
                className="fontCopt"
                value="Strawberry"
                style={{ fontFamily: "Strawberry" }}
              >
                {" "}
                Strawberry
              </option>
             
              <option
                className="fontCopt"
                value="unlucky"
                style={{ fontFamily: "unlucky" }}
              >
                {" "}
                unlucky
              </option>
            </select>
          </div>
          <div className="setting--fontcolor">
            <div className="fontcolor--text">Font Color</div>
            <div className="fontcolor--option">
              <button
                className="color-option-blue"
                onClick={() => {
                  setColor("blue");
                }}
              ></button>
              <button
                className="color-option-red"
                onClick={() => {
                  setColor("red");
                }}
              ></button>
              <button
                className="color-option-black"
                onClick={() => {
                  setColor("black");
                }}
              ></button>
            </div>
          </div>
          {/* <div className="setting--margin">
            <div className="margin--heading">Margin & Line Options</div>
            <div className="margin--text-option">
              <div className="margin--container">
                <div className="margin--btn-text">Paper Margin</div>
                <div>
                  <input
                    id="checkbox"
                    type="checkbox"
                    className="checkbox"
                    checked={showMargin}
                    onChange={(e) => {
                      setShowMargin(e.target.checked);
                    }}
                  />

                  <label for="checkbox" className="switch">
                    <span className="switch__circle">
                      <span className="switch__circle-inner"></span>
                    </span>
                    <span className="switch__left">Off</span>
                    <span className="switch__right">On</span>
                  </label>
                </div>
              </div>
              <div className="lines--container">
                <div className="lines--btn-text">Paper Lines</div>
                <div>
                  <input
                    id="paperLines"
                    type="checkbox"
                    className="checkbox"
                    checked={showLines}
                    onChange={(e) => {
                      setShowLines(e.target.checked);
                    }}
                  />

                  <label for="paperLines" className="switch">
                    <span className="switch__circle">
                      <span className="switch__circle-inner"></span>
                    </span>
                    <span className="switch__left">Off</span>
                    <span className="switch__right">On</span>
                  </label>
                </div>
              </div>
            </div>
          </div> */}
          <div className="setting--spinbot">
            <div className="spinbot--checkbox">
              <label htmlFor="spinbot" className="spin--text">
                Paraphraser
              </label>
              <input
                type="checkbox"
                id="spinbot"
                className="spin--checkbox"
                checked={spipArea}
                onChange={(e) => {
                  setSpinArea(e.target.checked);
                }}
              />
            </div>
          </div>
        </div>
        {spipArea && (
          <div className="spinbot-input-area">
            <div className="spin-data-container">
              <textarea
                className="spin--intput--data"
                name="spinbot-data"
                id="spinbot-data"
                placeholder="ENTER TEXT"
                maxLength={500}
                onChange={(e) => {
                  setCharCount(e.target.value.length);
                }}
              ></textarea>
              <div className="charcount">
                <span>{charCount}/500</span>
              </div>
              <div
                className="spin-submit-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "60rem",
                }}
              >
                <button className="page--btn" onClick={spinBot}>
                  Submit{" "}
                </button>
              </div>
            </div>
          </div>
        )}
        <div
          className="test"
          style={{ display: "flex", justifyContent: "space-around" ,flexWrap:"wrap"}}
        >
   
        
   <div class="switch-holder">
            <div class="switch-label">
                <span>Paper Margin</span>
            </div>
            <div class="switch-toggle">
                <input type="checkbox" id="margin"  checked={showMargin}
                    onChange={(e) => {
                      setShowMargin(e.target.checked);
                    }}/>
                <label for="margin"></label>
            </div>
        </div>

  
        
        <div class="switch-holder">
            <div class="switch-label">
                <span>Paper Lines</span>
            </div>
            <div class="switch-toggle">
                <input type="checkbox" id="lines"  checked={showLines}
                    onChange={(e) => {
                      setShowLines(e.target.checked);
                    }}/>
                <label for="lines"></label>
            </div>
        </div>

  
        </div>
        {toogleResize && (
          <div className="input-output-container">
            <div className="input-box">
              <label htmlFor="input" className="input--heading">
                Input
              </label>
              <textarea
                name="input"
                value={value}
                id="input"
                style={{ height: "50rem", width: "30rem" }}
                className=""
                placeholder="INPUT"
                onChange={(e) => {
                  // dataInLines();
                  setValue(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="output-box">
              <label htmlFor="input" className="output--heading">
                Output
              </label>
              <div className="scroll_data-resize" style={{}}>
                {Object.keys(dataObj).map((pageIndex, i) => (
                  <div
                    id={i}
                    className="page--container"
                    style={{
                      marginBottom: "2.1rem",
                    }}
                  >
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "0px",
                      }}
                    >
                      <textarea
                        className="topMargin"
                        id=""
                        style={{
                          visibility: showMargin ? "visible" : "hidden",
                          width: "300px",
                          height: "50px",
                          backgroundImage: showLines
                            ? `url(${topMarginResize})`
                            : null,
                          backgroundColor: "white",
                          fontFamily: `${font}`,
                          fontSize: "16px",
                          lineHeight: "14px",
                          resize: "none",
                          color: `${color}`,
                          padding: 0,
                          overflow: "hidden",
                          border: "0px",
                        }}
                      ></textarea>
                      <div
                        className="side-content-container"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: 0,
                        }}
                      >
                        <textarea
                          className="side-margin"
                          id=""
                          style={{
                            visibility: showMargin ? "visible" : "hidden",
                            width: "50px",
                            height: "400px",
                            backgroundImage: showLines
                              ? `url(${sideMarginResize})`
                              : null,
                            backgroundColor: "white",
                            fontFamily: `${font}`,
                            fontSize: "16px",
                            lineHeight: "14px",
                            resize: "none",
                            color: `${color}`,
                            overflow: "hidden",
                            border: "0px",
                          }}
                        ></textarea>
                        <textarea
                          disabled
                          className=""
                          value={dataObj[pageIndex].join("\n")}
                          style={{
                            backgroundImage: showLines
                              ? `url(${content_resize})`
                              : null,
                            backgroundColor: "white",
                            textAlign: "justify",
                            width: "250px",
                            height: "399px",
                            maxHeight: "399px",
                            fontFamily: `${font}`,
                            fontSize: "17.5px",
                            lineHeight: "14px",
                            resize: "none",
                            color: `${color}`,

                            border: "0px",
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!toogleResize && (
          <div className="input-output-container">
            <div className="input-box">
              <label htmlFor="input" className="input--heading">
                Input
              </label>
              <textarea
                name="input"
                value={value}
                id="input"
                style={{ height: "66rem", width: "48.2rem" }}
                className=""
                placeholder="INPUT"
                onChange={(e) => {
                  // dataInLines();
                  setValue(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="output-box">
              <label htmlFor="input" className="output--heading">
                Output
              </label>
              <div className="scroll_data" style={{}}>
                {Object.keys(dataObj).map((pageIndex, i) => (
                  <div
                    id={i}
                    className="page--container"
                    style={{
                      marginBottom: "2.1rem",
                    }}
                  >
                    <div
                      className=""
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        border: "0px",
                      }}
                    >
                      <textarea
                        className="topMargin"
                        id=""
                        style={{
                          visibility: showMargin ? "visible" : "hidden",
                          width: "473px",
                          height: "76px",
                          backgroundImage: showLines
                            ? `url(${topMargin})`
                            : null,
                          backgroundColor: "white",
                          fontFamily: `${font}`,
                          fontSize: "25px",
                          lineHeight: "20px",
                          resize: "none",
                          color: `${color}`,
                          padding: 0,
                          overflow: "hidden",
                          border: "0px",
                        }}
                      ></textarea>
                      <div
                        className="side-content-container"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          padding: 0,
                        }}
                      >
                        <textarea
                          className="side-margin"
                          id=""
                          style={{
                            visibility: showMargin ? "visible" : "hidden",
                            width: "73px",
                            height: "580px",
                            backgroundImage: showLines
                              ? `url(${sideMargin})`
                              : null,
                            backgroundColor: "white",
                            fontFamily: `${font}`,
                            fontSize: "25px",
                            lineHeight: "20px",

                            resize: "none",
                            color: `${color}`,
                            overflow: "hidden",
                            border: "0px",
                          }}
                        ></textarea>
                        <textarea
                          disabled
                          className=""
                          value={dataObj[pageIndex].join("\n")}
                          style={{
                            backgroundImage: showLines ? `url(${lines})` : null,
                            backgroundColor: "white",
                            textAlign: "justify",
                            width: "400px",
                            height: "580px",
                            maxHeight: "580px",
                            fontFamily: `${font}`,
                            fontSize: "25px",
                            lineHeight: "20px",
                            resize: "none",
                            color: `${color}`,

                            border: "0px",
                          }}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="generate--image-btn">
          <div className="cta" onClick={ImageGeneration}>
            <span >Genrate Image</span>
            <svg width="13px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </div>
          {/* <button className="generate" onClick={ImageGeneration}>
            Generate Image
          </button> */}
        </div>
        {showImage && (
          <div className="download-image-scroll-container">
            <div className="container">
              {Object.keys(imgData).map((index, i) => (
                <div key={i} className="">
                  <img
                    style={{ margin: "1rem", transform: "scale(0.8)" }}
                    src={imgData[index]}
                    alt=""
                  />
                </div>
              ))}
            </div>

            <div className="download--container">
              <PDFDownloadLink 
                id="d"
                className="q generate"
                document={<MyDoc imgData={imgData} />}
                fileName="somename.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Generate" : "Download"
                }
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Temp;
