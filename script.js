const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// passing joke to voiceRss Api
function tellMe(joke) {
    VoiceRSS.speech({
        key: "a2b958e8c9ea441599a09b75e8a83c93",
        src: joke,
        hl: "en-us",
        v: "Linda",
        r: 0,
        c: "mp3",
        f: "44khz_16bit_stereo",
        ssml: false,
      });
}

// get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming,Christmas?blacklistFlags=nsfw,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // text to speech
        tellMe(joke);
        // disabled button
        toggleButton();

    } catch (error) {
        console.log('todo mal', error);
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);