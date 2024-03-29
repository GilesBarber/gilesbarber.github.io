function init() {
  /// init start ///
  userAttempts = 0;
  score = 0;
  $('#score').html(score);
  size = leaderboard.length;

  if (!multipleUsers && prevUsers[0]) {;
    for (var i = 0; i < size; i++) {
      for (var p = 0; p < prevUsers.length; p++) {
        if (leaderboard[i].name == prevUsers[p]) {
          leaderboard.splice(i, 1);
          i--;
        }
      }
      size = leaderboard.length;
    }
  }
};

function splashScreen() {
  $('.splash').addClass("wheelBounce");
  $('.wheel0').animate(
    { deg: 2000 },
    {
      duration: 5000,
      step: function () {
        $(this).css({ transform: 'rotate(' + 2000 + 'deg)' });
      }
    }
  );

  setTimeout(function () {
    $('.splash').css('top', '140px');
    $('.splashTitle').fadeIn("slow");
    $(".splashTitle").addClass("animTitle");
  }, 2015);

  setTimeout(function () {
    $('.splash').fadeOut();
    $('.howToPlay').fadeIn("slow");
  }, 5000);
}

function reset() {
  $('.leaderboard-list').html('');
  if (!multipleUsers) {
    for (var i = 0; i < size; i++) {
      if (leaderboard[i].name === userName) {
        leaderboard.splice(i, 1);
        size = leaderboard.length;
      }
    }
  } 
};

function inputNum() {
  $("#inputNum").focus();
  // retrieve value from input
  let numVal = $('#inputNum').val();
  if (isNaN(numVal)) {
    alert("Please enter a valid number!");
  } else {
    maxAttempts = numVal;
    //save into localstorage
    localStorage.myNum = numVal;
    $(".howToPlay").fadeOut("slow");
    nameEntry();
    return numVal;
  }
}

function nameEntry() {
  $('.nameEntry').fadeIn("slow");
  $("#textForm").focus();
  $("#textForm").submit(function (e) {
    e.preventDefault();
    inputText();
    //save into localstorage
    localStorage.mytext = userName;
  });
}

function inputText() {
  // retrieve value from input
  let textVal = $('#inputtext').val();

  if (textVal) {
    userName = textVal
    $(".nameEntry").fadeOut("slow");
    startGame();
    return textVal;
  } else {
    alert("Please enter your name!");
  }
}

function startGame() {
  $('.fill-screen').hide();
  $('.upperBackground').css("min-height", "518px");
  $('.upperBackground').css("height", "100%");
  $('.lowerBackground').css("background-position", "0 350px");
  $('.upperBackground').css("background-size", "100%");
  $(".wheelContainer").fadeIn("slow");
  $(".wheelContainer").css("top", "-744px");
  $(".spinWheel").text("Tap to spin the Wheel!");
  setTimeout(function () { $(".userPoints").fadeIn("slow"); }, 2000);
};

let newPoints;

function setPoints() {
  let random = Math.floor(Math.random() * awards.length);
  newPoints = awards[random]
}
function getScore() {
  localStorage.myscore = score;
  $('#score').html(score);
}

function generateLeaderBoard() {
  size = leaderboard.length;
  totalSize = size + 1;
  $('.choices,.userPoints').hide();
  $(".key").show();
  $('.fill-screen').show();

  leaderboard.push({ name: userName, points: score });
  if (multipleUsers) { prevUsers.push(userName); }
  size = leaderboard.length;
  function sortScores() {
    for (let i = 1; i < totalSize; i++)
      for (let j = 0; j < i; j++)
        if (leaderboard[i].points > leaderboard[j].points) {
          let y = leaderboard[i];
          leaderboard[i] = leaderboard[j];
          leaderboard[j] = y;
        }
  }
  function outputScores() {
    let i;
    for (i = 0; i < totalSize; i++) {
      if (leaderboard[i].name == userName) {
        content = '<div class="ld-row user"><div class="ld-col rank">' + (i + 1) + '</div><div class="ld-col name">' + leaderboard[i].name + '</div><div class="ld-col points">' + leaderboard[i].points + '</div></div>';
        $('.leaderboard-list').append(content);
      } else {
        content = '<div class="ld-row"><div class="ld-col rank">' + (i + 1) + '</div><div class="ld-col name">' + leaderboard[i].name + '</div><div class="ld-col points">' + leaderboard[i].points + '</div></div>';
        $('.leaderboard-list').append(content);
      }
    }
  }
  sortScores();
  outputScores();
  $('.leaderBoard,#restart').fadeIn();
}


// wait for document's ready state
$(document).ready(function () {
  disintegrate.init();
  const root = document.querySelector(':root');
  // Get the size of an object
  let size;
  //var totalSize = size + 1;
  let content;

  splashScreen();

  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      multipleUsers = true
    } else {
      multipleUsers = false
    }
  });

  $("#numberForm").submit(function (e) {
    e.preventDefault();
    init();
    inputNum();
  });

  function getAngle() {
    let segment = Math.floor(Math.random() * catagoriesTotal);
    angles = 360 / catagoriesTotal * segment + 360;
    qNum = Math.ceil(Math.random() * questionsTotal);
  }
  $('.spinWheel').click(function () {
    if (userAttempts < maxAttempts) {
      $(".qCat,.qText,.answerBox,.key").hide();
      document.getElementsByClassName("options").disabled = false;
      $(".options").removeClass("disabled");
      $(".graphic").removeClass("cross tick");
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
            $(".category").text("Science & Nature")
            root.style.setProperty('--categoryColour', categoryColours[0]);
            break;
          case 510:
            questionBank = ScienceAndNature;
            $(".category").text("Science & Nature")
            root.style.setProperty('--categoryColour', categoryColours[0]);
            break;
          case 630:
            questionBank = ScienceAndNature;
            $(".category").text("Science & Nature")
            root.style.setProperty('--categoryColour', categoryColours[0]);
            break;
          case 420:
            questionBank = Geography;
            $(".category").text("Geography")
            root.style.setProperty('--categoryColour', categoryColours[1]);
            break;
          case 540:
            questionBank = Geography;
            $(".category").text("Geography")
            root.style.setProperty('--categoryColour', categoryColours[1]);
            break;
          case 660:
            questionBank = Geography;
            $(".category").text("Geography")
            root.style.setProperty('--categoryColour', categoryColours[1]);
            break;
          case 450:
            questionBank = Entertainment;
            $(".category").text("Entertainment")
            root.style.setProperty('--categoryColour', categoryColours[2]);
            break;
          case 570:
            questionBank = Entertainment;
            $(".category").text("Entertainment")
            root.style.setProperty('--categoryColour', categoryColours[2]);
            break;
          case 690:
            questionBank = Entertainment;
            $(".category").text("Entertainment")
            root.style.setProperty('--categoryColour', categoryColours[2]);
            break;
          default:
            questionBank = history;
            $(".category").text("History")
            root.style.setProperty('--categoryColour', categoryColours[3]);
        }
        questionVars = questionBank[qNum];
        $(".question").text(questionVars.question)
        $(".qCat,.qText,.answerBox,.prize,.fill-screen").show();
        $(".answerBox").removeClass("cross tick");
        $(".prize").removeClass("invisible");
        $(".prize").addClass("anim");
        $(".spinAgain").css("background-color", "#f0ffff");
        let option1 = '<button id="option1" class="options">' + questionVars.responses.option1 + '</button>'
        let option2 = '<button id="option2" class="options">' + questionVars.responses.option2 + '</button>'
        let option3 = '<button id="option3" class="options">' + questionVars.responses.option3 + '</button>'
        let options = [option1, option2, option3]
        let a = options;

        shuffle(a);
        $(".answerBox").html(a);

        $(".options").click(function () {
          returnElement($(this));
          userAttempts++;
          if (userAttempts < maxAttempts) {
            $(".spinWheel").text("Spin again");
          } else {
            $(".spinAgain").text("Finish");
            $('.spinWheel').text("Let's see how you did!");
          }
        })
        if (userAttempts < maxAttempts) { $(".spinAgain").text("Next Question"); }
        setPoints();
        $(".prize").html("For <span>" + newPoints + "</span> points...");
        $(".key").show();
      }, 3500);
    } else { generateLeaderBoard(); }

    setTimeout(function () {
      $(".prize").removeClass("anim");
    }, 5500);
  });

  $("#action").click(function () {
    setTimeout(function () {
      $("#action").fadeOut();
    }, 500);
  });
  $(".spinAgain").click(function () {
    $(".key,.fill-screen").hide();
    $("#action").fadeIn();
  });

  function returnElement(element) {
    let clicked = $(element).attr('id');

    $(".graphic").fadeIn("slow");
    $(".graphic").css("transform", "scale(3)");

    if (clicked == "option1") {
      $(".graphic").addClass("tick")
      $(".feedback").addClass("correct");
      $(".prize").addClass("anim");
      $('#cheer').get(0).play();
      setTimeout(function () {
        $(".prize").removeClass("anim");
        $(".prize").addClass("invisible");
      }, 2000);
      score += newPoints;
    } else {
      $(".graphic").addClass("cross");
      $('#boo').get(0).play();
      $(".prize").addClass("CSS-animation");
    }
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    $(".options").addClass("disabled");
    $(".spinAgain").css("background-color", "#90ee90");

    setTimeout(function () { $(".graphic").fadeOut("slow"); }, 1500);
    setTimeout(function () { $(".prize").addClass("invisible"); getScore(); }, 1999);
    setTimeout(function () { $(".prize").removeClass("CSS-animation"); }, 5000);
  };
  $("#restart").click(function () {
    reset();
    $(".leaderBoard,.key,#restart").hide();
    $(".howToPlay,.spinWheel,.choices").fadeIn("slow");
  });
});
/*
Object.size = function (obj) {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};
*/
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