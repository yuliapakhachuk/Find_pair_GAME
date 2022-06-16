// const heroes =
//     [1, 2, 3, 4, 5, 6,
//     7, 8, 9, 10, 11, 12,
//     13, 14, 15, 16, 17, 18,
//     19, 20, 21, 22, 23, 24,
//     25, 26, 27, 28, 29, 30,
//     31, 32, 33, 34, 35, 36];

let heroes = [
    { number: 1, heroName: "SpiderMen", checked: false},
    { number: 2, heroName: "Gamora", checked: false},
    { number: 3, heroName: "CapitanAmerica", checked: false },
    { number: 4, heroName: "BlackWillow", checked: false },
    { number: 5, heroName: "Thor", checked: false },
    { number: 6, heroName: "IronMan", checked: false },
    { number: 7, heroName: "AntMan", checked: false },
    { number: 8, heroName: "Lockie", checked: false },
    { number: 9, heroName: "Vision", checked: false },
    { number: 10, heroName: "MrsMarvell", checked: false },
    { number: 11, heroName: "Sokol", checked: false },
    { number: 12, heroName: "Enot", checked: false },
    { number: 13, heroName: "Ronan", checked: false },
    { number: 14, heroName: "Wanda", checked: false },
    { number: 15, heroName: "Glove", checked: false },
    { number: 16, heroName: "Hulk", checked: false },
    { number: 17, heroName: "Altron", checked: false },
    { number: 18, heroName: "Valkiria", checked: false },
    { number: 1, heroName: "SpiderMen", checked: false },
    { number: 2, heroName: "Gamora", checked: false },
    { number: 3, heroName: "CapitanAmerica", checked: false },
    { number: 4, heroName: "BlackWillow", checked: false },
    { number: 5, heroName: "Thor", checked: false },
    { number: 6, heroName: "IronMan", checked: false },
    { number: 7, heroName: "AntMan", checked: false },
    { number: 8, heroName: "Lockie", checked: false },
    { number: 9, heroName: "Vision", checked: false },
    { number: 10, heroName: "MrsMarvell", checked: false },
    { number: 11, heroName: "Sokol" , checked: false},
    { number: 12, heroName: "Enot", checked: false },
    { number: 13, heroName: "Ronan", checked: false },
    { number: 14, heroName: "Wanda", checked: false },
    { number: 15, heroName: "Glove", checked: false },
    { number: 16, heroName: "Hulk", checked: false },
    { number: 17, heroName: "Altron" , checked: false},
    { number: 18, heroName: "Valkiria", checked: false },
]

//DOM elements:
const refs = {
    gridContainer: document.querySelector('.grid__container'),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}


// Make random order in Array:
function randomHeroes(array) { 
    for (let i = 0; i < array.length; i++) { 
        let currentHero = array[i];
        let randomIndex = (Math.floor(Math.random() * array.length));
        array[i] = heroes[randomIndex];
        array[randomIndex] = currentHero;
    }
    return array;
}

const randomHeroesArray = randomHeroes(heroes);

//Creates HTML in grid-container whith random order:
function createGridItems() { 
    return randomHeroesArray.map((hero, index) =>
        `
            <div class="grid__item" data-id=${index} data-hero=${hero.heroName}>
                <div class="item__front">
                    <img src="./images/${hero.number}.png" alt="">
                </div>
                <div class="item__back"></div>
            </div>
        `
    ).join('');
}

//Shows new random ordered cards on game field:
function renderGamefield() { 
    refs.gridContainer.innerHTML = createGridItems();
}

renderGamefield();

let lastRotated;
let timer;
let totalScore = 0;

function findsPair(e) {
    if (timer === undefined) {
        e.target.classList.add("rotated");
        startTimer();
        if (lastRotated !== undefined)  {
            if (lastRotated.dataset.hero === e.target.dataset.hero) {
                lastRotated = undefined;
                // lastRotated.dataset.id
                totalScore = totalScore + 1;
            } else {
                timer = setTimeout(() => {
                    lastRotated.classList.remove("rotated");
                    e.target.classList.remove("rotated");
                    lastRotated = undefined;
                    timer = undefined;
                }, 1500)
            }
        } else {
            lastRotated = e.target;
        }
    }
    console.log(totalScore);
    if (totalScore === 18) { console.log("WIN!")}
}

let sec = 0;
let min = 0;

function startTimer() { 
    // const startMoment = new Date().;

    setInterval(() => {
        sec = sec + 1;
        if (sec > 60) {
            sec = 0;
            return;
        }
        if (sec === 0 || sec === 60) {
            refs.seconds.textContent = "00";
        }
        else {
            refs.seconds.textContent = `${sec}`;
        }
    }, 1000);

        setInterval(() => {
        min = min + 1;
        if (min > 60) {
            min = 0;
            return;
        }
        if (min === 0 || min === 60) {
            refs.seconds.textContent = "00";
        }
        else {
            refs.minutes.textContent = `${min}`;
        }
    }, 60000);


}

// let previosCard;
// let totalScore = 0;

// function openCard(e) { 
//     if (!e.target.classList.contains('grid__item')) { return };
//     e.target.classList.add("rotated");
//     previosCard = e.target;
//     console.log(totalScore);
//     setTimeout((e) => isthePair(e), 1500)
// }

// function isthePair() { 
//     const allRotated = refs.gridContainer.querySelectorAll('.rotated');
//     const rotatedCards = [...allRotated];
//     const rotatedDataHero = rotatedCards.map(item => item.dataset.hero);
//     console.log(rotatedDataHero);
//     if (rotatedDataHero.includes(`${previosCard.dataset.hero}`)) {
//         totalScore = totalScore + 1;
//     } else { 
//         previosCard.classList.remove("rotated");       
//     }
// }


//turns back no more than two cards
//data-id 0-36

//add EventListners:
refs.gridContainer.addEventListener('click', findsPair, true);
