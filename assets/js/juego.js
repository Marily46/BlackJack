/**
 * 2C = Two of clubs
 * 2D = Two of Diaminds
 * 2H = Two of Hearts 
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;
//Reference
const btnPedir = document.querySelector('#btnPedir');

const divCartasJugador = document.querySelector('#jugador-cartas')
const puntosHtml = document.querySelectorAll('small');

const crearDeck = () => {
    for( let i = 2; i <= 10; i++ ){
        for( let tipo of tipos ){
            deck.push( i + tipo)
        }
    }

    for( let tipo of tipos ){
        for( let esp of especiales ){
            deck.push( esp + tipo );
        }
    }
    console.log(deck)
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

crearDeck();

//this function allows me to take a chart
const pedirCarta = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

// order cart
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor) ?
            (valor === 'A') ? 11 : 10
            : valor * 1)

}

//Events
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta( carta );
    puntosHtml[0].innerText = puntosJugador;

    //<img class="carta" src="assets/cartas/10C.png" alt=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
    }


})



