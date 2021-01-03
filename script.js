'use strict';

//Selecting elements
const score0Ele = document.querySelector('#score--0');
const score1Ele = document.getElementById('score--1');
const current0Ele = document.getElementById('current--0');
const current1Ele = document.getElementById('current--1');
const player0Ele = document.querySelector('.player--0');
const player1Ele = document.querySelector('.player--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Starting condition
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;

  diceEle.classList.add('hidden');
  player0Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--winner');
  player1Ele.classList.remove('player--active');
  player0Ele.classList.add('player--active');
};

init();

const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Ele.classList.toggle('player--active');
  player1Ele.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (!playing) return;
  //1. Generating a random roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  //2. Display dice
  diceEle.classList.remove('hidden');
  diceEle.src = `dice-${dice}.png`;

  //3. Check for rolled 1
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    //Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', () => {
  if (!playing) return;
  //1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. Check if player wins score>=100 , end the game
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEle.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    switchPlayer();
  }
  //Switch player
});

btnNew.addEventListener('click', init);
