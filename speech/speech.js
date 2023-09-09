var word = document.getElementById("word");
var words = ["pronunciation",
            "rendezvous",
            "reservoir",
            "turquoise",
            "wednesday",
            "february",
            "library",
            "remember",
            "statistics",];
randWord =  words[Math.floor(Math.random() * words.length)];
word.innerHTML = randWord;

var listen = document.getElementById("listen");

/* JS comes here */
function runSpeechRecognition() {
    // get output div reference
    var output = document.getElementById("output");
    output.style.display = "none";
    // get action element reference
    var action = document.getElementById("action");

    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        action.innerHTML = "<small> Listening, please speak.</small>";
    };
    
    recognition.onspeechend = function() {
        recognition.stop();
        action.innerHTML = "";
    }
    
    recognition.onerror = function() {
        output.innerHTML = "<br/><h3>Oops! You weren't audible.</h3>";
    }

    output.style.display = "block";

    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
       
        output.style.display = "block";

        if(transcript == randWord)
        {
            output.innerHTML = "<br/><h3>Good Job!</h3>";
            output.innerHTML +="<br/><a href='speech.html'><button class='w3-button w3-amber w3-padding-large w3-large w3-margin-top'>Try Another</button></a>";
        }
        else
        {
            output.innerHTML = "<br/><h3>Oops! Not quite right.</h3>";
            listen.innerHTML = "<button class='w3-button w3-amber w3-padding-large w3-large w3-margin-top' onclick='playSound()'>Listen</button>";
        }
    }
  
     // start recognition
     recognition.start();
}

function playSound()
{
    var video = document.getElementById("video");
    var file = randWord;
    video.innerHTML = "<video width='1145' height='170' autoplay><source src='videos/"+ file +".mp4' type='video/mp4'></video>";
}