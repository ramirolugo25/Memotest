
function resetearValores(){

    cartasJuego = [];
    cartasUsuario = [];
    movimientos = 0;
    acertadas = 0;


    const $cartas = document.querySelectorAll('.carta-oculta');
    voltearCartas($cartas, 0);
    desbloquearCartasPermanentemente($cartas);  
    document.querySelector('#movimientos').textContent = 'Movimientos: ';
}

function voltearCartas($cartas, milisegundos){
    
    setTimeout(function(){
        $cartas.forEach(function($carta){
            $carta.style.backgroundImage = `url('logos/simpsons.png')`;
        });
    },milisegundos);
    
}


function desbloquearCartasPermanentemente($cartas){

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
    const cartasMezcladas = devolverCartasMezcladas(cartas);
    return cartasMezcladas;
}

function devolverCartasMezcladas(cartas){

    for(let i=0; i<cartas.length; i++){

        const posicionRandom = devolverPosicionRandom();
        const auxiliar = cartas[posicionRandom];
        cartas[posicionRandom] = cartas[i];
        cartas[i] = auxiliar;
    }

    return cartas;
}

function devolverPosicionRandom(){

    return Math.floor(Math.random() * cartas.length);
}

function manejarInputUsuario(e){
    const $carta = e.target;
    bloquearCarta($carta);
    cartasUsuario.push($carta);
    mostrarCarta($carta);
    

    if (cartasUsuario.length !== 2){
        return;
    }

    if (compararCartasUsuario(cartasUsuario)){
        bloquearCartasPermanentemente(cartasUsuario);
        acertadas += 2;
        if(acertadas === cartasJuego.length){
            finalizarJuego();
        }
    }
    else{  
        const $cartas = document.querySelectorAll('.carta');
        bloquearCartas($cartas);
        voltearCartas(cartasUsuario, 1000);
        desbloquearCartas($cartas,1500);
        desbloquearCartas(cartasUsuario,1500);
    }
    movimientos++;
    document.querySelector('#movimientos').textContent = `Movimientos: ${movimientos}`;
    cartasUsuario = [];
    

}

function bloquearCarta($carta){
    $carta.onclick = function(){};
}

function mostrarCarta($carta){

    const numeroCarta = Number($carta.id.replace('carta-',''));
    $carta.style.backgroundImage = imagenesCartas[cartasJuego[numeroCarta]];
}

function compararCartasUsuario(cartasUsuario){
    const numeroCarta1 = Number(cartasUsuario[0].id.replace('carta-',''));
    const numeroCarta2 = Number(cartasUsuario[1].id.replace('carta-',''));
    
    return cartasJuego[numeroCarta1] === cartasJuego[numeroCarta2];

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


function bloquearCartasPermanentemente(cartasUsuario){

    cartasUsuario.forEach(function(carta){
        carta.className = 'carta-oculta';
    })
}


function finalizarJuego(){

    console.log(`Lo hiciste en ${movimientos + 1} movimientos`);
    $botonJugar.className = '';
    $botonJugar.textContent = 'Vover a Jugar';
}


    