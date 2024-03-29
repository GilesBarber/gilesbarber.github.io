let finalScore = 0;
const quizTotal = maxQuestions;
let questionSequence = [];
let currentQuestion = 1;
let questionVars, selected = [],
   totalOpt;
let cumulativeScores = [];
const meterStrokeDash = 270;
let nextBtnLabels = [];
let quizInitialised = false;
let resultsGenerated = false;
let userName, userCompany;
const alphabet = ['', 'A', 'B', 'C', 'D'];
const sessionTimerSlows = maxSlowTimers;
let percentageLeft;
let timeDone = 0;
let queryType;
const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);

function initialiseQuiz() {
   if (!quizInitialised) {
      startQuiz();
      quizInitialised = true;
   }
}

function startQuiz() {

   let totalBank = Object.size(questionBank);
   let sequence = [];
   if (quizTotal > totalBank) {
      quizTotal = totalBank;
   }
   for (let i = 1; i <= totalBank; i++) {
      sequence.push(i);
   }
   if (randomiseQuestions) {
      shuffle(sequence);
   }
   for (let i = 1; i <= quizTotal; i++) {
      questionSequence[i] = sequence[i - 1];
   }

   if (timerSecondsOnly) {
      $('.countdown').addClass('displaySeconds');
   }

   generateNextBtn();
   currentQuestion = 1;

}

function startQuestion() {
   questionVars = questionBank[questionSequence[currentQuestion]];
   let question = questionVars.question;
   let options = questionVars.options;
   const optionEl = $('.options');

   totalOpt = Object.size(options);
   selected = [];

   $('#slideQuiz .questionStats').html('Question <strong>' + currentQuestion + '/' + quizTotal + '</strong>');

   deselectOpt('all');

   enableBtn($('.options'));

   $('.options, .black-overlay').stop(true, true).hide();

   $('.questionText').html(question);
   $('.questionText').attr('aria-label', 'Question ' + currentQuestion + ' of ' + quizTotal + ': ' + question);


   for (let i = 1; i <= totalOpt; i++) {
      $('.option' + i).html(options[i]).show();
      // console.log([i])
      // $('.option' + i).attr('aria-label', options[i])
      $('.option' + i).attr('aria-label', "Option:" + i + '. ' + options[i])


   }
   /* <strong>Option ' + alphabet[i] + '</strong><br>' + */
   countdown(defaultCountdown, function () {
      stopMusic();
      playMusic($('#audioMusicQuestion'));

      updateScore();

      resetTimer();
      setTimeout(function () {
         startTimer();
      }, 50);

      $('.questionDiv').focus();
   });

}

function nextQuestion() {
   goToSlide('slideQuiz');
   currentQuestion++;
   startQuestion();
}

function optionClick(num) {
   if (selected[num]) {
      //deselectOpt(num);
   } else {
      if (questionVars.correct.length <= 1) {
         deselectOpt('all');
      }
      selectOpt(num);
   }
   submitQuestion();
}

function selectOpt(num) {
   selected[num] = true;
   highlightOpts();
}

function deselectOpt(num) {
   if (num === 'all') {
      for (let i = 1; i <= totalOpt; i++) {
         selected[i] = false;
      }
   } else {
      selected[num] = false;
   }
   highlightOpts();
}

function highlightOpts() {
   for (let i = 1; i <= totalOpt; i++) {
      if (selected[i]) {
         $('.option' + i).addClass('selected');
      } else {
         $('.option' + i).removeClass('selected');
      }
   }
}


function submitQuestion(type) {

   queryType = type;
   let nextAction;
   let qID = questionSequence[currentQuestion];
   let txt, actionMsg;
   let seconds = Math.round(timeLeft);
   let timeUsed = timerLimit - seconds;
   let feedbackTexts = createFbTexts();
   let pointsEarned = 0;

   disableBtn($('.options'));
   $('.character img').hide();

   pauseTimer();

   $('.feedbackIcon img').hide();

   if (isCorrect(qID)) {
      txt = feedbackTexts.correct;

      userStats.scoreCounter += percentageLeft;

      pointsEarned = percentageLeft //pointsPerCorrect + (seconds * pointsPerSecond);

      $('.character .charCorrect').show();
      $('.correctIcon').show();

      stopMusic();
      playMusic($('#audioCorrect'));

   } else {

      if (type === 'timeout') {
         txt = defaultFeedbacks.timeout;
         $('.timeoutIcon').show();
         $('.character .charTimeout').show();
      } else {
         txt = feedbackTexts.incorrect;
         $('.incorrectIcon').show();
         $('.character .charIncorrect').show();
      }
      stopMusic();
      playMusic($('#audioWrong'));
   }

   if (currentQuestion >= quizTotal) {
      actionMsg = actionMsgs.finalScore;
   } else {
      actionMsg = actionMsgs.next;
   }

   cumulativeScores.push(pointsEarned);
   $('.feedbackText .message').html(txt);
   $('.feedbackText .instruction-msg').html(actionMsg);
   $('.feedbackText .pointsEarned').html(pointsEarned);
   $('#averageScore .pointsEarned, .scoreBar .timerText').html(pointsEarned);
   $('#slideFeedback .questionStats').html($('#slideQuiz .questionStats').html());
   

   nextActionBtns();

   updateScore();

   goToSlide('slideFeedback', nextAction);
   setTimeout(resetTimer, 1000)
   $('.feedbackText').focus()
}

function isCorrect(qID) {
   let qVars = questionBank[qID];
   let uAnswer = [];

   let isCorrect = true;
   for (let i = 1; i <= totalOpt; i++) {
      let nIsCorrect = false;
      for (let j = 0; j < qVars.correct.length; j++) {
         let N = qVars.correct[j];
         if (i === N) {
            nIsCorrect = true;
         }
      }
      if (selected[i]) {
         uAnswer.push(i);
         if (!nIsCorrect) {
            isCorrect = false;
         }
      }
   }
   for (let i = 0; i < qVars.correct.length; i++) {
      let correctN = qVars.correct[i];
      if (!selected[correctN]) {
         isCorrect = false;
      }
   }

   questionBank[qID].userAnswer = uAnswer;
   questionBank[qID].userIsCorrect = isCorrect;

   return isCorrect;
}

function createFbTexts() {
   let feedbackTexts = {
      correct: defaultFeedbacks.correct,
      incorrect: defaultFeedbacks.incorrect
   };
   let fb = questionVars.feedback;

   if (fb !== void(0)) {
      if (fb.correct !== void(0) && fb.correct.trim() !== '') {
         feedbackTexts.correct = fb.correct;
      }
      if (fb.incorrect !== void(0) && fb.incorrect.trim() !== '') {
         feedbackTexts.incorrect = fb.incorrect;
      }
   }
   return feedbackTexts;
}


function nextActionBtns() {
   if (currentQuestion >= quizTotal) {
      $('#btn-next-question').hide();
      $('.btn-aveScore').show();
      // console.log("trigger");
      $('.btn-results').show();
      if(!timerDisabled) {
         $('.prize-btn--timer-off').hide();
      }
   } else {
      $('#btn-next-question').html(nextBtnLabels[currentQuestion]);
      $('#btn-next-question').show();
      $('#btn-next-question').focus();
      $('.btn-aveScore').hide();
      $('.btn-results').hide();

   }
}

function generateNextBtn() {
   let n = 0;
   let limit = buttonStartText.length;
   let array1 = [];
   for (let i = 1; i <= quizTotal; i++) {
      array1.push(n);
      n++;
      if (n >= limit) {
         n = 0;
      }
   }
   shuffle(array1);
   for (let i = 1; i <= quizTotal; i++) {
      nextBtnLabels[i] = buttonStartText[array1[i - 1]];
   }
}


function restartQuiz() {

   resultsGenerated = false;
   timerOn = true;
   getPrize = true;
   root.style.setProperty('--timeInvert', '0%');
   resetUserStats();
   startQuiz();
   startQuestion();
   setTimeout(function () {
      updateScore();
   }, 500);
}

// SCORE //

function updateScore() {

   let score = userStats.scoreCounter;
   let correct = userStats.correctAnswers;
   let bonus = userStats.timeBonus;
   let totalpoints = score + bonus;

   //Leaderboard player's points
   $('.correct-answers-text').html('Correct answers: ' + correct + '<br><strong>' + score + ' points</strong>');
   $('.time-bonus-text').html('Time bonus <br><strong>' + bonus + ' points</strong>');
   $('.total-points').html('Total <br> <strong>' + totalpoints + ' points</strong>');
   //Point counter during game
   $('.totalPoints').html('Points <strong>' + totalpoints + '</strong>');

   $('.score-txt').html(userStats.scoreCounter);
}

// TIMER //

let intTimer, paused, start, duration, durationOld, timeLeft, minutes, seconds, now, canSlowTimer;

function startTimer() {
   resetTimer();
   if (!timerDisabled) {
      initiateTimer();
   }
}

function resetTimer() {
   duration = timerLimit * 1000;
   durationOld = duration;
   start = Date.now();
   document.getElementById("slowTimerButton").disabled = true;
   $('rect').removeClass('midColor lowColor');
   $('.timerText').removeClass('midColor lowColor');
   root.style.setProperty('--timeInvert', '0%');
   timer();
}

function initiateTimer() {
   paused = false;
   if (sessionTimerSlows > 0) {
      canSlowTimer = true
   } else {
      canSlowTimer = false
   }
   start = Date.now();
   intTimer = setInterval(timer, 500);
}

function timer() {
   if (!paused) {
      // get the number of seconds that have elapsed since 
      now = Date.now() - start;
      milisecondsLeft = duration - now;
      timeLeft = milisecondsLeft / 1000;

      // does the same job as parseInt truncates the float
      minutes = (timeLeft / 60) | 0;
      seconds = (timeLeft % 60) | 0;

      percentageLeft = Math.round((milisecondsLeft / durationOld) * maxTimer);
      let inverted = 100 - percentageLeft;
      root.style.setProperty('--timeInvert', inverted + '%');
      if (timerLimit > 0) {
         checkTimer();
      }

      setMeter((duration - (milisecondsLeft)) / duration);

      if (timerSecondsOnly) {
         $('.countdown').html(percentageLeft);
      } else {
         minutes = minutes < 10 ? "0" + minutes : minutes;
         seconds = seconds < 10 ? "0" + seconds : seconds;
         $('.countdown').html(minutes + ":" + seconds);
      }
   }
}

function slowTimer() {

   let varTimeInvert;
   if (canSlowTimer) {

      duration += extraTime * 1000;

      const slowedTime = percentageLeft + extraTimeBar;
      const inverted = 100 - slowedTime;

      root.style.setProperty('--timeInvert', inverted + '%');

      canSlowTimer = false;
      document.getElementById("slowTimerButton").disabled = true;
      sessionTimerSlows--;

   }
}

function checkTimer() {

   if (timeLeft <= 0) {
      timerFinished();
   } else if (timeLeft <= timerRed + 1) {
      $('.timerText').removeClass('midColor').addClass('lowColor');

   } else if (timeLeft <= timerAmber + 1) {
      $('.timerText').removeClass('lowColor').addClass('midColor');
      $('.black-overlay').fadeIn(5000);
      if (canSlowTimer) {
         $('#slowTimerButton').removeAttr('disabled');
      };
   }
}

function setMeter(percent) {}

function pauseTimer() {
   paused = true;
   clearInterval(intTimer);
}

function resumeTimer() {
   initiateTimer();
}

function timerFinished() {
   pauseTimer();
   submitQuestion('timeout');
}

// RESULTS //

function getAveScore() {
   root.style.setProperty('--timeInvert', '100%');
   let scoreResult = 0;
   for (let i = 0; i < cumulativeScores.length; i++) {
      scoreResult += cumulativeScores[i];
   }
   const avg = Math.round(scoreResult / cumulativeScores.length);
   const avgInvert = 100 - avg;
   $(".averagePoints").html(avg);
   finalscore = avg;
   setTimeout(function () {
      root.style.setProperty('--timeInvert', avgInvert + '%')
   }, 1000);

};

let newAward, newImage;

function generatePrize() {
   $(".black-overlay").fadeIn(1500);
   const random = Math.floor(Math.random() * (prizeBank.length - 1));
   newAward = prizeBank[random];
   newImage = prizeBank[random].imageURL;
   $("#insertPrize1, #insertPrize2").text(newAward.prizeName);
   document.getElementById("prizeImage").src = newImage;
   getPrize = false;
}


function gotoResults() {

   updateScore();

   if (!resultsGenerated) {

      generateLeaderboard();

      $('.popup').fadeOut(500, function () {

         const txt = '<h2>Enter your name</h2><br>' +
            '<form action="" id="entername"><input type="text" placeholder="Name" class="username-input" maxlength="50"/><br>' +
            '<input type="hidden" placeholder="Room Number" class="company-input" maxlength="50"/>' +
            '<br><div class="center"><button type="submit" class="btns btns-middle" id="btn-enter-name" title="">Submit</button></div>' +
            '</form>';

         $('#btn-enter-name').show();

         $('.popup .text .message').html(txt);
         $('.popup').fadeIn(500);

         $('.username-input').focus();

         $('#entername').submit(function (event) {
            event.preventDefault();
            submitName();
         });
      });

      resultsGenerated = true;

   }

}

function generateLeaderboard() {

   if (showAds) {
      showAvadoAds();
   }

   const score = userStats.scoreCounter;
   const bonus = userStats.timeBonus;
   const totalpoints = score + bonus;

   userData.leaderboard.push({
      name: 'currentUser',
      company: 'currentCompany',
      points: totalpoints,
      isUser: true
   });

   //sort list ascending
   let leaderboardAscending = [];
   var temp = $.extend(true, {}, userData.leaderboard);

   for (let i = 1; i <= Object.size(temp); i++) {
      let highest = 0,
         num = 0;
      for (let j = 0; j < Object.size(temp); j++) {
         let pts = parseInt(temp[j].points, 10);
         if (pts >= highest && !temp[j].used) {
            highest = pts;
            num = j;
         }
      }
      leaderboardAscending[i] = userData.leaderboard[num];
      temp[num].used = true;
   }

   //generate rows

  const content = '<div class="ld-row header"><div class="ld-col rank"><div>#</div></div><div class="ld-col name"><div>Name</div></div><div class="ld-col points"><div>Points</div></div></div>';
   let userNotPlacedYet = true;
   const usernameStr = '<span class="username">&nbsp;</span>';
   const companyHolder = '<span class="companyHolder">&nbsp;</span>';
   const usersTotal = leaderboardListMax;

   for (let i = 1; i <= usersTotal; i++) {
      if (leaderboardAscending[i].isUser) {
         userNotPlacedYet = false;
         content += genRow(i, usernameStr, companyHolder, totalpoints, ' user');
      } else {
         content += genRow(i, leaderboardAscending[i].name, leaderboardAscending[i].company, leaderboardAscending[i].points);
      }
   }

   //add user if not placed yet

   if (userNotPlacedYet) {
      let num = 0;
      for (let i = 0; i < Object.size(temp); i++) {
         num++;
         if (temp[i].isUser) {
            userRank = num + 1;
         }
      }
      content += genRow(num, usernameStr, companyHolder, totalpoints, ' user');
      userNotPlacedYet = true;
   }

   //generate rows function

   function genRow(n, name, company, points, classes) {
      if (classes === void(0)) {
         classes = '';
      }
      let opacity = 1 - (n / 15);
      if (classes.search('user') > -1) {
         opacity = 1;
      }
      return '<div class="ld-row' + classes + '" style="opacity:' + opacity + '">' +
         '<div class="ld-col rank" data-num="' + n + '"><div>' + n + '</div></div>' +
         '<div class="ld-col name"><div>' + name + '</div></div>' +
         '<div class="ld-col points"><div>' + points + '</div></div>' +
         '</div>';
   }

   //saveToStorage();

   $('.leaderboard-list').html(content);
   $('#slideLeaderboard .leaderboard').hide();

}

function submitName() {
   userName = $('.username-input').val();
   userCompany = $('.company-input').val();
   if (userName !== '') {
      $('.username').html(userName);
      $('.companyHolder').html(userCompany + ' ');

      for (let i = 0; i < Object.size(userData.leaderboard); i++) {
         if (userData.leaderboard[i].isUser) {
            userData.leaderboard[i].name = userName;
            userData.leaderboard[i].company = userCompany;
         }
      }

      setBestTimes();

      saveToStorage();

      ////console.log(userData.leaderboard);

      $('.popup').fadeOut(500);
      $('#btn-restart').focus();
      $('#slideLeaderboard .leaderboard').fadeIn(500);

   }
}

function feedbackList() {
   let output = '';
   for (let qNum = 1; qNum <= quizTotal; qNum++) {
      let qID = questionSequence[qNum];
      let qVars = questionBank[qID];
      let question = qVars.question;
      let options = qVars.options;
      let correctArray = qVars.correct;
      let fastest = qVars.fastest;
      let uAnswer = qVars.userAnswer;

      output += '<li class="ld-row"> ' +
         '<div class="left"><div class="number">' +
         '<span class="question-num">' + qNum + '</span>' +
         '</div></div>' +
         '<div class="rightA" tabindex="0"><span class="qText">' + question + '</span><br>' +
         '<strong></strong>';

      $.each(correctArray, function (index, correctN) {
         let num = index;

         output += '<span>Correct answer: <strong>' + alphabet[correctN] + '. ' + options[correctN] + '</strong></span><br>';
         if (uAnswer !== void(0)) {
            let colour = 'red';
            if (uAnswer[num] == correctN) {
               colour = 'green';
            }
            if (typeof uAnswer[num] === 'undefined') {
               output += '<span class="' + colour + '">' + defaultFeedbacks.noAnswerGiven + '</span><br>';
            } else {
               output += '<span class="' + colour + '">Your answer: <strong>' + alphabet[uAnswer[num]] + '. ' + options[uAnswer[num]] + '</strong></span><br>';
            }
         }
      });

      if (qVars.feedBackText !== '') {
         output += '<span id="feedbackText">' + qVars.feedBackText + '</span><br>';
      }


      output += '</div></li>';
   }
   $('.feedback-list .list').html(output);
}

function setBestTimes() {
   for (let qNum = 1; qNum <= quizTotal; qNum++) {
      let qID = questionSequence[qNum];
      let qVars = questionBank[qID];
      let fastest = qVars.fastest;
      if (qVars.userTime < fastest.time) {
         questionBank[qID].fastest.name = userName;
         questionBank[qID].fastest.company = userCompany;
         questionBank[qID].fastest.time = qVars.userTime;
         userStats.timeStats[qID] = {};
         userStats.timeStats[qID].id = qID;
         userStats.timeStats[qID].name = userName;
         userStats.timeStats[qID].company = userCompany;
         userStats.timeStats[qID].time = qVars.userTime;
      }
   }
}


function showAvadoAds() {

   adTime.startTimer();

   $('.avadoAdverts').fadeIn(100);

}

let adTime = {};

adTime.startTimer = function () {
   adTime.randomPoint = 0, adTime.randomN = 0;
   adTime.duration = avadoAdvertsDuration * 1000;
   adTime.start = Date.now();
   adTime.intTimer = setInterval(adTime.timer, 1);
}
adTime.timer = function () {
   let now = Date.now() - adTime.start;
   adTime.milisecondsLeft = adTime.duration - now;
   adTime.timeLeft = adTime.milisecondsLeft / 1000;

   adTime.randomPoint++;

   if (adTime.randomPoint >= adTime.randomN || adTime.milisecondsLeft <= 10) {
      $('.avadoAdverts .progressBar').css({
         width: (((avadoAdvertsDuration - adTime.timeLeft) / avadoAdvertsDuration) * 100) + '%'
      });
      adTime.randomPoint = 0;
      adTime.randomN = Math.random() * 250;
   }

   if (adTime.timeLeft <= 0) {
      adTime.pauseTimer();
      $('.avadoAdverts').fadeOut(100);
   }
}
adTime.pauseTimer = function () {
   clearInterval(adTime.intTimer);
}

function countdown(time, callback) {

   $('#slideQuiz').hide();
   $('#countdownScreen').fadeIn(500);

   countdownTime.startTimer(time, $('#countdownScreen .countdownTxt'), function () {
      $('#countdownScreen').fadeOut(500);
      $('#slideQuiz').fadeIn(500);
      if (callback !== void(0)) {
         callback();
      }
   });

}

let countdownTime = {},
   countdownInt;

countdownTime.startTimer = function (limitTime, textCounter, callback) {

   textCounter.css({
      'animation': 'none'
   });

   setTimeout(function () {
      textCounter.removeAttr('style');

      countdownTime.duration = limitTime * 1000;
      countdownTime.start = Date.now();
      countdownInt = setInterval(function () {
         countdownTime.timer(limitTime, textCounter, callback)
      }, 1);
   }, 500);
}
countdownTime.timer = function (limitTime, textCounter, callback) {
   let now = Date.now() - countdownTime.start;
   countdownTime.milisecondsLeft = countdownTime.duration - now;
   countdownTime.timeLeft = Math.round(countdownTime.milisecondsLeft / 1000);


   if (countdownTime.milisecondsLeft <= 0) {
      if (countdownTime.milisecondsLeft > -100) {
         if (callback !== void(0)) {
            callback();
            textCounter.html('');
         }
      }
      countdownTime.pauseTimer();
   } else {
      textCounter.html(countdownTime.timeLeft);
   }
}
countdownTime.pauseTimer = function () {
   clearInterval(countdownInt);
}