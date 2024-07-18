import frame from "./frame.png";
import LoadingAnim from "./LoadingAnim";

export default function ImageFrame2({ main_styling, bottom_styling, spacer1_styling, top_styling, spacer2_styling, frame_styling, pokemon_styling, data, loading_styling, loadinganim_styling, spacer3_styling}) {
    return (
        <div className={"ImageFrame2 " + main_styling}>
            <div className={"TopLayer "+ top_styling}> 
                <div className={"LoadingLayer " + loading_styling}>
                    <div className={"Spacer3 " + spacer3_styling}></div>
                    <LoadingAnim main_styling={loadinganim_styling}/>
                </div>
                <div className={"Spacer2 " + spacer2_styling}></div>
                <img src={frame} className={"FrameImage " + frame_styling}></img>
            </div>
            <div className={"BottomLayer " + bottom_styling}>
                <div className={"Spacer1 " + spacer1_styling}></div>
                <img src={data.image} className={"PokemonImage " + pokemon_styling} alt="Pokemon"></img>
            </div>
        </div>
    );
}