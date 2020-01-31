var angles
var questionBank
var qNum
var questionVars
var catagoriesTotal = 12;
var questionsTotal = 2;
var userName = "";
var score = 0;
var userAttempts = 0;
var maxAttempts
var awards = [250, 500, 750, 1000, 2000, 5000]
var categoryColours = ["#56bad1", "#b0cc44", "#ef719b", "#f0e170"]
//Assigning false to this var means the user's score is not retained in the leaderboard after reset.
var multipleUsers = false;
var prevUsers = [];
//declare this var in config so you can easily turn on and off the random functionality
//var shuffleQuestions = true;