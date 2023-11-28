import { Client, GatewayIntentBits, REST, Routes } from "npm:discord.js";

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  Deno.env.get("DISCORD_TOKEN")!,
);

await rest.put(Routes.applicationCommands(Deno.env.get("APP_ID")!), {
  body: commands,
});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("ready", () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

try {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });

  client.login(Deno.env.get("DISCORD_TOKEN")!);
} catch (error) {
  console.error(error);
}
