document.addEventListener('DOMContentLoaded', () => {
    // Determine current loaded page context
    const playerForm = document.getElementById('player-form');
    const wheelCanvas = document.getElementById('wheelCanvas');

    // --- CASE A: SYSTEM INITIALIZATION AT HOME PAGE ---
if (playerForm) {
    const container = document.getElementById('dynamic-inputs-container');
    const addPlayerBtn = document.getElementById('addPlayerBtn');

    // Function to calculate how many players are currently on screen
    const getPlayerCount = () => container.querySelectorAll('.input-group').length;

    // Handle Adding New Players Dynamically
    addPlayerBtn.addEventListener('click', () => {
        const currentCount = getPlayerCount();
        const nextPlayerNum = currentCount + 1;

        // Create a wrapper div for the new input row
        const row = document.createElement('div');
        row.className = 'input-group flex-input';
        
        // Build the HTML string including a delete button
        row.innerHTML = `
            <input type="text" class="player-input" required placeholder="Player ${nextPlayerNum}" maxlength="12">
            <button type="button" class="btn-remove">❌</button>
        `;

        // Add delete capability to the individual button
        row.querySelector('.btn-remove').addEventListener('click', () => {
            row.remove();
            reindexPlaceholders();
        });

        container.appendChild(row);
    });

    // Clean up placeholder text numbering if a middle player is deleted
    function reindexPlaceholders() {
        const inputs = container.querySelectorAll('.player-input');
        inputs.forEach((input, index) => {
            input.placeholder = `Player ${index + 1}`;
        });
    }

    // Process Form Submit for variable number of items
    playerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Grab all inputs currently matching our class
        const inputElements = container.querySelectorAll('.player-input');
        const names = [];

        inputElements.forEach(input => {
            if(input.value.trim() !== "") {
                names.push(input.value.trim());
            }
        });

        // Double check minimum requirement constraint before proceeding
        if (names.length < 2) {
            alert("Please add at least 2 players to start!");
            return;
        }

        PlayerManager.savePlayers(names);
        window.location.href = 'game.html';
    });
}

    // --- CASE B: SYSTEM INITIALIZATION AT ACTIVE GAME PAGE ---
    if (wheelCanvas) {
        // Enforce player configurations present before handling gameplay loop
        if (!PlayerManager.hasValidPlayers()) {
            alert("No configured players found. Returning to setup page!");
            window.location.href = 'index.html';
            return;
        }

        const players = PlayerManager.getPlayers();
        
        // Capture Interface Elements
        const spinBtn = document.getElementById('spinBtn');
        const statusPanel = document.getElementById('statusPanel');
        const choicePanel = document.getElementById('choicePanel');
        const challengePanel = document.getElementById('challengePanel');
        
        const selectedPlayerName = document.getElementById('selectedPlayerName');
        const challengeType = document.getElementById('challengeType');
        const challengeText = document.getElementById('challengeText');
        
        const truthBtn = document.getElementById('truthBtn');
        const dareBtn = document.getElementById('dareBtn');
        const nextTurnBtn = document.getElementById('nextTurnBtn');

        let targetedPlayer = "";

        // Trigger Callback Logic for Spinner Wheel Hook
        const spinner = new GameSpinner('wheelCanvas', players, (winner) => {
            targetedPlayer = winner;
            
            // Toggle Display Elements gracefully
            statusPanel.classList.add('hidden');
            choicePanel.classList.remove('hidden');
            selectedPlayerName.textContent = `🎯 ${targetedPlayer}'s Turn`;
            spinBtn.disabled = false;
        });

        spinBtn.addEventListener('click', () => {
            spinBtn.disabled = true;
            statusPanel.classList.remove('hidden');
            statusPanel.querySelector('h2').textContent = "Spinning...";
            statusPanel.querySelector('p').textContent = "Hold on to your seats!";
            
            choicePanel.classList.add('hidden');
            challengePanel.classList.add('hidden');
            
            spinner.spin();
        });

        truthBtn.addEventListener('click', () => {
            choicePanel.classList.add('hidden');
            challengePanel.classList.remove('hidden');
            
            challengeType.textContent = "🤔 TRUTH";
            challengeType.style.color = "var(--truth-color)";
            challengeText.textContent = `"${QuestionBank.getRandomTruth()}"`;
        });

        dareBtn.addEventListener('click', () => {
            choicePanel.classList.add('hidden');
            challengePanel.classList.remove('hidden');
            
            challengeType.textContent = "⚡ DARE";
            challengeType.style.color = "var(--dare-color)";
            challengeText.textContent = `"${QuestionBank.getRandomDare()}"`;
        });

        nextTurnBtn.addEventListener('click', () => {
            challengePanel.classList.add('hidden');
            statusPanel.classList.remove('hidden');
            statusPanel.querySelector('h2').textContent = "Ready for Next Round?";
            statusPanel.querySelector('p').textContent = "Click spin to keep the fun rolling!";
        });
    }
});