let angles, questionBank, qNum, questionVars, maxAttempts;
const catagoriesTotal = 12;
const questionsTotal = 2;
let userName = "";
let score = 0;
let userAttempts = 0;
const awards = [250, 500, 750, 1000, 2000, 5000]
const categoryColours = ["#56bad1", "#b0cc44", "#ef719b", "#f0e170"]
//Assigning false to this var means the user's score is not retained in the leaderboard after reset.
let multipleUsers = false;
let prevUsers = [];
//declare this var in config so you can easily turn on and off the random functionality
//const shuffleQuestions = true;