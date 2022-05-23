const guessGrid = document.querySelector("[data-guess-grid]")
const alertContainer = document.querySelector("[data-alert-container]")
const keyboard = document.querySelector("[data-keyboard]")
const wordLength = 5
const FLIP_ANIMATION_DURATION = 500
const DANCE_ANIMATION_DURATION = 500
const offsetFromDate = new Date(2022, 1, 1)
const msOffset = Date.now() - offsetFromDate
const dayOffset = msOffset / 1000 / 60 / 60 / 24
const targetWord = targetWords[Math.floor(dayOffset)]
const srfeedback = document.getElementById("srfeedback")
const totalWords = [...targetWords, ...dictionary]
const srArialabel = document.querySelector("[data-srFeedback]")
const winMessage = `You got it! It was ${targetWord}. Well done.`
const loseMessage = `You didn't guess the word in time. It was ${targetWord}. Better luck next time.`
const notWord = "word is not in the dictionary"
const shortWord = "The word is not long enough"
let srMessageText

startInteraction()

function startInteraction() {
    document.addEventListener("click", handleMouseClick)
    document.addEventListener("keydown", handleKeyPress)    
}

function stopInteraction() {
    document.removeEventListener("click", handleMouseClick)
    document.removeEventListener("keydown", handleKeyPress)    
}

function handleMouseClick(e){
    if(e.target.matches("[data-key]")){
        pressKey(e.target.dataset.key)
        return
    }

    if(e.target.matches("[data-enter]")){
        submitGuess()
        return
    }
    
    if(e.target.matches("[data-delete]")){        
        deleteKey()
        return
    }
}

function handleKeyPress(e){
    if(e.key==="Enter"){
        submitGuess()
        return
    }

    if(e.key==="Backspace" || e.key==="Delete"){
        deleteKey()
        return
    }

    if(e.key.match(/^[a-z]$/)){
        pressKey(e.key)
        return
    }   
}

function pressKey(key){
    const activeTiles = getActiveTiles()
if(activeTiles.length>=wordLength) return
 const nextTile = guessGrid.querySelector(":not([data-letter])")
 nextTile.dataset.letter = key.toLowerCase()
 nextTile.textContent = key;
 nextTile.dataset.state = "active" 
}

function deleteKey(){
    const activeTiles = getActiveTiles()
    const lastTile = activeTiles[activeTiles.length - 1]
if(lastTile==null) return
lastTile.textContent = ""
delete lastTile.dataset.state
delete lastTile.dataset.letter
}

function submitGuess(){
    const activeTiles = [...getActiveTiles()]
    if(activeTiles.length !== wordLength){
        showAlert("Not long enough")
        assistiveMessage(shortWord)        
        shakeTiles(activeTiles);
        return
    }

    const guess = activeTiles.reduce((word, tile)=>{
        return word + tile.dataset.letter
    },"")

    if(!totalWords.includes(guess)){
        showAlert("Not in word list")
        assistiveMessage(notWord)
        shakeTiles(activeTiles);        
        return
    }

    stopInteraction()

    activeTiles.forEach((...params) => flipTile(...params, guess))   
}

function flipTile(tile, index, array, guess){
    const letter = tile.dataset.letter
    const key = keyboard.querySelector(`[data-key="${letter}"i]`)
    
    setTimeout(() => {
        tile.classList.add("flip")
    }, index * FLIP_ANIMATION_DURATION / 2);

    tile.addEventListener("transitionend", ()=>{
        tile.classList.remove("flip")
        if(targetWord[index]=== letter){            
            tile.dataset.state = "correct"
            key.classList.add("correct")        
           window['string'+index] = `${tile.dataset.letter} is ${tile.dataset.state}`                    
        } else if(targetWord.includes(letter)){
            tile.dataset.state = "wrong-location"
            key.classList.add("wrong-location")
            window['string'+index] = `${tile.dataset.letter} is in the ${tile.dataset.state}`
        } else{
            tile.dataset.state = "wrong"
            key.classList.add("wrong")
            window['string'+index] = `${tile.dataset.letter} is ${tile.dataset.state}`
        }
        
        if(index===array.length-1){
            tile.addEventListener("transitionend", ()=>{
           startInteraction()
            checkWinLose(guess, array)                      
        }, {once:true})  
        srMessageText = `${string0}, ${string1}, ${string2}, ${string3}, ${string4}.`
       assistiveMessage(srMessageText)  
    }    
    }, {once:true})     
}


function getActiveTiles() {
return guessGrid.querySelectorAll('[data-state="active"]')
}

function showAlert(message, duration = 1000) {
const alert = document.createElement("div")
alert.textContent = message
alert.classList.add("alert")
alertContainer.prepend(alert)
srfeedback.innerHTML = alert
if(duration == null) return

setTimeout(() => {
    alert.classList.add("hide")
    alert.addEventListener("transitionend", ()=>{
        alert.remove();
    })
}, duration);
}

function assistiveMessage(srMessage) {
    srfeedback.innerHTML = srMessage
    srArialabel.ariaLabel = srMessage
}

function shakeTiles(tiles){
tiles.forEach(tile =>{
    tile.classList.add("shake")
    tile.addEventListener("animationend",()=>{
tile.classList.remove("shake")
    }, {once: true})
})
}

function checkWinLose(guess, tiles) {
    if(guess===targetWord){
        showAlert("You win!", 5000)
        danceTiles(tiles)
        stopInteraction()   
        assistiveMessage(winMessage)      
        return
    }

    const remainingTiles = guessGrid.querySelectorAll(":not([data-letter])")
    if(remainingTiles.length===0){
        showAlert(targetWord.toUpperCase(),null)
        stopInteraction()
        assistiveMessage(loseMessage) 
    }
}

function danceTiles(tiles){
    tiles.forEach((tile, index) =>{
        setTimeout(() => {
        tile.classList.add("dance")
        tile.addEventListener("animationend",()=>{
    tile.classList.remove("dance")
        }, {once: true})    
        }, index * DANCE_ANIMATION_DURATION / 5);        
    })
    }