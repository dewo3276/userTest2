var timeNew, sHours, sMins, sSeconds, endTime, zoomTabId
var alreadySent=false
var zoomOpened=false
var hits=0

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
//firebase.auth().signInWithCredential(credential);

var firebaseConfig = {
  apiKey: "AIzaSyDkh238kMVjpoeWXkFjtn9ZF8_L_a4LC64",
  authDomain: "timertracker-29904.firebaseapp.com",
  projectId: "timertracker-29904",
  storageBucket: "timertracker-29904.appspot.com",
  messagingSenderId: "243160475778",
  appId: "1:243160475778:web:d9ce17fe93c59f06dd2c9b",
  measurementId: "G-RJYRXJR50N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

chrome.tabs.onActivated.addListener(onActivated)

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
  zoomOpened=true
})

function onActivated(tabId, changeInfo, tab) {
    chrome.tabs.get(tabId.tabId, function(tab){
        console.log('New active tab: ' + tab.id)
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
          if(alreadySent==false && zoomOpened==true)
          {
            zoomTabId=tab.id
            console.log(zoomTabId)
            console.log(tab.url)
            alert("Remeber to close the zoom window when you are done with class!")
            timeNew = new Date()
            sHours = timeNew.getHours()
            sMins = timeNew.getMinutes()
            sSeconds = timeNew.getSeconds()
            alreadySent=true
          }
        })
    })
}//, {url: [{hostPrefix: 'https://cuboulder.zoom.us'}]}


chrome.tabs.onRemoved.addListener(function(tabId, removed) {
  if(tabId==zoomTabId)
  {
    alert("zoom tab closed. Times have been documented. Thank you!")
    stopTimer()
    alreadySent=false
    zoomOpened=false
  }
})

function stopTimer() {
  //send some signal to arduino about tabulated time
  endTime = new Date()
  sHours -= endTime.getHours()
  sMins -= endTime.getMinutes()
  sSeconds -= endTime.getSeconds()
  sHours = Math.abs(sHours)
  sMins = Math.abs(sMins)
  sSeoncds = Math.abs(sSeconds)
  var timeTotal = String(sHours) + " " + String(sMins) + " " + String(sSeconds)
  endTime = String(endTime)

  if(sHours>=1)
  {
    hits+=(sHours*60)/30
  }
  if(sMins>=30)
  {
    hits+=Math.ceil(sMins/30)
  }

  if(sMins>=30 || sHours>=1)
  {
    firebase.database().ref("userTimes").push({
      hits,
      timeTotal,
      endTime
    })
  }
  hits=0
}
