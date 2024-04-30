const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cities = require('./data/cities');
const vehicles = require('./data/vehicles');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const generateCriminalDetails = () => {
    const randomCityIndex = Math.floor(Math.random() * cities.length);
    const randomCity = cities[randomCityIndex];
    const distance = randomCity.distance;
    const criminalDetails = {
        criminalCity: randomCity.name,
        distance: distance
    }
    console.log(criminalDetails);
    return criminalDetails;
};

// const generateResult = (cops, criminalDetails) => {
//     const criminalDistance = criminalDetails.distance;
//     const criminalCity = criminalDetails.criminalCity;
//     const i = 0;
//     for(const cop of cops) {
//         const copName = i+1;
//         const copCity = cop.city;
//         const copVehicle = cop.vehicle;
//         const copVehicleRange = vehicles.find(vehicle => vehicle.kind === copVehicle)?.range;
//         const copCityDistance = cities.find(city => city.name === copCity)?.distance;
//         console.log("********************")
//         console.log("Cop city: " + copCity);
//         console.log("Cop city distance: " + copCityDistance);
//         console.log("Cop vehicle range: " + copVehicleRange);
//         console.log("Criminal distance: " + criminalDistance);
//         console.log("Criminal city: " + criminalCity);
//         if(criminalDistance <= copCityDistance && copVehicleRange <= criminalDistance * 2) {
//             return "The criminal is caught in " + criminalCity + " by : " + copName;
//         }
//         i = i + 1;
//     }
//     return "The criminal is not caught"; // Criminal not caught
// };


const generateResult = (cops, criminalDetails) => {
    const criminalDistance = criminalDetails.distance;
    const criminalCity = criminalDetails.criminalCity;
    let caughtByCop = null;
    let criminalCaughtCity = null;

    for(const cop of cops) {
        const copCity = cop.city;
        const copVehicle = cop.vehicle;
        const copVehicleRange = vehicles.find(vehicle => vehicle.kind === copVehicle)?.range;
        const copCityDistance = cities.find(city => city.name === copCity)?.distance;

        if (!copCityDistance || !copVehicleRange) 
        {
            console.log("Invalid cop data:", cop);
            continue; // Skip to the next cop
        }

        console.log("********************")
        console.log("Cop: " + cop.name);
        console.log("Cop city: " + copCity);
        console.log("Cop city distance: " + copCityDistance);
        console.log("Cop vehicle range: " + copVehicleRange);
        console.log("Criminal distance: " + criminalDistance);
        console.log("Criminal city: " + criminalCity);
        console.log("**********************")

        if(criminalCity == copCity && copVehicleRange >= criminalDistance * 2) {
            caughtByCop = cop.name;
            criminalCaughtCity = criminalCity; // Record the criminal's city
            break; // Exit the loop if the criminal is caught
        }
    }

    if (caughtByCop) 
    {
        return { caughtByCop, criminalCaughtCity };
    } 
    else 
    {
        return { caughtByCop: null, criminalCaughtCity: null };
    }
};

// Route to start the game and get random criminal details
app.get('/game/start', (req, res) => {
    const criminalDetails = generateCriminalDetails();
    res.json(criminalDetails);
});

app.post('/game/check', (req, res) => {
    const { cops, criminalDetails } = req.body;

    // Implement your logic here to determine if the criminal is caught based on cop actions
    const result = generateResult(cops, criminalDetails);

    // Log the result
    console.log(result);

    // Send the result back to the client
    res.json(result);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
