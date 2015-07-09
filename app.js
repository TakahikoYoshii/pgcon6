;(function(){

  'use strict';

  // require
  var readline = require('readline'); 

  // namespace 
  var App = {};

  App.app = {
    // field
    lines: [],
    results: [],
    L: 0,
    N: 0,
    reader: readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  // initializer
  App.init = function(){
    var count;
    // Events Listener
    App.app.reader.on('line', function (line) {
      if (App.app.L === 0) {
        App.app.L = line.trim();
      } else if (App.app.N === 0) {
        count = App.app.N = line.trim();
      } else {
        App.app.lines.push(line.trim());
        count--;

        if (count == 0) {
          console.log('RESULT ....');
          App.analize();
        }
      }
    });

    console.log('ENTER ....');
  };

  // prototype
  App.analize = function () {
    App.app.lines.sort(App.sort());
    var total1, total2, total3, length = App.app.N;
    if ((length - 0) < 3) {
      App.app.results.push('EMPTY');
      App.output();
      return;
    }
    for (var i = 0; i < length - 2; i++) {
      total1 = (App.app.lines[i] - 0);
      for (var k = (i + 1); k < length - 1; k++) {
        total2 = total1;
        total2 += (App.app.lines[k] - 0);
        for (var j = (k + 1); j < length; j++) {
          total3 = total2;
          total3 += (App.app.lines[j] - 0);
          if (total3 == App.app.L) {
            App.app.results.push(App.app.lines[i] + ' ' + App.app.lines[k] + ' ' + App.app.lines[j]);
          }
        }
      } 
    }
    App.output();
  };

  App.sort = function (x, y) {
    return (y - x);
  };

  App.output = function () {
    var output = '';
    App.app.results.forEach(function(result){
      output += result + '\n';
    });

    if (!output) {
      output += 'EMPTY';
    }
    App.app.reader.write(output);
    App.app.reader.close();
  };

  App.init();
})();
