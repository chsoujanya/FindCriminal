Frontend:

StartGame Component: This component renders the main interface of the game. It provides a button to start the game and guides the user through the process of selecting cities and vehicles for each cop.
SelectCityByCop Component: This component is responsible for allowing cops to select cities where they will search for the criminal. It displays a grid of city images, and cops can click on a city to select it.
SelectVehicleByCop Component: This component allows cops to select vehicles for their pursuit. It displays a grid of vehicle images, and cops can click on a vehicle to select it.
Images: Images of the criminal, cops, cities, and vehicles are displayed throughout the game to provide visual context.


Backend:

Game Logic: Implemented functions to generate random criminal details and determine if the criminal is caught based on cop actions.
API Endpoints: Defined API endpoints for starting the game and checking if the criminal is caught. These endpoints handle HTTP requests from the frontend and respond with relevant data.
