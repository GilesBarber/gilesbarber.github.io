// wait for document's ready state
$(document).ready(function () {
  $(".spinWheel").text("Tap to spin the Wheel!");
  function getAngle() {
    var segment = Math.floor(Math.random() * catagoriesTotal);
    angles = 360 / catagoriesTotal * segment + 360;
    qNum = Math.ceil(Math.random() * questionsTotal);
  }
  $('.spinWheel').click(function () {
    $(".qCat,.qText,.feedback,.answerBox,.key").hide();
    document.getElementsByClassName("options").disabled = false;
    $(".options").removeClass("disabled");
    $(".feedback").removeClass("incorrect correct");

    angles = 0;
    $('.wheel1').animate(
      { deg: 0 },
      {
        duration: 0,
        step: function () {
          $(this).css({ transform: 'rotate(' + 0 + 'deg)' });
        }
      }
    );
    getAngle();
    $('.wheel1').animate(
      { deg: angles },
      {
        duration: 3200,
        step: function (angles) {
          $(this).css({ transform: 'rotate(' + angles + 'deg)' });
        }
      }
    );
    $('#wheelSpin').get(0).play();
    setTimeout(function () {
      switch (angles) {
        case 390:
          questionBank = ScienceAndNature;
          $(".result").text("2")
          $(".category").text("Science & Nature")
          $(".qCat").css("background-color", "#56bad1")
          break;
        case 510:
          questionBank = ScienceAndNature;
          $(".result").text("2")
          $(".category").text("Science & Nature")
          $(".qCat").css("background-color", "#56bad1")
          break;
        case 630:
          questionBank = ScienceAndNature;
          $(".result").text("2")
          $(".category").text("Science & Nature")
          $(".qCat").css("background-color", "#56bad1")
          break;
        case 420:
          questionBank = Geography;
          $(".result").text("3")
          $(".category").text("Geography")
          $(".qCat").css("background-color", "#b0cc44")
          break;
        case 540:
          questionBank = Geography;
          $(".result").text("3")
          $(".category").text("Geography")
          $(".qCat").css("background-color", "#b0cc44")
          break;
        case 660:
          questionBank = Geography;
          $(".result").text("3")
          $(".category").text("Geography")
          $(".qCat").css("background-color", "#b0cc44")
          break;
        case 450:
          questionBank = Entertainment;
          $(".result").text("1")
          $(".category").text("Entertainment")
          $(".qCat").css("background-color", "#ef719b")
          break;
        case 570:
          questionBank = Entertainment;
          $(".result").text("1")
          $(".category").text("Entertainment")
          $(".qCat").css("background-color", "#ef719b")
          break;
        case 690:
          questionBank = Entertainment;
          $(".result").text("1")
          $(".category").text("Entertainment")
          $(".qCat").css("background-color", "#ef719b")
          break;
        /*case 648:
          questionBank = Sport;
          $(".result").text("4")
          $(".category").text("Sport")
          $(".qCat").css("background-color", "#f0400a")
          break;*/
        default:
          questionBank = History;
          $(".result").text("5")
          $(".category").text("History")
          $(".qCat").css("background-color", "#f0e170")
      }
      questionVars = questionBank[qNum];
      $(".question").text(questionVars.question)
      $(".qCat,.qText,.answerBox").show();
      $(".answerBox").removeClass("cross tick");
      $(".spinAgain").css("background-color", "#f0ffff");
      var option1 = '<button id="option1" class="options">' + questionVars.responses.option1 + '</button>'
      var option2 = '<button id="option2" class="options">' + questionVars.responses.option2 + '</button>'
      var option3 = '<button id="option3" class="options">' + questionVars.responses.option3 + '</button>'
      var options = [option1, option2, option3]
      var a = options;

      shuffle(a);
      $(".answerBox").html(a);
      $(".options").click(function () { returnElement($(this)) })
      $(".spinAgain,.spinWheel").text("Spin again");
      $(".key").show();
    }, 3500);
  });
  $(".cross").click(function () {
    $(".key").hide();
  });
  $("#action").click(function () {
    setTimeout(function () {
      $("#action").fadeOut();
    }, 500);
  });
  $(".spinAgain").click(function () {
    $(".key").hide();
    $("#action").fadeIn();
  });

  function returnElement(element) {
    var clicked = $(element).attr('id');

    if (clicked == "option1") {
      $(".result1").text("right"); $(".answerBox").addClass("tick");
      $(".feedback").addClass("correct");
      $('#cheer').get(0).play();

    } else { $(".feedback").addClass("incorrect"); $(".result1").text("wrong"); $(".answerBox").addClass("cross"); $('#boo').get(0).play(); }
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    $(".options").addClass("disabled");
    $(".feedback").show();
    $(".spinAgain").css("background-color", "#90ee90");
  };
});
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}