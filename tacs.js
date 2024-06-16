const boxes = document.querySelectorAll(".box");
const sizz = document.querySelectorAll(".siz");
const s4 = document.querySelectorAll(".a4x4");
const s5 = document.querySelectorAll(".a5x5");
const indi = document.querySelector("#turnindicator");
const reset = document.querySelector("#reset");
const resetscr = document.querySelector("#resetscr");
const playerwin = document.querySelector("#playerwin");
const win1 = document.querySelectorAll(".win1");
const win2 = document.querySelectorAll(".win2");
const draws = document.querySelectorAll(".draws");
const boxeshover = document.querySelectorAll(".box:hover");

let chance0 = true;
let win_conditions = [];
let boxess = Array.from(boxes);
let n = 3;
let play1 = "Player 1";
let play2 = "Player 2";
let sing = false;

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('player1').innerText = play1;
    document.getElementById('player2').innerText = play2;

    document.getElementById('player1Name').value = play1;
    document.getElementById('player2Name').value = play2;

    document.getElementById('saveNames').addEventListener('click', () => {
        console.log("Save names")
        play1 = document.getElementById('player1Name').value;
        play2 = document.getElementById('player2Name').value;

        document.querySelector('#player1').innerText = play1;
        document.getElementById('player2').innerText = play2;

        localStorage.setItem('player1Name', player1Name);
        localStorage.setItem('player2Name', player2Name);

        if (chance0)
            indi.innerText = `${play1}\'s turn`;
        else
            indi.innerText = `${play2}\'s turn`;
    });
});

function resetscorecard() {
    localStorage.setItem("win1", "0");
    localStorage.setItem("win2", "0");
    localStorage.setItem("draws", "0");
    for (let y of win1) {
        y.innerText = "0";
    }
    for (let y of win2) {
        y.innerText = "0";
    }
    for (let yy of draws) {
        yy.innerText = "0";
    }
}

resetscr.addEventListener('click', resetscorecard);

for (let b of win1) {
    b.innerText = localStorage.getItem("win1");
}
for (let b of win2) {
    b.innerText = localStorage.getItem("win2");
} for (let b of draws) {
    b.innerText = localStorage.getItem("draws");
}

sizz[1].addEventListener('click', () => {
    sizz[1].style.backgroundColor = 'yellow';
    sizz[0].style.backgroundColor = 'white';
    sizz[2].style.backgroundColor = 'white';
    for (let s of s4) {
        s.style.width = '14vmin';
        s.style.height = '14vmin';
        s.style.display = 'block';
        s.style.fontSize = '12vmin';
    }
    for (let s of s5) {
        s.style.display = 'none';
    }
    for (let x of boxes) {
        x.style.width = '14vmin';
        x.style.height = '14vmin';
        x.style.fontSize = '12vmin';
    }

    n = 4;
    findwincond(n);
    boxess = Array.from(boxes).concat(Array.from(s4));
    console.log(boxess);
    addEventListeners();
})

sizz[2].addEventListener('click', () => {
    sizz[2].style.backgroundColor = 'yellow';
    sizz[0].style.backgroundColor = 'white';
    sizz[1].style.backgroundColor = 'white';
    for (let s of s4) {
        s.style.display = 'block';
        s.style.width = '11vmin';
        s.style.height = '11vmin';
        s.style.fontSize = '9vmin';
    }
    for (let s of s5) {
        s.style.display = 'block';
        s.style.fontSize = '9vmin';
    }
    for (let x of boxes) {
        x.style.width = '11vmin';
        x.style.height = '11vmin';
        x.style.fontSize = '9vmin';
    }

    n = 5;
    findwincond(n);
    boxess = Array.from(boxes).concat(Array.from(s4), Array.from(s5));
    console.log(boxess);
    addEventListeners();
})

sizz[0].addEventListener('click', () => {
    sizz[0].style.backgroundColor = 'yellow';
    sizz[1].style.backgroundColor = 'white';
    sizz[2].style.backgroundColor = 'white';
    for (let x of boxes) {
        x.style.width = '19vmin';
        x.style.height = '19vmin';
        x.style.fontSize = '16vmin';
    }

    for (let s of s4) {
        s.style.display = 'none';
    }

    for (let s of s5) {
        s.style.display = 'none';
    }
    n = 3;
    findwincond(n);
    boxess = Array.from(boxes);
    console.log(boxess);
    addEventListeners();
})

function findwincond(n) {
    win_conditions = [];
    let x = [];
    let y = 0;
    for (let i = 0; i < n * n; i++) {
        if (y != n)
            x.push(i);
        else {
            win_conditions.push(x);
            x = [i];
            y = 0;
        }
        y++;
    }
    win_conditions.push(x);
    x = [];
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n * n; j += n) {
            x.push(j);
        }
        win_conditions.push(x);
        x = [];
    }

    for (let i = 0; i < n * n; i += n + 1) {
        x.push(i);
    }
    win_conditions.push(x);
    x = [];
    for (let i = n - 1; i < n * n - 1; i += n - 1) {
        x.push(i);
    }
    win_conditions.push(x);

    console.log(win_conditions);
}
findwincond(n);

indi.innerText = `${play1}\'s turn`;

function handleClick(event) {
    console.log("button");
    const bo = event.target;
    if (chance0) {
        console.log("Button O");
        bo.innerText = "O";
        chance0 = false;
        indi.innerText = `${play2}\'s turn`;
    } else {
        console.log("Button X");
        bo.innerText = "X";
        chance0 = true;
        indi.innerText = `${play1}\'s turn`;
    }
    bo.disabled = true;
    checkWinner();
}

function addEventListeners() {
    boxess.forEach((box) => {
        box.addEventListener('click', handleClick);
    });
}

function isdraw() {
    let draw = 1;
    for (let i = 0; i < boxess.length; i++) {
        if (boxess[i].innerText == '')
            draw = 0;
    }
    if (draw == 1) {
        console.log("draw");
        return true;
    }
    console.log("not draw");
    return false;
}

addEventListeners();

function checkWinner() {
    if (!chance0 && sing) {
        let winn = 1;
        for (let x of win_conditions) {
            let blank;
            let countx = 0;
            let counto = 0;
            let countt = 0;
            let p = [];
            for (let i = 0; i < n; i++) {
                p.push(boxess[x[i]].innerText);
            }
            for (let i = 0; i < p.length; i++) {
                if (p[i] == 'X') {
                    countx++;
                }
                else if (p[i] == 'O') {
                    counto++;
                }
                else {
                    countt++;
                    blank = i;
                }
            }
            console.log(countx);
            console.log(counto);
            console.log(countt);
            if (counto == n - 1 || countx == n - 1) {
                if (countt == 1) {
                    console.log("trying to click!");
                    boxess[x[blank]].innerText = 'X';
                    boxess[x[blank]].disabled = true;
                    chance0 = true;
                    winn = 0;
                    break;
                }
            }
        }

        if (winn == 1 && !isdraw()) {
            while (true) {
                let rand = Math.floor(Math.random() * (n * n - 1));
                console.log("Random", rand);
                if (boxess[rand].innerText == '') {
                    console.log("trying to click!");
                    boxess[rand].innerText = 'X';
                    boxess[rand].disabled = true;
                    chance0 = true;
                    break;
                }
            }
        }
        indi.innerText = `${play1}\'s turn`;
    }
    let didanywin = 0;
    for (let x of win_conditions) {
        let win = 1;
        let p = [];
        for (let i = 0; i < n; i++) {
            p.push(boxess[x[i]].innerText);
        }
        for (let i = 0; i < p.length; i++) {
            if (p[i] == '') {
                win = 0;
                break;
            }
        }
        for (let i = 0; i < p.length - 1; i++) {
            if (p[i] != p[i + 1]) {
                win = 0;
                break;
            }
        }
        if (win == 1) {
            didanywin = 1;
            console.log("winner");
            for (let b of boxess) {
                b.disabled = true;
            }
            if (p[0] == 'O') {
                console.log("win1");
                for (let i = 0; i < n; i++) {
                    boxess[x[i]].style.backgroundColor = 'green';
                }
                playerwin.innerText = `${play1} wins!`;
                let z = parseInt(localStorage.getItem("win1"));
                z++;
                localStorage.setItem("win1", z.toString());
                for (let y of win1) {
                    y.innerText = z.toString();
                }
                openModal();
            }
            else {
                console.log("win2");
                for (let i = 0; i < n; i++) {
                    boxess[x[i]].style.backgroundColor = 'red';
                }
                let z = parseInt(localStorage.getItem("win2"));
                z++;
                localStorage.setItem("win2", z.toString());
                for (let y of win2) {
                    y.innerText = z.toString();
                }
                playerwin.innerText = `${play2} wins!`;
                openModal();
            }
            break;
        }

    }
    if (didanywin == 0) {
        let draw = 1;
        for (let i = 0; i < boxess.length; i++) {
            if (boxess[i].innerText == '')
                draw = 0;
        }
        if (draw == 1) {
            console.log("draw");
            let zz = parseInt(localStorage.getItem("draws"));
            zz++;
            localStorage.setItem("draws", zz.toString());
            for (let yy of draws) {
                yy.innerText = zz.toString();
            }
            playerwin.innerText = `Match Drawn!`;
            openModal();
        }
    }
}

function resetbtn() {
    for (let box of boxess) {
        box.innerText = '';
        box.disabled = false;
        box.style.backgroundColor = 'rgba(223, 180, 91, 0.99)';
    }
    for (let yess of boxeshover) {
        box.style.backgroundColor = 'rgb(255, 191, 0))';
    }
    chance0 = true;
    indi.innerText = `${play1}\'s turn`;
    time = 4;
    countdown.innerHTML = `5`;
}

let running = false;

const countdown = document.querySelector("#countdown");
let time = 4;
let int;

function start() {
    if (running) {
        clearInterval(int);
        int = setInterval(updatecountdown, 1000);
    } else {
        clearInterval(int);
    }
}

function updatecountdown() {
    countdown.innerHTML = `${time}`;
    time--;
    if (time == -1) {
        closeModal();
        resetbtn();
        running = false;
        clearInterval(int);
    }
}

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    time = 4;
    running = true;
    countdown.innerHTML = `5`;
    start();
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    resetbtn();
    clearInterval(int);
    running = false;
};

reset.addEventListener("click", resetbtn);

closeModalBtn.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        modalClose();
    }
});

const single = document.querySelector("#single");
const multi = document.querySelector("#multi");
single.addEventListener('click', singlePlayerMode);

if (localStorage.getItem("single") == "1") {
    sing = true;
    localStorage.setItem("single", "1");
    single.style.backgroundColor = 'yellow';
    multi.style.backgroundColor = 'white';
    resetbtn();
    document.getElementById('player2').innerText = "Computer";
    document.getElementById('player2Name').style.display = 'none';
    document.getElementById('player2Name').innerText = 'Computer';
    play2 = 'Computer';
}

function singlePlayerMode() {
    sing = true;
    localStorage.setItem("single", "1");
    single.style.backgroundColor = 'yellow';
    multi.style.backgroundColor = 'white';
    resetbtn();
    resetscorecard();
    document.getElementById('player2').innerText = "Computer";
    document.getElementById('player2Name').style.display = 'none';
    document.getElementById('player2Name').innerText = 'Computer';
    play2 = 'Computer';
}

multi.addEventListener('click', multiPlayerMode);

function multiPlayerMode() {
    sing = false;
    localStorage.setItem("single", "0");
    multi.style.backgroundColor = 'yellow';
    single.style.backgroundColor = 'white';
    resetbtn();
    resetscorecard();
    document.getElementById('player2').innerText = "Player 2";
    document.getElementById('player1Name').innerText = `Player 1`;
    document.getElementById('player2Name').style.display = 'block';
    document.getElementById('player2Name').innerText = `Player 2`;
    play1 = "Player 1";
    play2 = "Player 2";
}
