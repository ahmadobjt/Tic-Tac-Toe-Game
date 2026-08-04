let boxes=document.querySelectorAll(".box");
let resetGame=document.querySelector(".reset");
let newbtn=document.querySelector(".newgame");
let msgContainer=document.querySelector(".msg_container");
let msg=document.querySelector(".msg");
let turnValue=document.querySelector(".turnValue");

// Score board elements
let scoreXE1=document.querySelector("#scoreX");
let scoreOE1=document.querySelector("#scoreO");
let scoreDrawE1=document.querySelector("#scoreDraw");

// 2D-array
const winPatterns=[ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


let turnX=true;  // true = Player X's turn & false = Player O's turn
let count=1;

// this is the running score, kept in memory for the session

boxes.forEach((box) => {
    box.addEventListener("click",()=> {
        if(turnX===true) {
            box.innerText="X"
            box.style.color="Black"
            turnX=false
        }else {
            box.innerText="O"
            box.style.color="yellow"
            turnX=true
        }

        
        // after clicking a button, then disable it 
        box.disabled=true;
        count++;
        
        // FIX: check for a winner first. Only call drawGame if
        // nobody has won AND all 9 boxes are filled.
        const winner = checkWinner();
        if(winner) {
            showWinner(winner);
        }else if(count===10) {
            drawGame();
        }else {
            updateDisplayTurn();
        }
    })
});

// keeps the :turn X / O" text in sync
const updateDisplayTurn=()=> {
    turnValue.innerText = turnX ? "X" : "O";
}


// reset function both used for reset & new game
const resetBtn=()=> {
    turnX=true;
    count=1;
    enableBtns();
    msgContainer.classList.add("hide")
    clearWinHighlight();
    updateDisplayTurn();
}

// reset enabling 
const enableBtns=()=> {
    for(let box of boxes) {
        box.disabled=false;
        box.innerText="";
    }
}

// disable every box(used once game ends)
const disableBtns=()=> {
    for(let box of boxes) {
        box.disabled=true;
    }
}

// removes the green "winnng-box" highlight from a previous round
const clearWinHighlight=()=> {
    for(let box of boxes) {
        box.classList.remove("winning-box");
    }
}

// adds the highlight winning class of three boxes
const highlightWinBoxes=(pattern)=> {
    pattern.forEach((idx)=> {
        boxes[idx].classList.add("winning-box");
    });

}

// GameDraw function
const drawGame=()=> {
    msg.innerText=`Game is draw! There is no winner`;
    msgContainer.classList.remove("hide");
    disableBtns();
    updateScore("Draw");
}

// FIX: now returns the winner ("X"/"O") or null instead of nothing,
// so the click handler knows whether a win happened before checking draw.
// winner function
const showWinner=(winner)=> {
    msg.innerText=`Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
    updateScore(winner);
}

const checkWinner=()=> {
    for(let pattern of winPatterns) {
        // for accessing the value at particular box
        let pos1val=boxes[pattern[0]].innerText
        let pos2val=boxes[pattern[1]].innerText
        let pos3val=boxes[pattern[2]].innerText
        
        // checking winner
        if(pos1val != "" && pos2val != "" && pos3val != "") {
            if(pos1val === pos2val && pos2val === pos3val && pos3val === pos1val) {
                highlightWinBoxes(pattern)
                return pos1val;
            }
        }
    }
    return null;
}

// update score objects & scoreboard
const score={X: 0, O: 0, Draw: 0};

const updateScore=(result)=> {
    score[result]++;
    scoreXE1.innerText = score.X;
    scoreOE1.innerText = score.O;
    scoreDrawE1.innerText = score.Draw;
}

// reset the game

resetGame.addEventListener("click",resetBtn);
newbtn.addEventListener("click",resetBtn);
