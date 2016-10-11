$(function() {
  // makeSounds();
});


function makeSounds() {

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


//------------------ get major and minor scale array for any root note ---------------------------
function majorScale(root) { return [0,2,4,5,7,9,11].map( num => num + root ); }
function minorScale(root) { return [0,2,3,5,7,8,10].map( num => num + root ); }

//-------------get all chords in the library that matches a key numeral --------------------------
function getNthChords(scale) {
  return function(numeral) {
    var n = numeral - 1;
    var nChords = chordLibrary.filter( function(chord) {
      if ( chord.rootNum !== scale[n]) return false;
      for (var i = 0; i < 4; i++) {
        if ( !scale.includes(chord.tones[i]%12)) return false;
      }
      return true;
    });
    return nChords;
  }
}

//---------------- get all dominat chords of any key root --------------------------
function get5thChords(keyRoot) {
  var fifth = (keyRoot + 7) % 12;
  var fiveChords = chordLibrary.filter( function(chord) {
    if ( chord.rootNum !== fifth) return false;
    for (var i = 0; i < 4; i++) {
      if ( ![0,2,4,5,7,9,10].includes(chord.tones[i]%12)) return false;
    }
  });
  return fiveChords;
}

//-------------- make a collection of all chords within a given key ------------------
function getAllChordsInKey(root) {

  var thisKey, thisScale;
  if ( ukuleleApp.isInMajorKey ) {
    thisScale = majorScale(root)
    thisKey = getNthChords(thisScale);
  }
  else {
    thisScale = minorScale(root)
    thisKey = getNthChords(thisScale);
  }

  var i = thisKey(1);
  var ii = thisKey(2);
  var iii = thisKey(3);
  var iv = thisKey(4);
  var v = get5thChords(root);
  var vi = thisKey(6);
  var vii = thisKey(7);
  var d2 = get5thChords(thisScale[1]);
  var d3 = get5thChords(thisScale[2]);
  var d4 = get5thChords(thisScale[3]);
  var d5 = get5thChords(thisScale[4]);
  var d6 = get5thChords(thisScale[5]);

  return [i, ii, iii, iv, v, vi, vii, d2, d3, d4, d5, d6];
}


//-------------- display chords of certain numeral in key -------------------------
function displayChords(keyRoot) {
  var chords = getAllChordsInKey(keyRoot);

  console.log('I chords: ' + chords[0]);
  console.log('ii chords: ' + chords[1]);
  console.log('iii chords: ' + chords[2]);
  console.log('IV chords: ' + chords[3]);
  console.log('V chords: ' + chords[4]);
  console.log('vi chords: ' + chords[5]);
  console.log('vii chords: ' + chords[6]);
  console.log('D2 chords: ' + chords[7]);
  console.log('D3 chords: ' + chords[8]);
  console.log('D4 chords: ' + chords[9]);
  console.log('D5 chords: ' + chords[10]);
  console.log('D6 chords: ' + chords[11]);

}




