const slot__container = document.querySelector("#slot__container");
const slot_1 = document.querySelector("#slot1");
const slot_2 = document.querySelector("#slot2");
const slot_3 = document.querySelector("#slot3");
const playbtn = document.querySelector("#playbtn");
const money = document.querySelector("#money_art");
const apuesta = document.querySelector("#apuesta__select");

let heroes = ["america", "avengers", "hulk", "ironman", "thor"];
let coins;
let bet;

window.addEventListener("DOMContentLoaded", ()=>{
    coins = parseInt(money.textContent);
})
//Checkea si la apuesta es mayor o menor al numero de monedas que tenemos
//Si es mas grande devuelve true y al contrario false
const checkBet = () => {
    //Variable para indicar que es mas grande, se declara como false
    let betok = true;
    //Se da a la variable bet el valor que el cliente ponga en la apuesta
    bet = apuesta.value;

    //Compara si la apueta es mayor que las monedas que tiene el usuario o si bet esta vacio
    if (bet>coins || bet==="") {
        betok = false;
    }
    //Devuelve betok
    return betok;
}

const checkMoney = () =>{
    let moneyok = false;
    if (parseInt(money.textContent)>0) {
        moneyok = true;
    }
    return moneyok;
}

const manageMoney = () =>{
    coins -= bet;
    money.textContent = coins;
    console.log(bet);
    console.log("Monedas = "+ coins);
}

const checkPrice = () =>{
    for (const slot of object) {
        
    }
}

playbtn.addEventListener("mousedown", () => {
    let betok = checkBet();
    let moneyok = checkMoney();
    console.log(betok);
    console.log(moneyok);
    if (betok === true && moneyok === true) {
        manageMoney();
        for (const slot of slot__container.children) {
            let i = Math.floor(Math.random() * heroes.length);
            slot.style.backgroundImage = `url("../assets/images/${heroes[i]}.png")`;
        }
    }
})

// window.addEventListener("keydown", (event)=>{
//     if (event.code == "Space") {
//         if (money > 0) {
//             for (const slot of slot__container.children) {
//                 let i = Math.floor(Math.random() * heroes.length);
//                 slot.style.backgroundImage = `url("../assets/images/${heroes[i]}.png")`;
//             }
//             money -=1;
//         } else{
//             console.log("No tienes dinero")
//         }
//     }
// })