var timeNew, sHours, sMins, sSeconds, endTime, zoomTabId, message
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
firebase.analytics();

chrome.runtime.onMessage.addListener(
  function(request,sender,sendResponse){
    console.log("zoom window was opened")
    console.log(sender.tab.id)
    alert("Remeber to close the zoom window when you are done with class!")
    zoomTabId=sender.tab.id
    timeNew = new Date()
    sHours = timeNew.getHours()
    sMins = timeNew.getMinutes()
    sSeconds = timeNew.getSeconds()
  }
)

chrome.tabs.onRemoved.addListener(function(tabId, removed) {
  if(tabId==zoomTabId)
  {
    alert("zoom tab closed. Times have been documented. Thank you!")
    stopTimer()
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

  firebase.database().ref("userTimes").push({
    hits,
    timeTotal,
    endTime
  })
}
