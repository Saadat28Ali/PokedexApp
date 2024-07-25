import express from "express";
import axios from "axios";
import multer from "multer";
import getPokemonData from "./scripts/execCPP.js";
import { readFile } from "fs/promises";

const REQUESTBODY = multer({dest: "./bodydata/"});

const APP = express();
const PORT = 5000;

// ADD YOUR OWN KEY HERE
// const PERSONALKEY = "";

// function getPokemonData(name) {

//     return new Promise((resolve, reject) => {
//         axios(
//             {
//                 method: "GET", 
//                 url: "https://pokemon-hub.p.rapidapi.com/search", 
//                 params: {
//                     name: name
//                 }, 
//                 headers: {
//                     "x-rapidapi-key": PERSONALKEY,
//                     "x-rapidapi-host": 'pokemon-hub.p.rapidapi.com'
//                 }
//             }
//         ).then(
//             (response) => {
//                 console.log(response.data);
//                 // storehere = { ...response.data };
//                 resolve({ ...response.data })
//             }
//         ).catch(
//             (error) => {
//                 reject(error);
//             }
//         )
//     });
// }

function imageTo64(path) {
    return new Promise((resolve, reject) => {
        readFile(path, {encoding: "base64"}).then((buffer) => {
            resolve(buffer);
        });
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
    console.log(name);

    getPokemonData(name).then(
        (returned) => {
            // response.attachment(returned.image_path).json(returned);
            // response.json(returned).sendFile(returned.image_path);
            // openImage(returned.image_path);
            imageTo64(returned.image_path).then((s) => {
                returned.imageString = s;
                response.json(returned);
            });
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
