/* EXPLICATION DES VARIABLES
 --------------------------
1) let hasFlippedCard  => Carte retourné ?
2) let lockBoard => Variable pour bloquer les clicks quand on en a plus de 2 carte retourné
3) let firstCard  => Variable pour 1ere carte retourné
4) let secondCard  => Variable pour 2eme carte retourné
 */
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


/* EXPLICATION DE FLIPCARD
 --------------------------
    1) La fonction flipcard permet de créer une class flip et d'activé la rotation qu'on a fait en css
    2) On retourne la première carte
    3) On retourne la deuxieme carte
    4) On check si elles sont pareil (voir checkmath())


 */

function flipCard() {
    if (lockBoard)return;
    this.classList.add('flip');
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        console.log(hasFlippedCard);
    }else{
        hasFlippedCard = false;
        secondCard = this;
        checkMatch();
    }

}

/* EXPLICATION DE CHECKMATCH
 --------------------------
    1) dataset.image permet de recuperer le data-image qu'on a mit en html. Du coup,
    si le data-image de la premiere image = au data image de la seconde image alors on active
    la fonction disableCard (voir fonction disableCard)
    2) Sinon on active la fonction Unflip (Voir fonction unflip())

 */

function checkMatch() {
    if (firstCard.dataset.image === secondCard.dataset.image) {
        disableCard();
    } else {
        unflip();
    }
}

/* EXPLICATION DE DISABLECARD
 --------------------------
    1)disableCard() enleve le click qui a été fait

 */

function disableCard(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

/* EXPLICATION DE UNFLIP
 --------------------------
    1) setTimeout supprime la class flip qu'on a crée (voir flipCard()) et dans un temps de 1500ms)
    2) lockBoard = false .. nous empeche de cliquer sur une carte  deja retourné ou de retourner d'autre carte
    si les deux autres ne sont pas retourné


 */

function unflip(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
    }, 1500)
}

/* EXPLICATION DE SHUFFLE
 --------------------------
    1) Grace à flexbox on peut utiliser la propriété order du coup
    on parcourt les cards avec forEach. On crée une variable randomPos
    ou on utilise la fonction random * le nombre de carte (16)
    puis on le met dans un la priopriété order en css.


 */

(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    })
})();

/* Activation de la fonction fliCard lors du click */

cards.forEach(card => card.addEventListener('click', flipCard));





/* Petite anecdote , j'ai voulu généré en jquery le tableau ... parce que je voulais faire un truc un peu different.
ça à donner ça... c'est pas très propre je pense .. mais bon je voulais juste vous le montrer parce que j'y ai passé
énormement de temps

$(function(){

    // Initialisation d'un tableau vide
    var count = [];
    for (var i = 0; i < 14; i++) {
        count[i] = 0;
    }

    // Mise en place des fruits en random

    var fruits = [];
    for (var y = 0; y < 4; y++) {
        fruits[y] = []
        for (var x = 0; x < 7; x++) {
            var fruit = Math.floor(Math.random() * 14)
                while (count[fruit] == 2) {
                    fruit = Math.floor(Math.random() * 14)
                }fruits[y][x] = fruit
                count[fruit]++;
            }
        }

    console.log(fruits)
    console.log(count)

    // Conception du plateau de jeux

    for(var y = 0; y < 4; y++) {
        var memory_board = $('<section class="memory_board"></section>')
        $('body').append(memory_board)
        for (var x = 0; x < 7; x++){
            var memory_card = $('<article class="card"></article>')
            var memory_card_back = $('<div class="cardback"></div>')
            var memory_card_front = $('<div class="cardfront"></div>')

            memory_board.append(memory_card)
            memory_card.append(memory_card_back)
            memory_card.append(memory_card_front)
            memory_card_front.css({
                'background-image': 'url(img/cards.png)',
                'background-position': '0px ' + fruits[y][x] * 100 + 'px',
            })
        }
    }
 */
