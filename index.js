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

const cartas = ['bart', 'bart', 'homero', 'homero', 'krusty', 'krusty', 'lisa', 'lisa', 'maggie', 'maggie', 'marge', 'marge', 'milhouse', 'milhouse', 'santa', 'santa'];


let cartasJuego = [];
let cartasUsuario = [];
let movimientos = 0;
let acertadas = 0;

const $botonJugar = document.querySelector('#boton-jugar');

$botonJugar.onclick = function(){
    resetearValores();
    mostrarMovimientos();
    ocultarBotonJugar();
    cartasJuego = devolverCartasAleatorias();

    document.querySelectorAll('.carta').forEach(function($carta){
        $carta.onclick = manejarInputUsuario;
    })
}


