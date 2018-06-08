$(document).ready(function() {
    var words = ["StephenCurry", "KlayThompson", "DraymondGreen", "KevinDurant", "LebronJames", "PeteMaravich", "OscarRobertson", "BillRussell", "MagicJohnson", "MichaelJordan", "TimDuncan", "KareemAbdulJabbar", "LarryBird", "KawhiLeonard", "ElginBaylor", "JuliusIrving", "JohnStockton", "DirkNowitzki", "OscarRobertson", "ShaquilleOneal", "KobeBryant", "HakeemOlajuwon", "ConnieHawkins", "WiltChamberlain", "ScottiePippen", "KareemAbdulJabbar", "GeorgeGervin", "JerryWest", "BobCousy", "IsiahThomas",];

    function selectRandomWord() {
        return words[Math.floor(Math.random() * words.length)].toLowerCase();
    }

    var word;
    var answerArray = [];
    var guessesRemaining;
    var wrongLetters = [];
    var homeScore = 0;
    var awayScore = 0;

    function resetAnswerArray(word) {
        var answerArray = [];
        for (var i = 0; i < word.length; i++) {
            answerArray[i] = "_";
        }
        return answerArray;
    }

    function displayWord() {
        var answerString = answerArray.join(" ");
        $("#blankspace").text(answerString);
    }

    function displayGuessesRemaining() {
        $("#guessesremaining").text(guessesRemaining);
    }

    function displayWrongLetters() {
        $("#wrongletters").text(wrongLetters);
    }

    function displayHomeScore () {
        $("#homescore").text(homeScore)
    }

    function displayAwayScore () {
        $("#awayscore").text(awayScore)
    }

    // resetWord sets 'word', 'wrongLetters' and 'guessesRemaining' to their default values.
    function resetWord() {
        word = selectRandomWord();
        console.log(word);
        wrongLetters = [];
        guessesRemaining = 10;
        answerArray = resetAnswerArray(word);

        displayWord();
        displayGuessesRemaining();
        displayWrongLetters();
    }

    // set word, wrongLetters, guessesRemaining and answerArray to default values and 
    // display word, guessesRemaining and wrongLetters
    resetWord();
    // display home score and away score
    displayHomeScore();
    displayAwayScore();

    function guessLetter(userGuess) {
        // check if letter is contained within word
        var correctGuess = word.includes(userGuess);
        // if correct, update answer array
        if (correctGuess) {
            // keep track of all indices where letter appears
            var index = word.indexOf(userGuess);
            var allIndices = [];
            while (index != -1) {
                allIndices.push(index);
                index = word.indexOf(userGuess, index + 1);
            }
            // go through all indices array and change underscores in those indices to letters
            for (var i = 0; i < allIndices.length; i++) {
                var index = allIndices[i];
                answerArray[index] = userGuess;
            }
            // if word is complete, the player won.
            // add 1 to home score, display home score, reset the word.
            if (answerArray.join('') == word) {
                homeScore +=1;
                displayHomeScore();
                resetWord();
            }

            // update the display
            displayWord();
        }
        else {
            // if guess is wrong, reduce remaining guesses by 1, and add letter to "wrong letters"
            guessesRemaining -= 1;
            wrongLetters.push(userGuess);
            // display the updated guesses remaining and wrong letters
            displayGuessesRemaining();
            displayWrongLetters();

            // if remaining guesses is zero, the player lost.
            // add 1 to away score, display away score, reset the word
            if (guessesRemaining == 0) {
                awayScore += 1;
                displayAwayScore();
                resetWord();
           }
        }
    }

    document.onkeyup = function(event) {
        let userGuess = event.key;
        console.log(userGuess);
        // make sure only responds to alphabetical letters
        if (userGuess.length == 1 && userGuess.match(/[a-z]/i)) {
            guessLetter(userGuess);
        }
    }
})