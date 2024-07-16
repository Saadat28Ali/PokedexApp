// import axios from "axios";
import { useState } from "react";
import ImageFrame from "./components/ImageFrame/ImageFrame";
import InputFrame from "./components/InputFrame/InputFrame";
import RandomImage from "./components/ImageFrame/frame.jpeg";
import Header from "./components/Header/Header";

const IMAGEFRAMESTYLE=
  ` 
    min-h-80 
    min-w-80 
    flex 
    justify-center 
  `;
const INPUTFRAMESTYLE=
  ` 
    min-h-80 w-[100%] 
    min-w-50 
    lg:min-w-50 
    p-7 
    rounded-xl 
    rounded-t-none 
    lg:rounded-r-xl
    lg:rounded-l-none 
    flex 
    flex-col 
    items-start 
    justify-center 
    bg-[#ff3334] 
    font-sans
    font-bold
    text-xl
    *:mt-5
  `
const TEXTINPUTSTYLE=
  `
  pt-7
  pb-7
  pl-7
  rounded-md
  h-10
  placeholder:italic
  text-neutral-700
  
  `
const BUTTONSTYLE=
  `
    bg-white 
    text-black 
    p-3 
    mt-3 
    rounded-md 
    bg-lime-400
    hover:bg-white
    transition-colors 
  `
const POKEMONIMAGESTYLE=
  ` 
    size-64
    absolute
    lg:top-[33%]
    top-[30%]
    border-0
    outline-none
  `
function App() {
  
  const [data, setData] = useState({name: ""});

  return (
    <div className="App bg-zinc-900 text-white flex flex-col items-center justify-center min-h-screen">
      <Header className="bg-white text-black sticky top-0 w-full min-h-16 flex justify-center items-center font-bold text-xl shadow-2xl shadow-black"/>
      <div className="Spacer flex-grow"></div>
      <div className="Frames flex flex-col lg:flex-row items-center justify-center rounded-2xl w-2/3">
        <div className="Spacer flex-grow w-[100%]"></div>
        <ImageFrame className={"ImageFrame" + IMAGEFRAMESTYLE} data={data} pokemonimagestyle={POKEMONIMAGESTYLE}/>
        <InputFrame className={"InputFrame" + INPUTFRAMESTYLE} textinputstyle={TEXTINPUTSTYLE} buttonstyle={BUTTONSTYLE} data={data} setter={setData}/>
        <div className="Spacer flex-grow w-[100%]"></div>
      </div>
      <div className="Spacer flex-grow"></div>

      
    </div>
  );
}

export default App;
