// $(function() {
  //console.log('loaded');
  //getDataFromApi();
  //makeSounds();
// });

/*function getDataFromApi(uName, pWord) {
  //var Hooktheory_URL = 'https://api.hooktheory.com/v1/users/auth';
  var params = {
    url: 'https://api.hooktheory.com/v1/users/auth',
    type: 'POST',
    accepts: 'application/json',
    contentType: 'application/json',
    username: uName,
    password: pWord
  }
    success: function(result) {
      console.log(result);
    }
  }
    $.ajax(params);

/*
    import requests

header = {"Accept": "application/json",
          "Content-Type": "application/json",
          "username":"kingzack",
          "password": "forggettaboudit"}


url = "https://api.hooktheory.com/v1/users/auth"
r = requests.post(url, data=header)
print r.json()
Out[10]:
          {u'activkey': u'XXXXXXXXXXXXXXXXXXXX',
           u'id': 6969696969,
           u'username': u'kingzack'}


  }
  */

function makeSounds() {
  /*
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  gainNode.gain.value = 0.2;

  $('button').click( function(e) {
    console.log('click');
    oscillator.frequency.value = 200; // value in hertz
    oscillator.start();
    */

    var uke1 = new Tone.Synth({
      oscillator : {
        'partials' : [0, 0, 0, 1, 0, 0.05]
      },
      envelope : {
        attack:0.01,
        decay:2,
        sustain:0,
        release:20
      }
      }).toMaster();
      var uke2 = new Tone.Synth({
        oscillator : {
          'partials' : [0, 0, 0, 1, 0, 0.05]
        },
        envelope : {
          attack:0.01,
          decay:1.5,
          sustain:0,
          release:20
        }
        }).toMaster();
        uke1.volume.value = -5;
        uke2.volume.value = -5;
    var uke3 = new Tone.PluckSynth({
      'dampening' : 600,
      'resonance' : 1,
      'attackNoise' : 1
    }).toMaster();
    var uke4 = new Tone.PluckSynth({
      'dampening' : 600,
      'resonance' : 1,
      'attackNoise' : 1
    }).toMaster();

    $('button').click( function(e) {
      console.log('click');
      uke1.triggerAttack(200);
      uke2.triggerAttack(300, "+0.02");
      //uke3.triggerAttack(1200, "+0.02");
      //uke4.triggerAttack(1800, "+0.03");
  });
}


/*


$(function() { var apikey = ""; var API_URL = "https://api.hooktheory.com/v1/";
var theData = JSON.stringify({ username: 'jdobrowner', password: 'Kepler22b' });
console.log('loaded'); initApi();
function initApi() { //var Hooktheory_URL = 'https://api.hooktheory.com/v1/users/auth';
var params = { url: API_URL + 'users/auth', type: 'POST', contentType: 'application/json', dataType: 'json', data: theData, success: function(result) { apikey = result.activkey; console.log(result); console.log(apikey);
  getData();

},
error: function (xhr, ajaxOptions, thrownError) {
   console.log(xhr.status);
   console.log(thrownError);
}
} $.ajax(params); }
function getData() { var params = { url: API_URL + 'trends/nodes?cp=4', type: 'GET', contentType: 'application/json', dataType: 'json', beforeSend: function (xhr){ xhr.setRequestHeader('Authorization', "Bearer " + apikey); }, success: function(result) { console.log(result);
  }
}
  $.ajax(params);
}
});
*/


//-----------------------------------------------------------final successful version

$(function() { 
  var apikey = ""; 
  var API_URL = "https://api.hooktheory.com/v1/";
  var theData = JSON.stringify({ username: 'jdobrowner', password: 'Kepler22b' });
  console.log('loaded'); 
  var apiRequest = initApi();
  apiRequest.then(function(result) { 
    apikey = result.activkey; 
    console.log(result); 
    console.log(apikey);
    getData();
  });

  function initApi() { //var Hooktheory_URL = 'https://api.hooktheory.com/v1/users/auth';
  var params = { 
    url: API_URL + 'users/auth', 
    type: 'POST', 
    contentType: 'application/json', 
    dataType: 'json', data: theData, 
    error: function (xhr, ajaxOptions, thrownError) { 
      console.log(xhr.status); 
      console.log(thrownError); 
    } 
  } 
  return $.ajax(params); 
}

function getData() { 
  var params = { 
    url: API_URL + 'trends/nodes?cp=4', 
    type: 'GET', 
    contentType: 'application/json', 
    dataType: 'json', 
    beforeSend: function (xhr){ 
      xhr.setRequestHeader('Authorization', "Bearer " + apikey); 
    }, 
    success: function(result) { console.log(result);
  }
}
$.ajax(params);
}
});







