let startTime
let endTime

//Getting the users inputs from the client
function getFormInputs(event){
    let textToSramble = document.getElementById("text").value
    let sensitiveWords = document.getElementById("word").value
    let replacement = document.getElementById("pattern").value
    startTime = performance.now();
    
    if (textToSramble && sensitiveWords && replacement){
        scrambleWords(textToSramble,sensitiveWords,replacement)
    }
    event.preventDefault();
}

function scrambleWords(textToSramble,sensitiveWords,replacement){
    wordsScanned = textToSramble.split(" ")
    let charactersScrambled = 0
    let wordsMatched = 0
    let wordsToSramble = sensitiveWords.split(" ")
    wordsToSramble.forEach(word => {
        //Check if word to scramble exists in the text to be scrambled
        if(word && textToSramble.toLowerCase().search(word.toLowerCase()) !== -1){
            wordsMatched += 1
            charactersScrambled += word.length
            let replaceWithPattern = replaceString(word,replacement)
            let regex = new RegExp(word,"gi")
            textToSramble = textToSramble.replaceAll(regex,replaceWithPattern)
        }
    });
        endTime = performance.now();
        const timeTaken = endTime - startTime

        //Display output to user
    document.getElementById("output").style.display = "block"
    document.getElementById("scramble").innerText = textToSramble
    document.getElementById("analytics").innerHTML = `
    <li>This took ${Math.ceil(timeTaken/1000)} seconds</li>
    <li>${wordsScanned.length} words were scanned</li>
    <li>${charactersScrambled} characters were scrambled</li>
    <li>${wordsMatched} word(s) matched for scrambling</li>
    `
}


function replaceString(word,replacement){
    return replacement.repeat(word.length)
}



