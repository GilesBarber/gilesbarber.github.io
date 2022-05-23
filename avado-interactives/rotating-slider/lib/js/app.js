// wait for document's ready state
$(document).ready(function () {

   $(window).on("resize", function () {
      updateSize();
   });


   setTimeout(function () {
      initialize();
   }, 1000);


});



function animateWheel() {
   let shiftRotation = currentSlideGlobal - 3;
   let segment = shiftRotation * segmentAngle;
   if (segment < 0) {
      angle = 0
   } else {
      angle = 360 - segment;
   }
   document.getElementById("circleImg").src = "imgs/ST_2_7_principles_02.svg";
   if (currentSlideGlobal == 3 || currentSlideGlobal == positionsTotal + 1) {

      $('#bgimage').animate(
         {
            top: "63%",
            left: "0",
            width: "100%"
         },
         {
            duration: 500,
         }
      );

   } else if (currentSlideGlobal == 2) {

      if (clockwise) {
         $('#bgimage').animate(
            {
               top: "5%",
               left: "22.5%",
               width: "55%"
            },
            {
               duration: 500,
            }
         );

         setTimeout(function () {
            $('#bgimage').addClass("tranOverride");
            $('#bgimage').css({ transform: 'rotate(0deg)' });
            $('#bgimage').removeClass("tranOverride");
         }, 2000);

      } else {
         $('#bgimage').animate(
            {
               deg: angle,
               top: "5%",
               left: "22.5%",
               width: "55%"
            },
            {
               duration: 500,
               step: function () {
                  $(this).css({ transform: 'rotate(' + angle + 'deg)' });
               }
            }
         );

         setTimeout(function () {

            $('#bgimage').animate(
               { deg: 360 },
               {
                  duration: 1000,
                  step: function () {
                     $(this).css({ transform: 'rotate(360deg)' });
                  }
               }
            );
         }, 2000);


      }

      timeouts.push(setTimeout(function () {
         document.getElementById("circleImg").src = "imgs/ST_2_7_principles_01.svg";
      }, 2500));
   }


   if (currentSlideGlobal > 2 && currentSlideGlobal < positionsTotal + 2) {

      $('#bgimage').animate(
         { deg: angle },
         {
            duration: 2000,
            step: function () {
               $(this).css({ transform: 'rotate(' + angle + 'deg)' });
            }
         }
      );
   }

}

function initialize() {

   /// init() start ///


   // buttons //        

   $('.prefocus').on("click", function (e) {
      e.preventDefault();
   });

   $('.btn-prev').on("click", function () {
      prevSlide();
   });
   $('.btn-next').on("click", function () {
      nextSlide();
   });

   $('.btn-menu').on("click", function () {
      toggleMenu();
   });

   $('.close-popup').on("click", function () {
      $('.popup').fadeOut(500);
   });

   // functions //

   let menuOpen;

   function toggleMenu() {
      if (menuOpen) {
         closeMenu();
      } else {
         openMenu();
      }
   }

   function openMenu() {
      $('.menu').fadeIn(500);
      menuOpen = true;
   }

   function closeMenu() {
      $('.btn-menu').show();
      $('.menu').fadeOut(500);
      menuOpen = false;
   }

   function prevSlide() {
      clockwise = true;
      let num = currentSlideGlobal - 1;
      if (num < 2) {
         num = totalSlides;
      }
      navigateToSlide(num, "backwards");

   }

   function nextSlide() {
      clockwise = false;
      let num = currentSlideGlobal + 1;
      if (num > totalSlides) {
         num = 2;
      }
      navigateToSlide(num, "forward");
   }

   function navigateToSlide(num, dir) {

      const obj = $('.slideGlobal' + num);
      const sectionNum = parseInt(obj.parent().attr('data-section'), 10);
      const slideNum = parseInt(obj.attr('data-slide'), 10);
      const targetSlide = $('.section' + sectionNum + ' .slide' + slideNum);

      if (targetSlide.hasClass('subSlide')) {
         if (dir === 'forward') {
            num++;
            navigateToSlide(num, dir);
         } else {
            num--;
            navigateToSlide(num);
         }
      } else {
         changeSlide(sectionNum, slideNum);
      }

   }

   function goToSlideName(slide) {

      const obj = $(slide);
      const sectionNum = parseInt(obj.parent().attr('data-section'), 10);
      const slideNum = parseInt(obj.attr('data-slide'), 10);

      changeSlide(sectionNum, slideNum);

   }

   function changeSlide(section, num) {

      const oldSlide = '.section' + currentSection + ' .slide' + currentSlide;

      clearTimeouts();

      if (num === 0) {
         section--;
         num = 1;
      }

      currentSection = section;

      currentSlide = num;

      if (currentSlide === 1) {
         //mark previous section as done
         sectionsDone[currentSection - 1] = true;
      }



      const newSlide = '.section' + currentSection + ' .slide' + currentSlide;

      currentSlideGlobal = parseInt($(newSlide).attr('data-slide-global'));

      //$(newSlide).html(slidesStorage[currentSlideGlobal]);

      $('.slides').fadeOut(500);

      $(newSlide).fadeIn(500);

      setTimeout(() => {
         $(newSlide + ' .textbox3').focus();
      }, 1200);

      timeouts.push(setTimeout(function () {
         if (newSlide !== oldSlide) {
            //   $(oldSlide).empty();
         }
      }, 500));

      // put animate function here

      if (currentSlideGlobal > 1) {
         $("#circleImg").removeClass("hidden");
         animateWheel()
      }

      updateNav();

      startAnimations();

      startInteractions();

      checkBtnNext();

      closeMenu();


   }

   function checkBtnNext() {

      let slide = $('.section' + currentSection + ' .slide' + currentSlide);

      if ((!slidesDone[currentSlideGlobal] || slide.hasClass('disableNext')) && lockedNavigation) {
         $('.btn-next, .btn-prev').attr("disabled", true);
      }

      let duration = slide.attr('data-duration');

      if (duration !== void (0)) {
         timeouts.push(setTimeout(function () {
            slidesDone[currentSlideGlobal] = true;
            updateNav();
         }, duration));
      }

   }

   function startAnimations() {

      $('.section' + currentSection + ' .slide' + currentSlide + ' .animate').each(function () {

         const element = $(this);
         const delay = element.attr('data-delay');
         const duration = element.attr('data-duration');
         let direction = element.attr('data-direction');
         let distance = element.attr('data-distance');
         let transX = 0;
         let transY = 0;

         if (distance === void (0)) {
            distance = 0;
         }

         if (direction === 'right') {
            transX = '-' + distance;
         } else if (direction === 'left') {
            transX = distance;
         } else if (direction === 'up') {
            transY = distance;
         } else if (direction === 'down') {
            transY = '-' + distance;
         }

         const initialPos = {
            'transform': 'translate(' + transX + 'px,' + transY + 'px)',
            'opacity': 0,
            'transition': 'all 1s ease-out'
         };
         element.css(initialPos);
         element.hide();

         timeouts.push(setTimeout(function () {
            element.show();
         }, delay - 500));

         timeouts.push(setTimeout(function () {
            element.css({
               'transform': 'translate(0,0)',
               'opacity': 1
            });

            if (duration !== void (0)) {
               timeouts.push(setTimeout(function () {
                  element.fadeOut(500);
               }, duration));
            }

         }, delay));


      });

   }

   $('.action').click(function (e) {
      e.preventDefault();
      const element = $(this);
      element.addClass('done');
      checkActionsDone();

      if (element.hasClass('openPopup')) {

         const popupNumber = element.attr('data-popup-number');

         openPopup(popupNumber);

      } else {
         const gotoSlide = element.attr('data-goto');

         goToSlideName(gotoSlide);
      }


   });

   function startInteractions() {

   }

   function checkActionsDone() {

      const slide = $('.section' + currentSection + ' .slide' + currentSlide);
      const totalDone = slide.find('.done').length;
      const totalRequired = slide.find('.required').length;


      if (totalDone >= totalRequired) {
         slidesDone[currentSlideGlobal] = true;
         updateNav();
      }

   }

   function updateNav() {
      if (currentSlideGlobal <= 1) {
         currentSlideGlobal = 1;
         $('.btn-prev').attr("disabled", true);
      } else {
         $('.btn-prev').attr("disabled", false);
      }

      if (currentSlideGlobal >= (totalSlides + 1)) {
         // currentSlideGlobal = totalSlides;
         // $('.btn-next').attr("disabled", true);
      } else {
         $('.btn-next').attr("disabled", false);
      }

   }

   function openPopup(n) {
      //open popup
      const content = $('.section' + currentSection + ' .slide' + currentSlide + ' .popup-content' + n).clone().contents();
      $('.popup .text').html(content);
      $('.popup').fadeIn(500);
      $('.close-popup').focus();
   }


   //// execute ////

   // MANAGE SECTIONS AND SLIDES

   let n = 1;
   let sectionN = 1;
   slidesStorage = {};

   // for each section:
   $('.sections').each(function () {

      const thisSection = $(this);

      // set section number and class
      thisSection.attr('data-section', sectionN);
      thisSection.addClass('section' + sectionN);

      //for every slide within this Section:
      let p = 1;
      thisSection.find('.slides').each(function () {

         const thisSlide = $(this);

         //set slides' numbers and classes
         thisSlide.attr('data-section', sectionN);
         thisSlide.attr('data-slide', p);
         thisSlide.attr('data-slide-global', n);
         thisSlide.addClass('slide' + p);
         thisSlide.addClass('slideGlobal' + n);

         //Store slides' contents and remove them from the page
         // slidesStorage[n] = thisSlide.contents();
         //thisSlide.empty();

         totalSlides = n;

         //next positions
         n++;
         p++;

      });

      sectionN++;

   });


   // START CONTENT

   setTimeout(function () {

      //fade in main content
      $('#app').fadeIn(1000);

      $('.slides').hide();

      //update elements sizes
      updateSize();

      //changeSlide(currentSection, currentSlide);
      updateNav();
      checkBtnNext();

      //open main menu
      //openMenu();

      //force go to
      navigateToSlide(currentSlide);



   }, 1);



   //

   /// init() end ///

}

function updateSize() {
   /*
       const proportion = 808 / 600;

       const W = $('.main-container').width();

       const H = W / proportion;

       $('.main-container').css({'min-height': H});
   */
}

// "goto" scroll function
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
   const total = timeouts.length;
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