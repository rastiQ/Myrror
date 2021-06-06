# Myrorr

Myrror is a software for smart mirrors, built in [ReactJS](https://reactjs.org/). It can be run in a browser window and currently supports Clock, Weather and Spotify widgets. Myrror currently shows widgets in Slovak language only.

## Installation

 1. Download and install the latest version of Node.js [here](https://nodejs.org/en/download/).
 2. Clone the repository: `git clone https://github.com/rastiQ/Myrror`
 3. Change current working directory: `cd Myrror` 
 4. Install all dependencies: `npm install`
 5. Get your API key for Weather Widget from [here](https://openweathermap.org/) and paste it to environment variable *REACT_APP_WEATHER_APIKEY* found in **.env** file.
 6. Add your location to environment variable *REACT_APP_LOCATION*.
 7. Create a Spotify application [here](https://developer.spotify.com/dashboard) and paste your **Client ID** and **Client Secret** into *REACT_APP_SPOTIFY_CLIENTID*, *REACT_APP_SPOTIFY_CLIENT_SECRET* variables found in **.env** file.
 8. Run the app `npm run start`

