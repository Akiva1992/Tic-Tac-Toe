
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
        // renderBoard()
    };


    const createBoard = ()=>{
        board = [];
        for (let i = 0; i<row; i++){
            board[i] = []
            for(let j = 0; j<row; j++){
                board[i].push();    
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
                }
                counter++
            }
        }
    }; 


    const placeSymbol = (row, column, symbol)=>{
        board[row][column] = symbol;
        renderBoard()
    };


    init()
    
    return{
        placeSymbol,
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
    let isXsTurn = true;
    // console.log(symbolOBtn, symbolXBtn)





    const init = ()=>{
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
            console.log(row, column)
            symbol = (isXsTurn)? "x" : "o";
            isXsTurn = !isXsTurn
            gameBoard.placeSymbol(row,column,symbol);
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