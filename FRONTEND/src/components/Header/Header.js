import PokedexIcon from "./pokedexicon.png";

export default function Header({ className, icon_styling}) {
    return (
        <div className={className}>
            <img src={PokedexIcon} alt="Icon" className={"PokdexIcon " + icon_styling}></img>
            POKEDEX
        </div>
    );
}