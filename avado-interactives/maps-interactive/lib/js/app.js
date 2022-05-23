let currentPoint = 0;

// wait for document's ready state
$(document).ready(function () {

   $(window).on("resize", function () {
      // updateSize();
   });

   setTimeout(function () {
      init();
   }, 1);
});

function init() {

   /// init() start ///

   let clicksEnabled = true;
   let numberOpen = 0;

   // buttons //        

   $('#dismiss').click(function () {
      $('#hint, #map-hint').fadeOut(500);

   })

   $('.close-popup, .popup .cover').on("click", function () {
      $('.popup').fadeOut(500);
      let nextPin = $('.pinpoint' + (numberOpen + 1));
      nextPin.focus();
      if (pinsEnabled[numberOpen + 2] !== true) {
         animatePulse(nextPin);
      }
   });

   // functions  "url('img_tree.png')"//

   function buildElements() {

      let total = Object.size(pinPoints);
      let pinpoints = '';

      for (let i = 1; i <= total; i++) {
         let p = pinPoints[i];
         let style = 'left:' + p.left + '; top:' + p.top + '; transform:' + p.transform + '; background:' + 'url(' + p.img + ') no-repeat'; +
         'z - index: ' + i;

         pinpoints += '<button class="pinpoint pinpoint' + i + ' pin-locked" style="' + style + '" data-num="' + i + '" aria-label="Map pin' + i + '">' + '</button>';

      }

      $('.pinpoints-div').html(pinpoints);

      $('.pinpoint').on("click", function (e) {
         e.preventDefault();
         let obj = $(this);
         if (clicksEnabled && !obj.hasClass('disabled')) {

            let anim = {};
            anim.duration = 0;
            anim.n = parseInt(obj.attr('data-num'), 10);
            anim.totalSteps = anim.n - currentPoint;
            if (currentPoint < 1) {
               currentPoint = 1;
            }

            if (anim.n >= currentPoint) {
               anim.ascending = true;
            } else {
               anim.totalSteps = currentPoint - anim.n;
               anim.ascending = false;
            }

            if (anim.totalSteps > 0) {

               anim.step = 1;
               anim.duration = anim.totalSteps * anim.step;

               $('.driver').css({
                  transform: pinPoints[anim.n].transform,
                  transition: 'transform ' + anim.duration + 'ms ease-in-out'
               });

               if (anim.ascending) {

                  for (let i = currentPoint; i <= anim.n; i++) {
                     let easeType = 'linear';
                     if (i <= currentPoint) {
                        easeType = 'easeInSine';
                     }
                     if (i >= anim.n) {
                        easeType = 'easeOutSine';
                     }
                     if (anim.totalSteps === 1) {
                        easeType = 'easeInOutSine';
                     }
                     animateStep($('.pinpoint' + i), easeType);
                  }

               } else {

                  for (let i = currentPoint; i >= anim.n; i--) {
                     let easeType = 'linear';
                     if (i >= currentPoint) {
                        easeType = 'easeInSine';
                     }
                     if (i <= anim.n) {
                        easeType = 'easeOutSine';
                     }
                     if (anim.totalSteps === 1) {
                        easeType = 'easeInOutSine';
                     }
                     animateStep($('.pinpoint' + i), easeType);
                  }

               }

               function animateStep(obj, easeType) {

                  let x = obj.position().left;
                  let y = obj.position().top;
                  let zIndex = obj.css('z-index');

                  let L = x - $('.driver').width();

                  $('.driver').animate({
                     left: L,
                     top: y,
                     'z-index': zIndex
                  }, anim.step, easeType);

               };
            }



            clicksEnabled = false;
            currentPoint = anim.n;

            clearPulse();

            setTimeout(function () {
               let n = anim.n;
               let title = content[n].title;
               let txtBody = content[n].bodyText;
               const courseIcon = content[n] && content[n].course ? content[n].course.icon : null;
               let liveClasslabel = content[n].liveClasses.title;
               let courseLabel = content[n].course.title;
               let courseSubtitle = content[n].course.subtitle;
               let liveClassIcon = content[n].liveClasses.icon;
               let headerColor = content[n].labelColor;


               // let courseIcon = content[n].course.icon;
               // console.log(content[n].course[icon])

               let headerImg = document.createElement("img");
               headerImg.src = content[n].moduleIcon


               $('.popup .course-icon').html('<img src="' + courseIcon + ' ">');
               $('.popup .live-class').html('<img src="' + liveClassIcon + ' ">');
               $('.popup label').html(courseSubtitle);
               $('.popup .course-title').html(courseLabel);
               $('.popup .project-label').html(liveClasslabel);
               $('.popup .header-title h2').html(title);
               $('.popup .header-title h2').css({
                  'background-color': headerColor
               });

               // Reset
               $('.popup .header-img').html('');
               $('.popup .header-img').append(headerImg)

               $('.popup .body-txt').html(txtBody);
               $('.popup').fadeIn(500);
               $('.popup .content-div').focus();
               numberOpen = n;
               pinsEnabled[n + 1] = true;
               checkProgress();
               clicksEnabled = true;
               // console.log(img);

            }, anim.duration + 100);
         }
      });

      let firstPin = $('.pinpoint1');
      animatePulse(firstPin);
      //firstPin.focus();

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

   let intPulse;

   function animatePulse(obj) {

      obj.removeClass('pin-locked').addClass('focusPin pin-unlocked');

      let transformPin = obj.css('transform');

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

   function clearPulse() {
      clearInterval(intPulse);
      $('.focusPin').removeClass('focusPin');
   }


   //// execute ////

   //intro

   setTimeout(function () {

      $('#app').fadeIn(1000);

      buildElements();

      checkProgress();

      // updateSize();

   }, 1);


   //

   /// init() end ///

}

function updateSize() {

   let proportion = 808 / 606;

   let W = $('.main-container').width();

   let H = W / proportion;

   $('.main-container').css({
      'min-height': H
   });

}

// "goto" function
(function ($) {
   $.fn.goTo = function () {
      $('html, body').animate({
         scrollTop: $(this).offset().top + 'px'
      });
      return this; // for chaining...
   };
})(jQuery);

// clear all timeouts
function clearTimeouts() {
   let total = timeouts.length;
   for (i = 0; i < total; i++) {
      clearTimeout(timeouts[i]);
   }
   timeouts = [];
}

// get size / length of js object
Object.size = function (obj) {
   let size = 0,
      key;
   for (key in obj) {
      if (obj.hasOwnProperty(key))
         size++;
   }
   return size;
};