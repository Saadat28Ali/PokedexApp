import express from "express";
import axios from "axios";
import multer from "multer";

const REQUESTBODY = multer({dest: "./bodydata/"});

const APP = express();
const PORT = 5000;

// ADD YOUR OWN KEY HERE
const PERSONALKEY = "";

function getPokemonData(name) {

    return new Promise((resolve, reject) => {
        axios(
            {
                method: "GET", 
                url: "https://pokemon-hub.p.rapidapi.com/search", 
                params: {
                    name: name
                }, 
                headers: {
                    "x-rapidapi-key": PERSONALKEY,
                    "x-rapidapi-host": 'pokemon-hub.p.rapidapi.com'
                }
            }
        ).then(
            (response) => {
                // console.log(response.data);
                // storehere = { ...response.data };
                resolve({ ...response.data })
            }
        ).catch(
            (error) => {
                reject(error);
            }
        )
    });
}

APP.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

APP.get("/api/", (request, response) => {
    response.send("Error: No Pokemon Name Provided");
});

APP.post("/api/", REQUESTBODY.none(), (request, response) => {
    const name = request.body.name;
    // console.log(name);

    getPokemonData(name).then(
        (returned) => {
            response.json(returned);
        }
    ).catch(
        (error) => {
            response.send("this is the home and the data fetch failed");
            console.log(error.message);
        }
    );

    // response.send({name: "okay"});
});

APP.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`)
});
