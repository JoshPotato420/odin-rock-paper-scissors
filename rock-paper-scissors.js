// 5 round rock, paper, scissors game against a computer
let roundsPlayed = 0;
// Get random computer choice
function getComputerChoice() {
    // Scale random number to 3 options  
    let computerChoice = Math.floor(Math.random() * 3);
    switch (computerChoice) {
        case 0: return 'rock';
        case 1: return 'paper';
        case 2: return 'scissors';
    }
}

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// Make play round function
function playRound(playerSelection, computerSelection) {
    // Compare computer and player choice to decide winner
    // Tie outcome
    if (playerSelection === computerSelection) {
        return (`You tied! Both played ${playerSelection}`);
    // Winning outcomes
    } else if ((playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')) {
        return `You win! ${capitalize(playerSelection)} beats ${capitalize(computerSelection)}`;
    // Losing outcomes
    } else {
        return `You lose! ${capitalize(playerSelection)} doesn't beat ${capitalize(computerSelection)}`;
    }
}

// Increase player score on win
function calcWin(outcomeMessage, playerScore) {
    if (outcomeMessage.includes('win')) {
        playerScore++;
        return playerScore;
    }
    return playerScore;
}
// Increase computer score on lose
function calcLose(outcomeMessage, computerScore) {
    if (outcomeMessage.includes('lose')) {
        computerScore++;
        return computerScore;
    }
    return computerScore;
}

// Create final result message
function createFinalResult(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return (`Winner: ${playerScore} to ${computerScore}!`)
    } else {
        return (`Loser: ${playerScore} to ${computerScore}!`)
    }
}

function playGame() {
    let outcomeMessage = '';
    let playerScore = 0;
    let computerScore = 0;
    let roundsPlayed = 0;
    let results = document.querySelector('#results');
    // Set all buttons into a list
    const choiceButtons = document.querySelectorAll('button');
    // For each button, add a click event listener
    choiceButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            // Play a round with the button choice
            outcomeMessage = playRound(button.textContent.toLowerCase(),
            getComputerChoice());
            //Calculate score
            playerScore = calcWin(outcomeMessage, playerScore);
            computerScore = calcLose(outcomeMessage, computerScore);
            roundsPlayed++;

            if (playerScore === 5 || computerScore === 5) {
                results.textContent = 
                `Round ${roundsPlayed} - 
                FINISH! ${createFinalResult(playerScore, computerScore)}
                ${outcomeMessage}`;
                playerScore = 0;
                computerScore = 0;
                roundsPlayed = 0;               
            } else {
                // Update results with message and score
                results.textContent = `Round ${roundsPlayed} - ${outcomeMessage}!
                Player: ${playerScore} Computer: ${computerScore}`;
            }
        });
    });
}

playGame();