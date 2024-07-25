import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { env } from "process";

export default function getPokemonData(name) {
    // console.log(env.PWD);
    return new Promise((resolve, reject) => {
        const cmd = "'./scripts/readData' name " + name + " 1 './scripts/dataset/pokemon.csv'";

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.log("JS ERROR");
                console.log(error.message);
                reject(error);
            }

            let pairs = stdout.split(",");
            let data_obj = {};
            for (let pair_index in pairs) {
                let [key, val] = pairs[pair_index].split(":");
                if (!isNaN(val)) {
                    val = parseFloat(val);
                }
                data_obj[key] = val;
            }
            
            // console.log(data_obj);

            let quote_flag = false;
            let curr_ability = [];
            let abilities = [];
            for (let c in data_obj.abilities) {
                if (data_obj.abilities[c] === "'") {
                    if (quote_flag === false) {
                        quote_flag = true;
                        continue;
                    }
                    else if (quote_flag === true) {
                        quote_flag = false;
                        abilities.push(curr_ability.join(""));
                        curr_ability = [];
                    }
                }
                if (quote_flag) {
                    curr_ability.push(data_obj.abilities[c]);
                }
                data_obj.abilities = abilities;

                if (data_obj.type1 !== undefined) data_obj.type1 = data_obj.type1[0].toUpperCase() + data_obj.type1.substring(1);
                if (data_obj.type2 !== undefined) {
                    if (typeof(data_obj.type2) === "string") data_obj.type2 = data_obj.type2[0].toUpperCase() + data_obj.type2.substring(1);
                }
                
                if (data_obj.pokedex_number !== undefined) data_obj.image_path = env.PWD + "/scripts/dataset/pokemon/" + data_obj.pokedex_number + ".png";
                resolve(data_obj);
            }
            reject("The pokemon could not be found");
        });
    });
}

// getPokemonData("Gothitelle").then((data) => {
//     console.log(data);
// })