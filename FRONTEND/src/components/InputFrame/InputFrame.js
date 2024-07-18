import axios from "axios";
const ADDR = "http://localhost:5000/api/";

function capitalize(s) {
  // capitalizes the first letter of the string
  return (s) ? s.charAt(0).toUpperCase() + s.substring(1) : "";
}

function getPokemonData(name, setter) {
    setter(true);
    const send_this = new FormData();
    send_this.append("name", name);
  
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
        // console.log(response.data.data[0]);
        resolve(response.data.data[0]);
      }).catch((error) => {
        // console.log(error.message);
        reject(error);
      });
    });
  }

export default function InputFrame({ className, data, textinputstyle, buttonstyle, dataSetter, fetchingSetter, fetchingStatus }) {

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

    return (
        <div className={className}>
            <div className="Display">
                Name: {capitalize(data.name)} <br></br>
                Dex No.: {data.id} <br></br>
                Types: {capitalize(data.type)} <br></br>
            </div>
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