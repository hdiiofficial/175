let fs = require('fs')
global.owner = JSON.parse(fs.readFileSync('./src/owner.json')) // Put your number to folder /src/owner.json
global.mods = JSON.parse(fs.readFileSync('./src/moderator.json')) // Want some help?

global.APIs = {
  // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.me',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com',
  neoxr: 'https://neoxr-api.herokuapp.com',
  amel: 'https://melcanz.com',
  hardianto: 'https://hardianto.xyz',
  lol: 'https://api.lolhuman.xyz',
  adicug: 'https://api.adiofficial.xyz',
}
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
  'https://neoxr-api.herokuapp.com': 'yntkts',
  'https://api.xteam.xyz': 'apikeylu',
  'https://melcanz.com': 'apikeylu',
  'https://api.lolhuman.xyz': 'apikeylu',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.me': 'apikeylu',
  'https://pencarikode.xyz': 'apikeylu',
  'https://hardianto.xyz': 'hardianto',
  'https://leyscoders-api.herokuapp.com': 'apikeylu',
  'https://api.adiofficial.xyz': 'apikey lu',
}

//global.wm = '_WhatsApp Bot by @hdiiofficial_'
global.wait = '_*๐ฌ๐๐๐๐ง๐  ๐๐ข ๐ฉ๐ซ๐จ๐ฌ๐๐ฌ ...*_'
global.eror = '_*ะผฮฑฮฑฦ ัััฮฝัั ัฮนโฮฑะบ ััฮฑะฒฮนโ..*_'

//========Url Template Buttons=========//
global.dtu = 'YUNGTUP'
global.urlnya = 'https://youtube.com/channel/UCQGj68QT7OTmrpZL2NFVXoQ'

//============= callButtons =============//
global.dtc = 'SAVE CONTACT'
global.phn = '+62 857-0091-2979'

//============= Games ================//
global.benar = '_*Benarโ*_'
global.salah = '_*Salahโ*_'
global.dikit = "dikit lagi, semangat ya :')"

global.multiplier = 100 // The higher, The harder levelup

//=========== Requirements ==========//

global.baileys = require('@adiwajshing/baileys')
global.fs = require('fs')
global.data = JSON.parse(fs.readFileSync('./data.json'))
global.fetch = require('node-fetch')
global.bochil = require('@bochilteam/scraper')

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: '๐งฌ',
      limit: '๐',
      healt: 'โค๏ธ',
      exp: 'โ๏ธ',
      money: '๐ต',
      potion: '๐ฅค',
      diamond: '๐',
      common: '๐ฆ',
      uncommon: '๐',
      mythic: '๐ณ๏ธ',
      legendary: '๐๏ธ',
      pet: '๐',
      sampah: '๐',
      armor: '๐ฅผ',
      fishingrod: '๐ฃ',
      pickaxe: 'โ๏ธ',
      sword: 'โ๏ธ',
      kayu: '๐ชต',
      batu: '๐ชจ',
      iron: 'โ๏ธ',
      string: '๐ธ๏ธ',
      kuda: '๐',
      kucing: '๐',
      anjing: '๐',
      makananpet: '๐',
      gold: '๐',
      emerald: '๐',
    }
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, 'gi')])
      .filter((v) => v[1].test(string))
    if (!results.length) return ''
    else return emot[results[0][0]]
  },
}

let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
