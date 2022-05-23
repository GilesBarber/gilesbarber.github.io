let totalSlides, lockedNavigation, slidesStorage, clockwise;
let currentSlide = 1;
let currentSection = 1;
let currentSlideGlobal = 0;
let slidesDone = [];
let sectionsDone = [true];
let timeouts = [];
let highestSlideViewed = 0;
const cyclePositions = 7;
const segmentAngle = 360 / cyclePositions;
const positionsTotal = cyclePositions + 1;
let angle = 0;
let readySwitch = true;

lockedNavigation = true;
//lockedNavigation = false;