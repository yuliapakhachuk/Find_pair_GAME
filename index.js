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

const level = 1;

//DOM elements:
const refs = {
    gridContainer: document.querySelector('.grid__container'),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
    rightfield: document.querySelector(".timer__box"),
    gameTimer: document.querySelector('.timer'),

    middleBox: document.querySelector(".middle__box"),
    cardField: document.querySelector("#card__field"),
    startPage: document.querySelector("#start__page"),
    tableScore: document.querySelector("#table__score"),
    newGameBtn: document.querySelector(".new__game-btn"),
}


function showStartPage() { 
    refs.middleBox.innerHTML = "";
    refs.gameTimer.classList.add('is-hidden');
    refs.newGameBtn.classList.add('is-hidden');

    refs.middleBox.append(refs.startPage.content.cloneNode(true));
    refs.startBtn = document.querySelector("button[data-start]");
    refs.startBtn.addEventListener('click', showCardField);
    refs.scoreBtn = document.querySelector('button[data-scores]');
    refs.scoreBtn.addEventListener('click', showTableScore);
}


refs.newGameBtn.addEventListener('click', () => {
    window.location.reload();
    // randomHeroes();
    // createGridItems()
    // showCardField();
});


showStartPage();


// Make random order in Array:
function randomHeroes(array) { 
    // const arrayByLevel = array.filter(item => item.number < 10);

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
            <div class="grid__item" data-id=${index} data-hero=${hero.heroName} style="animation-delay:${index * 100}ms">
                <div class="item__front">
                    <img src="./images/${hero.number}.png" alt="">
                </div>
                <div class="item__back"></div>
            </div>
        `
    ).join('');
}



//renders cards field:

function showCardField() { 
    refs.middleBox.innerHTML = "";
    refs.gameTimer.classList.remove('is-hidden');
    refs.newGameBtn.classList.remove('is-hidden');

    refs.middleBox.append(refs.cardField.content.cloneNode(true));
    
    refs.gridContainer = document.querySelector(".grid__container");
    refs.gridContainer.innerHTML = createGridItems();
    refs.gridContainer.addEventListener('click', findsPair, true);
}



//renders table Score:
function showTableScore() { 
    refs.middleBox.innerHTML = "";

    refs.middleBox.append(refs.tableScore.content.cloneNode(true));
    refs.table = document.querySelector('.table__score--container');

    refs.gameTimer.classList.add('is-hidden');
}


//Game logic:
let previousSelectedCard;
let timer;
let totalScore = 0;

function findsPair(e) {
    if (!timer && !e.target.classList.contains('rotated')) {
        e.target.classList.add("rotated");
        startTimer();
        if (previousSelectedCard)  {
            if (previousSelectedCard.dataset.hero === e.target.dataset.hero) {
                previousSelectedCard = undefined;
                totalScore = totalScore + 1;
            } else {
                timer = setTimeout(() => {
                    previousSelectedCard.classList.remove("rotated");
                    e.target.classList.remove("rotated");
                    previousSelectedCard = undefined;
                    timer = undefined;
                }, 1000)
            }
        } else {
            previousSelectedCard = e.target;
        }
    }
    console.log(totalScore);

    if (totalScore === (heroes.length / 18)) {
        finishedGame();
    }
}


//Timer:
let sec = 0;
let min = 0;
let gameTimer;

function startTimer() { 
    if (gameTimer === undefined) {
        gameTimer = setInterval(() => {
            sec = sec + 1;
            if (sec === 60) {
                sec = 0;
                min = min + 1;
                refs.minutes.innerText =  min < 10 ? "0" + min : min;
            }
            refs.seconds.innerText = sec < 10 ? "0" + sec : sec;
        }, 1000);
    };
}

let userData = {
    userName: "",
    userScore: "",
}

function finishedGame() {
    clearInterval(gameTimer);

    //konfeti

    setTimeout(() => {
        
        userData.userName = prompt("WELL DONE! Your name is...");
        // if (userData.userName = "" || userData.userName === null) { 
        //     userData.userName = randomHeroesArray.find((el, i, arr) => arr[0].userName);
        // }
        userData.userScore = (Number(refs.minutes.textContent) * 60) + Number(refs.seconds.textContent);
        // setTimeout(() => (showTableScore()) , 1000);
    }, 1000);
    savingScore();
}

//saving users score:
function savingScore() {
    setTimeout(() => { 
        
        const LOCALSTORAGE_KEY = "bestScoresGame";
        const LOCALSTORAGE_VALUE = localStorage.getItem("bestScoresGame");
        let bestScores = (JSON.parse(LOCALSTORAGE_VALUE) === null ? [] : [...JSON.parse(LOCALSTORAGE_VALUE)]);
        
    if (bestScores.length <= 10) {
        bestScores.push(userData);
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(bestScores));
    } else {
        const scores = bestScores.map(item =>  Number(item.userScore));
        const worstResultIndex = scores.indexOf(Math.max(...scores));
        const worstResult = bestScores[worstResultIndex];
        if (userData.userScore <= worstResult.userScore) {
            bestScores.splice(worstResultIndex, 1);
            bestScores.push(userData);
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(bestScores));
        } else {
            alert(`So sorry ${userData.userName}, try again to get better result:)`)
            }
        }
    }, 1500)
}


