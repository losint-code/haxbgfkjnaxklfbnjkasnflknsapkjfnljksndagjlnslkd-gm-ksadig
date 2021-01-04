const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`[OLUMSUZ] Bot Ping Yedi Fakat Hata Başarıyla Giderildi.`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Adet Komut Yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`[+] Yüklenen Komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------------------------------KOMUTLAR-------------------------------------------------\\

//-------------------------------OTO ROL/İSİM-----------------------------------\\
client.on("guildMemberAdd", async (member) => {
  member.roles.add(ayarlar.unregister)
  member.setNickname(ayarlar.nick)
  
  });
//-------------------------------OTO ROL/İSİM-----------------------------------\\
  
  
//-------------------------------BOT SES KANALI-----------------------------------\\
  client.on("ready", async () => {
    let botVoiceChannel = client.channels.cache.get(ayarlar.botVoiceChannelID);
    if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanamadı!"));
  });
//-------------------------------BOT SES KANALI-----------------------------------\\
  
  

//-------------------------------HG MESAJI-----------------------------------\\
  client.on("guildMemberAdd", member => {  
      const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.KayıtChat));
      const register = (ayarlar.teyitçi)
      let vader = client.users.cache.get(member.id);
      require("moment-duration-format");
        const kurulus = new Date().getTime() - vader.createdAt.getTime();  
     
          var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
              '0': `EMOJİ / SAYI`,
              '1': `EMOJİ / SAYI`,
              '2': `EMOJİ / SAYI`,
              '3': `EMOJİ / SAYI`,
              '4': `EMOJİ / SAYI`,
              '5': `EMOJİ / SAYI`,
              '6': `EMOJİ / SAYI`,
              '7': `EMOJİ / SAYI`,
              '8': `EMOJİ / SAYI`,
              '9': `EMOJİ / SAYI`}[d];
            })
          }
    
      var kontrol;
    if (kurulus < 1296000000) kontrol = 'Hesap Durumu: `Güvenilir Değil'
    if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir '
      moment.locale("tr");
    
    
    
   const hgmesaj = (`**__Eternal'a__** hoşgeldin (<@${vader.id}>) - (\`${vader.id}\`)\n \n Seninle beraber sunucumuz(`  + üyesayısı +  `)kişiye ulaştı. \n\n Hesabın (`  + moment(member.user.createdAt).format("DD MMMM YYYY dddd") + `) oluşturulduğu için` + kontrol + `\n\n Kaydını tamamlamak için herhangi bir \`仒 Confirmation\` teyit odasına girmen yeterlidir. \n\n Kayıt olduktan sonra rol seçim katagorisinden rolleri almayı unutma. \n\n Tagımızı alarak ailemizin bir parçası olabilirsin. \`仒\` <@794010433296007183> `)
  kanal.send(hgmesaj)
//-------------------------------HG MESAJI-----------------------------------\\
  
        
    
    
//---------------------------------------------------------------ŞÜPHELİ HESAP---------------------------------------------------------------------\\
  
  client.on("guildMemberAdd", member => {
      var moment = require("moment")
      require("moment-duration-format")
      moment.locale("tr")
       var {Permissions} = require('discord.js');
       var x = moment(member.user.createdAt).add(7, 'days').fromNow()
       var user = member.user
       x = x.replace("birkaç saniye önce", " ")
       if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
       const kytsz = member.guild.roles.cache.find(r => r.id === (ayarlar.unregister)) 
       var rol = member.guild.roles.cache.get(ayarlar.şüpheli) 
       var jail = member.guild.roles.cache.get(ayarlar.jailRol)
       var kayıtsız = member.guild.roles.cache.get(kytsz) 
       member.roles.add(rol)
       member.roles.remove(kytsz)
  
    member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
    setTimeout(() => {
    
    }, 1000)
    
    
       }
            else {
    
            }
        });
  
  //------------------------------------------------------------ŞÜPHELİ HESAP------------------------------------------------------------------------\\
  
  
  //-----------------------TAG-ROL----------------------\\     
  client.on("userUpdate", async (stg, yeni) => {
    var sunucu = client.guilds.cache.get(ayarlar.Guild); 
    var uye = sunucu.members.cache.get(yeni.id);
    var tag = (ayarlar.tag); 
    var tagrol = (ayarlar.tagRol); 
    var logKanali = (ayarlar.tagLog); 
  
    if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
    
    if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.add(tagrol);
        await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
      } catch (err) { console.error(err) };
    };
    
    if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
      try {
        await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
        await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
        await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
      } catch(err) { console.error(err) };
    };
  });
//----------------------TAG-ROL----------------------\\   


//----------------------TAG-KONTROL----------------------\\     
  
  client.on("guildMemberAdd", member => {
    let sunucuid = (ayarlar.guild); 
    let tag = (ayarlar.tag); 
    let rol = (ayarlar.tagRol); 
  if(member.user.username.includes(tag)){
  member.roles.add(rol)
    const tagalma = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
        .setTimestamp()
       client.channels.cache.get(ayarlar.tagLog).send(tagalma)
  }
  })
//-----------------------TAG-KONTROL----------------------\\     
    
  
    
            
    
  });