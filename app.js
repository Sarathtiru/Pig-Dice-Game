/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice1, dice2, diceNumber, finalScore, oneFlag;

init();


 document.querySelector('.btn-roll').addEventListener('click',function(){

    // 1. Random number
    dice1 = Math.floor(Math.random()* 6) + 1;
    dice2 = Math.floor(Math.random()* 6) + 1;

    console.log(dice1+" "+'dice1 number');
    console.log(dice2+" "+'dice2 number');

    // 2.Display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'dice-' + dice1 +'.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 +'.png';
   
    // document.querySelector('#current-0').textContent = dice;
    //3. Update the round score if the rolled number was NOT a 1

    if (dice1 !== 1 && dice2 !== 1){
        
        //Add score
        roundScore += dice1 + dice2;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
      
    }
    else{
        //Next player
       nextPlayer();
        
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    //Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   
    //Check if player won the game
    finalScore = document.querySelector('.final-score').value;
    //console.log(finalScore);
    if(!finalScore){finalScore = 20;}
    if(scores[activePlayer] >= finalScore){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner')
        document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active')
    } 
    else{
        //Next player
        nextPlayer();

    }

    
});

function nextPlayer(){

    roundScore = 0;
    diceNumber = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

   


}
document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    scores = [0,0];
roundScore = 0;
activePlayer = 0;

document.getElementById('score-0').textContent = 0;
document.getElementById('score-1').textContent = 0;
document.getElementById('current-0').textContent = 0;
document.getElementById('current-1').textContent = 0;

 document.getElementById('dice-1').style.display = 'none';
 document.getElementById('dice-2').style.display = 'none';

 document.getElementById('name-0').textContent = 'Player 1';
 document.getElementById('name-1').textContent = 'Player 2';

 document.querySelector('.player-1-panel').classList.remove('active');
 document.querySelector('.player-0-panel').classList.add('active');
 
 document.querySelector('.btn-roll').disabled = false;
 document.querySelector('.btn-hold').disabled = false;
}

