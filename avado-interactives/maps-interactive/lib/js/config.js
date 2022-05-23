const totalSlides = 6;
const currentSlide = 1;
let slidesDone = [];
let timeouts = [];
const lockedNavigation = true;

const pinsEnabled = ['', true];

const pinPoints = {
   1: {
      top: '75%',
      left: '30%',
      transform: 'scale(2)',
      img: 'imgs/images/getStartedPin.svg'
   },
   2: {
      left: '42%',
      top: '66%',
      transform: 'scale(2)',
      img: 'imgs/images/Module1DropPin.svg'
   },
   3: {
      left: '51%',
      top: '54%',
      transform: 'scale(2)',
      img: 'imgs/images/Module2DropPin.svg'
   },
   4: {
      left: '60%',
      top: '41%',
      transform: 'scale(2)',
      img: 'imgs/images/Module3DropPin.svg'
   },
   5: {
      left: '69%',
      top: '28%',
      transform: 'scale(2)',
      img: 'imgs/images/Module4DropPin.svg'
   },
   6: {
      left: '77%',
      top: '14%',
      transform: 'scale(2)',
      img: 'imgs/images/Module5DropPin.svg'
   },


};

const titles = {
   1: 'Step One',
   2: 'Step Two',
   3: 'Step Three',
   4: 'Step Four',
   5: 'Step Five',
   6: 'Step Six'
};

const content = {
   1: {
      labelColor: '#d0d0d0',
      moduleIcon: 'imgs/images/getStartedIcon.svg',
      title: 'First place',
      bodyText: `<p class="intro">Things to do:</p>
      <ul class="list">
         <li>Thing 1</li>
         <li>Thing 2</li>
         <li>Thing 3</li>
         <li>Thing 4</li>
      </ul>`,
      course: {
         icon: '',
         title: '',
         subtitle: ''
      },
      liveClasses: {
         icon: 'imgs/images/liveClassIconGS.svg',
         title: 'Activity',
      }
   },
   2: {
      labelColor: '#6666cc',
      moduleIcon: 'imgs/images/Module1icon.svg',
      title: 'Second place',
      bodyText: `<p class="intro">Things to do:</p>
      <ul class="list">
         <li>Thing 1</li>
         <li>Thing 2</li>
         <li>Thing 3</li>
         <li>Thing 4</li>
      </ul>`,
      course: {
         icon: 'imgs/images/groupProjectIconM1.svg',
         title: 'Itinerary',
         subtitle: 'Item'
      },
      liveClasses: {
         icon: 'imgs/images/liveClassIconM1.svg',
         title: 'Activity',
      }
   },

   3: {
      labelColor: '#0099cc',
      moduleIcon: 'imgs/images/Module2icon.svg',
      title: 'Third place',
      bodyText: `<p class="intro">Things to do:</p>
      <ul class="list">
         <li>Thing 1</li>
         <li>Thing 2</li>
         <li>Thing 3</li>
         <li>Thing 4</li>
      </ul>`,
      course: {
         icon: 'imgs/images/groupProjectIconM2.svg',
         title: 'Itinerary',
         subtitle: 'Item'
      },
      liveClasses: {
         icon: 'imgs/images/liveClassIconM2.svg',
         title: 'Activity',
      }
   },
   4: {
      labelColor: '#e52321',
      moduleIcon: 'imgs/images/Module3icon.svg',
      title: 'Fourth place',
      bodyText: `<p class="intro">Things to do:</p>
      <ul class="list">
         <li>Thing 1</li>
         <li>Thing 2</li>
         <li>Thing 3</li>
         <li>Thing 4</li>
      </ul>`,
      course: {
         icon: 'imgs/images/groupProjectIconM3.svg',
         title: 'Itinerary',
         subtitle: 'Item'
      },
      liveClasses: {
         icon: 'imgs/images/liveClassIconM3.svg',
         title: 'Activity',
      }
   },
   5: {
      labelColor: '#ff8f00',
      moduleIcon: 'imgs/images/Module4icon.svg',
      title: 'Fifth place',
      bodyText: `<p class="intro">Things to do:</p>
      <ul class="list">
         <li>Thing 1</li>
         <li>Thing 2</li>
         <li>Thing 3</li>
         <li>Thing 4</li>
      </ul>`,
      course: {
         icon: 'imgs/images/groupProjectIconM4.svg',
         title: 'Itinerary',
         subtitle: 'Item'
      },
      liveClasses: {
         icon: 'imgs/images/liveClassIconM4.svg',
         title: 'Activity',
      }
   },
   6: {
      labelColor: '#1fab7a',
      moduleIcon: 'imgs/images/Module5icon.svg',
      title: 'sixth place',
      bodyText: `<p class="intro">Things to do:</p>
      <ul class="list">
         <li>Thing 1</li>
         <li>Thing 2</li>
         <li>Thing 3</li>
         <li>Thing 4</li>
      </ul>`,
      course: {
         icon: 'imgs/images/groupProjectIconM5.svg',
         title: 'Itinerary',
         subtitle: 'Item'
      },
      liveClasses: {
         icon: 'imgs/images/liveClassIconM5.svg',
         title: 'Activity',
      }
   },

}


// const contents = {
//    1: '<p><b>Conclusion</b><br>Henry’s departure has not only been a costly endeavour, it has also caused ripples across the organisation. Dysfunctional turnover has a direct emotional impact on the rest of the workforce, leaving people with less certainty and perhaps more questions.</p><em>In your mind, were there any avoidable causes that led to Henry’s departure? How would you have handled it differently if you were in Matteo’s team?</em>',
//    2: '<p><b>Training</b><br>Upskilling new employees cost money. Whether the training is done in-house or externally, it’s always good to have options, as time is being taken away from work. At Zadeemo, employees receive training once a quarter. It is all done in-house and usually takes two days.</p><em>This costs the company eight working days.</em><p><b>Other costs</b><br>Zadeemo’s turnover journey doesn’t end there. Holiday cover, maternity pay, sick days, software licenses etc. will all need to be considered for Henry’s replacement.</p><p>What’s more, the company’s reputation is also at stake – if Henry remains frustrated by what he has experienced, it is likely that he may write a bad review about the company on Glassdoor.</p>',
//    3: '<p><b>Exit interview</b><br>During this time, Matteo must also schedule time for Henry’s exit interview, and ensure that all paperwork is in place for him leaving. This is not a simple process and takes Matteo a full day to do.</p><em>This costs the company one working day.</em><br><p><b>Onboarding</b><br>Once a decision has been made about Henry’s replacement, the onboarding process for the new employee begins. Contracts must be drawn up, as well as induction sessions planned and implemented. Onboarding can take anywhere from a few days to a few weeks. In this case, it is the latter.</p><em>This costs the company two working weeks.</em>',
//    4: '<p><b>Screening of applicants</b><br>Once the job advertisement is posted, applications will start coming in. Research shows that it takes approximately 24 full hours to screen for one job, which is almost a full working week spent on screening.</p><em>This costs the company three and a half working days.</em><br><p><b>Interviews</b><br>Matteo likes to conduct first-round interviews via video calls and then invite candidates into the office for a final interview. He also likes to have at least five applicants to choose from. On average, preparing for and conducting the interviews takes Matteo up to five hours for each candidate.</p><em>This costs the company four working days.</em>',
//    5: '<p><b>Gardening leave</b><br>As a result of Henry’s influence on others, management has decided to put Henry on gardening leave for the duration of his working time at Zadeemo. Gardening leave means that Henry will still receive his salary for the two-month notice period, but he will not be required to go into work or partake in any work activities.<br>He will not have access to any work systems and he will be expected to respect these conditions while he awaits the end of his notice period. He will also not be allowed to work for anyone else during this time, as he is still categorised as an employee.</p><em>This costs the company Henry’s productivity.</em><p><b>Creating a job design for the role</b><br>Matteo now needs to create a job specification for Henry’s role. A solid job spec can help attract the right type of candidate, therefore making the process more efficient and less costly, timewise. However, putting this together requires time and energy from Matteo and upper management.<br>As Henry joined when the business was first started, there has never been a job spec for his role.</p><em>This costs the company three working days.</em>',
//    6: '<p><b>Disengagement</b><br>It’s human nature for employees who submit their notice to start shutting down. Henry is not as engaged or motivated as he used to be. He has cancelled most of his team meetings as he feels they are no longer useful because he won’t be around to monitor deadlines or support progress. He’d rather leave that to his replacement.</p><em>This costs the company Henry’s productivity.</em><br><p><b>Further turnover</b><br>Henry is not shy about telling people why he is leaving. As a highly respected member of the workforce, other employees will listen when he speaks. Henry’s resignation has sparked an additional two resignations in the same week, one from his own team. That means that Henry’s team must now think about replacing two workers out of six – that’s one third of their team.</p><em>This costs the company two more employees.</em>'
// };