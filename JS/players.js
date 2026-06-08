const PLAYERS_KEY = 'truthOrDare_players';

const PlayerManager = {
    // Save names array to LocalStorage
    savePlayers(playersArray) {
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(playersArray));
    },

    // Retrieve names from LocalStorage
    getPlayers() {
        const data = localStorage.getItem(PLAYERS_KEY);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                return [];
            }
        }
        return [];
    },

    // Look for this specific function inside js/players.js and replace it:
    hasValidPlayers() {
        const players = this.getPlayers();
        // CHANGED: Check if length is greater than or equal to 2
        return players.length >= 2 && players.every(p => p.trim() !== "");
    }
};