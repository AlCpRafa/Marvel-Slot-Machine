//Contenedor de los rdillos
const slot__container = document.querySelector("#slot__container");
//Rodillos
const slot_1 = document.querySelector("#slot1");
const slot_2 = document.querySelector("#slot2");
const slot_3 = document.querySelector("#slot3");
//Elementos del header
const header = document.querySelector(".header");
const dinero_input = document.querySelector("#dinero_input");
const diner_btn = document.querySelector("#dinerobtn");
const money = document.querySelector("#money_art");
const apuesta = document.querySelector("#apuesta__select");
const bet__cont = document.querySelector(".apuesta");
const money__cont = document.querySelector(".money");
//Footer y estadisticas
const stats = document.querySelector("#stats");
const footer = document.querySelector(".footer");
const aside = document.querySelector("#aside");
//Tienda
const tienda = document.querySelector("#tienda");
//Botones
const playbtn = document.querySelector("#playbtn");
const tiendabtn = document.querySelector("#tiendabtn");

//Posibilidades de la maquina
let heroes = ["america", "avengers", "hulk", "ironman", "thor"];
//Veces que ha salido cada combinacion ganadora
let heroesprob = []
//Numero de monedas
let coins = 0;
//Tamagno de la apuesta
let bet;
//Partidas totales
let totalgames = [];
//Para saber si las estadisticas estan visibles
let statsdisplayed = false;
//Compras
let comprahulk = false;
let compraspiderman = false;

window.addEventListener("DOMContentLoaded", () => {
    money.textContent = parseInt(coins);
})
//Checkea si la apuesta es mayor o menor al numero de monedas que tenemos
//Si es mas grande devuelve true y al contrario false
const checkBet = () => {
    //Variable para indicar que es mas grande, se declara como false
    let betok = true;
    //Se da a la variable bet el valor que el cliente ponga en la apuesta
    bet = apuesta.value;
    //Compara si la apueta es mayor que las monedas que tiene el usuario o si bet esta vacio
    if (bet > coins || bet === "") {
        betok = false;
    }
    //Devuelve betok
    return betok;
}
//Suma el dinero que se introduce en el input al dinero que se posee
const sumMoney = () => {
    coins += parseInt(dinero_input.value);
    money.textContent = parseInt(coins);
}
//Comprueba que el dinero restante sea mayor que 0
const checkMoney = () => {
    let moneyok = false;
    if (parseInt(money.textContent) > 0) {
        moneyok = true;
    }
    return moneyok;
}
//Genera el efecto de movimieno de la maquina
const slotMovement =()=>{
    for (const slot of slot__container.children) {
        let rand = Math.floor(Math.random() * heroes.length);
        slot.style.backgroundImage = `url("./assets/images/${heroes[rand]}.png")`;
    }
}
//Resta la apuesta del dinero y cambia el contenido para que el usuario vea el dinero que queda
const manageMoney = () => {
    coins -= bet;
    money.textContent = coins;
}
//Devuelve true si todos los elementos del array son igual al primero
const checkPrice = (array) => {
    return array.every(element => element === array[0]);
}
//Genera el moltiplicador del premio
const generateMultiplier = (array) => {
    let slotindex = array[0];
    let multiplier = heroes.findIndex(i => i === slotindex) + 1;
    return multiplier * 5;
}
//Crea un contenedor con el logo de cada escudo y un titulo para establecer las probabilidades
const generateStats = () => {
    const fragment = document.createDocumentFragment();
    stats.style.display = "none";
    for (const superhero of heroes) {
        let statscontainer = document.createElement("article");
        statscontainer.classList.add("footer__stats")
        let logo = document.createElement("div");
        logo.classList.add("footer__logo");
        logo.style.backgroundImage = `url("./assets/images/${superhero}.png")`;
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
//Devuelve las veces que ha salido cada elemento
const priceProbability = (nombre) => {
    let probability = 0.0;
    let premionombre = totalgames.filter(x => x[0] === nombre && x[1] === nombre && x[2] === nombre).length;
    probability = `${parseInt(premionombre)} / ${totalgames.length}`;
    return probability;
}
//Guarda las probabilidades en un array
const probStorage = () => {
    for (const hero of heroes) {
        heroesprob.push(priceProbability(hero));
    }
}
//Cambia los colores y la fuente de los elementos de la maquina en funcion de los parametros que se le pasen
const changeTheme = (bgy, bgn, bordery, bordern, lettery, lettern) => {
    //El header
    header.className = "header";
    header.classList.add(bgy, lettery);
    //Botones de play y tiendas
    playbtn.classList.remove("marvelcolor", bgn, lettern);
    playbtn.classList.add(bgy, lettery);
    tiendabtn.classList.remove("marvelcolor", bgn, lettern);
    tiendabtn.classList.add(bgy, lettery);
    //El footer y sus elementos
    footer.className = "footer";
    footer.classList.add(bgy, lettery);
    for (const element of slot__container.children) {
        element.classList.remove(bordern)
        element.classList.add(bordery);
    }
    //El aside y sus elementos
    aside.className = "aside";
    aside.classList.add(bordery)
    for (const element of aside.children) {
        element.className = "art_aside";
        element.classList.add(lettery);
    }
}
//Agrega la clase error que da movimiento al contenedor
const showError = (cont) => {
    cont.classList.add("error");
    cont.addEventListener("animationend", () => {
        cont.classList.remove("error");
    })
}
playbtn.addEventListener("mousedown", () => {
    let betdisplayed = false;
    let betok = checkBet();
    let moneyok = checkMoney();
    if (betok === false) {
        showError(bet__cont);
    }
    if (moneyok === false) {
        showError(money__cont);
    }
    //Se checkea que este todo bien
    if (betok === true && moneyok === true) {
        //Realiza las operaciones de resta de credito
        manageMoney();
        //Para que ejecute el cambio de imagen muchas veces
        let move = setInterval(() => {
            //Animacion de movimiento
            slotMovement();
        }, 20);
        //
        setTimeout(() => {
            let slotcombo = [];
            //Para el movimiento
            clearInterval(move);
            //Se genera una tirada cambaindo la url de las imagenes
            for (const slot of slot__container.children) {
                let i = Math.floor(Math.random() * heroes.length);
                slot.style.backgroundImage = `url("./assets/images/${heroes[i]}.png")`;
                //Se van almacenando los resultados de cada slot
                slotcombo.push(heroes[i]);
            }
            //Cuando se ha guardado la apuesta se le da valor true a la variable betdisplayed para indicar que
            //la tirada ya se ha hecho
            betdisplayed = true;
            //Se almacena la tirada entera en otro array para comparar posteriormente
            totalgames.push(slotcombo);
            //Mete dentro de un array las veces que ha salido cada escudo
            probStorage();
            //Si el footer tiene mas de dos hijos, es decir, si estan creados los contenedores de las estadisticas...
            if (footer.children.length > 2) {
                const herostats = document.querySelectorAll(".footer__stats");
                //Se recorren los contenedores y se "vuelca" dento de cada uno us probabilidad
                herostats.forEach(container => {
                    if (container.nodeName === "ARTICLE") {
                        container.children[1].textContent = heroesprob.shift();
                    }
                })
            }
            //Si la tirada se ha realizado ... 
            if (betdisplayed === true) {
                //Se checkea que haya premio
                let priceok = checkPrice(slotcombo);
                //Si devuelve true, es decir, si hay premio...
                if (priceok) {
                    //Se genera el multiplicador
                    let multiplier = generateMultiplier(slotcombo);
                    console.log("Se suma: " + bet * multiplier);
                    //Se suma a las monedas el producto de la apuesta realizada por el multiplicador
                    coins += (bet * multiplier);
                    //Se muestra a traves del textcontent actualizado
                    money.textContent = coins;
                    //Animacion en el aside
                    showError(aside);
                }
            }
        }, 1000);


    }
})
//Para sumar dinero cada vez que se pulsa en el boton de insertar
diner_btn.addEventListener("mousedown", () => {
    sumMoney();
})
//Se generan los contenedores y, en cierto modo, se reinicia el registro de los escudos
//que han saliso eliminando los valores del array
stats.addEventListener("mousedown", () => {
    generateStats();
    heroesprob=[];
})
//Despliega la tienda
tiendabtn.addEventListener("mousedown", () => {
    tienda.style.display = "flex";
})
//Eventos de la tienda
tienda.addEventListener("mousedown", (event) => {
    if (event.target.nodeName === "BUTTON") {
        const targetid = event.target.getAttribute("id");
        if (targetid.includes("btncompra")) {
            if (targetid.includes("hulk")) {
                comprahulk = true;
            } else if (targetid.includes("spiderman")) {
                compraspiderman = true;
            }
        } else if (targetid.includes("btnactive")) {
            if (targetid.includes("hulk") && comprahulk === true) {
                //aplica el tema de Hulk
                changeTheme("bghulk", "bgspid", "borderhulk", "borderspid", "hulkletter", "spidletter");

            } else if (targetid.includes("spiderman") && compraspiderman === true) {
                //Aplica el tema de Spiderman
                changeTheme("bgspid", "bghulk", "borderspid", "borderhulk", "spidletter", "hulkletter");
            }
        }
    }
    //Se cierra la tienda
    if (event.target.getAttribute("id") === "quitartienda") {
        tienda.style.display = "none";
    }
})