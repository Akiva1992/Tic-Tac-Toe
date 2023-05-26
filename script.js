
// let array = [[0,0,0],[0,0,0],[0,0,0]];


const gameBoard = (()=>{
    
    // Variables
    let board = [];
    let row = 3, column = 3;
    console.log(board)
    const createBoard = ()=>{
        for (let i = 0; i<row; i++){
            board[i] = []
            for(let j = 0; j<row; j++){
                board[i].push(0);    
            }
        }
        return board;
    }

    board = createBoard();
    console.log(board)

    const input = (number,row,column)=>{
        board[row][column]= number;
    };

    input("x",1,1);
    console.log(board);

    input("o",2,1);
    console.log(board);


})();


const PlayerFactory = (name, symbol) =>{
    
};