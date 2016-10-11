$(function() {
  // makeSounds();
});


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





//----------------------------------------------------------- final successful version of getData

function getChordSuggestions( chordProgression ) { 
  var apikey = "2fd30e2ad4916c25122f3bb604b26d11"; 
  var API_URL = "https://api.hooktheory.com/v1/";
  var chordSuggestions = [];

  var params = { 
    url: API_URL + 'trends/nodes?cp=' + chordProgression, 
    type: 'GET', 
    contentType: 'application/json', 
    dataType: 'json', 
    beforeSend: function (xhr){ 
      xhr.setRequestHeader('Authorization', "Bearer " + apikey); 
    }, 
    success: function(result) { 
      displayChordSuggestions(result);
    }
  }
$.ajax(params);
}

function displayChordSuggestions(result) {
  var array = result.slice(0,12);
  console.log(array);
}






