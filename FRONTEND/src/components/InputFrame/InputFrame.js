import axios from "axios";
const ADDR = "http://localhost:5000/api/";

function getPokemonData(name) {
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

export default function InputFrame({ className, data, textinputstyle, buttonstyle, setter}) {

    function updateButtonCallback(event) {
        event.preventDefault();
        const name = (event.target.getElementsByClassName("name_inp")[0].value).toLowerCase();
        getPokemonData(name).then(
          (returned_val) => {
            setter(returned_val);
          }
        ).catch((error) => {
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
                Dex No.: {data.id} <br></br>
                Name: {data.name} <br></br>
                Types: {data.type} <br></br>
            </div>
            <div className="InputForm">
                <form id="main" onSubmit={(event) => {updateButtonCallback(event)}}>
                    <input className={"name_inp" + textinputstyle} placeholder="Enter pokemon name here..."></input> <br></br>
                    <button type="submit" className={"submit_button" + buttonstyle}> Click me to update </button> <br></br>
                </form>
            </div>
            
        </div>
    );
}