
// let array = [[0,0,0],[0,0,0],[0,0,0]];

/////////////////////////////////Game Board//////////////////////////////////////////////////////////
const gameBoard = (()=>{
    
    // Variables
    let board, row, column;

    const init = ()=>{
        row = 3;
        column = 3;
        board = [];
        board = createBoard();
        // console.log(board)
        // bindEvents();
        // input(board,0,0,"x")
        // input(board,0,1,"o")
        // console.log(board)
        // renderBoard(board)
    };


    const createBoard = ()=>{
        board = [];
        for (let i = 0; i<row; i++){
            board[i] = []
            for(let j = 0; j<row; j++){
                board[i].push(0);    
            }
        }
        return board;
    }


    const renderBoard = (board)=>{
        const cells = Array.from(document.querySelectorAll(".cell")) //returns 9 divs
        let counter = 0;
        for (let i = 0; i<row; i++){
            for(let j = 0; j<row; j++ ){
                cells[counter].textContent = board[j][i];
                counter++
            }
        }
    }; 

    const getAttr = (row, column)=>{
        return{
            row,
            column
        }
    };

    const input = (board,row,column,symbol)=>{
        // debugger
        board[row][column]= symbol ;
    };



    
    return{
        input,
        init
    }

})();


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
    const p1Form = document.querySelector(".p1-form");
    const p2Form = document.querySelector(".p2-form");
    const p1Name = document.querySelector("#p1-name");
    const p2Name = document.querySelector("#p2-name");
    const xRadio = document.querySelector(".x-radio");
    const oRadio = document.querySelector(".o-radio");
    let p1,p2;
    let p1Fvalid = false;
    let p2Fvalid = false;
    // console.log(symbolOBtn, symbolXBtn)





    const init = ()=>{
        cells = Array.from(document.querySelectorAll(".cell"));
        bindEvents();
    };

    // document.querySelector("#players-submit-btn").addEventListener("submit", startGame)
    const bindEvents = () => {
        p1Form.addEventListener("submit", p1Validity);
        p2Form.addEventListener("submit", p2Validity);
    
        cells.forEach(cell => {
            cell.addEventListener("click", playTurn, {once : true});
        });
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
    };

    const playTurn = (e) => {
        if (p1Fvalid && p2Fvalid){
            let row = Number(e.target.getAttribute("data-row"))-1;
            let column = Number(e.target.getAttribute("data-column"))-1;
            console.log(row, column)
        }
    };

    init()
})();




// const bindEvents = ()=>{
//     Array.from(document.querySelectorAll(".cell")).forEach(cell=>{
//         cell.addEventListener("click", playTurn)
//     }, { once : true});
// };

// const playTurn = ()=>(symbol,row,column)=>{
//     board[row][column] = symbol;
// };

// const symbolSelect = (e)=>{
//     p1Symbole.targrt.value
// };

// const startGame = ()=>{
//     const p1Name = querySelector("#p1-name").value;
//     const p1Symbol = querySelector("#p1-symbol").value;
//     const p2Name = querySelector("#p2-name").value;

// };

// const p1 = PlayerFactory("JJ","x");

// console.log(p1.playTurn())