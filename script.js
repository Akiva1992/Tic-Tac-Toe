///////////////////////////////////////////Player Factory/////////////////////////////////////////////////////////////////////
const PlayerFactory = (name, symbol) =>{


    let score=0;

     const getName = ()=>{return name};
    const getSymbol = ()=>{return symbol};
    const setScore = ()=>{
        score++
        console.log(`name:${score}`);
    }

    const getScore = ()=>{return score};

    return{
        setScore,
        getName,
        getScore
    }

};

//////////////////////////////Game Flow////////////////////////////////////////////////////////////////////////
const gameFlow =(()=>{

    let cells,turns,p1Symbol, p2Symbol,p1,p2,p1Fvalid,p2Fvalid,isXsTurn;
    const p1Form = document.querySelector(".p1-form");
    const p2Form = document.querySelector(".p2-form");
    const p1Name = document.querySelector("#p1-name");
    const p2Name = document.querySelector("#p2-name");
    const xRadio = document.querySelector(".x-radio");
    const oRadio = document.querySelector(".o-radio");
 
    const init = ()=>{
        turns = 0;
        p1IsX = true;
        isXsTurn = true;
        p1Fvalid = false;
        p2Fvalid = false;
        p1Form.classList.add("active");
        cells = Array.from(document.querySelectorAll(".cell"));
        bindEvents();
        // Hides board and end-page.
        document.querySelector(".game-board").classList.remove("active");
        document.querySelector(".end-page").classList.remove("active");
        // Info fields reset.
        document.querySelector(".winner-msg").textContent = "";
        document.querySelector(".score-update").textContent = "";
        document.querySelector(".p1-display-name").textContent = "";
        document.querySelector(".p2-display-name").textContent = "";
        document.querySelector(".p1-svg-container").textContent = "";
        document.querySelector(".p2-svg-container").textContent = "";
    }

    const playAgainInit = ()=>{
        turns = 0;
        isXsTurn = true;
        cells = Array.from(document.querySelectorAll(".cell"));
        bindEvents();
    };

    const bindEvents = () => {
        p1Form.addEventListener("submit", p1Validity);
        p2Form.addEventListener("submit", p2Validity);
        p1Name.addEventListener("input", p1nameValidity);
        p2Name.addEventListener("input", p2nameValidity);
        xRadio.addEventListener("input", radioValidity);
        oRadio.addEventListener("input", radioValidity);
        
        document.querySelector(".play-again-btn").addEventListener("click", playAgain);
        document.querySelector(".fresh-start-btn").addEventListener("click", freshStart);
        document.querySelector(".play-again-btn2").addEventListener("click", playAgain);
        document.querySelector(".fresh-start-btn2").addEventListener("click", freshStart);

        if (p1Fvalid && p2Fvalid){
            cells.forEach(cell => {
                cell.addEventListener("click", playTurn, {once : true});
            });
        }

        
    };

    const removeEvents = ()=>{
        cells.forEach(cell => {
            cell.removeEventListener("click", playTurn);
        });
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

    const radioValidity  =()=>{
        if (xRadio.checked || oRadio.checked) { 
            document.querySelector(".symbol-error").textContent = "";
        }
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
            p1IsX = xRadio.checked ? true : false;
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
        // inserts players names and symbols on screen.
        // debugger
        document.querySelector(".p1-display-name").textContent = p1Name.value;
        document.querySelector(".p2-display-name").textContent = p2Name.value;
        
        if (p1IsX){
            gameBoard.xSvgMaker(document.querySelector(".p1-svg-container"));
            gameBoard.oSvgMaker(document.querySelector(".p2-svg-container"));
        }else{
            gameBoard.xSvgMaker(document.querySelector(".p2-svg-container"));
            gameBoard.oSvgMaker(document.querySelector(".p1-svg-container"));
        }
        
        // resets and hides forms.
        p2Form.classList.remove("active");
        p1Form.reset()
        p2Form.reset()
        
        // Binds the board input events. 
        bindEvents()

        // Displays game board.
        document.querySelector(".game-board").classList.add("active");
    };

    const playTurn = (e) => {
        let row = Number(e.target.getAttribute("data-row"))-1;
        let column = Number(e.target.getAttribute("data-column"))-1;
        let symbol = (isXsTurn)? "x" : "o";
        turns++
        
        gameBoard.placeSymbol(row,column,symbol);
        board = gameBoard.getBoard().board
        checkGame(row, column,symbol)
        isXsTurn = !isXsTurn
    };

    const checkGame = (row, column,symbol)=>{
        if (turns > 4){
           rowCheck(row, symbol)
           columnCheck(column, symbol)

           if (row === column || row+column === 2){
            diagonalCheck(symbol)
           }
        }
    };

    const rowCheck =(row,symbol)=>{
        // Row loop
        if(board[row][0] !== "" && board[row][0]===board[row][1] && board[row][0] === board[row][2]){
            winner(symbol)
            
        }  
    };

    const columnCheck =(column,symbol)=>{
        if(board[0][column] !== "" && board[0][column]===board[1][column] && board[0][column] === board[2][column]){
            winner(symbol)
            
        }  
    };

    const diagonalCheck =(symbol)=>{
        
        if (board[0][0] !== "" && board[0][0]===board[1][1] && board[0][0]===board[2][2]){
                winner(symbol)
                
        }   
        

        if (board[0][2] !== "" && board[0][2]===board[1][1] && board[0][2]===board[2][0]){
                winner(symbol)
                
        }
             
    };

    const winner = (symbol) => {
      removeEvents();
      if (symbol === "x") {
        if (p1IsX) {
          console.log("Player One is the winner");
          displayWinner(p1, p2)
          p1.setScore()
        } else {
          console.log("Player Two is the winner");
          displayWinner(p2,p1)
          p2.setScore()
        }
      } else {
        if (p1Symbol === "o") {
          console.log("Player One is the winner");
          displayWinner(p1,p2)
          p1.setScore()
        } else {
          console.log("Player Two is the winner");
          displayWinner(p2,p1)
          p2.setScore()
        }
      }
    };

    const displayWinner = (winner,loser)=>{
        winnerName = winner.getName()
        loserName = loser.getName()
        wScore = winner.getScore();   
        lScore = loser.getScore();

        document.querySelector(".winner-msg").textContent = `${winnerName} is the winner!!`
        document.querySelector(".score-update").textContent = `The score is ${wScore} for ${winnerName} and ${lScore} for ${loserName} !!`
        document.querySelector(".end-page").classList.add("active");

    };

    const playAgain = ()=>{
        console.log("playAgain is working")
        gameBoard.init();
        playAgainInit();
    };

    const freshStart = ()=>{
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

                    xSvgMaker(cells[counter])

                }else if(board[j][i] === "o"){
                    oSvgMaker(cells[counter])    
                }else{
                    cells[counter].textContent = "";
                }
                counter++
            }
        }
        // checkGame();
    }; 

    const xSvgMaker = (target)=>{
        target.innerHTML = '';

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M4,4 L20,20 M20,4 L4,20");
        path.setAttribute("stroke", "currentColor");
        path.setAttribute("stroke-width", "2");
        path.setAttribute("stroke-linecap", "round");
        
        svg.append(path);
        target.append(svg);
    };
    
    const oSvgMaker = (target)=>{
        target.innerHTML = '';

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
        target.append(svg);
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
        getBoard,
        xSvgMaker,
        oSvgMaker
    }

})();

// console.log(gameFlow.xSvgMaker())