let cartasJuego = [];
let cartasUsuario = [];
let movimientos = 0;
let acertadas = 0;

const $botonJugar = document.querySelector('#boton-jugar');

$botonJugar.onclick = function(){
    reseterValores();
    mostrarMovimientos();
    ocultarBotonJugar();
    cartasJuego = devolverCartasAleatorias();

    document.querySelectorAll('.carta').forEach(function($carta){
        $carta.onclick = manejarInputUsuario;
    })
}


