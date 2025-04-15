//game.js
document.addEventListener('DOMContentLoaded', () => {
    //  ensure all dom elements are loaded before executing the script
    const playBtn = document.getElementsByClassName('play-btn')[0];
    const errorBtn = document.getElementsByClassName('error-btn')[0];
    const errorDiv = document.getElementsByClassName('error-message')[0];
    const resetBtn = document.getElementsByClassName('reset')[0];
    const defaultCardValues = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐙','🦄','🐤'];
    const gameDiv = document.getElementsByClassName('game')[0];
    const resultDiv = document.getElementsByClassName('result')[0];
    const startDiv = document.getElementsByClassName('start')[0];
    // the variable to store the number of turns and cards
    let maxTurns = 0;
    let currentTurns = 0;
    let totalCards = 0;
    let pairedCards = 0;
    let quit;
    // the div created  by the script to manage the game
    const turnsDiv = document.createElement('div');
    const boardDiv = document.createElement('div');
    let eachTurn = [];

    //Funcions

    function handleTurn(card1, card2) {
        // check if the two cards flipped are the same value
        let match = false;
        // we need to lock other cards if two cards are flipped
        const cards = document.getElementsByClassName('card');
        for(let i = 0; i < cards.length; i++){
            cards[i].style.pointerEvents = 'none';
        }
        if(card1.getAttribute('data-value') === card2.getAttribute('data-value')) {
            match = true;
            currentTurns++;
            pairedCards++;
            turnsDiv.textContent = `Turns: ${currentTurns} / ${maxTurns}`;
        }
        else{
            // if not matched
            currentTurns++;
            turnsDiv.textContent = `Turns: ${currentTurns} / ${maxTurns}`;
            card1.style.pointerEvents = 'auto';
            card2.style.pointerEvents = 'auto';
            card1.setAttribute('data-flipped', 'false');
            card2.setAttribute('data-flipped', 'false');
        }

        // the ok button will show up for the result
        const matchDiv = document.createElement('div');
        matchDiv.textContent = match ? 'Match!' : 'No Match!';
        const okBtn = document.createElement('button');
        okBtn.textContent = 'OK';
        if(pairedCards === totalCards / 2){
            matchDiv.textContent = 'You Win!';
        }
        if(currentTurns >= maxTurns){
            matchDiv.textContent = 'Game Over!';
        }
        matchDiv.appendChild(okBtn);
        gameDiv.appendChild(matchDiv);
        okBtn.addEventListener('click', () => {
            if(!match){
                card1.textContent = '❓';
                card2.textContent = '❓';
                card1.setAttribute('data-flipped', 'false');
                card2.setAttribute('data-flipped', 'false');
                card1.style.pointerEvents = 'auto';
                card2.style.pointerEvents = 'auto';
            }
            if(pairedCards === totalCards / 2 || currentTurns >= maxTurns){
                // if all cards are matched
                resultDiv.innerHTML = pairedCards === totalCards / 2
                ? `You Win!<br>You took ${currentTurns} turns!`
                : `You Lose!<br>You took ${currentTurns} turns!`;
                // read the last score from local storage
                const previousScore = localStorage.getItem('lastScore');
                if (previousScore) {
                    const previousScoreDiv = document.createElement('div');
                    previousScoreDiv.innerHTML = `Last Game Score: ${previousScore}`;
                    resultDiv.appendChild(previousScoreDiv);
                }
                resultDiv.style.display = 'block';
                gameDiv.style.display = 'none';
                gameDiv.innerHTML = '';
                quit.remove();
                // show the reset button
                resetBtn.style.display = 'inline-block';
                localStorage.setItem('lastScore', `${currentTurns} / ${maxTurns}`);
                //play again button
                let playAgainBtn = document.getElementById('play-again-btn');
                if(!playAgainBtn){
                    playAgainBtn = document.createElement('button');
                    playAgainBtn.textContent = 'Play Again';
                    playAgainBtn.id = 'play-again-btn';
                    document.body.appendChild(playAgainBtn);
                }
                playAgainBtn.addEventListener('click', () => {
                    resultDiv.innerHTML = '';
                    resetBtn.style.display = 'none';
                    startDiv.style.display = 'block';
                    playAgainBtn.remove();
                });
            }
            
            //recover the pointer events for the cards
            for(let i = 0; i < cards.length; i++){
                if(cards[i].getAttribute('data-flipped') === 'true'){
                    cards[i].style.pointerEvents = 'none';
                }
                else{
                    cards[i].style.pointerEvents = 'auto';
                }
            }
            matchDiv.remove();
            okBtn.remove();
        });
        eachTurn = [];
    }
        
    function showError() {
        // show the error message if the input is invalid
        errorDiv.style.display = 'block';
        errorBtn.style.display = 'inline-block';
    }

    // generate game board
    function generateGameBoard(cardValues) {
        gameDiv.innerHTML = '';
        boardDiv.innerHTML = '';
        gameDiv.appendChild(turnsDiv);
        turnsDiv.textContent = `Turns: 0 / ${maxTurns}`;
        turnsDiv.style.cssText = `
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: bold;
            text-align: center;
        `;
        // calculate the cols 
        let cols = Math.floor(Math.sqrt(totalCards));
        while (totalCards % cols !== 0) {
          cols--;
        }
        gameDiv.style.display = 'block';
        boardDiv.style.cssText = `
          display: grid;
          grid-template-columns: repeat(${cols}, 1fr);
          gap: 10px;
        `;
        for (let val of cardValues) {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = '❓';
            card.setAttribute('data-flipped', 'false');
            card.setAttribute('data-value', val);
            card.onclick = () => {
                if (card.getAttribute('data-flipped') === 'false') {
                    card.textContent = card.getAttribute('data-value');
                    card.setAttribute('data-flipped', 'true');
                    card.style.pointerEvents = 'none';
                }
                eachTurn.push(card);
                if(eachTurn.length == 2){
                    handleTurn(eachTurn[0], eachTurn[1]);
                    return;
                }
                };
            boardDiv.appendChild(card);
        }
        gameDiv.appendChild(boardDiv);
        const quitBtn = document.createElement('button');
        quitBtn.textContent = 'Quit Game';
        quit = quitBtn;
        document.body.appendChild(quitBtn);
        quitBtn.addEventListener('click', () => {
            gameDiv.style.display = 'none';
            startDiv.style.display = 'block';
            //clear all inputs
            document.getElementById('total-cards').value = '';
            document.getElementById('max-turns').value = '';
            document.getElementById('card-faces').value = '';
            quitBtn.remove();
            //remove all cards  
        }
        );
    }

       // bind the event listeners to the buttons
    resetBtn.addEventListener('click', () => {
        resultDiv.innerHTML = '';
        resetBtn.style.display = 'none';
        startDiv.style.display = 'block';
        document.getElementById('total-cards').value = '';
        document.getElementById('max-turns').value = '';
        document.getElementById('card-faces').value = '';
        document.getElementById('play-again-btn').remove();
    });
    // the error button to close the error message
    errorBtn.addEventListener('click', () => {
        errorDiv.style.display = 'none';
        errorBtn.style.display = 'none';
    });


    // start the game
    playBtn.addEventListener('click', () => {
        currentTurns = 0;
        pairedCards = 0;
        eachTurn = [];
        totalCards = parseInt(document.getElementById('total-cards').value);
        maxTurns = parseInt(document.getElementById('max-turns').value);
        const cardInput = document.getElementById('card-faces').value.trim();
        if (
            isNaN(totalCards) ||
            totalCards % 2 !== 0 ||
            totalCards <= 2 ||
            totalCards > 36
          ) {
            return showError();
          }
          if (isNaN(maxTurns) || maxTurns < totalCards / 2) {
            return showError();
          }
          if (cardInput.length > 0) {
            const cardValues = cardInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
            // the length of cardValues must be equal to totalCards
            if (cardValues.length !== totalCards) {
              return showError();
            }
            // works as the HashMap to count the number of each card value
            const countMap = {};
            for (let val of cardValues) {
              countMap[val] = (countMap[val] || 0) + 1;
            }
            for (let key in countMap) {
              if (countMap[key] !== 2) {
                return showError();
              }
            }
            // no shuffle for test
            generateGameBoard(cardValues);    
        }
        else{
            // shuffle the default card values
            const neededPairs = totalCards / 2;
            const values = defaultCardValues.slice(0, neededPairs);
            values.push(...values);
            const shuffledValues = values.sort(() => Math.random() - 0.5);
            // generate the game board with shuffled values
            generateGameBoard(shuffledValues);
        }
        // hide the play button and show the game board
        startDiv.style.display = 'none';
        errorDiv.style.display = 'none';
    });    
  });
  