let { MessageType, MessageOptions, Mimetype } = require('@adiwajshing/baileys')
let limit = 50
const ytdl = require("ytdl-core")
const yts = require("yt-search")
const axios = require("axios")
const { servers, yta } = require('../lib/y2mate')
let handler = async (m, { conn, args, isPrems, isOwner }) => {
  if (!args || !args[0]) return conn.reply(m.chat, 'Uhm... urlnya mana?', m)
  let chat = global.db.data.chats[m.chat]
  let server = (args[1] || servers[0]).toLowerCase()
  let { dl_link, thumb, title, filesize, filesizeF } = await yta(args[0], servers.includes(server) ? server : servers[0])
  let isLimit = (isPrems || isOwner ? 99 : limit) * 1024 < filesize
  m.reply(wait)
  if (!isLimit)
    await conn.sendMessage(
      m.chat,
      {
        document: { url: dl_link },
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
      },
      { quoted: m }
    )
}
handler.help = ['ytmp3 <query>']
handler.tags = ['downloader']
handler.command = /^yt(a(udio)?|mp3|musik|lagu)$/i
handler.limit = true
module.exports = handler

function ytMp3(url) {
  return new Promise((resolve, reject) => {
    ytdl
      .getInfo(url)
      .then(async (getUrl) => {
        let result = [];
        for (let i = 0; i < getUrl.formats.length; i++) {
          let item = getUrl.formats[i];
          if (item.mimeType == 'audio/webm; codecs="opus"') {
            let { contentLength, approxDurationMs } = item;
            let bytes = await bytesToSize(contentLength);
            result[i] = {
              audio: item.url,
              size: bytes,
              duration: formated(parseInt(approxDurationMs)),
            };
          }
        }
        let resultFix = result.filter(
          (x) => x.audio != undefined && x.size != undefined
        );
        let tinyUrl = resultFix[0].audio;
        let title = getUrl.videoDetails.title;
        let desc = getUrl.videoDetails.description;
        let views = parseInt(getUrl.videoDetails.viewCount || 0);
        let likes = getUrl.videoDetails.likes;
        let dislike = getUrl.videoDetails.dislikes;
        let channel = getUrl.videoDetails.ownerChannelName;
        let uploadDate = getUrl.videoDetails.uploadDate;
        let thumb =
          getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail
            .thumbnails[0].url;
        resolve({
          creator: "Caliph",
          title,
          result: tinyUrl,
          size: resultFix[0].size,
          duration: resultFix[0].duration,
          thumb,
          views,
          likes,
          dislike,
          channel,
          uploadDate,
          desc,
        });
      })
      .catch(reject);
  });
}

function ytPlay(query) {
  return new Promise((resolve, reject) => {
    yts(query)
      .then(async (getData) => {
        let result = getData.videos.slice(0, 5);
        let url = [];
        for (let i = 0; i < result.length; i++) {
          url.push(result[i].url);
        }
        let random = url[0];
        let getAudio = await ytMp3(random);
        resolve(getAudio);
      })
      .catch(reject);
  });
}

function bytesToSize(bytes) {
  return new Promise((resolve, reject) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) resolve(`${bytes} ${sizes[i]}`);
    resolve(`${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`);
  });
}

function formated(ms) {
  let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
