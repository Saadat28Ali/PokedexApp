import frame_img from "./frame.png";

export default function ImageFrame({ className, data, pokemonimagestyle, somemorestyle }) {
    return (
        <div className={className}>
            <img src={frame_img} alt="frame" style={{height: "100%"}}></img>
            <img src={data.image} alt={data.name} className={"PokemonImage" + pokemonimagestyle}></img>
        </div>
    );
}