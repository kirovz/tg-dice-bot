bot.command('ai', async (ctx) => {
  const prompt = ctx.message.text.replace('/ai', '').trim()
  if (!prompt) return ctx.reply("❌ Напиши запрос после команды /ai")

  await ctx.reply("🤖 Думаю...")

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // или gpt-3.5-turbo, gpt-4o-mini
      messages: [{ role: "user", content: prompt }]
    })

    const answer = response.choices[0].message.content
    ctx.reply(answer)
  } catch (err) {
    console.error(err)

    // Проверяем текст ошибки
    if (err.message && err.message.includes("quota")) {
      ctx.reply('💵 Ошибка: закончился лимит или баланс на API. Проверь свой план и billing.')
    } else {
      ctx.reply('⚠️ Произошла ошибка при обращении к ИИ.')
    }
  }
})