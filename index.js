let heroes = [
    { number: 1, heroName: "SpiderMen"},
    { number: 2, heroName: "Gamora"},
    { number: 3, heroName: "CapitanAmerica" },
    { number: 4, heroName: "BlackWillow" },
    { number: 5, heroName: "Thor" },
    { number: 6, heroName: "IronMan" },
    { number: 7, heroName: "AntMan" },
    { number: 8, heroName: "Lockie" },
    { number: 9, heroName: "Vision" },
    { number: 10, heroName: "MrsMarvell" },
    { number: 11, heroName: "Sokol" },
    { number: 12, heroName: "Enot" },
    { number: 13, heroName: "Ronan" },
    { number: 14, heroName: "Wanda" },
    { number: 15, heroName: "Glove" },
    { number: 16, heroName: "Hulk" },
    { number: 17, heroName: "Altron" },
    { number: 18, heroName: "Valkiria" },
    { number: 1, heroName: "SpiderMen" },
    { number: 2, heroName: "Gamora" },
    { number: 3, heroName: "CapitanAmerica" },
    { number: 4, heroName: "BlackWillow" },
    { number: 5, heroName: "Thor" },
    { number: 6, heroName: "IronMan" },
    { number: 7, heroName: "AntMan" },
    { number: 8, heroName: "Lockie" },
    { number: 9, heroName: "Vision" },
    { number: 10, heroName: "MrsMarvell" },
    { number: 11, heroName: "Sokol" },
    { number: 12, heroName: "Enot" },
    { number: 13, heroName: "Ronan" },
    { number: 14, heroName: "Wanda" },
    { number: 15, heroName: "Glove" },
    { number: 16, heroName: "Hulk" },
    { number: 17, heroName: "Altron" },
    { number: 18, heroName: "Valkiria" },
]

let userData = {
    userName: "",
    userScore: "",
    userTime: "",
    userLevel: "",
}


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
    menuBtn: document.querySelector(".new__game-btn"),
    allResults: document.querySelector('#all__scores'),
}


function showStartPage() { 
    refs.middleBox.innerHTML = "";
    refs.gameTimer.classList.add('is-hidden');
    refs.menuBtn.classList.add('is-hidden');
    
    refs.middleBox.append(refs.startPage.content.cloneNode(true));
    refs.startBtn = document.querySelector("button[data-start]");
    // refs.startBtn.addEventListener('click', showCardField);
    refs.startBtn.addEventListener('click', chooseLevel);

    refs.scoreBtn = document.querySelector('button[data-scores]');
    refs.scoreBtn.addEventListener('click', showTableScore);

    refs.levelList = document.querySelector('.level__list');
    refs.levelList.classList.add('is-hidden');
}

showStartPage();
refs.menuBtn.addEventListener('click', () => { window.location.reload(); });


function chooseLevel() { 
    refs.levelList.classList.remove('is-hidden');
    
    refs.beginnerBtn = document.querySelector('button[data-level="beginner"]');
    refs.beginnerBtn.addEventListener('click', () => { 
        userData.userLevel = "beginner";
        showCardField();
    });
    refs.expertBtn = document.querySelector('button[data-level="expert"]');
    refs.expertBtn.addEventListener('click', () => { 
        userData.userLevel = "expert";
        showCardField();
    });
}



// Make random order in Array:
let arrayByLevel;
function randomHeroes(heroes) { 
    arrayByLevel = (userData.userLevel === "expert") ? (heroes) : (heroes.filter(item => { return item.number <= 8; }));
    console.log(arrayByLevel);

    for (let i = 0; i < arrayByLevel.length; i++) { 
    let currentHero = arrayByLevel[i];
        let randomIndex = (Math.floor(Math.random() * arrayByLevel.length));
        arrayByLevel[i] = arrayByLevel[randomIndex];
        arrayByLevel[randomIndex] = currentHero;
    }
    console.log(heroes);
    return arrayByLevel;
}


//Creates HTML in grid-container whith random order:
function createGridItems() { 
    const randomHeroesArray = randomHeroes(heroes);
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
    refs.menuBtn.classList.remove('is-hidden');

    refs.middleBox.append(refs.cardField.content.cloneNode(true));
    
    refs.gridContainer = document.querySelector(".grid__container");
    if (userData.userLevel === "beginner") { 
        refs.gridContainer.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        refs.gridContainer.style.gridTemplateRows = "1fr 1fr 1fr 1fr";
    }
    refs.gridContainer.innerHTML = createGridItems();
    refs.gridContainer.addEventListener('click', (e) => {
        findsPair(e);
    }, true);
}



//renders table Score:
function showTableScore() { 
    refs.middleBox.innerHTML = "";

    refs.middleBox.append(refs.tableScore.content.cloneNode(true));
    refs.table = document.querySelector('.table__score--container');
    refs.tableBody = document.querySelector('.table__body');
    refs.tableBody.innerHTML = renderScoreTableHTML()

    refs.gameTimer.classList.add('is-hidden');
    refs.menuBtn.classList.remove('is-hidden');
}

function clearCardsRotated(cards) {
    setTimeout(() => { 
        cards.forEach(element => {
            element.classList.remove('rotated');
        });
    }, 1000)
}


//Game logic:
let previousSelectedCard;
let totalScore = 0;

function findsPair(e) {
    if (!e.target.classList.contains('rotated')) {
        e.target.classList.add("rotated");
        startTimer();
        if (previousSelectedCard)  {
            if (previousSelectedCard.dataset.hero === e.target.dataset.hero) {
                totalScore = totalScore + 1;
            } else {
                clearCardsRotated([
                    previousSelectedCard, e.target
                ]);
            }
            previousSelectedCard = undefined;
        } else {
            previousSelectedCard = e.target;
        }

        if (totalScore === (arrayByLevel.length / 2)) {
            finishedGame();
        }
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


function finishedGame() {
    clearInterval(gameTimer);

    //konfeti

    setTimeout(() => {
        userData.userName = prompt("WELL DONE! Your name is...") || "Noname";
        userData.userScore = (min * 60) + sec;
        userData.userTime = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`
        setTimeout(() => (showTableScore()) , 1000);
        savingScore();
    }, 1000);
}

//saving users score:
function savingScore() {
        
    const LOCALSTORAGE_KEY = "bestScoresGame";
    const scoreValues = localStorage.getItem("bestScoresGame");
    const bestScores = (JSON.parse(scoreValues) === null ? [] : [...JSON.parse(scoreValues)]);
    
    bestScores.push(userData);
    bestScores.sort((a, b) => a.userScore - b.userScore);
    bestScores.splice(100);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(bestScores));
}

function renderScoreTableHTML() { 
    return [...JSON.parse(localStorage.getItem("bestScoresGame"))].slice(0, 10).map(score => {
        return `
            <tr class="table__row">
                <td class="user__name">${score.userName}</td>
                <td class="user__score">${score.userTime}</td>
            </tr>
            `
    }).join("");
}
refs.showMoreBtn = document.querySelector(".show__more");
refs.showMoreBtn.addEventListener('click', showMoreScores);

function showMoreScores() {
    refs.middleBox.innerHTML = "";

    refs.middleBox.append(refs.allResults.content.cloneNode(true));
    refs.allScoresList = document.querySelector('.all__scores--list');
        
    const allScoreItems = [...JSON.parse(localStorage.getItem("bestScoresGame"))].slice(10, 90).map(score => {
        return `
        <li class="all__scores--item">
            <span class="all__scores--name">${score.userName}</span> - 
            <span class="all__scores--time">${score.userTime}</span>
        </li>
        `
    }).join("");
    
    refs.allScoresList.innerHTML = allScoreItems;
}
