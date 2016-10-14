var ukuApp = {
    state : {},
    chordLib : [
        { rootnum: 0, fingering: [0, 1, 0, 0] },
        { rootnum: 0, fingering: [3, 0, 4, 1] },
        { rootnum: 0, fingering: [4, 0, 1, 2] }
    ]   
}

function drawChord(size, array) {

    //grid width and height
    var gridWidth = 150 * size;
    var gridHeight = 200 * size;
    //line segment size
    var w = gridWidth / 3;
    var h = gridHeight / 4;
    //padding around grid
    var padding = h / 3;
    var paddingFromTop = gridHeight / 4;
    //size of canvas
    var canvasWidth = gridWidth + (padding * 2) + 1;
    var canvasHeight = gridHeight + padding + paddingFromTop + 1;
  

    var canvas = $('<canvas/>').attr({width: canvasWidth, height: canvasHeight}).appendTo('main');
    var context = canvas.get(0).getContext("2d");


    //draw vertical lines
    for (var i = 0; i <= gridWidth; i += h) {
        context.moveTo(i + padding + 0.5, paddingFromTop)
        context.lineTo(i + padding + 0.5, gridHeight + paddingFromTop)
    }

    //draw horizontal lines
    for (var i = 0; i <= gridHeight; i += w) {
        context.moveTo(padding, i + paddingFromTop + 0.5)
        context.lineTo(gridWidth + padding, i + paddingFromTop + 0.5)
    }

    context.strokeStyle = "white";
    context.lineWidth = 1;
    context.stroke();

    //draw notes
    for (var i = 0; i < array.length; i += 1) {
        context.beginPath();
        if (array[i] === 0) {
            var position = (h / 2);
            context.arc(padding + (i * w), position, padding-2, 0, Math.PI*2, true);
            context.lineWidth = 2;
            context.stroke();
        }
        else {
            var position = (h / 2) + (array[i] * h);   
            context.arc(padding + (i * w), position, padding-1, 0, Math.PI*2, true);
            context.fillStyle = "white";
            context.fill();
        }
    }
}

// called on initial load and when "learn:ukulele" is clicked 
function landingPage(size) {

    // display random chord
    var possibleIndex = ukuApp.chordLib.length-1;
    var randomChordIndex = Math.floor(Math.random() * possibleIndex);
    var randomChord = ukuApp.chordLib[randomChordIndex].fingering;
    drawChord(size, randomChord);

}

landingPage(1.5);


