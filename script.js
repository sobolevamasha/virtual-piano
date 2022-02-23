const piano = document.querySelector('.piano')
const pianoKeys = document.querySelectorAll('.piano-key')


// ноты/буквы

const switchButton = document.querySelectorAll('.btn')
const notesButton = document.querySelector('.btn-notes')
const lettersButton = document.querySelector('.btn-letters')


function switchOption(event) {
    if (event.target === notesButton) {
        lettersButton.classList.remove('btn-active')
        notesButton.classList.add('btn-active')
        pianoKeys.forEach((element) => {
            element.classList.remove("piano-key-letter")
    })
    } else if (event.target === lettersButton) {
        lettersButton.classList.add('btn-active')
        notesButton.classList.remove('btn-active')
        pianoKeys.forEach((element) => {
            element.classList.add("piano-key-letter")
        })
    }
}

switchButton.forEach((element) => {
    element.addEventListener('click', switchOption)
})

// фулскрин

const fullScreenButton = document.querySelector('.fullscreen')
fullScreenButton.addEventListener(`click`, toggleFullScreen => {
    if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
} else {
    if (document.exitFullscreen) {
        document.exitFullscreen();
}
}
})

// клава и мышь

function keyPlay(event) {
    if (event.repeat) return;
    
    const playingNote = document.querySelector(`audio[data-letter="${event.code[3]}"]`)
    if (!playingNote) return;
    playingNote.currentTime = 0;
    playingNote.play()
    const keyToAnimate = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`)
    
    keyToAnimate.classList.add('piano-key-active')
}

function keyStop(event) {
    const playingNote = document.querySelector(`audio[data-letter="${event.code[3]}"]`)
    if (!playingNote) return;
    const keyToAnimate = document.querySelector(`.piano-key[data-letter="${event.code[3]}"]`)
    
    keyToAnimate.classList.remove('piano-key-active')
}

window.addEventListener('keydown', keyPlay)
window.addEventListener('keyup', keyStop)


function startPlaying(event) {
    const playingNote = document.querySelector(`audio[src="assets/audio/${event.target.getAttribute("data-note")}.mp3"]`)
    playingNote.currentTime = 0;
    playingNote.play()
    event.target.classList.add("piano-key-active")
    event.target.classList.add("piano-key-active-pseudo")
}

function stopPlaying(event) {
    event.target.classList.remove("piano-key-active")
    event.target.classList.remove("piano-key-active-pseudo")
}

function pianoClickPress(event) {
    startPlaying(event);
    pianoKeys.forEach((element) => {
        element.addEventListener('mouseover', startPlaying)
        element.addEventListener('mouseout', stopPlaying)
    })
}
piano.addEventListener('mousedown', pianoClickPress)
document.addEventListener('mouseup', pianoClickRelease)

function pianoClickRelease(event) {
    pianoKeys.forEach((element) => {
        event.target.classList.remove("piano-key-active")
        event.target.classList.remove("piano-key-active-pseudo")
        element.removeEventListener('mouseover', startPlaying)
        element.removeEventListener('mouseout', stopPlaying)
    })
}
