let nombrejugador = [];
let nombre;
let randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let numberRandom;
let bingoLines = [];
let bingoLine;
let start = 0;
let numbersPerLine = 5;
let lines = 3;
let seguir;
let encontrado;
let linea;
let count = 0;
let punto1 = 0;
let punto2 = 0;
let resultPts;
let newCardResponse;
let ranKing = [{
    name: 'David',
    pt: 320
}, {
    name: 'Rebeca',
    pt: 332
}, {
    name: 'Alex',
    pt: 367
}, {
    name: 'Jacob',
    pt: 411
}, {
    name: 'Jared',
    pt: 418
}];

let bingo = () => {
    let nombreJugador = () => {
        do {
            nombre = prompt("Bienvenido al Bingo Skyonline, cual es su nombre ");
            if (nombre === "") {
                window.alert('Introduzca nombre para continuar ');
            } else if (nombre == null) {
                window.alert('Hasta la proxima');
            } else {
                nombrejugador.push(nombre);
                console.log('Bienvenido: ' + nombre)
                console.log('Sistema de puntos:');
                console.log('A menor puntuacion, mayor ranking');
                console.log('Numeros que coinciden con carton 2 pts');
                console.log('Numeros que no coinciden con carton 5 pts');
                console.log('Ranking de jugadores:');
                for (let i = 0; i < ranKing.length; i++) {
                    console.log('Jugador: ' + ranKing[i].name + ' ' + ranKing[i].pt + ' pts');
                }
                bingoCard();
                newCard();
            }
        } while (nombre === "" || nombre == null);
    }

    let newCard = () => {
        do {
            newCardResponse = prompt('Indique si quiere el carton actual o uno nuevo: S/N');
            switch (newCardResponse) {
                case 's':
                    seguir;
                    break;
                case 'S':
                    seguir;
                    break;
                case 'n':
                    bingoCard();
                    break;
                case 'N':
                    bingoCard();
                    break;
                case null:
                    window.alert('Hasta la proxima');
                    nombreJugador();
                    break;
                case '':
                    window.alert('Indique que quiere hacer');
                    newCard();
                    break;
            }
        } while (newCardResponse === 'n' || newCardResponse === 'N');
    };

    let bingoCard = () => {
        randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        bingoLines = [];
        bingoLine;
        start = 0;
        numbersPerLine = 5;
        lines = 3;
        randomNumbers = randomNumbers.sort(function() {
            return Math.random() - 0.5
        });
        for (let i = 0; i < lines; i++) {
            bingoLine = [];
            bingoLine.push(randomNumbers.splice(start, 5));
            console.table(bingoLine);
            bingoLines.push(bingoLine);
            start = (i * numbersPerLine) - 5;
        }
        console.table(bingoLines);
    };

    let pedirTurno = () => {
        let num1 = 1;
        let num2 = 20;
        let seguir;
        do {
            seguir = confirm('Desea pasar al siguiente turno?')
            if (seguir == true) {
                count++;
                numberRandom = Math.round(Math.random() * (num1 - num2) + num2);
                tacharNumero();
                if (encontrado) {
                    punto1 += 2;
                    console.log(punto1);
                    console.log("Se ha encontrado el numero: " + numberRandom);
                    cantarLinea();
                    cantarBingo();
                    console.table(bingoLines);
                } else {
                    punto2 += 5
                    console.log(punto2);
                    console.log('El numero: ' + numberRandom + ' no hay coincidencias');
                }
            }
            // else if(seguir == false){
            //   window.alert('Hasta la proxima')
            //    nombreJugador();
            // }
        } while (seguir == true);
    };

    // Actualiza la tarjeta de bingo al tachar el último número que ha salido
    let tacharNumero = () => {
        encontrado = false;
        for (i = 0; i < bingoLines.length; i++) {
            for (y = 0; y < bingoLines[i][0].length; y++) {
                if (bingoLines[i][0][y] === numberRandom) {
                    bingoLines[i][0][y] = 'x';
                    console.log("Se ha encontrado el numero: " + numberRandom + " en fila " + i + " y columna " + y);
                    encontrado = true;
                }
            }
        }
    };

    // Comprueba si hay linea
    let cantarLinea = () => {
        for (let i = 0; i < bingoLines.length; i++) {
            linea = true;
            for (let y = 0; y < bingoLines[i][0].length; y++) {
                if (bingoLines[i][0][y] != 'x') {
                    linea = false;
                }
            }
            if (linea) {
                console.log('LINEA ' + i + '!!!');
                console.table(bingoLines[i]);
            }
        }
    };

    // Comprueba si hay Bingo
    let cantarBingo = () => {
        let repetirJuego;
        for (let i = 0; i < bingoLines.length; i++) {
            for (let y = 0; y < bingoLines[i][0].length; y++) {
                if (bingoLines[i][0][y] != 'x') {
                    return false;
                }
            }
        };
        console.log('BINGO!!!');
        console.log('Ha completado el juego en: ' + count + ' turnos');
        resultPts = punto1 + punto2;
        console.log('Ha obtenido: ' + resultPts + 'pts');
        repetirJuego = confirm('Ha cantado BINGO, el juego a concluido, desea volver a jugar?');
        if (repetirJuego == true) {
            bingoCard();
            newCard();
        } else if (repetirJuego == false) {
            window.alert('Hasta la proxima');
            bingo();
        }
        return true;
    };

    nombreJugador();
    pedirTurno();
};

// Arrancamos Bingo
bingo();