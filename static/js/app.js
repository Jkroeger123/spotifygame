var a1_url, a2_url;
var a1_name, a2_name;
var a1_followers, a2_followers;
var score;
var best = 0;

function startGame(){
    score = 0;
    document.getElementById("game").style.display = "flex";
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("splash").classList.remove('menu');
    document.getElementById("splash").classList.add("play");
    document.getElementById("game-over").style.display = "none";
    initRound();
}

//generate 2 random artists 
async function initRound()
{
    resetAnimation();
    initArtist1();
}

//grabs first random artist and sets the necessary variables
//once the api returns the data and the variables are set
//the second artist is initialized
function initArtist1(){
    axios.get('/artist').then((response) => {
        a1_url = response.data.img;
        a1_name = response.data.name;
        a1_followers = response.data.followers;
        var img = document.getElementById("a1_img");
        var nm = document.getElementById('a1_name');
        nm.innerHTML = a1_name;
        img.src = a1_url;
        initArtist2(); 
    })
}

//grabs second random artist,
//once the api responds, the animation function is called.
function initArtist2(){
    axios.get('/artist').then((response) => {
        a2_url = response.data.img;
        a2_name = response.data.name;
        a2_followers = response.data.followers;
        var img = document.getElementById("a2_img");
        var nm = document.getElementById('a2_name');
        nm.innerHTML = a2_name;
        img.src = a2_url;
        fadeInArtists(); 
    })
}

//fades in the two artists at the same time
function fadeInArtists(){
    document.getElementById("game-view").classList.remove('animate__animated', 'animate__fadeOut')
    document.getElementById("game-view").style.display = "flex"; 
    document.getElementById("game-view").classList.add('animate__animated', `animate__fadeIn`);
}

function resetAnimation(){
    document.getElementById("game-view").style.display = "none"; 
    document.getElementById("game-view").classList.remove('animate__animated', `animate__fadeIn`);
}

function chooseArtist1(){
    if(a1_followers > a2_followers){
        correctResponse();
    }else{
        gameOver();
    }
}

function chooseArtist2(){
    if(a2_followers > a1_followers){
        correctResponse();
    }else{
        gameOver();
    }
}

async function correctResponse(){
    document.getElementById("game-view").classList.add('animate__animated', 'animate__fadeOut')
    score++;
    document.getElementById("game-score").innerHTML = "Score: " + score;
    flashGreen();
    setTimeout(() => {
        document.getElementById("game-view").style.display = "none"; 
        initRound();
    }, 1000);

}

async function flashGreen(){
    document.body.classList.add("green");

    setTimeout(() => {
        document.body.classList.remove("green");
    }, 200);
}

async function flashRed(){
    document.body.classList.add("red");

    setTimeout(() => {
        document.body.classList.remove("red");
    }, 200);
}

function setBest(){
    document.getElementById("game-best").innerHTML = "Best: " + best;
}

function gameOver(){

    flashRed();

    if(score > best){
        best = score;
        setBest();
    }
    reset();
}

async function reset(){
    document.getElementById("game-score").innerHTML = "Score: " + score;
    document.getElementById("game").style.display = "none";
    document.getElementById("game-over").style.display = "block";
    document.getElementById("game-score-final").innerHTML = "Score: " + score;
    document.getElementById("game-best-final").innerHTML = "Best: " + best;
    score = 0;

    setTimeout(() => {
        document.getElementById("game-over").classList.add('animate__animated', 'animate__fadeOut');
        document.getElementById("game-over").style.display = "none";
        document.getElementById("splash").classList.remove('play');
        document.getElementById("splash").classList.add('menu');
        document.getElementById("start-btn").style.display = "inline-block";
    }, 2000);
}