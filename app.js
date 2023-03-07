const letters = document.querySelectorAll(".alphabet")
const gameRow = document.querySelectorAll(".gameRow")
console.log(gameRow)
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
        // const wordcheck = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`)
        //     .then(data => data.json())
        //     .then(res => {
        //         console.log(res)
        //         if(Array.isArray(res)){
        //             console.log("valid")
        //         }
        //         else{
        //             alert("not a valid word")
        //         }
        //     })
        checkUserWordWithApi()
        resetUserWordAndRow()
    }
})

clearButton.addEventListener("click", () => {
    userWord = userWord.substring(0, userWord.length - 1)
    console.log(userWord)
    gameRow[currentRow].children[currentTile - 1].innerHTML = ""
    currentTile--
})

async function checkUserWordWithApi() {
    const wordcheck = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userWord}`)
    const data = await wordcheck.json()
    console.log(data)
    if (Array.isArray(data)) {
        console.log("valid")
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

    targetWord = await target.json()

    console.log(targetWord)
}