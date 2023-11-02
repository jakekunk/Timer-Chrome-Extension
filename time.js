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
    document.querySelector(".second").innerHTML = secondTimer.toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    document.querySelector(".minute").innerHTML = minuteTimer.toLocaleString(
      "en-US",
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }
    );
    document.querySelector(".hour").innerHTML = hourTimer.toLocaleString(
      "en-US",
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

let activeTabInfo; // Declare a variable to store tab information

// Get the current active tab and store the results in a variable
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs.length > 0) {
    activeTabInfo = tabs[0].url; // Store the active tab url information
  }
  //note that this information is not accessible outside the callback,
  //because it's returning a promise that is async
  //so need to invoke our checkSite() function inside the callback too;
  document.addEventListener("DOMContentLoaded", function () {
    checkSite(activeTabInfo);
  });
});

//got rid of all the window.location reference --> just wasn't working, aside from
//knowing that the type was a string from conlogging, they're very odd
//not equal to ZLS, null, or undefined
//but doesn't print diddly when logged directly, either
function checkSite(url) {
  //select current tab
  //let activeTab; //init a variable to store the tab object pointer in
  //and assign the query result to it

  //chrome.tabs.query returns a promise --> eg, have to use inside the same scope, or
  //check the status of the promise and only set the value after it's resolved (annoying)

  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   //first argument to query is the selection criteria (eg, active and currentWindow), second is the callback --> which we just use to set a tab variable to point to the current tab

  //check if we're on a prohibited/time-limited site url
  //console.log(url);
  if (url === ("https://www.youtube.com/" || "youtube.com")) {
    //url is https --> consider parsing string or using a fuzzier match for better results
    return startTimer();
  } else {
    return stopTimer();
  }
}

//Other notes:

//refactored manuscript --> remove background, add tab permissions
//renamed background-worker to time.js
//refactor .html --> reference new script name instead of background worker
//removed the silly module I had installed
//pulled out the window.location references --> perhaps those also represent promises?

//TO-DO / TO CONSIDER:

//icon image does need to be a specific size? seeing lots of examples with various sizes for various resolution screens

//this is triggering off of the POPUP DOM being loaded (I think?), so
//still requires the button be clicked first to initiate the popup
//--> I think we can do this by having the popup initiate not from the browser-action as it is now?

//Switching tabs definitely just resets the timer, doesn't persist as we'd like to see.

//Clicking and then clicking the icon again resets the timer too
//the timer gets re-invoked when we instantiate the popup by clicking hte button.

// ... but I did figure out how to grab the current tab URL,

// and I might be able to use the promise returned from said query
// to auto-start the timer. Maybe.

//it's 10:30P and time for some rest.

// -- Jake
