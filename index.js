const express = require('express');
const request = require('request');
const app = express();
const PORT = 5000 || process.env.PORT;
var accessToken_SP;

setAccessTokens();

app.use(express.static('./static'));
app.use(express.json());

//currently gets a random artist name
app.get('/artist', (req, res) => {
    var randNum = Math.floor(Math.random() * 1001);
    request({
        url: `https://api.spotify.com/v1/search?q=genre:%22pop%22&year%3A2016-2020&type=artist&market=US&limit=1&offset=${randNum}`,
        auth: {
          'bearer': accessToken_SP
        }
      }, function(err, response) {
            var resJSON = JSON.parse(response.body);
            var name = resJSON.artists.items[0].name
            if(resJSON.artists.items[0].images[0] != undefined){
              var image = resJSON.artists.items[0].images[0].url; 
            }else{
              var image = null;
            }
            //this should be switched to new api for monthly listeners instead of followers
            var followers = resJSON.artists.items[0].followers.total;
            res.send({'img': image, "name":  name, 'followers': followers});
      });
});

app.listen(PORT, () =>{
    console.log(`Server Listening on Port ${PORT}`);
});

function setAccessTokens(){
    //Set Acess Token for Spotify API
    request({
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        auth: {
          user: '1101ba1b83944f75ba14da94369fa027',
          pass: '2dd81380e3a445b88b56c860e46bba08'
        },
        form: {
          'grant_type': 'client_credentials'
        }
      }, function(err, res) {
        var json = JSON.parse(res.body);
        accessToken_SP = json.access_token;
      });
}