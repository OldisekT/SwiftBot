/*                                                                                                                                     */var TOKEN = "MTAzNjI3MTk3MDI5NzMyNzY3Ng.G9h-ui.qcnqizJ_0mnU9vET98alykXpH8cPJ3fse9KcJc";

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
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
    if (buttonID === 'ButtonRoles') { // get button by customId set below
      const member = interaction.member; // get member from the interaction - person who clicked the button

      if (member.roles.cache.has('1036260298589487104')) { // if they already have the role
        member.roles.remove('1036260298589487104'); // remove it
        return interaction.reply({
          content: 'Successfully removed role!',
          ephemeral: true
        });
      } else { // if they don't have the role
        member.roles.add('1036260298589487104'); // add it
        return interaction.reply({
          content: 'Successfully added role!',
          ephemeral: true
        })
      }
    }

    if (buttonID === 'role_all') { // get button by customId set below
      const member = interaction.member; // get member from the interaction - person who clicked the button

      if (member.roles.cache.has('1036716266108497970')) { // if they already have the role
        member.roles.remove('1036716266108497970'); // remove it
        return interaction.reply({
          content: 'Byla ti vymazána role: `@ping`!',
          ephemeral: true
        });
      } else { // if they don't have the role
        member.roles.add('1036716266108497970'); // add it
        return interaction.reply({
          content: 'Byla ti přidaná role `@ping`!',
          ephemeral: true
        })
      }
    }

    if (buttonID === 'role_mc') { // get button by customId set below
      const member = interaction.member; // get member from the interaction - person who clicked the button

      if (member.roles.cache.has('1036716106041266206')) { // if they already have the role
        member.roles.remove('1036716106041266206'); // remove it
        return interaction.reply({
          content: 'Byla ti vymazána role: `@mc`!',
          ephemeral: true
        });
      } else { // if they don't have the role
        member.roles.add('1036716106041266206'); // add it
        return interaction.reply({
          content: 'Byla ti přidaná role `@mc`!',
          ephemeral: true
        })
      }
    }

    if (buttonID === 'role_dis') { // get button by customId set below
      const member = interaction.member; // get member from the interaction - person who clicked the button

      if (member.roles.cache.has('1036716209460228136')) { // if they already have the role
        member.roles.remove('1036716209460228136'); // remove it
        return interaction.reply({
          content: 'Byla ti vymazána role: `@dis`!',
          ephemeral: true
        });
      } else { // if they don't have the role
        member.roles.add('1036716209460228136'); // add it
        return interaction.reply({
          content: 'Byla ti přidaná role `@dis`!',
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
                  "value": res.players.online + " hráčů",
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
        "description": "Tohle jsou pravidla, která platí na tomto serveru",
        "image": {
          "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036677827669540884/Swift-banner.png"
        },
        "fields": [
          {
            "name": "1. Dodržujte pravidla Discordu",
            "value": "Patří mezi ně Pokyny pro komunitu a Smluvní podmínky.",
            "inline": false
          },
          {
            "name": "2. Naslouchejte a respektujte všechny členy tohoto serveru",
            "value": "Berte prosím požadavky členů tohoto serveru vážně a poslouchejte, když vás někdo o něco požádá. Máte-li problém s tím, o co vás moderátor žádá, doporučujeme vám z této konverzace odejít a poslat soukromou zprávu jinému moderátorovi.",
            "inline": false
          },
          {
            "name": "3. Udržujte veškerou činnost legální, legitimní a přiměřenou",
            "value": "Netolerujeme, aby uživatelé porušovali jakékoli zákony, porušovali podmínky služby nebo EULA, sexuální obsah nebo cokoli, co lidé považují za škodlivé nebo nevhodné.",
            "inline": false
          },
          {
            "name": "4. Nespamujte a nescamujte",
            "value": "Žádná reklama mimo předváděcí kanály. Také žádné NFT.",
            "inline": false
          },
          {
            "name": "5. Dodržujte téma daného kanálu",
            "value": "Nevykolejujte diskusi a nezačínejte konverzace mimo kanál, ve kterém jsou nejvhodnější. Pokud se například začnete dostávat mimo téma v tematickém kanálu, požádejte ostatní účastníky, aby přešli na kanál mimo téma.",
            "inline": false
          },
          {
            "name": "6. Nespamujte bota",
            "value": "Náš bot má taky svůj život, takže vás prosíme, aby jste ho nepřetěžovali.",
            "inline": false
          }
        ],
        "color": 65295,
        "thumbnail": {
          "url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png"
        },
        "footer": {
          "icon_url": "https://cdn.discordapp.com/attachments/1036363512609505310/1036671994701303909/Swift.png",
          "text": "Pravidla byly napsány:"
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
              label: "Rozumím",
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
    .setPlaceholder('Zatím nic nevybráno')
    .setMinValues(0)
    .setMaxValues(3)
    .addOptions([
      {
        label: 'Youtube',
        description: 'Dosgtaneš ping na všechny nahraná videa (role @yt)',
        value: 'first_option',
      },
      {
        label: 'Minecraft',
        description: 'Dostaneš ping pouze pokud bude změna v Mc (role @mc)',
        value: 'second_option',
      },
      {
        label: 'Discord',
        description: 'Dostaneš ping pouze pokud bude změna na Discordu (role @dis)',
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
              "value": "Dosgtaneš ping na všechny nahraná videa (role @yt)",
              "inline": false
            },
            {
              "name": "Minecraft <:mc:1037021702036664320>",
              "value": "Dostaneš ping pouze pokud bude změna v Mc (role @mc)",
              "inline": false
            },
            {
              "name": "Discord <:dis:1037021872371539989>",
              "value": "Dostaneš ping pouze pokud bude změna na Discordu (role @dis)",
              "inline": false
            },
            {
              "name": "Nic",
              "value": "nedostaneš žádnou roli :(",
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
            "text": "Napsáno:",
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

