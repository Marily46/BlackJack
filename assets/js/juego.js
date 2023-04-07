

(() => {
    'Use strict' // ayudar a garantizar que el código dentro de la función se ejecute en modo estricto
    

    let deck = [];
    const tipos = ['C','D','H','S'],
            especiales = ['A','J','Q','K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];
    //Ref erence
    const btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugador = document.querySelectorAll('.divCartas'),
            puntosHtml = document.querySelectorAll('small');

    // funtion iniciliza el juego
    const inicializarJuego = ( numJuadores = 1 ) => {
        deck = crearDeck();
        for ( let i = 0; i < numJuadores; i++ ) {
            puntosJugadores.push(0);
        }
    }

    // funtion que crea un nuevo deck
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle( deck );
    }

    const pedirCarta = () => {

        if( deck.length === 0 ){
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    // order cart
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor) ?
                (valor === 'A') ? 11 : 10
                : valor * 1)
    }

    // turno: 0 = primer jugador, y el último será la computadora
    const acumularPuntos = ( carta, turno) => {
        puntosJugadores[turno] += valorCarta( carta );
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }
    // the computer turn
    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();
            acumularPuntos(carta, puntosJugadores.length - 1)

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append( imgCarta );

            if( puntosMinimos > 21 ) {
                break;
            }

        } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );


        setTimeout(() =>{
            if (puntosComputadora === puntosMinimos ){
                alert('Nadie gana :(');
            } else if ( puntosMinimos > 21 ){
                alert('computadora gana');
            } else if (puntosComputadora > 21 ){
                alert('Jugador gana');
            }

        }, 10 );

    }

    //Events
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0 );

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');

        divCartasJugador.append(imgCarta);

        if ( puntosJugador > 21 ) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        } else if(puntosJugador === 21 ) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener('click',  () => {

        console.clear();
        inicializarJuego();
        // deck = [];
        // deck = crearDeck();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHtml[0].innerText = 0;
        // puntosHtml[1].innerText = 0;

        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';

        // btnPedir.disabled = false;
        // btnDetener.disabled = false;
    });

})(); // funtion anonimas autoinvocadas



