const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const pokeestadisticaUno = document.getElementById("textoEstadisticasUno");
    const pokeestadisticaDos = document.getElementById("textoEstadisticasDos");
    const pokeMovimientos = document.getElementById("textoMovimientos");
    const poketipo = document.getElementById("textoTipo");
    pokeestadisticaUno.innerHTML = '';
    pokeestadisticaDos.innerHTML = '';
    pokeMovimientos.innerHTML = '';
    poketipo.innerHTML = '';
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("../asset/imag/pokemon-sad.gif")
        } else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let arrayTipo = data.types;
            let arrayEstadisticas = data.stats;
            let arrayMovimientos = data.moves;
            let pokeImg = data.sprites.other.home.front_default;
            pokeImage(pokeImg);
            textoNombre(data.name,data.order);
            textoTipo(arrayTipo);
            textoEstadisticas(arrayEstadisticas);
            textoMovimientos(arrayMovimientos);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const textoNombre = (nombre,numero) => {
    const pokenombre = document.getElementById("nombrePokemon");
    pokenombre.innerHTML = '#0'+ numero +' ' + capitalizarPrimeraLetra(nombre);
}

const textoTipo = (arrayTipo) => {
    const poketipo = document.getElementById("textoTipo");
    for (let index = 0; index < arrayTipo.length; index++) {
        //console.log(capitalizarPrimeraLetra(arrayTipo[index].type.name));
        poketipo.innerHTML += capitalizarPrimeraLetra(arrayTipo[index].type.name) + ((arrayTipo.length) === 1 ? ' ': ', ') ;
    }
}

const textoEstadisticas = (arrayEstadisticas) => {
    const pokeestadisticaUno = document.getElementById("textoEstadisticasUno");
    const pokeestadisticaDos = document.getElementById("textoEstadisticasDos");
    for (let index = 0; index < 3; index++) {
        //console.log(capitalizarPrimeraLetra(arrayEstadisticas[index].stat.name) + ': ' + arrayEstadisticas[index].base_stat);
        pokeestadisticaUno.innerHTML += capitalizarPrimeraLetra(arrayEstadisticas[index].stat.name) + ': ' + arrayEstadisticas[index].base_stat + '<br>';
    }
    for (let index = 3; index < 6; index++) {
        //console.log(capitalizarPrimeraLetra(arrayEstadisticas[index].stat.name) + ': ' + arrayEstadisticas[index].base_stat);
        pokeestadisticaDos.innerHTML += capitalizarPrimeraLetra(arrayEstadisticas[index].stat.name) + ': ' + arrayEstadisticas[index].base_stat + '<br>';
    }
}

const textoMovimientos = (arrayMovimientos) => {
    const pokeMovimientos = document.getElementById("textoMovimientos");
    for (let index = 0; index < arrayMovimientos.length; index++) {
        //console.log(arrayMovimientos[index].move.name);
        pokeMovimientos.innerHTML += capitalizarPrimeraLetra(arrayMovimientos[index].move.name) + '<br>';
    }
}

function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }