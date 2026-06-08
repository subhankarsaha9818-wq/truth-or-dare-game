const QuestionBank = {
    truths: [
        "What is your biggest fear in a relationship?",
        "What is the most embarrassing thing you've done in public?",
        "Have you ever lied to your best friend? If yes, about what?",
        "What is a secret you’ve never told anyone in this room?",
        "What was your worst first date experience?",
        "If you could trade lives with someone here for one day, who would it be?",
        "What is the most childish thing you still regularly do?",
        "Have you ever stalked an ex on social media?",
        "What is the most embarrassing text message you have sent by mistake, and who did you send it to?",
        "What is the pettiest thing you have ever done out of spite or anger that you secretly don't regret?",
        "What is an opinion you hold that almost everyone else disagrees with?",
        "Who is a fictional character you have a massive crush on, and you’re slightly embarrassed to admit it?",
        "If you could delete one memory from your brain forever, what specific moment or event would it be?"
    ],
    dares: [
        "Let the group look through your phone gallery for 30 seconds.",
        "Do your best impression of another player until someone guesses who it is.",
        "Talk in an accent of the group's choosing for the next two rounds.",
        "Call a random contact in your phone and sing them Happy Birthday.",
        "Let the person to your right draw a funny mustache on you with a washable marker.",
        "Do 15 push-ups right now.",
        "Text your crush or a random friend saying 'I know what you did'.",
        "Perform a dramatic reading of a funny text message you received recently.",
        "Hand your phone to the person on your left. They get to type and send a single-word message to the 5th person in your recent chat list—no context allowed.",
        "Act out a famous movie scene using only gestures and facial expressions. The group has 60 seconds to guess what it is, or you have to do 10 squats.",
        "Pick up any random object in this room and try to sell it to the group for 1 minute as if you are a high-energy late-night TV salesman.",
        "Sing everything you say instead of speaking for the next two full rounds of the game.",
        "Change your phone’s lock screen wallpaper to a funny selfie of the person sitting across from you, and leave it that way for the rest of the day."
    ],

    getRandomTruth() {
        const index = Math.floor(Math.random() * this.truths.length);
        return this.truths[index];
    },

    getRandomDare() {
        const index = Math.floor(Math.random() * this.dares.length);
        return this.dares[index];
    }
};