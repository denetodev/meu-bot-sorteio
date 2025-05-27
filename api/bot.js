import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);
let participantes = new Set();

bot.start((ctx) =>
  ctx.reply("Bem-vindo ao sorteio! Use /participar para entrar.")
);
bot.command("participar", (ctx) => {
  if (ctx.from.username) {
    participantes.add(ctx.from.username);
    ctx.reply(`${ctx.from.username} entrou no sorteio!`);
  } else {
    ctx.reply("Você precisa de um username público para participar.");
  }
});
bot.command("sortear", (ctx) => {
  if (participantes.size === 0) {
    ctx.reply("Nenhum participante registrado.");
  } else {
    const arr = Array.from(participantes);
    const vencedor = arr[Math.floor(Math.random() * arr.length)];
    ctx.reply(`O vencedor é: @${vencedor}!`);
  }
});

export default async (req, res) => {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body);
    res.status(200).send("ok");
  } else {
    res.status(200).send("Bot está rodando!");
  }
};
