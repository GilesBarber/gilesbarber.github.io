const interactiveID = "100-to-zero_Quiz";
const maxTimer = 100;
const timerLimit = 30; //seconds
const timerAmber = 15; //seconds
const timerRed = 5; //seconds
const timerSecondsOnly = true;
const pointsPerCorrect = 0;
const pointsPerSecond = 1;
const randomiseQuestions = true;
const maxQuestions = 10;
const maxSlowTimers = 3;
const extraTime = 15; //seconds
const extraTimeBar = 50; //percentage of full time bar
const leaderboardListMax = 10;
const defaultCountdown = 3; //seconds
const showAds = false;
let timerOn = true;
let getPrize = true;
//let timerOn = false;
const checkboxIcon = '<i class="fas fa-check-square"></i>';
let timerDisabled = false;
const uncheckedIcon = '<i class="far fa-square"></i>';
let muteClicked = false;
const muteSVG = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffffff" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>';
const unmuteIcon = '<i class="fas fa-volume-up"></i>';

let startAtSlide = '';
//startAtSlide = 'slideQuiz';
//startAtSlide = 'slideLeaderboard';
//startAtSlide = 'slideAnswers';

const buttonStartText = ["Next Question"];

const actionMsgs = {
   next: "",
   finalScore: "Now, let's find out<br>your average score...",
   finish: "Let's find out what prize you've won..."
};

const defaultFeedbacks = {
   correct: "<h2 class='green'>Yes, you got it!</h2> Well done!",
   incorrect: "<h2 class='red'>That's not right!</h2> Better luck next time.",
   timeout: "<h2 class='pink'>Out of time!</h2> Try to be quicker next time.",
   noAnswerGiven: "You ran out of time!"
}
const maxPoints = (pointsPerCorrect * maxQuestions) + (pointsPerSecond * timerLimit * maxQuestions);



let leaderboardDefault = []
for (let i = 0; i < leaderboardListMax; i++) {
   leaderboardDefault[i] = {};
   leaderboardDefault[i].name = "";
   leaderboardDefault[i].company = "";
   leaderboardDefault[i].points = 0;
}
leaderboardDefault = [{
   name: 'Mercurial Mendoza',
   company: "",
   points: Math.round(.77 * maxPoints)
}, {
   name: 'Lightning Lopes',
   company: "",
   points: Math.round(.71 * maxPoints)
}, {
   name: '‘Velocity’ Vicky',
   company: "",
   points: Math.round(.66 * maxPoints)
}, {
   name: 'Glorious Graham',
   company: "",
   points: Math.round(.61 * maxPoints)
}, {
   name: 'Magical Mark',
   company: "",
   points: Math.round(.54 * maxPoints)
}, {
   name: 'Stylish Styles',
   company: "",
   points: Math.round(.45 * maxPoints)
}, {
   name: 'Speedy Solomon',
   company: "",
   points: Math.round(.35 * maxPoints)
}, {
   name: 'Fast(ish) Fernandes',
   company: "",
   points: Math.round(.23 * maxPoints)
}, {
   name: 'Sharp Sharma',
   company: "",
   points: Math.round(.19 * maxPoints)
}];

const questionBank = [];
questionBank[1] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Correct",
      4: "Incorrect"
   },
   correct: [3],
   feedBackText: 'Feedback for Q1',
   fastest: {
      name: leaderboardDefault[1].name,
      company: leaderboardDefault[1].company,
      time: 23
   }
};
questionBank[2] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct",
      3: "Incorrect",
      4: "Incorrect"
   },
   correct: [2],
   feedBackText: 'Feedback for Q2',
   fastest: {
      name: leaderboardDefault[2].name,
      company: leaderboardDefault[2].company,
      time: 24
   }
};
questionBank[3] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct"/*,
      3: "Rationalise correctly.",
      4: "Reconcile reliably."*/
   },
   correct: [2],
   feedBackText: 'Feedback for Q3',
   fastest: {
      name: leaderboardDefault[3].name,
      company: leaderboardDefault[3].company,
      time: 25
   }
};
questionBank[4] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Correct",
      4: "Incorrect"
   },
   correct: [3],
   feedBackText: 'Feedback for Q4',
   fastest: {
      name: leaderboardDefault[4].name,
      company: leaderboardDefault[4].company,
      time: 26
   }
};
questionBank[5] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Incorrect",
      4: "Correct",
      5: "Incorrect"
   },
   correct: [4],
   feedBackText: 'Feedback for Q5',
   fastest: {
      name: leaderboardDefault[5].name,
      company: leaderboardDefault[5].company,
      time: 27
   }
};
questionBank[6] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct"/*,
      3: "It allows you to keep your emotions in check without them affecting your work.",
      4: "It allows you to quickly recognise when someone is being emotional."*/
   },
   correct: [2],
   feedBackText: 'Feedback for Q6',
   fastest: {
      name: leaderboardDefault[6].name,
      company: leaderboardDefault[6].company,
      time: 28
   }
};
questionBank[7] = {
   question: "Which is correct?",
   options: {
      1: "Correct",
      2: "Incorrect",
      3: "Incorrect",
      4: "Incorrect"
   },
   correct: [1],
   feedBackText: 'Feedback for Q7',
   fastest: {
      name: leaderboardDefault[7].name,
      company: leaderboardDefault[7].company,
      time: 29
   }
};
questionBank[8] = {
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Incorrect",
      4: "Correct"
   },
   correct: [4],
   feedBackText: 'Feedback for Q8',
   fastest: {
      name: leaderboardDefault[8].name,
      company: leaderboardDefault[8].company,
      time: 22
   }
};
questionBank[9] = {
   question: "Which is correct?",
   options: {
      1: "Correct",
      2: "Incorrect",
      3: "Incorrect"/*,
      4: "Letting all parties get on with resolving the conflict between themselves."*/
   },
   correct: [1],
   feedBackText: 'Feedback for Q9',
   fastest: {
      name: leaderboardDefault[1].name,
      company: leaderboardDefault[1].company,
      time: 21
   }
};
questionBank[10] = {
   question: "Which is correct?",
   options: {
      1: "Correct",
      2: "Incorrect",
      3: "Incorrect",
      4: "Incorrect"
   },
   correct: [1],
   feedBackText: 'Feedback for Q10',
};

const prizeBank = [{
   prizeName: "Smart TV",
   imageURL: "imgs/_colour_tv.svg",
   feedBackText: '',
}, {
   prizeName: "Fondue",
   imageURL: "imgs/_fondue.svg",
   feedBackText: '',
}, {
   prizeName: "Headphones",
   imageURL: "imgs/_headphones.svg",
   feedBackText: '',
}, {
   prizeName: "Clock",
   imageURL: "imgs/_alarm_clock.svg",
   feedBackText: '',
}, {
   prizeName: "DVD Box set",
   imageURL: "imgs/_dvd_boxset.png",
   feedBackText: '',
}, {
   prizeName: "Dressing Gown",
   imageURL: "imgs/_dressing_gown.svg",
   feedBackText: '',
}, {
   prizeName: "Carving knife",
   imageURL: "imgs/_carving_knife.svg",
   feedBackText: '',
}, {
   prizeName: "Salt & Pepper",
   imageURL: "imgs/_salt_&_pepper.svg",
   feedBackText: '',
}];