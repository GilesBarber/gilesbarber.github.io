let currentPoint, clicksEnabled, qNum, numberOpen, selected;
// wait for document's ready state
$(document).ready(function () {


   $(window).keydown(function (e) {
      const code = e.keyCode || e.which;
      if (code == 9) { //TAB keycode
         //console.log( document.activeElement.tabIndex );
      }
   });


   $(window).on("resize", function () {

   });

   resetIntro();

   setTimeout(function () {
      init();
   }, 1000);
});
function updatePinAnim() {
   let nextPin = $('.pinpoint' + (numberOpen + 1));
   nextPin.focus();
   if (pinsEnabled[numberOpen + 2] !== true) {
      animatePulse(nextPin);
   } else { animatePulse(nextPin); }
   console.log("(numberOpen + 2): " + (numberOpen + 2));

}
function init() {

   /// init() start ///

   currentPoint = 0;
   clicksEnabled = true;
   numberOpen = 0;



   // buttons //        

   $('.close-popup, .popup .cover').on("click", function () {
      $('.popup').fadeOut(500);
      updatePinAnim();
   });

   // functions //

   $(".optionsDiv,.answerDiv").hide();

   if (!enableFeedback) { $("#btn-feedback").hide(); }


   function buildElements() {
      const total = Object.size(pinPoints);
      let pinpoints = '';
      for (let i = 1; i <= total; i++) {
         let p = pinPoints[i];
         let style = 'left:' + p.left + '; top:' + p.top + '; transform:' + p.transform;
         pinpoints += '<a href="" class="pinpoint pinpoint' + i + '" style="' + style + '" data-num="' + i + '">' + i + '</a>';
      }
   }


   //// execute ////

   //intro

   setTimeout(function () {

      $('#app').fadeIn(1000);

      checkProgress();

   }, 1);

   // steps init end

   $('.logo').css({
      padding: '15px',
      left: '0%',
      bottom: '0%',
      transform: 'scale(1)',
      transition: 'all 1s ease-in-out'
   });

   $('.btn-next').on("click", function () {

      const num = parseInt($(this).parent().attr('data-slide-num'), 10);
      const next = num + 1;

      $('.slide' + num).fadeOut(500);
      $('.slide' + next).fadeIn(500);

      checkVideoIntro();
   });

   $('#btn-start').on("click", function () {

      $('.slide-intro').fadeOut(500);
      $('.slide2,#btn-mute').fadeIn(500);
      $('.logo').css({
         opacity: 0
      });
      setTimeout(function () {
         $('.logo').hide();
      }, 1000);

      showInstructions();

      $('.instruction-text').focus();
   });

   $('.close-popup').on("click", function () {
      $('.popup').fadeOut(500);
      setTimeout(function () { $('.question-txt').focus(); }, 1500);

   });

   $('#btn-enter-name').on("click", function () {
      submitName();
   });


   // execute functions //

   resetIntro();

   let quizCalled = false;
   if (!quizCalled) {
      initQuiz();
      quizCalled = true;
   }

   setTimeout(function () {
      $('.cover1').fadeOut(1000);
      $('#app').fadeIn(1000);
   }, 500);

   setTimeout(function () {
      animateIntro();
   }, 1000);

   $("#timerCheckbox").html(checkboxIcon);


   $("#timerCheckbox").click(function () {
      toggleBoolean();
      if (timerDisabled) {
         $("#timerCheckbox").html(uncheckedIcon);
         $(".timerDiv").hide();
         $('#timerCheckbox').attr('aria-label', 'Switch on the timer');
         buttonStartText.splice(0, 1);
      } else {
         $("#timerCheckbox").html(checkboxIcon);
         $('#timerCheckbox').attr('aria-label', 'Switch off the timer');
         $(".timerDiv").show();
      }
   });


   $("#btn-mute").html(unmuteIcon);

   // Mute audio

   $("#btn-mute").click(function () {
      if (muteClicked) {
         muteClicked = false;
      } else {
         muteClicked = true;
      }
      if (muteClicked) {
         $("audio").animate({ volume: "0" }, 500);
         $("#btn-mute").html(muteSVG);
         $('#btn-mute').attr('aria-label', 'Sound off');
      } else {
         $("audio").animate({ volume: "1" }, 500);
         $("#btn-mute").html(unmuteIcon);
         $('#btn-mute').attr('aria-label', 'Sound on');
      }
   });
}

function displayQuestion(n) {
   $('.question-avatar').css('background-image', 'url("' + pinPoints[n].character.charInit + '")');
   $(".optionsDiv,.question-avatar,.user-avatar").show();
   setTimeout(function () {
      $(".textbox").fadeOut(500);
      $(".popup").fadeIn(500);
      $(".text").focus();
   }, 3000);
}



function checkProgress() {
   $('.pinpoint').each(function () {
      let obj = $(this);
      let n = parseInt(obj.attr('data-num'));
      if (pinsEnabled[n] || !lockedNavigation) {
         obj.removeClass('disabled');
      } else {
         obj.addClass('disabled');
      }
   });
}



function clearPulse() {
   clearInterval(intPulse);
   $('.focusPin').removeClass('focusPin');
}

let intPulse;

function animatePulse(obj) {

   obj.removeClass('pin-locked').addClass('focusPin pin-unlocked');

   const transformPin = obj.css('transform');

   //start
   animation1(obj);
   //loop
   intPulse = setInterval(function () {
      animation1(obj);
   }, 2000);

   function animation1(obj) {
      obj.css({
         transform: transformPin + ' scale(1.1)'
      });
      setTimeout(function () {
         animation2(obj);
      }, 1000);
   }

   function animation2(obj) {
      obj.css({
         transform: transformPin + ' scale(1)'
      });
   }
}

function animateStep(obj, easeType, anim, levelPos) {

   let x, y, L, F;
   if (levelPos) {
      x = levelPos.left;
      y = levelPos.top;
      F = y - 50;
      L = x - $('.driver').width() + "px";
      $('.driver').animate({
         left: L,
         top: y
      }, anim, easeType);
      $('.textbox').css({
         left: L,
         top: F
      });

   } else if (!levelPos) {
      x = obj.left;
      y = obj.top;
      L = x - $('.driver').width();
      F = y - 50;
      $('.driver').animate({
         left: L,
         top: y
      }, anim, easeType);
      if (currentQuestion == 9) {
         L -= 142;
      }
      $('.textbox').css({
         left: L,
         top: F
      });
   }
};

function driverLevelAnimate(pos1) {
   let levelAnim = floorLevels[pos1];
   animateStep('', easeType, anim, levelAnim);

   setTimeout(function () {
      if (pos1 == 1) {
         $('.driver img').fadeOut(40);
         $('.driver img').attr("src", "imgs/Kiaro.svg");
         $('.driver img').css('transform', 'scale(0.7)');
         $('.bike').fadeIn(100);
         setTimeout(function () {
            $('.driver img').fadeIn(800);
         }, 500);
      }
      levelAnim = floorLevels[pos1 + 1];

      setTimeout(function () {
         animateStep('', easeType, anim, levelAnim);
      }, 500);

   }, 1000);

   checkProgress();

   if (currentPoint < 1) {
      setTimeout(function () {
         animateStep(pinPoints[1], easeType, anim);
      }, 4000);
   } else {
      setTimeout(function () {
         animateStep(pinPoints[currentQuestion], easeType, anim);
      }, 2100);
   }

   setTimeout(function () {
      if (currentQuestion < 2) {
         startQuestion();
      }
   }, 3000);
}

function toggleBoolean() {
   timerDisabled = !timerDisabled;
}

function pauseBackgroundMusic() {
   const track = document.getElementById("audioMainMusic");
   track.pause();
}

function UnpauseBackgroundMusic() {
   const track = document.getElementById("audioMainMusic");
   track.play();
}


function stopMusic() {
   $('.audioMusic').each(function () {
      $(this).animate({
         volume: 0
      }, 1000);
   });
}

function playMusic(obj) {
   if (muteClicked == false) {
      let vol = parseFloat(obj.attr('data-volume'));
      vol = 1;
      obj.stop(true, true);
      obj.get(0).volume = vol;
      obj.get(0).currentTime = 0;
      obj.get(0).play();
   }
}

function submitName() {
   let val = $('.username-input').val();
   if (!val) { val = "You" };
   if (val !== '') {
      $('.username').html(val);
      $('.popup').fadeOut(500);
      $('#btn-restart').focus();
      $("audio").animate({ volume: "0" }, 500);
      setTimeout(function () {
         $('#audioLeaderboardMusic').animate({ volume: "1" }, 0);
         playMusic($('#audioLeaderboardMusic'));
      }, 500);
   }
}

function resetIntro() {
   $('.slide1 .gameLogo-div').css({
      'top': '-100%'
   });
}

function animateIntro() {

   setTimeout(function () {

      $('.slide1 .gameLogo-div').animate({
         'top': '0'
      }, 1500, 'easeOutBounce');

      setTimeout(function () {
         $('.slide1 #btn-start').css({
            transform: 'translate(0,0)'
         });
         highlightBtn($('#btn-start'));
      }, 1000);

      setTimeout(function () {
         $('.slide1 .gameLogo').addClass('zoomLoop');
      }, 1500);

   }, 10);


}

function checkVideoIntro() {
   if ($('#app').is(":visible") && $('.slide1').is(":visible")) {
      $('.video-intro video').get(0).play();
   } else {
      $('.video-intro video').get(0).pause();
   }
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

function updatePositions() {
   const winW = $(window).width();
   const winH = $(window).height();
   const appW = $('#app').width();
   const appH = $('#app').height();
   if (winH < appH) {
      appH = winH;
      $('#app').css({
         height: appH
      });
   }
   const divW = $('.options-div').width();
   const divT = $('.options-div').position().top;
   const divH = appH - divT - 5;
   $('.options-div').css({
      height: divH
   });
   const marginBoxes = 20; // in pixels
   gridCurrCol = gridColumns;
   gridCurrRow = gridRows;
   if (appW < appH) {
      marginBoxes = 5; // in pixels
      gridCurrCol = 1;
      gridCurrRow = 12;
   } else if (divW < 700) {
      marginBoxes = 5; // in pixels
   } else if (appH < 500) {
      marginBoxes = 10; // in pixels
   }
   const objW = divW / gridCurrCol;
   const objH = divH / gridCurrRow;
}

function setElementOrder(obj, index) {
   if (index === 1) {
      setTimeout(function () {
         obj.insertBefore($('.option:nth-child(1)'));
      }, 1 * index);
   } else {
      setTimeout(function () {
         obj.insertAfter($('.option:nth-child(' + (index - 1) + ')'));
      }, 1 * index);
   }
}

function animateObj(obj, index, top, left, objW, objH, marginBoxes) {

   setTimeout(function () {

      obj.css({
         'z-index': index
      });

      obj.animate({
         width: (objW - marginBoxes) + 'px',
         height: (objH - marginBoxes) + 'px'
      }, 1);

      obj.stop(true, true);
      obj.animate({
         top: top + 'px'
      }, 500, function () {
         obj.animate({
            left: left + 'px'
         }, 500);
      });
   }, 100 * index);

}

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