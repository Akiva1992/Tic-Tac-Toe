
// let array = [[0,0,0],[0,0,0],[0,0,0]];

///////////////////////////////////////////Player Factory/////////////////////////////////////////////////////////////////////
const PlayerFactory = (name, symbol) =>{

    let _name = name;
    const init = ()=>{

        bindEvents()
    }


    const getName = ()=>{return _name};
    const getSymbol = ()=>{return symbol};

    const bindEvents = ()=>{

    };

    return{
        getName,
        getSymbol
    }

};


//////////////////////////////Game Flow////////////////////////////////////////////////////////////////////////
const gameFlow =(()=>{

    let cells;
    let turns;
    const p1Form = document.querySelector(".p1-form");
    const p2Form = document.querySelector(".p2-form");
    const p1Name = document.querySelector("#p1-name");
    const p2Name = document.querySelector("#p2-name");
    const xRadio = document.querySelector(".x-radio");
    const oRadio = document.querySelector(".o-radio");
    let p1,p2;
    let p1Fvalid = false;
    let p2Fvalid = false;
    let isXsTurn;
    // console.log(symbolOBtn, symbolXBtn)





    const init = ()=>{
        turns = 0;
        isXsTurn = true;
        cells = Array.from(document.querySelectorAll(".cell"));
        bindEvents();
    };

    // document.querySelector("#players-submit-btn").addEventListener("submit", startGame)
    const bindEvents = () => {
        p1Form.addEventListener("submit", p1Validity);
        p2Form.addEventListener("submit", p2Validity);
    
        if (p1Fvalid && p2Fvalid){
            cells.forEach(cell => {
                cell.addEventListener("click", playTurn, {once : true});
            });
        }

        document.querySelector("#new-game").addEventListener("click", newGame)
        
    };
    
    const p1Validity = (e) => {
        e.preventDefault();
        let symbol, name;
    
        if (!p1Name.validity.valid) { 
            console.log("Player 1 name is invalid.")
        }
    
        if (!xRadio.checked && !oRadio.checked) { 
            console.log("Player 1 symbol is not chosen.")
        }

        else {
            p1Fvalid = true;
            name = p1Name.value;
            symbol = xRadio.checked ? "x" : "o";
            p1 = PlayerFactory(name, symbol);
            nextPlayer();
        }
    };
    
    const nextPlayer = () => {
        p1Form.style.display = "none";
        p2Form.style.display = "flex";
    };
    
    const p2Validity = (e) => {
        e.preventDefault();
        let symbol, name;
    
        if (!p2Name.validity.valid) {
            console.log("Player 2 form is invalid.")
        }
        else {
            p2Fvalid = true;
            name = p2Name.value;
            symbol = p1.symbol === "x" ? "o" : "x";
            p2 = PlayerFactory(name, symbol);
            startGame();
        }
    };

    const startGame = () => {
        p2Form.style.display = "none";
        bindEvents()
    };

    const playTurn = (e) => {
        let row = Number(e.target.getAttribute("data-row"))-1;
        let column = Number(e.target.getAttribute("data-column"))-1;
        symbol = (isXsTurn)? "x" : "o";
        isXsTurn = !isXsTurn
        turns++
        gameBoard.placeSymbol(row,column,symbol);
    };

    const getTurns = ()=>{
        return turns;
    };

    const newGame = ()=>{
        gameBoard.init();
        init();
    };

    init()

    return{
        getTurns
    }
})();

/////////////////////////////////Game Board//////////////////////////////////////////////////////////
const gameBoard = (()=>{
    
    // Variables
    let board, row, column;

    const init = ()=>{
        row = 3;
        column = 3;
        board = [];
        board = createBoard();
        console.log(`Board in init before render ${board}`);
        renderBoard()
        console.log(`Board in init after render ${board}`)

    };


    const createBoard = ()=>{
        board = [];
        for (let i = 0; i<row; i++){
            board[i] = []
            for(let j = 0; j<row; j++){
                board[i].push("");    
            }
        }
        return board;
    }


    const renderBoard = ()=>{
        const cells = Array.from(document.querySelectorAll(".cell")) //returns 9 divs
        let counter = 0;
        // debugger
        for (let i = 0; i<row; i++){
            for(let j = 0; j<row; j++ ){
                if (board[j][i] === "x"){

                    cells[counter].innerHTML = '';

                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("viewBox", "0 0 24 24");
        
                    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", "M4,4 L20,20 M20,4 L4,20");
                    path.setAttribute("stroke", "currentColor");
                    path.setAttribute("stroke-width", "2");
                    path.setAttribute("stroke-linecap", "round");
        
                    svg.append(path);
                    cells[counter].append(svg);
                }else if(board[j][i] === "o"){

                    cells[counter].textContent = "";

                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("viewBox", "0 0 24 24");
        
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circle.setAttribute("cx", "12");
                    circle.setAttribute("cy", "12");
                    circle.setAttribute("r", "10");
                    circle.setAttribute("stroke", "currentColor");
                    circle.setAttribute("stroke-width", "2");
                    circle.setAttribute("fill", "none");
        
                    svg.appendChild(circle);
                    cells[counter].appendChild(svg);
                }else{
                    cells[counter].textContent = "";
                }
                counter++
            }
        }
        checkGame();
    }; 


    const placeSymbol = (row, column, symbol)=>{
        board[row][column] = symbol;
        renderBoard()
        return[
            board
        ]
    };


    
    const checkGame = ()=>{
        let turns = gameFlow.getTurns()
        console.log(turns)
        console.log(`board in check game ${board}`)
        if (turns > 4){
            // Row loop
            for (let i = 0; i<row; i++){
                for(let j = 0; j<row-2; j++){
                    if(board[i][j] != ""){
                    if (board[i][j]===board[i][j+1] && board[i][j] === board[i][j+2]){
                            winner()
                            return;
                        }
                    }    
                }
            }
            // Column loop
            for (let i = 0; i<row; i++){
                for(let j = 0; j<row-2; j++){
                    if(board[j][i] != ""){
                    if (board[j][i]===board[j+1][i] && board[j][i] === board[j+2][i]){
                            winner()
                            return;
                        }
                    }    
                }
            }

            // Diagonal loops
            if (board[0][0]!== ""){
            if (board[0][0]===board[1][1] && board[0][0]===board[2][2]){
                    winner()
                    return
                }   
            }
            if (board[0][2]!== ""){
            if (board[0][2]===board[1][1] && board[0][2]===board[2][0]){
                    winner()
                    return
                }   
            }
        }
    };


    const winner = ()=>{
        console.log("we've got a winner")
    };
    init()

    const newGame = ()=>{
        init();
    };
    
    return{
        placeSymbol,
        init,
    }

})();


////////////////////////Trial Stuff///////////////////////////////////////
const a = (()=>{
    let n=0;
    const aTrial = ()=> {
        n++
    }
    aTrial()
    const bTrial =()=>{
        return{
            n     
        }
    };
    return{
        bTrial
    }
})();


const b = (()=>{
    c = a.bTrial()
    // console.log(c.n)
})();