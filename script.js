(function() {
    'use strict';
    
    var test = false;
    
    console.log('Loaded /r/place Cooridination Script');
    
    $.ajaxSetup({ cache: false });
    var start = new Date();

    r.placeModule("placePaintBot", function(loader) {
        var c = loader("canvasse");
        var client = loader("client");
        var colorsABGR = [];
        for (var i = 0; i < client.palette.length; i++){
          colorsABGR[i] = client.getPaletteColorABGR(i);
        }
        if (!c) {
            console.log('Did not find "canvasee"');
            return;
        }
        
        var draw = function(options) {
          var p = r.place;
          
          if (!test && p.getCooldownTimeRemaining() > 200) {
            return;
          }

          var image_data = [];
          for (var relY = 0; relY < options.image.length; relY++) {
              var row = options.image[relY];
              for (var relX = 0; relX < row.length; relX++) {
                  var code = row[relX];
                  var color = options["colors"][code] || -1;
                  if (color < 0) {
                      console.log('Unrecognized Color Code: "' + code + '" color: "' + color + '" relX: ' + relX + ' relY: ' + relY);
                      continue;
                  }
                  var absX = options.x + relX;
                  var absY = options.y + relY;
                  image_data.push(absX);
                  image_data.push(absY);
                  image_data.push(color);
              }
          }

          for (var i = 0; i < image_data.length; i += 3) {
            var j = Math.floor((Math.random() * image_data.length) / 3) * 3;
            var x = image_data[j + 0];
            var y = image_data[j + 1];
            var color = image_data[j + 2];
            var currentColor = p.state[c.getIndexFromCoords(x, y)];

            if (currentColor != color) {
              var cc = colorsABGR[color];
              if (test) {
                  c.drawTileAt(x, y, cc);
              } else {
                  console.log("set color for", x, y, "old", currentColor, "new", color);
                  client.setColor(cc);
                  client.drawTile(x, y);
              }
              return;
            }
          }
          console.log("noop");
        };
        
        var options = null;
        var syncData = function() {
            $.getJSON('https://raw.githubusercontent.com/weegee721/KekistanFlagPlaceBot/master/sync.json', function(data) {
                options = data;
            });  
        };
        
        // Download sync.json
        syncData();
        
        // Periodically attempt to draw a new pixel
        setInterval(function() {
          if (options) draw(options);
        }, test ? 1 : 1000);
        
        // Every 5 minutes, fetch new sync.json
        setInterval(function() {
            syncData();
        }, 300000);
    });
})();
