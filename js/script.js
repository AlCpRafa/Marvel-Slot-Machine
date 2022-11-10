const slot__container = document.querySelector("#slot__container");
const slot_1 = document.querySelector("#slot1");
const slot_2 = document.querySelector("#slot2");
const slot_3 = document.querySelector("#slot3");
const playbtn = document.querySelector("#playbtn");
const money = document.querySelector("#money_art");
const apuesta = document.querySelector("#apuesta__select");
const stats = document.querySelector("#stats");
const footer = document.querySelector(".footer");


let heroes = ["america", "avengers", "hulk", "ironman", "thor"];
let coins;
let bet;
let totalgames = [];
let statsdisplayed = false;

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
}

const checkPrice = (array) =>{
   return array.every(element => element === array[0]);
}

const generateMultiplier = (array) =>{
    let slotindex = array[0];
    let multiplier = heroes.findIndex(i => i === slotindex) + 1;
    return multiplier;
}


playbtn.addEventListener("mousedown", () => {
    let slotcombo = [];
    let betok = checkBet();
    let moneyok = checkMoney();
    if (betok === true && moneyok === true) {
        manageMoney();
        console.log(coins);
        for (const slot of slot__container.children) {
            let i = Math.floor(Math.random() * heroes.length);
            slot.style.backgroundImage = `url("../assets/images/${heroes[i]}.png")`;
            slotcombo.push(heroes[i]);
        }
        totalgames.push(slotcombo)
        let priceok = checkPrice(slotcombo);
        if (priceok) {
            let multiplier = generateMultiplier(slotcombo);
            console.log("Se suma: " + bet * multiplier);
            coins += (bet * multiplier);
            money.textContent = coins;
        }
    }
})

stats.addEventListener("mousedown", ()=>{
    console.log("stats")
    generateStats();
})

const generateStats = () =>{
    const fragment = document.createDocumentFragment();
    stats.style.display = "none";
    for (const superhero of heroes) {
        let statscontainer = document.createElement("article");
        statscontainer.classList.add("footer__stats")
        let logo = document.createElement("div");
        logo.classList.add("footer__logo");
        logo.style.backgroundImage = `url("../assets/images/${superhero}.png")`;
        let stats = document.createElement("h3");
        stats.textContent = "?";
        stats.style.width = "fit-content";
        statscontainer.appendChild(logo);
        statscontainer.appendChild(stats);
        fragment.appendChild(statscontainer);
    }
    footer.appendChild(fragment);
    statsdisplayed = true;
}
// window.addEventListener("keydown", (event)=>{
//     if (event.code == "Space") {
//         ...
// })