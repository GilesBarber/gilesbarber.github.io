const defaultAttempts = 3;
const defaultLifelines = 1;
const questionsTotal = 10;
const timerLimit = 30; //seconds
const timerAmber = 10; //seconds
const timerRed = 5; //seconds
const timerSecondsOnly = true;
const meterStrokeDash = 270;
const scorePointsDefault = 100;
const maxScore = 100;
const bonusPerSecond = 10;
let timeouts = [];
let intHiLight1, timeoutHiLight1, attempts;
const gridColumns = 4;
const gridRows = 3;
const gridCurrCol = gridColumns;
const gridCurrRow = gridRows;
const checkboxIcon = '<i class="fas fa-check-square"></i>';
const uncheckedIcon = '<i class="far fa-square"></i>';

let forceResultsPage = false;
const randomiseQuestions = false;
const enableFeedback = false;
let timerDisabled = true;
let muteClicked = false;
const muteSVG = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16" role="img" xmlns="http://www.w3.org/2000" viewBox="0 0 512 512"><path fill="#ffffff" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path><>';
const unmuteIcon = '<i class="fas fa-volume-up"></i>';
let totalSlides = 1;
let currentSlide = 1;
let slidesDone = [];
const lockedNavigation = false;

const easeType = 'easeInOutSine';
const anim = 1000;

const colours = {
   correct: 'var(--jade)',
   incorrect: 'var(--warm-red)'
};

let userStats = {};
userStats.scoreCounter = 0;
userStats.correctAnswers = 0;
userStats.timeBonus = 0;

const defaultFeedback = {
   final: 'Let’s see the scores...',
   correct: 'Yes! That makes sense',
   incorrect: 'Huh? That doesn’t sound right'
};


const questionBank = {};
questionBank[1] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Correct"
   },
   correct: [3],
   feedBackText: '',
};
questionBank[2] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct",
      3: "Incorrect"
   },
   correct: [2],
   feedBackText: '',
};
questionBank[3] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Correct",
      2: "Incorrect",
      3: "Incorrect"
   },
   correct: [1],
   feedBackText: '',
};
questionBank[4] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct",
      3: "Incorrect"
   },
   correct: [2],
   feedBackText: '',
};
questionBank[5] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Correct"
   },
   correct: [3],
   feedBackText: '',
};
questionBank[6] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Correct"
   },
   correct: [3],
   feedBackText: '',
};
questionBank[7] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Correct",
      2: "Incorrect",
      3: "Incorrect"
   },
   correct: [1],
   feedBackText: '',
};
questionBank[8] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct",
      3: "Incorrect"
   },
   correct: [2],
   feedBackText: '',
};
questionBank[9] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Correct",
      3: "Incorrect"
   },
   correct: [2],
   feedBackText: '',
};
questionBank[10] = {
   type: 'choice',
   question: "Which is correct?",
   options: {
      1: "Incorrect",
      2: "Incorrect",
      3: "Correct"
   },
   correct: [3],
   feedBackText: '',
};


let pinsEnabled = ['', true];

const floorLevels = {
   1: {
      left: 70,
      top: 480,
      transform: 'scale(0.6)'
   },
   2: {
      left: 167,
      top: 311
   },
   3: {
      left: 167,
      top: 182
   },
   4: {
      left: 167,
      top: 52
   }
}

const pinPoints = {
   10: {
      left: 274,
      top: 52,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Morwenna1.svg',
         correct: 'imgs/_Morwenna2.svg',
         incorrect: 'imgs/_Morwenna3.svg'
      }
   },
   9: {
      left: 434,
      top: 52,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Winona1.svg',
         correct: 'imgs/_Winona2.svg',
         incorrect: 'imgs/_Winona3.svg'
      }
   },
   8: {
      left: 495,
      top: 182,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Paul1.svg',
         correct: 'imgs/_Paul2.svg',
         incorrect: 'imgs/_Paul3.svg'
      }
   },
   7: {
      left: 438,
      top: 182,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Sarah1.svg',
         correct: 'imgs/_Sarah2.svg',
         incorrect: 'imgs/_Sarah3.svg'
      }
   },
   6: {
      left: 240,
      top: 182,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Lupe1.svg',
         correct: 'imgs/_Lupe2.svg',
         incorrect: 'imgs/_Lupe3.svg'
      }
   },
   5: {
      left: 506,
      top: 301,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Alice1.svg',
         correct: 'imgs/_Alice2.svg',
         incorrect: 'imgs/_Alice3.svg'
      }
   },
   4: {
      left: 420,
      top: 301,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Eric1.svg',
         correct: 'imgs/_Eric2.svg',
         incorrect: 'imgs/_Eric3.svg'
      }
   },
   3: {
      left: 342,
      top: 301,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Sunny1.svg',
         correct: 'imgs/_Sunny2.svg',
         incorrect: 'imgs/_Sunny3.svg'
      }
   },
   2: {
      left: 280,
      top: 301,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Matteo1.svg',
         correct: 'imgs/_Matteo2.svg',
         incorrect: 'imgs/_Matteo3.svg'
      }
   },
   1: {
      left: 270,
      top: 301,
      transform: 'scale(0.6)',
      character: {
         charInit: 'imgs/_Bryan1.svg',
         correct: 'imgs/_Bryan2.svg',
         incorrect: 'imgs/_Bryan3.svg'
      }
   }
};

//const bossGreeting = 'I’m the Final Boss. Well, technically the Final C.E.O…';
const charGreeting = {
   9: 'You’ve made some excellent points. But I do have a question…​',
   8: 'Do you want my seat? You’ll have to answer a question…',
   7: 'Welcome to the meeting.',
   6: 'Ah, I need your help with something.',
   5: 'Hey there – do you have time for a quick question?',
   4: 'Ah, my hero. There’s a question I need you to look at.',
   3: 'You must be the expert they hired. Let me pick your brain for a minute.​',
   2: 'I’m too busy to talk. Answer this question, then leave me alone!',
   1: 'You’re new right? New kids have to answer a question to get in!'
}

const charScripts = {
   1: {
      greeting: 'How do I know you even work here? Prove it!',
      responseCorrect: 'You know your stuff. Have a nice day.',
      responseInorrect: 'Wrong! I knew you were a trespasser. Security! SECURITY!'
   },
   2: {
      greeting: 'I’m too busy to talk. Answer this question, then leave me alone!',
      responseCorrect: 'Yes, yes, very good. What do you want, a cookie?',
      responseInorrect: 'No, that’s wrong. Stop bothering me!'
   },
   3: {
      greeting: 'Hey, come here a sec. Can I ask you something?',
      responseCorrect: 'Yeah, that’s right! Thanks for the help.',
      responseInorrect: 'Ah, that’s wrong, sorry. Maybe I’ll ask someone else…'
   },
   4: {
      greeting: 'You must be the expert they hired. Let me pick your brain for a minute.',
      responseCorrect: 'Definitely an expert!',
      responseInorrect: 'Hmmm… I don’t think that’s right.'
   },
   5: {
      greeting: 'I hang around asking questions, so everyone thinks I’m important.',
      responseCorrect: 'Correct. You’ve earned the respect of me, an important person.',
      responseInorrect: 'I’m too important to deal with this.'
   },
   6: {
      greeting: 'I heard you know your stuff – let’s find out.',
      responseCorrect: 'You know what you’re talking about. I won’t distract you.',
      responseInorrect: 'I don’t think that’s right. I must have you confused with someone else.'
   },
   7: {
      greeting: 'I’m the coolest kid in the office. You’ll definitely want to impress me.',
      responseCorrect: 'I guess you’re the coolest now…',
      responseInorrect: 'A wrong answer? That’s not cool!'
   },
   8: {
      greeting: 'Ah, my hero. There’s a question I need you to look at.',
      responseCorrect: 'I knew you were the right one for the job!',
      responseInorrect: 'Uh… nope. Sorry. Maybe someone else knows?'
   },
   9: {
      greeting: 'Of course, I know everything – but let me test your knowledge.',
      responseCorrect: 'I totally knew that as well.',
      responseInorrect: 'That’s wrong. Maybe you need to study more?'
   },
   10: {
      greeting: 'You’re new right? New kids have to answer a question to get in!',
      responseCorrect: 'Well done! You’ll fit right in here.',
      responseInorrect: 'Nope, sorry. Tough first day…'
   },
   11: {
      greeting: 'Hey there – do you have time for a quick question?',
      responseCorrect: 'Excellent! You’re too good.',
      responseInorrect: 'Ah… maybe you needed a bit more time?'
   },
   12: {
      greeting: 'My job? I’m the Chief Question Asker',
      responseCorrect: 'I’m actually just a copywriter. But well done.',
      responseInorrect: 'Stumped you! Another great question from the CQA!'
   },
   13: {
      greeting: 'We ask too many questions? What? Why would you say that?',
      responseCorrect: 'That’s right. How did you know that?',
      responseInorrect: 'That’s wrong. Didn’t you study enough?'
   },
   14: {
      greeting: 'I’m practising for a big presentation. Want to revise with me?',
      responseCorrect: 'You’re good. I feel prepared now.',
      responseInorrect: 'Wrong, sorry. But that’s why we revise!'
   },
   15: {
      greeting: 'Ah, I need your help with something.',
      responseCorrect: 'Thanks! That was super useful.',
      responseInorrect: 'That doesn’t seem right to me, sorry…'
   },
   16: {
      greeting: 'Glad you’re here. Let me ask you something…',
      responseCorrect: 'Good. Very good, in fact.',
      responseInorrect: 'I guess we’ll have to call someone else in…'
   }
};

const bossScripts = {
   1: {
      greeting: 'I’m the Final Boss. Well, technically the Final C.E.O…',
      responseCorrect: 'Employee of the month, right here!',
      responseInorrect: 'Next time you barge into my office, make sure you’re prepared.'
   },
   2: {
      greeting: 'You like this office? Get this question right and it could be yours…',
      responseCorrect: 'Great! Grand! Wonderful! …please don’t take my office from me.',
      responseInorrect: 'They don’t give these offices to anyone, you know?'
   },
   3: {
      greeting: 'This is your chance, hotshot. Impress me with your knowledge!',
      responseCorrect: 'Incredible. I should promote whoever hired you… oh wait, that was ME.',
      responseInorrect: 'You’re lucky I haven’t had the trapdoor installed yet.'
   }
};