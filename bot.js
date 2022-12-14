var TOKEN = ""; //Your token
const mc = require("minecraft-server-status-simple");
const { ButtonBuilder, ButtonStyle } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const { ActionRowBuilder, EmbedBuilder, Events, SelectMenuBuilder } = require('discord.js');
const { REST, Routes } = require('discord.js');
const { r1 , r2 ,r3 ,r4,r5 , r1m , r2m , r3m , r4m , r5m} = require('./config.json');


let rtrue = "";
let rtrue2 = "";
let rtrue3 = "";

mc.status({
  type: "java",
  ip: "play.cubecraft.net",
  port: 25565,
  show: ["online"]
})
//  ------------- COMMANDS ------------- \\
const commands = [
  {
    name: 'status',
    description: 'Get the server status',
  },
  {
    name: 'rules',
    description: '[ADMIN ONLY] Send the server rules',
  },
  {
    name: 'roles',
    description: '[ADMIN ONLY] Send roles options',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refresh');

    await rest.put(Routes.applicationCommands('1036271970297327676')/*ID*/, { body: commands });

    console.log('Successfully reloaded');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});



client.on('interactionCreate', async interaction => {
  let adminRole = '1036261031812534322';
  let botRole = '1036260884399529984';
  let isAdmin = interaction.member.roles.cache.has(adminRole || botRole);

  if (interaction.isSelectMenu()) {
    var rtrue = "";
    var rtrue2 = "";
    var rtrue3 = "";
    for (i = 0; i < 3; i++){
    let choice = interaction.values[i] 
    const member = interaction.member
     if(choice == 'first_option'){
        if (member.roles.cache.some(role => role.id == r1)) {
            var rtrue = " - @yt";
            member.roles.remove(r1)
        }
        else{
          var rtrue = " + @yt";
        member.roles.add(r1)
          }
          }
        else if(choice == 'second_option'){
          if (member.roles.cache.some(role => role.id == r2)) {
              var rtrue2 = " - @mc";
              member.roles.remove(r2)
          }
          else{
              var rtrue2 = " + @mc";
              member.roles.add(r2)
        }
                }
      else if(choice == 'third_option'){
        if (member.roles.cache.some(role => role.id == r3)) {
          var rtrue3 = " - @dis";
            member.roles.remove(r3)
        }
        else{
          var rtrue3 = " + @dis";
          member.roles.add(r3)
    }
                  }
  }
  interaction.reply({content: "Upravil jsem tvoje role:" + rtrue + rtrue2 + rtrue3, ephemeral:true})

}

  //   - - - - - - - -  BUTTONS  - - - - - - - - - \\
  if (interaction.isButton()) {
    const buttonID = interaction.customId;
    if (buttonID === 'ButtonRoles') { 
      const member = interaction.member; 

      if (member.roles.cache.has('1036260298589487104')) {
        member.roles.remove('1036260298589487104'); 
        return interaction.reply({
          content: 'Successfully removed role!',
          ephemeral: true
        });
      } else { 
        member.roles.add('1036260298589487104'); 
        return interaction.reply({
          content: 'Successfully added role!',
          ephemeral: true
        })
      }
    }
 }
  
  //   - - - - - - - - # # # # INTERACTIONS # # # # - - - - - - - - - \\

  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'status') {
    // mc.statusJava({ ip: "oldisek.eu", port: 7382, show: ["online","players"]})
    mc.statusJava({ ip: "play.cubecraft.net", port: 25565, show: ["online", "players"] })
      .then((res) => {
        if (res.online == true) {
          interaction.reply({
            embeds: [{
              "title": "Server Status",
              "color": 65295,
              "fields": [
                {
                  "name": "ONLINE",
                  "value": res.players.online + " hr??????",
                  "inline": false
                }
              ],
              "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png"
              }
            }
            ]
          });
        }
        else if (res.online == false) {
          interaction.reply({
            embeds: [{
              "title": "Server Status",
              "color": 65295,
              "description": "**Offline**",
              "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png"
              }
            }
            ]
          });
        }
      })
      .catch((err) => console.log(err));
  }

  if (interaction.commandName === 'rules' && isAdmin) {
    interaction.reply({
      embeds: [{
        "author": {
          "icon_url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png",
          "name": "SWIFT"
        },
        "title": "PRAVIDLA",
        "description": "Tohle jsou pravidla, kter?? plat?? na tomto serveru",
        "image": {
          "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036677827669540884/Swift-banner.png"
        },
        "fields": [
          {
            "name": "1. Dodr??ujte pravidla Discordu",
            "value": "Pat???? mezi n?? Pokyny pro komunitu a Smluvn?? podm??nky.",
            "inline": false
          },
          {
            "name": "2. Naslouchejte a respektujte v??echny ??leny tohoto serveru",
            "value": "Berte pros??m po??adavky ??len?? tohoto serveru v????n?? a poslouchejte, kdy?? v??s n??kdo o n??co po????d??. M??te-li probl??m s t??m, o co v??s moder??tor ????d??, doporu??ujeme v??m z t??to konverzace odej??t a poslat soukromou zpr??vu jin??mu moder??torovi.",
            "inline": false
          },
          {
            "name": "3. Udr??ujte ve??kerou ??innost leg??ln??, legitimn?? a p??im????enou",
            "value": "Netolerujeme, aby u??ivatel?? poru??ovali jak??koli z??kony, poru??ovali podm??nky slu??by nebo EULA, sexu??ln?? obsah nebo cokoli, co lid?? pova??uj?? za ??kodliv?? nebo nevhodn??.",
            "inline": false
          },
          {
            "name": "4. Nespamujte a nescamujte",
            "value": "????dn?? reklama mimo p??edv??d??c?? kan??ly. Tak?? ????dn?? NFT.",
            "inline": false
          },
          {
            "name": "5. Dodr??ujte t??ma dan??ho kan??lu",
            "value": "Nevykolejujte diskusi a neza????nejte konverzace mimo kan??l, ve kter??m jsou nejvhodn??j????. Pokud se nap????klad za??nete dost??vat mimo t??ma v tematick??m kan??lu, po????dejte ostatn?? ????astn??ky, aby p??e??li na kan??l mimo t??ma.",
            "inline": false
          },
          {
            "name": "6. Nespamujte bota",
            "value": "N???? bot m?? taky sv??j ??ivot, tak??e v??s pros??me, aby jste ho nep??et????ovali.",
            "inline": false
          }
        ],
        "color": 65295,
        "thumbnail": {
          "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png"
        },
        "footer": {
          "icon_url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png",
          "text": "Pravidla byly naps??ny:"
        },
        "timestamp": "2022-10-31T17:00:00.000Z"
      }],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 1,
              label: "Rozum??m",
              custom_id: "ButtonRoles"
            }
          ]
        }
      ],
    }
    )


  }



  if (interaction.commandName === 'roles' && isAdmin) {
    const row = new ActionRowBuilder()
    .addComponents(
  new SelectMenuBuilder()
    .setCustomId('select')
    .setPlaceholder('Zat??m nic nevybr??no')
    .setMinValues(0)
    .setMaxValues(3)
    .addOptions([
      {
        label: 'Youtube',
        description: 'Dosgtane?? ping na v??echny nahran?? videa (role @yt)',
        value: 'first_option',
      },
      {
        label: 'Minecraft',
        description: 'Dostane?? ping pouze pokud bude zm??na v Mc (role @mc)',
        value: 'second_option',
      },
      {
        label: 'Discord',
        description: 'Dostane?? ping pouze pokud bude zm??na na Discordu (role @dis)',
        value: 'third_option',
      },
    ]),
)

    interaction.reply({
      "embeds": [
        {
          "title": "Ping roles",
          "color": 65295,
          "description": "Vyber si svoje role:",
          "fields": [
            {
              "name": "Youtube <:yt:1037026727391674408>",
              "value": "Dosgtane?? ping na v??echny nahran?? videa (role @yt)",
              "inline": false
            },
            {
              "name": "Minecraft <:mc:1037021702036664320>",
              "value": "Dostane?? ping pouze pokud bude zm??na v Mc (role @mc)",
              "inline": false
            },
            {
              "name": "Discord <:dis:1037021872371539989>",
              "value": "Dostane?? ping pouze pokud bude zm??na na Discordu (role @dis)",
              "inline": false
            },
            {
              "name": "Nic",
              "value": "nedostane?? ????dnou roli :(",
              "inline": false,
            }
          ],
          "author": {
            "name": ""
          },
          "thumbnail": {
            "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png"
          },
          "footer": {
            "text": "Naps??no:",
            "icon_url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png"
          },
          "timestamp": "2022-10-31T17:30:49.000Z",
        },
      ],content:"", components: [row]
    })
  }
}
)


client.login(TOKEN);


