import { useState } from "react";
// import ImageFrame from "./components/ImageFrame/ImageFrame";
import InputFrame from "./components/InputFrame/InputFrame";
import RandomImage from "./components/ImageFrame/frame.jpeg";
import Header from "./components/Header/Header";
import ImageFrame2 from "./components/ImageFrame2/ImageFrame2";

const IMAGEFRAMESTYLE=
  ` 
    min-h-80 
    min-w-80 
    flex 
    justify-center
    *:select-none
  `;
const INPUTFRAMESTYLE=
  ` 
    min-h-80 
    w-[338px]
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
    text-sm
    *:mt-5
    lg:ml-2
    lg:mt-0
    z-20
    mt-[130px]
    *:select-none
  `
const TEXTINPUTSTYLE=
  `
  pt-5
  pb-5
  pl-5
  rounded-md
  h-10
  placeholder:italic
  text-neutral-700
  text-md
  
  `
const BUTTONSTYLE=
  ` 
    text-black 
    p-3 
    mt-3 
    rounded-md 
    bg-lime-400
    hover:bg-white
    transition-colors 
    border-4
    border-yellow-500

  `
const POKEMONIMAGESTYLE=
  ` 
    size-64
    border-0
    outline-none
    bg-green-700
    absolute
    lg:top-[33%]
    top-[30%]

  `


function App() {
  
  const [data, setData] = useState({name: ""});
  const [fetching, setFetching] = useState(false);

  return (
    <div className="App bg-zinc-900 text-white flex flex-col items-center justify-center min-h-screen">
      <Header className="bg-white text-black sticky top-0 w-full min-h-16 flex justify-center items-center font-bold text-xl shadow-2xl shadow-black z-30" icon_styling="h-5 pr-2"/>
      <div className="Spacer flex-grow"></div>
      <div className="Frames flex flex-col lg:flex-row items-center justify-center rounded-2xl w-2/3">
        <div className="Spacer flex-grow w-[100%]"></div>
        
        {/* <ImageFrame className={"ImageFrame" + IMAGEFRAMESTYLE} data={data} pokemonimagestyle={POKEMONIMAGESTYLE} somemorestyle={"h-14 bg-gradient-to-r from-sky-500 to-indigo-500 absolute "}/> */}
        
        <ImageFrame2 data={data} main_styling="flex justify-center items-center" spacer1_styling="" top_styling="z-10 absolute" spacer2_styling="h-16" frame_styling="h-[500px]" pokemon_styling="bg-white/20 min-h-[300px] min-w-[300px]" loadinganim_styling={"w-[30px] h-[30px] border-white animate-pulse font-bold text-black text-3xl ml-[45px] rounded-xl shadow-[0_0_100px_50px_rgba(118,215,196,0.5)] text-center " + ((fetching === true) ? "" : "hidden")} loading_styling="z-30 absolute" spacer3_styling="h-[85px]"/>
        <InputFrame className={"InputFrame" + INPUTFRAMESTYLE} textinputstyle={TEXTINPUTSTYLE} buttonstyle={BUTTONSTYLE} data={data} dataSetter={setData} fetchingSetter={setFetching} fetchingStatus={fetching} pokemonFieldsStyle="font-mono bg-gradient-to-b from-emerald-900 to-emerald-950 p-2 rounded-xl border-4 border-solid border-amber-500 w-full font-normal italic text-[18px] leading-6 shadow-[0px_0px_50px_1px_rgba(0,0,0,0.5)]"/>
        <div className="Spacer flex-grow w-[100%]"></div>
      </div>
      <div className="Spacer flex-grow"></div>

      {/* <div className="border-8" */}
      {/* <div className="FetchingStatus"> Fetching: {fetching.toString().toUpperCase()} </div>  */}
    </div>
  );
}

export default App;
