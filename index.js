let stats = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    loss: 0,
    tie: 0,
}

// Global variable that displays round result to user.
const resultElement = document.querySelector('.js-result')

//Global variable that displays result
const updateScoreElement = document.querySelector('.js-score')

function optionDisplay(option) {
    const optionElement = document.querySelector(`.js-option-${option}`);
    optionElement.innerHTML = option;
}

function optionRemove(option) {
    const optionElement = document.querySelector(`.js-option-${option}`);
    optionElement.innerHTML = '...';
}

function playGame(playerMove) {
    let result = '';
    const computerChoice = computerMove();
    if (playerMove === computerChoice ) {
        result = 'tie';
        stats.tie += 1
    } else if (playerMove === 'rock' && computerChoice === 'scissors') {
        result = 'win';
        stats.wins += 1
    } else if (playerMove === 'scissors' && computerChoice === 'paper') {
        result = 'win';
        stats.wins += 1;
    } else if (playerMove === 'paper' && computerChoice === 'rock') {
        result = 'win';
        stats.wins += 1;
    } else {
        result = 'lose';
        stats.loss += 1;
    }

    localStorage.setItem('score', JSON.stringify(stats));

    resultElement.innerHTML = `
        <h4>Round Result</h4>
        <h5>You: <img class="result-img" src="images/${playerMove}.png" alt="${playerMove}">   
            <img class="result-img" src="images/${computerChoice}.png" alt="${computerChoice}"> : Compute</h5>
        <h2 class="result">${result}</h2>
        `
    
    updateScoreElement.innerHTML = `wins : ${stats.wins} | loss : ${stats.loss} | tie : ${stats.tie}`;
}

function computerMove() {
    let move = '';
    const randResult = Math.random()
    if (randResult > 0 && randResult < (1 / 3)) {
        move = 'rock';
    } else if (randResult > (1 / 3 ) && randResult < (2 / 3)) {
        move = 'paper';
    } else {
        move = 'scissors';
    }

    return move;
}

function resetScore() {
    stats.wins = 0;
    stats.loss = 0;
    stats.tie = 0;
    localStorage.removeItem('score');
    resultElement.innerHTML = '';
    updateScoreElement.innerHTML = 'wins : 0 | loss : 0 | tie : 0';
}