///////////////////////////////////////////Player Factory/////////////////////////////////////////////////////////////////////
const PlayerFactory = (name, symbol) =>{


    let score;

     const getName = ()=>{return name};
    const getSymbol = ()=>{return symbol};
    const setScore = (score)=>{
        score = score
    }
    return{
        getName,
        getSymbol
    }

    return{
        setScore
    }

};

//////////////////////////////Game Flow////////////////////////////////////////////////////////////////////////
const gameFlow =(()=>{

    let cells;
    let turns;
    let p1Symbol, p2Symbol;
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
        p1Name.addEventListener("input", p1nameValidity);
        p2Name.addEventListener("input", p2nameValidity);
        xRadio.addEventListener("input", radioValidity);
        oRadio.addEventListener("input", radioValidity);
        

    
        if (p1Fvalid && p2Fvalid){
            cells.forEach(cell => {
                cell.addEventListener("click", playTurn, {once : true});
            });
        }

        document.querySelector("#new-game").addEventListener("click", newGame)
        
    };

    const p1nameValidity =()=>{
        if (p1Name.validity.valid){
            document.querySelector(".p1-name-error").textContent = "";
        }
    };

    const p2nameValidity =()=>{
        if (p2Name.validity.valid){
            document.querySelector(".p2-name-error").textContent = "";
        }
    };

    const RadioValidity =()=>{

    };

    const radioValidity  =()=>{
        if (xRadio.checked || oRadio.checked) { 
            document.querySelector(".symbol-error").textContent = "";
        }
    };

    const removeEvents = ()=>{
        cells.forEach(cell => {
            cell.removeEventListener("click", playTurn);
        });
    };
    
    const p1Validity = (e) => {
        e.preventDefault();
        let symbol, name;
    
        if (!p1Name.validity.valid) { 
            document.querySelector(".p1-name-error").textContent = "You must input a name."
            return;
        }
    
        if (!xRadio.checked && !oRadio.checked) { 
            document.querySelector(".symbol-error").textContent = "You must select a symbol."
        }

        else {
            p1Fvalid = true;
            name = p1Name.value;
            p1Symbol = xRadio.checked ? "x" : "o";
            p1 = PlayerFactory(name, p1Symbol);
            nextPlayer();
        }
    };
    
    const nextPlayer = () => {
        p1Form.classList.remove("active")
        p2Form.classList.add("active")

    };
    
    const p2Validity = (e) => {
        e.preventDefault();
        let symbol, name;
    
        if (!p2Name.validity.valid) {
            document.querySelector(".p2-name-error").textContent = "You must input a name."
        }
        else {
            p2Fvalid = true;
            name = p2Name.value;
            p2Symbol = p1.symbol === "x" ? "o" : "x";
            p2 = PlayerFactory(name, p2Symbol);
            startGame();
        }
    };

    const startGame = () => {
        p2Form.classList.remove("active")
        bindEvents()
    };

    const playTurn = (e) => {
        let row = Number(e.target.getAttribute("data-row"))-1;
        let column = Number(e.target.getAttribute("data-column"))-1;
        let symbol = (isXsTurn)? "x" : "o";
        turns++
        
        gameBoard.placeSymbol(row,column,symbol);
        board = gameBoard.getBoard().board
        checkGame(row, column)
        // Don't change position, the winner is determined based on who's turn it is.
        isXsTurn = !isXsTurn
    };

    const checkGame = (row, column)=>{
        if (turns > 4){
           rowCheck(row)
           columnCheck(column)

           if (row === column || row+column === 2){
            diagonalCheck()
           }
        }
    };

    const rowCheck =(row)=>{
        // Row loop
        if(board[row][0] !== "" && board[row][0]===board[row][1] && board[row][0] === board[row][2]){
            winner()
            
        }  
    };

    const columnCheck =(column)=>{
        if(board[0][column] !== "" && board[0][column]===board[1][column] && board[0][column] === board[2][column]){
            winner()
            
        }  
    };

    const diagonalCheck =()=>{
        
        if (board[0][0] !== "" && board[0][0]===board[1][1] && board[0][0]===board[2][2]){
                winner()
                
        }   
        

        if (board[0][2] !== "" && board[0][2]===board[1][1] && board[0][2]===board[2][0]){
                winner()
                
        }
             
    };

    const winner = ()=>{
        removeEvents();
        if (isXsTurn){
            if(p1Symbol === "x"){
                console.log("Player One is the winner")
            }else {console.log("Player Two is the winner")}
        }else{
            if(p1Symbol === "o"){
                console.log("Player One is the winner")
            }else {console.log("Player Two is the winner")}
        }
    };

    const newGame = ()=>{
        gameBoard.init();
        init();
    };
    init()
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
        getBoard()
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
        // checkGame();
    }; 


    const placeSymbol = (row, column, symbol)=>{
            board[row][column] = symbol;
            renderBoard()
        return[
            board
        ]
    };


    const getBoard = ()=>{
        return {board}
    };

    

    init()

    const newGame = ()=>{
        init();
    };
    
    return{
        placeSymbol,
        init,
        getBoard
    }

})();

////////////////////////Trial Stuff///////////////////////////////////////
// const a = (()=>{
//     let n=0;
//     const aTrial = ()=> {
//         n++
//     }
//     aTrial()
//     const bTrial =()=>{
//         return{
//             n     
//         }
//     };
//     return{
//         bTrial
//     }
// })();


// const b = (()=>{
//     c = a.bTrial()
//     // let b = gameBoard.getBoard().board
//     // console.log(b)
//     // let board = gameBoard.placeSymbol()
//     // console.log(`board in trial ${board}`)
// })();