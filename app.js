const letters = document.querySelectorAll(".alphabet")
const gameRow = document.querySelectorAll(".gameRow")
let currentRow = 0
let currentTile = 0
let userWord = ""
let targetWord = ""
const enterButton = document.querySelector(".enter")
const clearButton = document.querySelector(".clear")

setTargetWord()

for (const item of letters) {
    item.addEventListener("click", () => {
        if (currentTile === 5) {
            return
        }
        userWord += item.innerHTML
        console.log(userWord)
        gameRow[currentRow].children[currentTile].innerHTML = item.innerHTML //make var for this
        gameRow[currentRow].children[currentTile].style.animation = "jump 0.4s"
        currentTile++
    })
}

enterButton.addEventListener("click", () => {
    if (userWord.length !== 5) {
        alert("Not enough letters")
    }
    else {
        checkWordIsValid()
    }
})

clearButton.addEventListener("click", () => {
    userWord = userWord.substring(0, userWord.length - 1)
    console.log(userWord)
    gameRow[currentRow].children[currentTile - 1].innerHTML = ""
    currentTile--
})

async function checkWordIsValid() {
    const wordcheck = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`)
    const data = await wordcheck.json()
    console.log(data)
    if (Array.isArray(data)) {
        console.log("valid")
        checkSequence()
        resetUserWordAndRow()
    }
    else {
        alert("invalid word")
    }
}

function resetUserWordAndRow() {
    userWord = ""
    currentRow++
    currentTile = 0
}

async function setTargetWord() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '29d6a287cemsh3e2463647081f31p1218c2jsna4404faf76a8',
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
        }
    }

    let target = await fetch('https://random-words5.p.rapidapi.com/getMultipleRandom?count=1&wordLength=5', options)

    let ArrtargetWord = await target.json()

    targetWord = ArrtargetWord.toString().toUpperCase()

    console.log(targetWord)
}

function checkSequence() {
    for (let character in userWord) {
        console.log(userWord[character])
        if (targetWord.includes(userWord[character])) {
            gameRow[currentRow].children[character].style.background = "#b59f3b"
            gameRow[currentRow].children[character].style.animation = "flip 0.4s"
            let kbTile = document.querySelector(`.${userWord[character].toLowerCase()}`)
            kbTile.style.background = "#b59f3b"
            
        }
        if (targetWord[character] == userWord[character]){
            gameRow[currentRow].children[character].style.background = "#538d4e"
            gameRow[currentRow].children[character].style.animation = "flip 0.4s"
            let kbTile = document.querySelector(`.${userWord[character].toLowerCase()}`)
            kbTile.style.background = "#538d4e"
            
        }
        else {
            console.log("f")
        }
    }
}