"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addEventListener(event, handler) {
}
addEventListener('ready', () => {
    console.log('Bot is ready');
});
addEventListener("reactionAdd", (message) => {
});
addEventListener('reactionAdd', (reaction) => {
    console.log(`Reaction added: ${reaction.emoji.name}`);
    // You can safely use reaction properties here
});
function test(name, callback) {
}
