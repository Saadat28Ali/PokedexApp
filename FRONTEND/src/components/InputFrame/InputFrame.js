import axios from "axios";

import NormalLabel from "./TypeBadges/Normal.svg";
import FightingLabel from "./TypeBadges/Fighting.svg";
import PsychicLabel from "./TypeBadges/Psychic.svg";
import DarkLabel from "./TypeBadges/Dark.svg";
import FairyLabel from "./TypeBadges/Fairy.svg";
import DragonLabel from "./TypeBadges/Dragon.svg";
import IceLabel from "./TypeBadges/Ice.svg";
import FireLabel from "./TypeBadges/Fire.svg";
import WaterLabel from "./TypeBadges/Water.svg";
import ElectricLabel from "./TypeBadges/Electric.svg";
import GrassLabel from "./TypeBadges/Grass.svg";
import GroundLabel from "./TypeBadges/Ground.svg";
import FlyingLabel from "./TypeBadges/Flying.svg";
import RockLabel from "./TypeBadges/Rock.svg";
import PoisonLabel from "./TypeBadges/Poison.svg";
import GhostLabel from "./TypeBadges/Ghost.svg";
import SteelLabel from "./TypeBadges/Steel.svg";
import BugLabel from "./TypeBadges/Bug.svg";

const Labels = {
  Normal: NormalLabel, 
  Fighting: FightingLabel, 
  Flying: FlyingLabel, 
  Electric: ElectricLabel, 
  Ground: GroundLabel, 
  Water: WaterLabel, 
  Grass: GrassLabel, 
  Bug: BugLabel, 
  Fire: FireLabel, 
  Dragon: DragonLabel, 
  Ice: IceLabel, 
  Fairy: FairyLabel, 
  Steel: SteelLabel, 
  Dark: DarkLabel, 
  Ghost: GhostLabel, 
  Poison: PoisonLabel, 
  Psychic: PsychicLabel, 
  Rock: RockLabel
}

const ADDR = "http://localhost:5000/api/";


function capitalize(s) {
  // capitalizes the first letter of the string
  if (s) {
    let split = s.split(",");
    let ret_this = [];
    for (let index in split) {
      let adding_this = (split[index]).trim();
      ret_this.push((adding_this) ? adding_this.charAt(0).toUpperCase() + adding_this.substring(1) : "");
    }
    // return ret_this.join(", ");
    return ret_this;
  }
  else {
    return "";
  }
}

function getTypeLabels(type_array) {
  let ret_this = [];
  for (let index in type_array) {
    ret_this.push(Labels[type_array[index]]);
  }
  let index = 0;
  ret_this = ret_this.map(
    (image) => {
      index += 1;
      return (
        <img className="TypeLabel" key={"typelabel" + index.toString()} src={image} style={{display: "inline", margin: "2px", boxShadow: "0px 0px 50px 1px rgba(0, 0, 0, 0.2)"}}></img>
      );
    }
  )
  return (
    <div className="TypeLabelDiv" style={{display: "inline"}}>
      {ret_this}
    </div>
  );
}

function getPokemonData(name, setter) {
    setter(true);
    const send_this = new FormData();
    send_this.append("name", capitalize(name));
  
    return new Promise((resolve, reject) => {
      axios(
        {
          method: "POST", 
          url: ADDR, 
          data: send_this, 
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      ).then((response) => {
        console.log(response.data);
        
        // fs.writeFile("./image.png", response.data.imageString, {encoding: "base64"}, (err) => {
        //   if (err) {
        //     console.log("error writing image data to file");
        //     reject(err);
        //   }
        //   console.log("image written to file successfully");
        //   resolve(response.data);
        // })

        resolve(response.data);
        // resolve(response.data.data[0]);
      }).catch((error) => {
        // console.log(error.message);
        reject(error);
      });
    });
  }

export default function InputFrame({ className, data, textinputstyle, buttonstyle, dataSetter, fetchingSetter, fetchingStatus, pokemonFieldsStyle }) {

    function updateButtonCallback(event) {
        event.preventDefault();
        const name = (event.target.getElementsByClassName("name_inp")[0].value).toLowerCase();
        getPokemonData(name, fetchingSetter).then(
          (returned_val) => {
            fetchingSetter(false);
            dataSetter(returned_val);
          }
        ).catch((error) => {
          fetchingSetter(false);
          console.log(error.message);
        });
        
        // setData({
        //   id: 1, 
        //   name: "bulbasaur", 
        //   type: "grass, poison", 
        //   image: RandomImage
        // });
      }
    
    let pokemon_fields = (
      <div className={"Display " + pokemonFieldsStyle}>
        <p className={"field1"} style={{fontSize: "13px"}}>
          No: {data.pokedex_number} | {data.japanese_name} <br></br>
        </p>
        <hr className="HorLine" style={{margin: "5px 0px 5px 0px"}}></hr> 
        <b>Name: {capitalize(data.name)}</b> <br></br>
        <p className={"field2"} style={{fontSize: "13px"}}>
          {data.classfication} <br></br>
        </p>
        <hr className="HorLine" style={{margin: "5px 0px 5px 0px"}}></hr>
        <div className={"filed3"} style={{fontSize: "13px"}}>
          Types: {getTypeLabels([data.type1, data.type2])} <br></br>
          Height: {data.height_m}m | Weight: {data.weight_kg}kg <br></br>
        </div>
      </div>);

    // console.log(`Data: ${data}`);
    if (typeof(data) === "string") {
      if (data.includes("Unable to fetch")) {
        pokemon_fields = (<div className={"Display " + pokemonFieldsStyle}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>);
      }
    }
    else if (typeof(data) === "object") {
      if (data.name === "") {
        pokemon_fields = (<div className={"Display " + pokemonFieldsStyle}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>);
      }
    }

    return (
        <div className={className}>
            {/* <div className={"Display " + pokemonFieldsStyle}>
              <p style={{fontSize: "13px"}}>
                No: {data.pokedex_number} | {data.japanese_name} <br></br>
              </p>
              <hr style={{margin: "5px 0px 5px 0px"}}></hr>
              <b>Name: {capitalize(data.name)}</b> <br></br>
              <p style={{fontSize: "13px"}}>
                {data.classfication} <br></br>
                <hr style={{margin: "5px 0px 5px 0px"}}></hr>
                Types: {getTypeLabels([data.type1, data.type2])} <br></br>
                Height: {data.height_m}m | Weight: {data.weight_kg}kg <br></br>
              </p>
            </div> */}
            {pokemon_fields}
            <div className="InputForm">
                <form id="main" onSubmit={(event) => {updateButtonCallback(event)}}>
                    <input className={"name_inp" + textinputstyle} placeholder="Enter pokemon name here..."></input> <br></br>
                    <button type="submit" className={"submit_button" + buttonstyle}> Click me to update </button> <br></br>
                </form>
            </div>
            <div className={"Fetching"}>
              Fetching: {(fetchingStatus === true) ? "TRUE" : "FALSE"}
            </div>
        </div>
    );
}