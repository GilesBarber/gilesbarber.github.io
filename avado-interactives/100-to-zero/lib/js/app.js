let timerCircle, userStats = {},
   userData = {};

// "goto" function
(function ($) {
   $.fn.goTo = function () {
      $('html, body').animate({
         scrollTop: $(this).offset().top + 'px'
      });
      return this; // for chaining...
   };
})(jQuery);


// wait for document's ready state
$(document).ready(function () {

   $(window).on("resize", function () {
      updateSize();
   });

   setTimeout(function () {
      init();
   }, 1);


});

function init() {

   /// init() start ///

   $('.slide').each(function (index) {
      let num = index + 1;
      $(this).addClass('slide' + num).attr('data-slide-num', num).hide();
   });

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

   $('.btn-submit').on('click', function () {
      if (!$(this).hasClass('disabled')) {
         submitQuestion();
         $('.btns').addClass('disabled');
      }
   });

   $('#btn-next-question').on('click', function () {
      if (!$(this).hasClass('disabled')) {
         nextQuestion();
         $('.btns').addClass('disabled');
         generatePrize
      }
   });

   $('.btn-aveScore').on('click', function () {
      if (!$(this).hasClass('disabled')) {
         // goToSlide('slideLeaderboard');
         $('.btn-next-question').hide();
         getAveScore();
         goToSlide('averageScore');
         $('.btns').addClass('disabled');
         // console.log(timerDisabled);
         $('.btn-results').show();
         if(!timerDisabled) {
            $('.prize-btn--timer-off').hide();
         }
         let actionMsg = actionMsgs.finish;
         $('.feedbackText .instruction-msg').html(actionMsg);
         timerOn = false;
      }
   });



   $('.btn-results').on('click', function () {
      if (!$(this).hasClass('disabled')) {
         // goToSlide('slideLeaderboard');
         goToSlide('prizeAward');
         $('.btns').addClass('disabled');
      }
   });



   $('.btn-home, .logo, .gameLogo,#btn-restart, #btn-restart2').on("click", function (e) {
      e.preventDefault();
      goToSlide('slideIntro');
   });

   // After click focus event listeners

   $("#btn-go-to-home-page").click(function(e){
      e.preventDefault();
      $(".intro-text").focus()
   })

   $("#show-my-score").click(function(e){
      e.preventDefault();
      $(".speechbubble__feedback").focus()
   })

   $("#show-my-prize").click(function(e){
      e.preventDefault();
      $(".speechbubble__prize").focus()
   })

   $('#btn-start').on("click", function (e) {
      e.preventDefault();
      goToSlide('slideQuiz');
      restartQuiz();
   });

   $("#btn-feedback").click(function () {
      goToSlide('slideAnswers');
      $("#feedback-list").focus()
   });


   $("#btn-mute").html(unmuteIcon).attr('aria-label', 'Mute game audio');

   // Mute audio

   $("#btn-mute").click(function () {
      if (muteClicked) {
         muteClicked = false;
      } else {
         muteClicked = true;
      }
      if (muteClicked) {
         $("audio").animate({
            volume: "0"
         }, 500);
         $("#btn-mute").html(muteSVG).attr('aria-label', 'Unmute game audio');
      } else {
         $("audio").animate({
            volume: "1"
         }, 500);
         $("#btn-mute").html(unmuteIcon).attr('aria-label', 'Mute game audio');
      }
   });



   
   $("#timerCheckbox").html(checkboxIcon);


   $("#timerCheckbox").click(function () {
      toggleBoolean();
      if (timerDisabled) {
         $(".sub-wrapper").css({
            width: "100%"
         })
         $("#timerCheckbox").html(uncheckedIcon);
         $(".timerDiv").hide();
         $(".prize-btn--timer-off").show();
         $('#timerCheckbox').attr('aria-label', 'Switch on the timer');
         buttonStartText.splice(0, 1);

      } else {
         $(".sub-wrapper").css({
            width: "60%"
         })
         $(".prize-btn--timer-off").hide(); 
         $("#timerCheckbox").html(checkboxIcon);
         $('#timerCheckbox').attr('aria-label', 'Switch off the timer. Recommended for assistive technology users');
         $(".timerDiv").show();
      }
   });

   function toggleBoolean() {
      timerDisabled = !timerDisabled;

      //  console.log('Toggled boolean is', timerDisabled);
   }




   resetUserStats();

   loadStorage();

   animateBackground();


   // buttons //     



   //// execute ////


   //intro

   setTimeout(function () {

      $('#app').fadeIn(1000);

      goToSlide(startAtSlide);

      updateSize();

   }, 5);


   //

   /// init() end ///

}

let currBgFrame = 1,
   $oldFrame = $('.bg-animated .frame' + currBgFrame);

function animateBackground() {

   animateFrame();

   function animateFrame() {
      $('.bg-animated .bg-frame').css({
         'z-index': -2
      });
      $oldFrame.css({
         'z-index': -1
      });

      let $current = $('.bg-animated .frame' + currBgFrame);
      $oldFrame = $current;
      $current.css({
         'z-index': 0
      }).hide();

      $current.fadeIn(1000, function () {
         currBgFrame++;
         if (currBgFrame > 3) {
            currBgFrame = 1;
         }
         animateFrame();
      });

   }
}

function goToSlide(slide, callback) {
   let slideNum = 1;
   if (slide === '') {
      slide = 1;
   }
   if (isNaN(slide)) {
      let slideIDNum = $('#' + slide).attr('data-slide-num');
      let slideClassNum = $('.' + slide).attr('data-slide-num');
      if (slideIDNum !== void(0)) {
         slideNum = parseInt(slideIDNum, 10);
      }
      if (slideClassNum !== void(0)) {
         slideNum = parseInt(slideClassNum, 10);
      }
   } else {
      slideNum = parseInt(slide, 10);
   }
   switchToSlide(slideNum, callback);
}

function switchToSlide(slideNum, callback) {
   const slideId = $('.slide' + slideNum).attr('id');

   $('.btns').addClass('disabled');

   switch (slideId) {
      case 'slideIntro':
         stopMusic();
         playMusic($('#audioMusicLoop'));
         break;
      case 'slideQuiz':
         initialiseQuiz();
         startQuestion();
         break;
      case 'slideLeaderboard':
         initialiseQuiz();
         gotoResults();
         stopMusic();
         playMusic($('#audioMusicLoop'));
         break;
      case 'averageScore':
         initialiseQuiz();
         stopMusic();
         playMusic($('#audioMusicLoop'));
         break;
      case 'prizeAward':
         initialiseQuiz();
         if (getPrize) {
            generatePrize();
         }

         stopMusic();
         playMusic($('#audioMusicLoop'));
         break;
      case 'slideAnswers':
         initialiseQuiz();
         feedbackList();
         break;
   }

   $('.slide').stop(true, true).css({
      'z-index': 0
   });

   $('.slide' + slideNum).css({
      'z-index': 1
   }).fadeIn(500, function () {
      $('.slide').each(function () {
         if (parseInt($(this).attr('data-slide-num'), 10) !== parseInt(slideNum, 10)) {
            // console.log('slideNum ' + slideNum);
            $(this).hide();
         }
      });
      if (callback !== void(0)) {
         callback();
      }
      $('.btns').removeClass('disabled');
   });


   setTimeout(function () {
      updateSize();
   }, 150);
}

function resetUserStats() {
   userStats.scoreCounter = 0;
   userStats.correctAnswers = 0;
   userStats.ABonus = 0;
   cumulativeScores = [];
   if (userStats.timeStats === void(0)) {
      userStats.timeStats = [];
   }
   $.each(userData.leaderboard, function (index, value) {
      if (userData.leaderboard[index].isUser) {
         userData.leaderboard[index].isUser = false;
      }
   });
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

function saveToStorage() {
   localStorage[interactiveID + '/leaderboard'] = dataToString(userData.leaderboard, true);
   localStorage[interactiveID + '/timeStats'] = dataToString(userStats.timeStats, true);
}

function loadStorage() {
   userData.leaderboard = leaderboardDefault;
   if (localStorage[interactiveID + '/leaderboard'] !== void(0)) {
      let array1 = localStorage[interactiveID + '/leaderboard'].split('|');
      $.each(array1, function (index, value) {
         if (value !== '') {
            let array2 = value.split(',');
            userData.leaderboard[index] = {};
            userData.leaderboard[index].name = decodeURIComponent(array2[0]);
            userData.leaderboard[index].company = decodeURIComponent(array2[1]);
            userData.leaderboard[index].points = decodeURIComponent(array2[2]);
         }
      });
   }
   if (localStorage[interactiveID + '/timeStats'] !== void(0)) {
      let array1 = localStorage[interactiveID + '/timeStats'].split('|');
      $.each(array1, function (index, value) {
         if (value !== '') {
            let array2 = value.split(',');
            userStats.timeStats[array2[0]] = {
               id: parseInt(array2[0], 10),
               name: decodeURIComponent(array2[1]),
               company: decodeURIComponent(array2[2]),
               time: parseInt(array2[3], 10)
            };
         }
      });
      checkBestTimes();
   }
}

function dataToString(obj, encode) {
   let str = '';
   if (encode === void(0)) {
      encode = false;
   }
   $.each(obj, function (index, value) {
      let output = '';
      if (value !== void(0)) {
         $.each(value, function (index2, value2) {
            if (encode) {
               output += encodeURIComponent(value2) + ',';
            } else {
               output += value2 + ',';
            }
         });
         output = output.slice(0, -1); //removes trailing ','
         str += output + '|';
      }
   });

   str = str.slice(0, -1); //removes trailing '|'

   return str;

   function writeStr(val, enc) {
      if (enc) {
         encodeURIComponent(val);
      }
   }
}

function checkBestTimes() {
   $.each(userStats.timeStats, function (index, value) {
      if (value !== void(0)) {
         let vars = value;
         let qID = vars.id;
         if (questionBank[qID] !== void(0) && vars.time < questionBank[qID].fastest.time) {
            questionBank[qID].fastest.name = vars.name;
            questionBank[qID].fastest.company = vars.company;
            questionBank[qID].fastest.time = vars.time;
         }
      }
   });
}

function stopMusic() {
   $('.audioMusic').each(function () {
      $(this).animate({
         volume: 0
      }, 1000);
   });
}

function playMusic(obj) {

   let vol = parseFloat(obj.attr('data-volume'));
   obj.stop(true, true);
   if (muteClicked) {
      obj.get(0).volume = 0;

   } else {
      obj.get(0).volume = vol;

   }
   obj.get(0).currentTime = 0;
   obj.get(0).play();
}

function updateSize() {
   resizeAds();
}

function resizeAds() {
   let stageW = $('.avadoAdverts').width();
   let stageH = $('.avadoAdverts').height();
   $('.avadoAdImg').each(function () {
      let adW = $(this).find('img').width();
      let adH = $(this).find('img').height();
      let ratio = adW / adH;

      adW = stageH * ratio;

      adW -= 100;

      let wPercent = (adW / stageW) * 100;

      $(this).css({
         width: wPercent + '%'
      });
   });
}

Object.size = function (obj) {
   let size = 0,
      key;
   for (key in obj) {
      if (obj.hasOwnProperty(key))
         size++;
   }
   return size;
};

function shuffle(a) {
   let j, x, i;
   for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
   }
   return a;
}