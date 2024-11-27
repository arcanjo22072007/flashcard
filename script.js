// Cores e números disponíveis
const colors = ["red", "green", "blue", "yellow"];
const numbers = Array.from({ length: 10 }, (_, i) => i.toString());

// Função para criar um baralho
function createDeck() {
    const deck = [];
    for (const color of colors) {
        for (const number of numbers) {
            deck.push({ color, number });
        }
    }
    return shuffle(deck);
}

// Função para embaralhar o baralho
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Função para exibir uma carta
function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", card.color);
    cardElement.textContent = card.number;
    return cardElement;
}

// Inicia o jogo
let deck = createDeck();
let currentCard = deck.pop(); // A carta inicial
let playerHand = [];

// Atualiza a carta atual na mesa
function updateCurrentCard() {
    const currentCardElement = document.getElementById("currentCard");
    currentCardElement.innerHTML = "";
    currentCardElement.appendChild(createCardElement(currentCard));
}

// Atualiza a mão do jogador
function updatePlayerHand() {
    const handElement = document.getElementById("hand");
    handElement.innerHTML = "";

    playerHand.forEach((card, index) => {
        const cardElement = createCardElement(card);
        cardElement.addEventListener("click", () => {
            if (card.color === currentCard.color || card.number === currentCard.number) {
                currentCard = card;
                playerHand.splice(index, 1);
                updateCurrentCard();
                updatePlayerHand();
            } else {
                alert("Carta inválida! Escolha uma carta que corresponda à cor ou ao número.");
            }
        });
        handElement.appendChild(cardElement);
    });
}

// Quando o jogador puxa uma carta
document.getElementById("drawCard").addEventListener("click", () => {
    if (deck.length > 0) {
        playerHand.push(deck.pop());
        updatePlayerHand();
    } else {
        alert("Não há mais cartas no baralho!");
    }
});

// Inicializa o estado do jogo
playerHand = deck.splice(0, 7); // Dá 7 cartas ao jogador
updateCurrentCard();
updatePlayerHand();