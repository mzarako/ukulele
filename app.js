$(function() {
  console.log('loaded');
  //getDataFromApi();
  makeSounds();
});

function getDataFromApi(uName, pWord) {
  //var Hooktheory_URL = 'https://api.hooktheory.com/v1/users/auth';
  var params = {
    url: 'https://api.hooktheory.com/v1/users/auth',
    type: 'POST',
    accepts: 'application/json',
    contentType: 'application/json',
    username: uName,
    password: pWord,
    success: function(result) {
      console.log(result);
    }
  }
    $.ajax(params);
  }

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

    var uke = new Tone.PluckSynth().toMaster();

    $('button').click( function(e) {
      console.log('click');
      uke.triggerAttackRelease(220, 0.1);
  });
}
