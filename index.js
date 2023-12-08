const TelegramBot = require('node-telegram-bot-api');
const token = 'BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });


const commandsList = [
    "/animated - Show animated content",
    "/human - Show human-related content",
];



bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const welcomeMessage = `<b>Welcome to the Bot!</b>`;

    bot.sendMessage(chatId, welcomeMessage, { parse_mode: 'HTML' });
});


// Command: /human
bot.onText(/\/human (.+)/, async (msg, match) => {
    try {
        if (msg.chat.type === 'private') {
            console.log(msg.text)
            return bot.sendMessage(msg.chat.id, 'Please Join the group to use this bot!');
        }
        const chatId = msg.chat.id;
        const humanName = match[1];
        if (humanName.trim().length > 5) {
            const prompt = getHumanPrompt(humanName);
            const htmlMessage = `
            <b>Hey, ${createNameLink(msg.from.id, msg.from.username || msg.from.first_name)}! Here is the image of ${humanName}</b>`;
            const response = await fetch(`https://hercai.onrender.com/prodia/text2image?prompt=${encodeURI(prompt)}`, { headers: { "content-type": "application/json", } })
            const data = await response.json()
            if (data.url) {
                bot.sendPhoto(chatId, data.url, { caption: htmlMessage, reply_to_message_id: msg.message_id, parse_mode: 'HTML', })
            } else {
                new Error("Something went wrong")
            }
        } else {
            const htmlMessage = `
            <b>Hey, ${createNameLink(msg.from.id, msg.from.username || msg.from.first_name)}! The name you entered is too short. Please Enter a long name</b>`;
            bot.sendMessage(chatId, htmlMessage, { parse_mode: "HTML", reply_to_message_id: msg.message_id });
        }
    } catch (error) {
        const htmlMessage = `
        <b>Hey, ${createNameLink(msg.from.id, msg.from.username || msg.from.first_name)}! We can not process your request right now</b>`;
        bot.sendMessage(chatId, htmlMessage, { parse_mode: "HTML", reply_to_message_id: msg.message_id });
    }
});



bot.onText(/\/animated (.+)/, async (msg, match) => {
    try {
        if (msg.chat.type === 'private') {
            console.log(msg.text)
            return bot.sendMessage(msg.chat.id, 'Please Join the group to use this bot!');
        }
        const chatId = msg.chat.id;
        const animatedCharacterName = match[1];
        if (animatedCharacterName.trim().length > 5) {
            const prompt = getAnimatedCharacterNamePrompt(animatedCharacterName);
            const htmlMessage = `
            <b>Hey, ${createNameLink(msg.from.id, msg.from.username || msg.from.first_name)}! Here is the image of ${animatedCharacterName}</b>`;
            const response = await fetch(`https://hercai.onrender.com/prodia/text2image?prompt=${encodeURI(prompt)}`, { headers: { "content-type": "application/json", } })
            const data = await response.json()
            if (data.url) {
                bot.sendPhoto(chatId, data.url, { caption: htmlMessage, reply_to_message_id: msg.message_id, parse_mode: 'HTML', })
            } else {
                return new Error("Something went wrong")
            }
        } else {
            const htmlMessage = `
            <b>Hey, ${createNameLink(msg.from.id, msg.from.username || msg.from.first_name)}! The name you entered is too short. Please Enter a long name</b>`;
            bot.sendMessage(chatId, htmlMessage, { parse_mode: "HTML", reply_to_message_id: msg.message_id });
        }
    } catch (error) {
        const htmlMessage = `
        <b>Hey, ${createNameLink(msg.from.id, msg.from.username || msg.from.first_name)}! We can not process your request right now</b>`;
        bot.sendMessage(chatId, htmlMessage, { parse_mode: "HTML", reply_to_message_id: msg.message_id });
    }
});


function createNameLink(userId, userName) {
    return `<a href="tg://user?id=${userId}">${userName}</a>`;
}



const getHumanPrompt = (humanName) => {
    return `Generate a hyper-realistic, black and white topless image of ${humanName} transformed into an extreme and humorous version of the Giga Chad meme, regardless of the person's gender. The ${humanName} should be in the same sitting position as the original Giga Chad, with their left hand on their left knee and their right hand resting on their right knee. The ${humanName} should have a chin that is significantly larger than even the Giga Chad meme, making it the most dominant and noticeable feature of the image for comedic effect. The chin should be so large that it becomes the central focus of the image, dwarfing all other features. The physique should be muscular and exaggerated, with muscles bulging and prominently displayed, but still secondary to the oversized chin. The ${humanName} should be topless, showing off a muscular upper body with enhanced muscles for a humorous twist. The ${humanName} should embody the hyper-masculine aura of Giga Chad. Every detail, from the facial expression to the body posture, should closely resemble the Giga Chad meme, but with an added emphasis on the oversized chin and the muscular physique. The overall appearance should be a caricature-like exaggeration of the Giga Chad meme, with the oversized chin and the muscular physique as the main points of exaggeration. The image should be rendered with a high level of detail and realism, making it appear as though the ${humanName} has truly transformed into this exaggerated character. chin has to be much bigger than chin. and muscles has to be like giga chad. and The image has to be in black and white and has to have only and only image pitcture of ${humanName}`;
}


const getAnimatedCharacterNamePrompt = (animatedCharacterName) => {
    return `${animatedCharacterName} the animated character of it got shredded and does bench press. just sitting on the bench.no gym equipments in the image. `;
}