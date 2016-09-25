blip.sampleLoader()
    .samples({
    'uke': 'https://my.mixtape.moe/wxglpw.wav'
})
    .done(loaded)
    .load();


var sineWave = new Pizzicato.Sound({
    source: 'wave',
    options: {
        frequency: 440
    }
});


function loaded () {
  var TEMPO = 86;

  var uke1 = blip.clip().sample('uke');

  /* ====================== LOOPS ====================== */
  var bass = blip.loop()
      .tempo(TEMPO)
      .data([1 / 2])
      .tick(function (t, d) {
      if (blip.chance(4 / 5)) uke1.play(t, {
          rate: d,
          gain: 0.5 / Math.sqrt(d)
      });
  })




  WebMidi.enable(function(err) {

      if (err) console.log("WebMidi could not be enabled");
      var input = WebMidi.inputs[0];

      // Listening for a 'note on' message (on channel 1 only)
      input.addListener('noteon', "all",
      function(e) {
        switch (e.note.name) {
          case "C":
            bass.start();
            sineWave.play();
            console.log(e);
            break;
        }
      });



      // Listening to other messages works the same way
      // Note off
      input.addListener('noteoff', "all",
        function(e){
          bass.stop();
          sineWave.stop();
          console.log(e);
        }
      );

      input.addListener('pitchbend', "all",
        function(e){ console.log(e); }
      );

    }

  );

}

// window.onload = function () {
//
// var context = new window.AudioContext() || new window.webkitAudioContext();
//
//   osc = context.createOscillator();
//   vol = context.createGain();
//   volControl = document.getElementById("volume")
//   osc.frequency.value = 180;
//   osc.connect(context.destination);
//
//   osc.type = 'square'
//   osc.connect(vol)
//
//   osc.start()
//
//
// }
