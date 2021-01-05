# Spotify Guessing Game
 Web based game in which users guess which artists has more Spotify followers.
 
 NOTE: simply cloning and running the server will not work as you need to create your own Spotify developer account.
 Once you recieve your credentials, create a .env file in your project root and place API_USER=your api username and API_PASS=your client secret in the file

## Technologies Used 
 Uses node.js and express on the back end to initialize a server. This backend connects to Spotify's
 API and fetches random artists along with there profile photo and follower count. The front end written in HTML CSS and Javascript
 initializes the game and requests the random artist objects from the backend.
 
## Dependencies
* @zalando/oauth2-client-js
* express
* nodemon
* request
* dotenv
