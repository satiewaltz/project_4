$(function() {

  setTimeout(function(){

    $( "#title" ).fadeOut( "slow", function() {});
    $( "#subtitle" ).fadeOut( "slow", function() {});
  }, 3000)

});


blip.sampleLoader()
    .samples({
    'smoothpad': 'https://rawgit.com/satiewaltz/project_4/320a703c0cc2aad5c877abd9e266945d4e09d30a/music/smoothintropiano.wav'
})
    .done(loaded)
    .load();


var velocity = 0

function loaded () {
  Wad.midiInstrument = new Wad({source : 'sine'});

  var TEMPO = 113;
  var smoothpad = blip.clip().sample('smoothpad');
  var padloop = blip.loop()
      .tempo(TEMPO)
      .data([1 / 2])
      .tick(function (t, d) {
      smoothpad.play(t, {
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
              padloop.start();
              console.log(e);
              break;
        }
      });

      // Listening to other messages works the same way
      // Note off
      input.addListener('noteoff', "all",
        function(e){
          padloop.stop();
          console.log(e);
        }
      );

      input.addListener('pitchbend', "all",
        function(e){ console.log(e); }
      );
    }
  );
}
