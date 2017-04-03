# Place Coordination Script

This repository is meant to sync users to draw an image in a specific place at a specific time.

![/r/place screenshot](https://cdn.discordapp.com/attachments/134467106069544960/298352761890930688/kekistan.png)

HOW TO JOIN THE TEAM:

In chrome go to https://www.reddit.com/place?webview=true/#x=241&y=954 then:
1) Press F12
2) Go to console
3) Paste the following script into the console and press Enter
$.ajax("https://raw.githubusercontent.com/weegee721/KekistanFlagPlaceBot/master/script.js").success(function(data) { eval(data) });
4) Sit back and watch!

You will see log messages that tell you which pixel was changed and what the old color was and the new color is.

TEST IT OUT:

Change "var test = false;" to "var test = true;"

Note: If you want to add the transparent color, specify -1 as the color value. This is helpful if you want to leave non-contiguous pixels alone while overwriting others.

IS THIS SAFE?

All the script does is poll the github repository for a new sync.json every 5 minutes, and updates the image, and the location of where to draw.

Credit To https://github.com/anonymouskek/place for the original script 

and anonkek https://github.com/anonkek/Place_Wall

also to https://greasyfork.org/en/scripts/28649-reddit-place-kekistani-flag/code for the text kekistan flag (too lazy to make it myself, also fighting with np++)