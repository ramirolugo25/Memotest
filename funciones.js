function reseterValores(){
    cartasJuego = [];
    cartasUsuario = [];
    movimientos = 0;
    acertadas = 0;

    let $cartas = document.querySelectorAll('.carta-oculta');
    voltearCartas($cartas, 0);
    desbloquearCartasPermanentes($cartas);  
    document.querySelector('#movimientos').textContent = 'Movimientos: ';
}

function voltearCartas($cartas, milisegundos){
    
    setTimeout(function(){
        $cartas.forEach(function($carta){
            $carta.style.backgroundImage = `url('logos/simpsons.png')`;
        });
    },milisegundos);
    
}

function desbloquearCartasPermanentes($cartas){
    $cartas.forEach(function($carta){
        $carta.className = 'carta';
    })
}

function mostrarMovimientos(){
    $movimientos = document.querySelector('#movimientos').className = '';
}

function ocultarBotonJugar(){
    const $botonJugar = document.querySelector('#boton-jugar');
    $botonJugar.className = 'oculto';
}

function devolverCartasAleatorias(){
    
    const cartas = ['bart', 'bart', 'homero', 'homero', 'krusty', 'krusty', 'lisa', 'lisa', 'maggie', 'maggie', 'marge', 'marge', 'milhouse', 'milhouse', 'santa', 'santa'];
    const cartasMezcladas = devolverCartasMezcladas(cartas);

    return cartasMezcladas;
}

function devolverCartasMezcladas(cartas){

    for(let i=0; i<cartas.length; i++){
        let posicionRandom = devolverPosicionRandom();
        let auxiliar = cartas[posicionRandom];
        cartas[posicionRandom] = cartas[i];
        cartas[i] = auxiliar;
    }

    return cartas;
}

function devolverPosicionRandom(){
    return Math.floor(Math.random() * 16);
}

function manejarInputUsuario(e){
    let $carta = e.target;
    bloquearCarta($carta);
    cartasUsuario.push($carta);
    mostrarCarta($carta);
    
    if (cartasUsuario.length === 2){
        if (!compararCartasUsuario(cartasUsuario)){
            let $cartas = document.querySelectorAll('.carta');
            bloquearCartas($cartas);
            voltearCartas(cartasUsuario, 1000);
            desbloquearCartas($cartas,1500);
            desbloquearCartas(cartasUsuario,1500);
        }
        else{  
            bloquearCartasPermanentes(cartasUsuario);
            acertadas++;
            if(acertadas === 8){
                finDelJuego();
            }
        }
        movimientos++;
        document.querySelector('#movimientos').textContent = `Movimientos: ${movimientos}`;
        cartasUsuario = [];
    }
}

function bloquearCarta($carta){
    $carta.onclick = function(){};
}

function mostrarCarta($carta){
    const imagenesCartas = {
        'bart' : `url('logos/bart.png')`,
        'homero' : `url('logos/Homero.png')`,
        'krusty' : `url('logos/krusty.png')`,
        'lisa' : `url('logos/lisa.png')`,
        'maggie' : `url('logos/maggie.png')`,
        'marge' : `url('logos/Marge.png')`,
        'milhouse' : `url('logos/milhouse.png')`,
        'santa' : `url('logos/santa.png')`
    };

    let numeroDeCarta = $carta.id;
    $carta.style.backgroundImage = imagenesCartas[cartasJuego[numeroDeCarta]];
}

function compararCartasUsuario(cartasUsuario){
    return cartasJuego[cartasUsuario[0].id] === cartasJuego[cartasUsuario[1].id];
}

function desbloquearCartas($cartas, time){
    
    setTimeout(function(){
        $cartas.forEach(function($carta){
            $carta.onclick = manejarInputUsuario;
        })
    },time);
    

}

function bloquearCartas($cartas, time){
    $cartas.forEach(function($carta){
        $carta.onclick = function(){};
    });
}

function bloquearCartasPermanentes(cartasUsuario){
    cartasUsuario.forEach(function(carta){
        carta.className = 'carta-oculta';
    })
}

function finDelJuego(){
    console.log(`Lo hiciste en ${movimientos + 1} movimientos`);
    $botonJugar.className = '';
    $botonJugar.textContent = 'Vover a Jugar';
}


    