const letters = document.querySelectorAll(".alphabet")
const gameRow = document.querySelectorAll(".gameRow")
console.log(gameRow)
let currentRow = 0
let currentTile = 0
let userWord = ""
const enterButton = document.querySelector(".enter")
const clearButton = document.querySelector(".clear")

for (const item of letters){
    item.addEventListener("click", () => {
        if (currentTile === 5){
            return
        }
        userWord += item.innerHTML
        console.log(userWord)
        gameRow[currentRow].children[currentTile].innerHTML = item.innerHTML //make var for this
        gameRow[currentRow].children[currentTile].style.animation = "jump 0.4s"
        currentTile++
    })
}

enterButton.addEventListener("click", () =>{
    if (userWord.length !== 5){
        alert("Not enough letters")
    }
    else{
        userWord = "" // reset func
        currentRow++
        currentTile = 0
        console.log("perform check")
    }
})

clearButton.addEventListener("click", () =>{
    userWord = userWord.substring(0, userWord.length-1)
    console.log(userWord)
    gameRow[currentRow].children[currentTile - 1].innerHTML = ""
    currentTile-- 
})