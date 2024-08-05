class Player {
    constructor(name, tokens = 0) {
        this.name = name;
        this.tokens = tokens;
    }

    addTokens(amount) {
        this.tokens += amount;
    }

    removeTokens(amount) {
        if (amount <= this.tokens) {
            this.tokens -= amount;
        } else {
            alert(`${this.name} doesn't have enough tokens.`);
        }
    }

    resetTokens() {
        this.tokens = 0;
    }
}

const players = [];

function addPlayer() {
    const name = document.getElementById('player-name').value;
    const tokens = parseInt(document.getElementById('initial-tokens').value);

    if (name && !isNaN(tokens)) {
        players.push(new Player(name, tokens));
        displayPlayers();
        updatePlayerSelect();
        document.getElementById('player-name').value = '';
        document.getElementById('initial-tokens').value = '';
    } else {
        alert('Please enter a valid name and initial tokens.');
    }
}

function displayPlayers() {
    const playersList = document.getElementById('players');
    playersList.innerHTML = '';

    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name}: ${player.tokens} tokens`;
        playersList.appendChild(li);
    });
}

function updatePlayerSelect() {
    const playerSelect = document.getElementById('player-select');
    playerSelect.innerHTML = '<option value="" disabled selected>Select Player</option>';

    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.name;
        option.textContent = player.name;
        playerSelect.appendChild(option);
    });
}

function updateTokens() {
    const playerName = document.getElementById('player-select').value;
    const amount = parseInt(document.getElementById('token-amount').value);
    const action = document.getElementById('action-select').value;

    if (playerName && !isNaN(amount) && action) {
        const player = players.find(player => player.name === playerName);

        if (player) {
            switch (action) {
                case 'add':
                    player.addTokens(amount);
                    break;
                case 'remove':
                    player.removeTokens(amount);
                    break;
                case 'reset':
                    player.resetTokens();
                    break;
                default:
                    alert('Invalid action.');
                    return;
            }
            displayPlayers();
            document.getElementById('token-amount').value = '';
            document.getElementById('action-select').value = '';
        } else {
            alert('Player not found.');
        }
    } else {
        alert('Please select a valid player, token amount, and action.');
    }
}