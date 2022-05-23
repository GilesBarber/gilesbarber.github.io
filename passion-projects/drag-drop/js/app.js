var data
var drop1
var drop2
var drop3
var dataCheck
var dataBoolean
// set the initial score to 0
var score = 0;

var w = window.innerWidth;
var thirdPageWidth = w / 3 - 65; //calc(100vw / 3 - 65px);
var round = Math.round(thirdPageWidth);

$(document).ready(function () {
    var root = document.querySelector(':root');
    var rootStyles = getComputedStyle(root);
    var kitten1 = rootStyles.getPropertyValue('--kitten1');
    var kitten2 = rootStyles.getPropertyValue('--kitten2');
    var kitten3 = rootStyles.getPropertyValue('--kitten3');
    if (w < 767) {
        root.style.setProperty('--kitten1', 'url("http://www.fillmurray.com/' + w + '/100")');
        root.style.setProperty('--kitten2', 'url("http://www.placecage.com/' + w + '/100")');
        root.style.setProperty('--kitten3', 'url("http://placekitten.com/g/' + w + '/100")');
    } else {
        root.style.setProperty('--kitten1', 'url("http://www.fillmurray.com/' + round + '/100")');
        root.style.setProperty('--kitten2', 'url("http://www.placecage.com/' + round + '/100")');
        root.style.setProperty('--kitten3', 'url("http://placekitten.com/g/' + round + '/100")');
    }
    window.onresize = function () {
        w = window.innerWidth;
        thirdPageWidth = w / 3 - 65;
        round = Math.round(thirdPageWidth);
        if (w < 767) {
            root.style.setProperty('--kitten1', 'url("http://www.fillmurray.com/' + w + '/100")');
            root.style.setProperty('--kitten2', 'url("http://www.placecage.com/' + w + '/100")');
            root.style.setProperty('--kitten3', 'url("http://placekitten.com/g/' + w + '/100")');
        } else {
            root.style.setProperty('--kitten1', 'url("http://www.fillmurray.com/' + round + '/100")');
            root.style.setProperty('--kitten2', 'url("http://www.placecage.com/' + round + '/100")');
            root.style.setProperty('--kitten3', 'url("http://placekitten.com/g/' + round + '/100")');
        }
    };
});


// increment score
var incrementScore = function () {
    return ++score;
}
function allowDrop(ev) {
    var dropContents = ev.target
    if (dropContents.childNodes.length) {
        console.log(ev)
    } else { ev.preventDefault(); }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    data = ev.dataTransfer.getData("text");

    ev.target.appendChild(document.getElementById(data));
    drop1 = $("#drop1 > div").attr("data-option")
    drop2 = $("#drop2 > div").attr("data-option")
    drop3 = $("#drop3 > div").attr("data-option")
    completeCheck();
    if (dataBoolean == false) {
        document.getElementById("score").disabled = false;
    }
}

function completeCheck() {
    var drop1contents = document.getElementById("drop1").childNodes.length
    var drop2contents = document.getElementById("drop2").childNodes.length
    var drop3contents = document.getElementById("drop3").childNodes.length

    if (drop1contents && drop2contents && drop3contents) {
        dataBoolean = false;
    }
}

function getScore() {
    if ($("#drop1 > div").attr("data-option") == 1) {
        $("#drop1").addClass("tick");
        incrementScore()
    }
    else {
        $("#drop1").addClass("cross");
    }
    if ($("#drop2 > div").attr("data-option") == 2) {
        $("#drop2").addClass("tick");
        incrementScore()
    }
    else {
        $("#drop2").addClass("cross");
    }
    if ($("#drop3 > div").attr("data-option") == 3) {
        $("#drop3").addClass("tick");
        incrementScore()
    }
    else {
        $("#drop3").addClass("cross");
    }

    // and put it into the html
    $(".feedback").find("span").html(score);
    //disable score button	
    document.getElementById("score").disabled = true;
}
// update the score after calling the incrementScore() func
var updateScoreHtml = function () {
    $(".feedback").find("span").html(incrementScore());
}
function reset() {
    $(".dropZone").removeClass("tick");
    $(".dropZone").removeClass("cross");
    score = 0;
    dataBoolean = true;
    $(".feedback").find("span").html(score);
    document.getElementById("score").disabled = true;
    var boxes = document.getElementById("dragBoxes");
    var undrag1 = document.getElementById("drag1");
    boxes.appendChild(undrag1);
    var undrag2 = document.getElementById("drag2");
    boxes.appendChild(undrag2);
    var undrag3 = document.getElementById("drag3");
    boxes.appendChild(undrag3);
    var clear1 = document.getElementById("drop1");
    clear1.removeChild(clear1.childNodes[1]);
    var clear2 = document.getElementById("drop2");
    clear2.removeChild(clear2.childNodes[1]);
    var clear3 = document.getElementById("drop3");
    clear3.removeChild(clear3.childNodes[1]);
}