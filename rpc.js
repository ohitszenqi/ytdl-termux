const readline = require('readline')
const ytdlc = require('ytdl-core')
const fs = require('fs')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("\x1b[37mPlease provide a link \x1b[36m➢ ", async function(su) {
const info = await ytdlc.getInfo(su)
      const song = {
        title: info.videoDetails.title
      }
let wat = await ytdlc(su).pipe(fs.createWriteStream(`${song.title}.mp4`))
var loading = (function() {
  var h = ['|', '/', '-', '\\'];
  var i = 0;
  var st = fs.statSync(song.title + ".mp4")
  var sz = st.size
  return setInterval(() => {
    i = (i > 3) ? 0 : i;
    console.clear();
    console.log(`[${h[i]}] Downloading: ${song.title}, ${sz}`);
    i++;
  }, 300);
})();
wat.on("finish", function() {
	console.log("Finish!")
	clearInterval(loading)
});
});
