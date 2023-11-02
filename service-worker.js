// let timer = {};
// // chrome.runtime.onInstalled.addListener() //should start on install, and also should start on reload
// // chrome.runtime.onStartup.addEventListener(''
// //     callback: () => {
// //         startTimer();
// //     } //call the startTimer function on startup
// //     ) ;

// //chrome is a global default variable that all extensions can access
// //
// chrome.action.onClicked.addListener((tab) => {
//   //listener takes tab as argument -- the chrome.tabs.query should select the active tab
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     let activeTab = tabs[0];
//     //startTimer(); //not where this belongs
//   });
// });

//grab the current tab -- maybe use this
// async function getCurrentTab() {
//   let queryOptions = { active: true, lastFocusedWindow: true }; //sets options on query
//   let [tab] = await chrome.tabs.query(queryOptions); //queries the tabs objects looking for the last focused window that is active
//   return tab; //returns a pointer to the tab object
//   //should be able to assign a constant to this function, and know whether the user is on this tab
// }

//extension installed
//on desired pages (youtube)
//after clicking on extension icon,
//a timer should pop up
//display a timer w/ h/m/s at 0:0:0 --potentially tracking cumulative time on that URL over the last (current session, day, week?)
//it should immediately start counting up from zero, tracking time on the page
//(initially only the time on that page after clicking extnesion, later, all the time across browser session, later, all the time spent over a given time period)
//once timer > threshold --> alert user

//ideal --> go to timewasting site, timer pops up automatically
//MVP --> go to any site, click the extension button, and the timer starts

let timerIntervalID;
let hourTimer = 0;
let minuteTimer = 0;
let secondTimer = 0;

function startTimer() {
  timerIntervalID = setInterval(() => {
    secondTimer += 1;
    if (secondTimer >= 60) {
      secondTimer = 0;
      minuteTimer += 1;
    }
    if (minuteTimer >= 60) {
      minuteTimer = 0;
      hourTimer += 1;
    }
    document.querySelector('.second').innerHTML = secondTimer.toLocaleString(
      'en-US',
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    document.querySelector('.minute').innerHTML = minuteTimer.toLocaleString(
      'en-US',
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    document.querySelector('.hour').innerHTML = hourTimer.toLocaleString(
      'en-US',
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
  }, 1000);
}

function stopTimer() {
  clearInterval(timerIntervalID);
}

function checkSite() {
  if (
    window.location.hostname === 'www.youtube.com' ||
    window.location.hostname === 'youtube.com'
  ) {
    return startTimer();
  } else {
    return stopTimer();
  }
}

// checkSite();
