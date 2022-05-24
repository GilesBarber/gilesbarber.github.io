const buttonStartText = ['Let’s do it!', 'I’m ready!', 'Bring it on!', 'Go!', 'Here we go!'];
let cumulativeScores = [];
let thisGreeting, thisIncorrect, thisCorrect, thisBossGreeting, thisBossIncorrect, thisBossCorrect, random, randomBoss;
let totalScripts = Object.size(charScripts);
let totalBossScripts = Object.size(bossScripts);
const alphabet = ['', 'A', 'B', 'C', 'D'];

const defaultFeedbacks = {
   correct: '<div class="popup-title"><img src="imgs/YesYouGotit-title.svg" class="img-responsive" alt="" /></div> <br>',
   incorrect1: '<div class="popup-title"><img src="imgs/ThatisNotRight-title.svg" class="img-responsive" alt="" /></div> <br>',
   incorrect2: '<div class="popup-title"><img src="imgs/ThatisNotRight-title.svg" class="img-responsive" alt="" /></div> <br>',
   timeout: '<div class="popup-title" style="max-width:250px"><img src="imgs/TimeIsUp-Title.svg" class="img-responsive" alt="" /></div> Try to be quicker next time!'
};
const feedbackIcons = {
   correct: '<span class="correct feedback-icon"><i class="fas fa-check"></i></span> ',
   incorrect: '<span class="incorrect feedback-icon"><i class="fas fa-times"></i></div></span> ',
   tip: '<span class=""><i class="fas fa-user-tie"></i></span> '
};
const actionMsgs = {
   next: 'Ready for the next question?',
   finish: 'OK, shall we find out where you rank on the leaderboard against the best players?'
};
const leaderboard = {
   1: {
      name: 'Dazzling Diana',
      points: 900
   },
   2: {
      name: 'Lightning Lopes',
      points: 900
   },
   3: {
      name: '‘Velocity’ Violeta',
      points: 900
   },
   4: {
      name: 'Glorious Graham',
      points: 800
   },
   5: {
      name: 'Magical Mark',
      points: 800
   },
   6: {
      name: 'Amazing Amy',
      points: 800
   },
   7: {
      name: 'Relaxed Rachael',
      points: 700
   },
   8: {
      name: 'Judicious Jess',
      points: 700
   },
   9: {
      name: 'Calm Claire',
      points: 700
   }
};



let questionSequence = [];

function initQuiz() {

   qNum = 1;
   let qCounter = 1;
   selected = 0;
   let questionVars;
   attempts = defaultAttempts;
   const bankTotal = Object.size(questionBank);
   const quizTotal = questionsTotal;
   let disableClicks = false;
   let nextBtnLabels = [];

   if (quizTotal > bankTotal) {
      quizTotal = bankTotal;
   }

   $('#btn-try-again').on("click", function () {
      tryAgain();
   });

   $('#btn-start-quiz').on("click", function () {
      playMusic($('#audioMopedSound'));
      startQuiz();
      $('.slides').fadeOut(500);
      $(".popup,.btn-start-quiz,.checkbox-container").hide();
      $('.slide3,.crowns-container').fadeIn(500);
      hideButtons();
      driverLevelAnimate(1);
   });

   $('#btn-next-qFeedback').on("click", function () {
      $('.tb').hide();
      $('.popup-box').addClass('noVisability');
      $('.user-avatar,.question-avatar').fadeOut(500);
      $('.qFeedback').fadeIn(500);
      nextActionBtns();
   });

   $('#btn-next-question').on("click", function () {
      if (!disableClicks) {

         $('.popup,.qFeedback').fadeOut(500);
         if (attempts < 1) {
            $('#audiGameOverMusic').animate({
               volume: "1"
            }, 0);
            setTimeout(function () {
               playMusic($('#audiGameOverMusic'));
            }, 500);
            $('.slides').fadeIn(500);
            $('.game-complete,.crowns-container,.glassPane').hide();
            $('.game-over').show();
            $('.slide-results').fadeIn(500);
            $("audio").animate({
               volume: "0"
            }, 500);
            $(".game-over-logo").focus();

         } else {

            if (qNum < 2) {
               $("#sceneIMG").attr("src", "imgs/S1T.png");
               animateStep(pinPoints[qNum + 1]);
            } else if (qNum == 3) {
               $(".slide3").css('background-image', 'url(imgs/BG01.png)');
               animateStep(pinPoints[qNum + 1]);
            } else if (qNum == 5) {
               driverLevelAnimate(2);
               $(".slide3").css('background-image', 'url(imgs/BG03.png)');
               setTimeout(function () {
                  $("#sceneIMG").attr("src", "imgs/S2T.png");
               }, 1000);
            } else if (qNum == 8) {
               driverLevelAnimate(3);
               $(".slide3").css('background-image', 'url(imgs/BG04.png)')
               setTimeout(function () {
                  $("#sceneIMG").attr("src", "imgs/S3T.png");
               }, 1000);
            } else {
               animateStep(pinPoints[qNum + 1]);
            }

            setTimeout(function () {
               $('.qFeedback').removeClass('correct incorrect');
               nextQuestion();
            }, 2000);
         }
      }
   });

   $('#btn-results').on("click", function () {
      if (!disableClicks) {
         submitName();
         gotoResults();
      }
   });

   $('#btn-restart,#btn-restart2').on("click", function () {
      if (!disableClicks) {
         location.reload();
      }
   });

   $("#btn-feedback").click(function () {
      if (!disableClicks) {
         for (qNum = 1; qNum < questionsTotal + 1; qNum++) {
            questionVars = questionBank[qNum];
            $(".feedback-list .list").append('<li class="ld-row">' +
               '<div class="left"><div class="number">' +
               '<span class="question-num">' + qNum + '</span>' +
               '</div></div>' +
               '<div class="right"><span class="qText">' + questionVars.question + '</span><br>' +
               'Correct Answer: <span id="answerText">' + questionVars.answer + '</span><br>' +
               '<span id="feedbackText">' + questionVars.feedBackText + '</span></div>' +
               '</li>');
         }
      }
   });

   $('#btn-previous').on("click", function () {
      if (qNum > 1) {
         qNum--;
      }
      populateFeedbackText();
   });

   $('#btn-next').on("click", function () {
      if (qNum < questionsTotal + 1) {
         qNum++;
      }
      populateFeedbackText();
   });

   function populateFeedbackText() {
      questionVars = questionBank[qNum];
      $('#qText').text(questionVars.question);
      $('#answerText').text(questionVars.answer);
      $('#feedbackText').text(questionVars.feedBackText);

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

   function buildGrid() {
      let output = '';

      for (let i = 1; i <= quizTotal; i++) {
         output += '<a href="" class="option tb option' + i + ' bg' + i + '" data-num="' + i + '" data-index="' + i + '" style="left:105%"><div class="td">' + questionBank[i].answer + '</div></a>';
      }

      $('.options-div').html(output);

      $('.option').on("click", function (e) {
         e.preventDefault();
         if ($(this).hasClass('enabled') && !disableClicks) {
            optionClick($(this));
         }
      });

   }


   $('.options').each(function (index) {
      let num = index + 1;
      $(this).attr('data-num', num).hide();
      $(this).on('click', function (e) {
         e.preventDefault();
         if (!$(this).hasClass('disabled')) {
            optionClick(num);
         }
      });
   });

   function optionClick(num) {
      questionVars = questionBank[qNum];
      if (selected[num]) {
         deselectOpt(num);
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
            $('.options' + i).addClass('selected');
         } else {
            $('.options' + i).removeClass('selected');
         }
      }
   }


   function deselectAll() {
      $('.options').removeClass('selected');
      selected = 0;
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

      $(".slide3").css('background-image', 'url(imgs/BG02.png)')

      generateNextBtn();
      currentQuestion = 1;

   }


   function tryAgain() {
      resetScene();
   }

   function nextQuestion() {
      if (qNum < questionsTotal) {
         qNum++;
      }
      qCounter = qNum;
      startQuestion();
   }

   function resetScene() {
      attempts = defaultAttempts;
      $('.textbox,.bike').hide();
      currentPoint = 0;
      currentQuestion = 0;
      $('.driver img').attr("src", "imgs/KiaroBike.svg");
      $('.driver img').css('transform', 'scale(2.1)');
      $('#sceneIMG').attr("src", "imgs/LightsOff.png");

      $('.driver').css({
         left: "-118px",
         top: "477.826px",
         transform: "scale(0.7)",
         transition: ' transform 1s ease-in-out;'
      });
      init();
   }


   function submitQuestion(type) {

      queryType = type;
      let nextAction;
      let qID = currentQuestion;
      let txt, fbText, actionMsg;
      let seconds = Math.round(timeLeft);
      let timeUsed = timerLimit - seconds;
      let pointsEarned = 0;

      pauseBackgroundMusic();

      disableBtn($('.options'));
      $('.character img').hide();

      //  pauseTimer();

      $('.feedbackIcon img').hide();

      $('.options').hide();

      $('.option' + questionBank[qID].correct).show();

      if (isCorrect(qID)) {

         playMusic($("#audioCorrect-answer-sound"));

         if (currentQuestion == questionsTotal) {
            if (!thisGreeting) {
               txt = defaultFeedback.correct + "<br><br>" + defaultFeedback.final;
            } else {
               txt = thisBossCorrect;
            }
         } else {
            if (!thisGreeting) {
               txt = defaultFeedback.correct;
            } else {
               txt = thisCorrect;
            }
         }
         $('#srQfeedback').text("Correct");
         $('.qFeedback').addClass("correct");
         $('.question-avatar').css('background-image', 'url(' + pinPoints[qNum].character.correct + ')');
         $('.user-avatar').css('background-image', 'url(imgs/Kiaro2.svg)');
         $('.character .charCorrect').show();
         $('.correctIcon').show();
         userStats.scoreCounter += scorePointsDefault;
         userStats.correctAnswers += (Math.round(1));

      } else {

         playMusic($("#audioIncorrect-answer-sound"));

         if (type === 'timeout') {
            txt = defaultFeedbacks.timeout;
            $('.timeoutIcon').show();
            $('.character .charTimeout').show();
         } else {

            if (currentQuestion == questionsTotal) {
               if (!thisGreeting) {
                  txt = defaultFeedback.incorrect + "<br><br>" + defaultFeedback.final;
               } else {
                  txt = thisBossIncorrect;
               }
            } else {
               if (!thisGreeting) {
                  txt = defaultFeedback.incorrect;
               } else {
                  txt = thisIncorrect;
               }
            }
            $('#srQfeedback').text("Incorrect");
            $('.qFeedback').addClass("incorrect");
            $('.incorrectIcon').show();
            $('.character .charIncorrect').show();
         }

         $('.question-avatar').css('background-image', 'url(' + pinPoints[qNum].character.incorrect + ')');
         $('.user-avatar').css('background-image', 'url(imgs/Kiaro3.svg)');
         loseCrown();

      }

      $('.qFeedback').html(txt);
      $('.qFeedback').fadeIn(500);
      setTimeout(() => {
         $('#srQfeedback').focus();
      }, 500);


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

      if (selected == qNum) {
         userStats.scoreCounter += scorePointsDefault;
         userStats.correctAnswers += (Math.round(1));
      }

      updateScore();
      setTimeout(function () {
         // $('#audioMainMusic').play();
         UnpauseBackgroundMusic();
      }, 3000);

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

   $("#livesCount").text(defaultAttempts);

   function loseCrown() {
      $(".crowns:nth-of-type(" + attempts + ")").css("background-image", "url(imgs/Crown-LivesBW.svg)");
      --attempts
      $("#livesCount").text(attempts);
      setTimeout(() => {
         $("#livesUpdate").focus();
      }, 500);

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
      if (qCounter >= quizTotal) {
         $('#btn-next-question').hide();
         $('#btn-results').show();
         $('#btn-results').focus();
      } else {
         $('#btn-next-question').html(nextBtnLabels[qNum]);
         $('#btn-next-question').show();
         $('#btn-next-question').focus();
         $('#btn-results').hide();
      }
      $('.buttons-div2').fadeIn(500);
   }


   function restartQuiz() {
      userStats.scoreCounter = 0;
      userStats.correctAnswers = 0;
      // userStats.timeBonus = 0;
      attempts = defaultAttempts;
      currentPoint = 0;
      qNum = 1;
      $('.popup,.qFeedback').hide();
      $('.qFeedback').removeClass("correct incorrect");
      $('.popup-box').removeClass("noVisability");
      $('.tb,.message,.checkbox-container').show();
      startQuiz();
      setTimeout(function () {
         updateScore();
         showInstructions();
      }, 500);
   }


   // TIMER //

   let intTimer, paused, start, duration = timerLimit,
      timeLeft, minutes, seconds;

   function startTimer() {
      resetTimer();
      if (!timerDisabled) {
         initiateTimer();
      }
   }

   function resetTimer() {
      duration = timerLimit * 1000;
      start = Date.now();
      $('.timerGraph .meter').removeClass('red amber');
      timer();
   }

   function initiateTimer() {
      paused = false;
      start = Date.now();
      intTimer = setInterval(timer, 1);
   }

   function timer() {

      if (!paused) {
         // get the number of seconds that have elapsed since 
         let now = Date.now() - start;
         milisecondsLeft = duration - now;
         timeLeft = milisecondsLeft / 1000;

         // does the same job as parseInt truncates the float
         minutes = (timeLeft / 60) | 0;
         seconds = (timeLeft % 60) | 0;

         if (timerLimit > 0) {
            checkTimer();
         }

         // setMeter((duration - (milisecondsLeft)) / duration);

         if (timerSecondsOnly) {
            $('.countdown').html(seconds);
         } else {
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            $('.countdown').html(minutes + ":" + seconds);
         }
      }
   }

   function checkTimer() {
      if (timeLeft <= 0) {
         timerFinished();
      } else if (timeLeft <= timerRed + 1) {
         $('.timerGraph .meter').removeClass('amber').addClass('red');
      } else if (timeLeft <= timerAmber + 1) {
         $('.timerGraph .meter').removeClass('red').addClass('amber');
         $('.black-overlay').fadeIn(5000);
      }
   }

   function pauseTimer() {
      paused = true;
      clearInterval(intTimer);
   }

   function resumeTimer() {
      initiateTimer();
   }

   function timerFinished() {
      console.log('timerFinished()');
      pauseTimer();
      submitQuestion('timeout');
   }

   generateNextBtn();
   updateScore();
   startTimer();

   setTimeout(function () {
      pauseTimer();
   }, 1);

}

function startQuestion() {
   $("audio").animate({
      volume: "0"
   }, 500);

   $("#srQfeedback").empty();

   /*
   if (qNum == 2 || qNum == 9) {
      $(".option3").hide();
   } else {
      $(".option3").show();
   }*/

   setTimeout(function () {
      pauseBackgroundMusic();
      if (currentQuestion == questionsTotal) {
         $('#audioBoss-question-sound').animate({
            volume: "1"
         }, 0);
         playMusic($('#audioBoss-question-sound'));
      } else {
         $('#audioNormal-question-sound').animate({
            volume: "1"
         }, 0);
         playMusic($('#audioNormal-question-sound'));
      }
   }, 500);


   $(".buttons-div2").hide();

   currentQuestion = qNum;

   questionVars = questionBank[currentQuestion];
   let question = questionVars.question;
   let options = questionVars.options;
   totalOpt = Object.size(options);

   random = Math.round(Math.random() * totalScripts);
   randomBoss = Math.round(Math.random() * totalBossScripts);
   if (random == 0) {
      random = 1
   };
   if (randomBoss == 0) {
      randomBoss = 1
   };

   thisGreeting = charScripts[random].greeting;
   thisCorrect = charScripts[random].responseCorrect;
   thisIncorrect = charScripts[random].responseInorrect;
   thisBossGreeting = bossScripts[randomBoss].greeting;
   thisBossCorrect = bossScripts[randomBoss].responseCorrect;
   thisBossIncorrect = bossScripts[randomBoss].responseInorrect;

   if (qNum == 1 || qNum == 6 || qNum == 8) {
      setTimeout(function () {
         showTextbox();
      }, 800);
   } else {
      showTextbox();
   }

   selected = [];
   if (qNum == 1) {
      setTimeout(function () {
         $("#sceneIMG").attr("src", "imgs/S1T.png");
      }, 500);

   }


   enableBtn($('.options'));
   $('.user-avatar').css('background-image', 'url(imgs/Kiaro1.svg)');

   $('.black-overlay').stop(true, true).hide();

   $('.message').hide();
   $('.question-text').html(question);

   // for (let i = 1; i <= totalOpt; i++) {
   //     $('.option' + i).html(options[i]).show();
   // }

   for (let i = 1; i <= totalOpt; i++) {
      $('.option' + i).html('<strong>' + alphabet[i] + ')</strong> ' + options[i])
         // .attr('aria-label', 'Option ' + alphabet[i] + ': ' + options[i])
         .show();
   }

   if (currentQuestion > 0 && currentQuestion <= questionsTotal) {

      setTimeout(function () {
         displayQuestion(currentQuestion);
      }, 500);
   }
   if (currentQuestion > questionsTotal) {
      $('#btn-results').show();
      gotoResults();
   }

   if (currentQuestion == questionsTotal) {
      setTimeout(function () {
         playMusic($('#audioBossMusic'));
      }, 2500);
   } else if (currentQuestion == 1) {
      setTimeout(function () {
         playMusic($('#audioMainMusic'));
      }, 1000);
   } else {
      setTimeout(function () {
         playMusic($('#audioMainMusic'));
         // UnpauseBackgroundMusic();
      }, 1000);
   }
}

function showTextbox() {
   currentPoint = currentQuestion;

   if (qNum == questionsTotal) {
      $(".textbox span").html(thisBossGreeting);
   } else {
      $(".textbox span").html(thisGreeting);
   }
   $('.textbox').fadeIn(500);
   hideButtons();
   //$('.textbox').focus();

}


function showInstructions() {

   const txt = '<div class="popup-title">You’ve learned a lot! Now everyone in your company is turning to you for the answers...<br><br>Answer the questions as fast as you can to be crowned the <strong>"Organisation Expert"</strong>.';

   hideButtons();

   $('#btn-start-quiz,#btn-mute').show();
   $('.instruction-text').html(txt);
   $('.popup .text .instruction-msg').empty();
   $('instruction-text').focus();
}

function hideButtons() {
   $('.buttons-div2 .btns').hide();
}

function makeVideo(videoStr) {
   const output = '<div class="videos video-help">\n\
                    <video autoplay>\n\
                        <source src="videos/' + videoStr + '.mp4" type="video/mp4">\n\
                        Your browser does not support HTML5 video.\n\
                    </video>\n\
                </div>';
   return output;
}

function updateScore() {

   const score = userStats.scoreCounter;
   const correct = userStats.correctAnswers;
   // const bonus = userStats.timeBonus;

   $('.correct-answers').html('Correct answers: ' + correct + ' = ' + score + ' points.');
   // $('.time-bonus').html('Time bonus = ' + bonus + ' points.');
   $('.total-points').html('Total points: ' + (score));

   $('.score-txt').html(userStats.scoreCounter);
   $('.max-score-txt').html(maxScore);
}

function highlightBtn(obj) {
   obj.addClass('pulse');
   timeoutHiLight1 = setTimeout(function () {
      stopHighlightBtn(obj);
   }, 16000);
}

function stopHighlightBtn(obj) {
   $(obj).removeClass('pulse');
}

function gotoResults() {
   $('.textbox,.glassPane').fadeOut(500);

   function genRow(i, n, name, points, classes) {
      if (classes === void(0)) {
         classes = '';
      }
      return '<tr class="ld-row' + classes + '"><th class="ld-col rank" scope="col">' + n + '</th><th class="ld-col name" scope="col">' + name + '</th><th class="ld-col points" scope="col">' + points + '</th></tr>';
   }

   const score = userStats.scoreCounter;
   // const bonus = userStats.timeBonus;
   const totalpoints = score; // + bonus;
   const usersTotal = Object.size(leaderboard);
   let content = '';
   let n = 0;
   let userNotPlacedYet = true;
   const username = '<span class="username">You</span>';

   for (let i = 1; i <= usersTotal; i++) {
      n++;
      if (leaderboard[i + 1] === void(0)) {
         let pointsNext = 0;
      } else {
         let pointsNext = leaderboard[i + 1].points;
      }

      if (totalpoints >= leaderboard[i].points && userNotPlacedYet) {
         userNotPlacedYet = false;
         content += genRow(i, n, username, totalpoints, ' user');
         n++;
         content += genRow(i, n, leaderboard[i].name, leaderboard[i].points);
      } else if (totalpoints >= pointsNext && userNotPlacedYet) {
         userNotPlacedYet = false;
         content += genRow(i, n, leaderboard[i].name, leaderboard[i].points);
         n++;
         content += genRow(i, n, username, totalpoints, ' user');
      } else {
         content += genRow(i, n, leaderboard[i].name, leaderboard[i].points);
      }

   }

   $('.leaderboard-list').html(content);

   $('.popup').fadeOut(500, function () {

      const txt = '<h1>Enter your name</h1><br><form action="" id="entername"><input type="text" placeholder="Name" class="username-input" maxlength="50"/></form>';

      hideButtons();

      $('#btn-enter-name').show();

      $('.popup .text .message').html(txt);
      $('.popup .text .instruction-msg').empty();
      $('.username-input').focus();

      $('#entername').submit(function (event) {
         event.preventDefault();
         submitName();
      });

      //$('.td-responsv').focus();
   });



   $('.slide-quiz,.game-over,.popup').fadeOut(500);
   $('.slide-results,.game-complete').fadeIn(500);

   setTimeout(() => {
      $('.game-complete h1').focus();
   }, 1000);

}

function enableBtn(obj) {
   $(obj).addClass('enabled');
   $(obj).removeClass('disabled');
   $(obj).attr("disabled", false);
}

function disableBtn(obj) {
   $(obj).addClass('disabled');
   $(obj).removeClass('enabled');
   $(obj).attr("disabled", true);
}