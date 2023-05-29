# Tic-Tac-Toe

## Assignment

1. Set up your project with HTML, CSS, and Javascript files and get the Git repo all set up.

2. You're going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects, and you're probably going to want an object to control the flow of the game itself.

3. Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

4. Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s).

5. Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don't forget the logic that keeps players from playing in spots that are already taken!

6. Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player, or gameboard objects. Take care to put them in "logical" places. Spending a little time brainstorming here can make your life much easier later!

7. If you're having trouble, "Building a house from the inside out" is a great article that lays out a highly applicable example of how you might organize your code for this project.

8. Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.

9. Clean up the interface to allow players to put in their names, include a button to start/restart the game, and add a display element that congratulates the winning player!    


Optional - If you're feeling ambitious, create an AI so that a player can play against the computer!

- Start by just getting the computer to make a random legal move.

- Once you've gotten that, work on making the computer smart. It is possible to create an unbeatable AI using the minimax algorithm (read about it [here](https://en.wikipedia.org/wiki/Minimax), some googling will help you out with this one).

If you get this running, definitely come show it off in the chatroom. It's quite an accomplishment! <br /> <br /> <br /> <br />



Gameboard object:
- Attributes to store the current state of the game board (e.g., a 2D array or a flat array representing the grid).
- Functions to initialize the game board, creating an empty grid.
- Functions to update the board when a player makes a move.
- Functions to check for a winning condition (e.g., three in a row).
- Functions to check for a draw condition (e.g., when the board is full and no winner).
- Functions to display the current state of the board.
- Functions to reset the board for a new game.

Player object:
- Attributes to store the player's name, symbol (e.g., 'X' or 'O'), and score.
- Functions to set and retrieve the player's name, symbol, and score.
- Functions to validate and handle player moves (e.g., selecting a position on the game board).
- Functions to update the player's score when they win a game.
- Functions to reset the player's score for a new game.
- Functions to display player-related information or messages (e.g., displaying the player's name and symbol).

Game flow object:
- Functions to start the game and initialize the necessary objects (e.g., Gameboard, Player).
- Functions to alternate between players, allowing them to make moves.
- Functions to validate and handle player inputs.
- Functions to determine the game outcome (e.g., a player wins, a draw occurs).
- Functions to display messages or prompts for players during the game.
- Functions to handle the overall flow of the game, such as starting a new game or ending the current game. <br /><br /><br />


| Original Name    | Suggested Name        | Type     | Suggested Placement  |
|------------------|-----------------------|----------|----------------------|
| PlayerFactory    | createPlayerFactory   | Function | Player Factory       |
| getName          | getPlayerName         | Function | Player Factory       |
| getSymbol        | getPlayerSymbol       | Function | Player Factory       |
| setScore         | setPlayerScore        | Function | Player Factory       |
| getScore         | getPlayerScore        | Function | Player Factory       |
| gameFlow         | gameFlow              | Variable | Game Flow            |
| cells            | cells                 | Variable | Game Flow            |
| turns            | turns                 | Variable | Game Flow            |
| p1Symbol         | p1Symbol              | Variable | Game Flow            |
| p2Symbol         | p2Symbol              | Variable | Game Flow            |
| p1               | p1                    | Variable | Game Flow            |
| p2               | p2                    | Variable | Game Flow            |
| p1Fvalid         | p1FormValid           | Variable | Game Flow            |
| p2Fvalid         | p2FormValid           | Variable | Game Flow            |
| isXsTurn         | isXsTurn              | Variable | Game Flow            |
| p1Form           | player1Form           | Variable | Game Flow            |
| p2Form           | player2Form           | Variable | Game Flow            |
| p1Name           | player1Name           | Variable | Game Flow            |
| p2Name           | player2Name           | Variable | Game Flow            |
| xRadio           | xRadio                | Variable | Game Flow            |
| oRadio           | oRadio                | Variable | Game Flow            |
| init             | initializeGameFlow    | Function | Game Flow            |
| playAgainInit    | initializePlayAgain   | Function | Game Flow            |
| bindEvents       | bindEventListeners    | Function | Game Flow            |
| removeEvents     | removeEventListeners  | Function | Game Flow            |
| p1nameValidity   | validatePlayer1Name   | Function | Game Flow            |
| p2nameValidity   | validatePlayer2Name   | Function | Game Flow            |
| radioValidity    | validateRadioInput    | Function | Game Flow            |
| p1Validity       | validatePlayer1       | Function | Game Flow            |
| nextPlayer       | switchPlayer          | Function | Game Flow            |
| p2Validity       | validatePlayer2       | Function | Game Flow            |
| startGame        | startGame             | Function | Game Flow            |
| playTurn         | playTurn              | Function | Game Flow            |
| checkGame        | checkGame             | Function | Game Flow            |
| rowCheck         | checkRow              | Function | Game Flow            |
| columnCheck      | checkColumn           | Function | Game Flow            |
| diagonalCheck    | checkDiagonal         | Function | Game Flow            |
| winner           | declareWinner         | Function | Game Flow            |
| displayWinner    | displayWinner         | Function | Game Flow            |
| playAgain        | playAgain             | Function | Game Flow            |
| freshStart       | freshStart            | Function | Game Flow            |
| gameBoard        | gameBoard             | Variable | Game Board           |
| board            | board                 | Variable | Game Board           |
| row              | row                   | Variable | Game Board           |
| column           | column                | Variable | Game Board           |
| init             | initializeGameBoard   | Function | Game Board           |
| createBoard      | createBoard           | Function | Game Board           |
| renderBoard      | renderBoard           | Function | Game Board           |
| xSvgMaker        | createXSymbol         | Function | Game Board           |
| oSvgMaker        | createOSymbol         | Function | Game Board           |
| placeSymbol      | placeSymbol           | Function | Game Board           |
| getBoard         | getBoard              | Function | Game Board           |
| newGame          | newGame               | Function | Game Board           |


