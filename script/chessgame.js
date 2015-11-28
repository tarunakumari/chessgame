"use strict";
var id, highlight, possiblepaths, div, whiteTurn, board = [], gameover,
    convertColor = ["w", "b"], //used to give white and black number values (handy for finding the right coordinates on pieces.png)
    convertType = [null, "P", "N", "B", "R", "Q", "K"], // same as above but for piece names (Pawn, kNight, Bishop, etc.)
    convertX = [0, "a", "b", "c", "d", "e", "f", "g", "h"];

function bishopPath(curx, cury , color, hasMoved) {
    var possibleMoves = [], newx, newy, j, i;
    var moves = [{x: 1, y: 1},
                 {x: 1, y: -1},
                 {x: -1, y: 1},
                 {x: -1, y: -1}
                ];

    for (i = 0; i < moves.length; i += 1) {
        for(j = 1; j <= 7; j++) {
            newx = curx + j * (moves[i].x);
            newy = cury + j * (moves[i].y);
            if (board[newy] === undefined)                                 // boundary check condition literally
                break;
            else if (board[newy][newx] === undefined)                         // boundary check condition literally
                break;
            else if (board[newy][newx].piece === 0)                           // location empty.. valid path
                possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
            else if (board[newy][newx].piece.color !== color) {               //location not empty but opposition.. hmm this is sparta
                    possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
                    break;
            }else                                                               //location not empty but ally
                break;
        }
     }
    return possibleMoves;

}

function rookPath(curx, cury , color, hasMoved) {
    var possibleMoves = [], newx, newy, j, i;

    var moves = [{x: 0, y: 1},
                 {x: 0, y: -1},
                 {x: 1, y: 0},
                {x: -1, y: 0}
                ];

    for (i = 0; i < moves.length; i += 1) {
        for(j = 1; j <= 7; j++) {
            newx = curx + j * (moves[i].x);
            newy = cury + j * (moves[i].y);
            console.log(newx);

            if (board[newy] === undefined)                                 // boundary check condition literally
                break;
            else if (board[newy][newx] === undefined)                         // boundary check condition literally
                break;
            else if (board[newy][newx].piece === 0)                           // location empty.. valid path
                possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
            else if (board[newy][newx].piece.color !== color) {               //location not empty but opposition.. hmm this is sparta
                    possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
                    break;
            }else                                                               //location not empty but ally
                break;
        }
     }
    return possibleMoves;

}


function queenPath(curx, cury , color, hasMoved) {
    var possibleMoves = [], newx, newy, j, i;
    var moves = [{x: 0, y: 1},
				 {x: 0, y: -1},
				 {x: 1, y: 0},
				 {x: -1, y: 0},
				 {x: 1, y: 1},
				 {x: 1, y: -1},
				 {x: -1, y: 1},
				 {x: -1, y: -1}
                ];

    for (i = 0; i < moves.length; i += 1) {
        for(j = 1; j <= 7; j++) {
            newx = curx + j * (moves[i].x);
            newy = cury + j * (moves[i].y);
            console.log(newx);

            if (board[newy] === undefined)                                 // boundary check condition literally
                break;
            else if (board[newy][newx] === undefined)                         // boundary check condition literally
                break;
            else if (board[newy][newx].piece === 0)                           // location empty.. valid path
                possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
            else if (board[newy][newx].piece.color !== color) {               //location not empty but opposition.. hmm this is sparta
                    possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
                    break;
            }else                                                               //location not empty but ally
                break;
        }
     }
    return possibleMoves;

}


function knightpath(curx, cury , color, hasMoved) {
     var possibleMoves = [], newx, newy, i;
    var moves = [{x: 2, y: 1},
                 {x: 2, y: -1},
                 {x: -2, y: 1},
                 {x: -2, y: -1},
                 {x: 1,  y: 2},
                 {x: 1, y: -2},
                 {x: -1, y: 2},
                 {x: -1, y: -2}];
    for (i = 0; i < moves.length; i += 1) {
        newx = curx + (moves[i].x);
        newy = cury + (moves[i].y);
        if (board[newy] === undefined) {

        } else if (board[newy][newx] === undefined) {

        } else if (board[newy][newx].piece === 0) {
            possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
        } else if (board[newy][newx].piece.color !== color) {
            possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
        }
    }

     return possibleMoves;
}

function pawnpath(curx, cury , color, hasMoved) {
    var possibleMoves = [],  a , i;
    a = (2 * convertColor.indexOf(color)) - 1;
    if (board[cury] === undefined) {

    } else if (board[cury][curx + a] === undefined) {

    } else if (board[cury][curx + a].piece === 0) {
        possibleMoves[possibleMoves.length] = {x: convertX[curx + a], y: cury};
    }
    if (!hasMoved && board[cury][curx + 2 * a].piece === 0) {
        possibleMoves[possibleMoves.length] = {x: convertX[curx + 2 * a], y: cury};
    }
    if (board[cury + 1] === undefined) {

    } else if (board[cury + 1][curx + a] === undefined) {

    } else if (board[cury + 1][curx + a].piece === 0) {

    } else if (board[cury + 1][curx + a].piece.color !== color) {
        possibleMoves[possibleMoves.length] = {x: convertX[curx + a], y: (cury + 1)};
    }
    if (board[cury - 1] === undefined) {

    } else if (board[cury - 1][curx + a] === undefined) {

    } else if (board[cury - 1][curx + a].piece === 0) {

    } else if (board[cury - 1][curx + a].piece.color !== color) {
        possibleMoves[possibleMoves.length] = {x: convertX[curx + a], y: (cury - 1)};
    }
     return possibleMoves;

}

function kingpath (curx, cury , color, hasMoved) {

    var possibleMoves = [], newx, newy, i;
    var moves = [{x: 0, y: 1},
				  {x: 0, y: -1},
				  {x: 1, y: 0},
				  {x: -1, y: 0},
				  {x: 1, y: 1},
				  {x: 1, y: -1},
				  {x: -1, y: 1},
				  {x: -1, y: -1}];

    for (i = 0; i < moves.length; i += 1) {
        newx = curx + (moves[i].x);
        newy = cury + (moves[i].y);

        if (board[newy][newx] === undefined) {

        } else if (board[newy][newx].piece === 0) {
            possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
        } else if (board[newy][newx].piece.color !== color) {
            possibleMoves[possibleMoves.length] = {x: convertX[newx], y: newy};
        }
    }
     return possibleMoves;
}




//uhhhh....
function findPath(x, y) {
    var possibleMoves = [], type, color, hasMoved;

    if (board[y] === undefined) {

        console.log("Doesn't exist");

    } else if (board[y][x] === undefined) {

        console.log("Doesn't exist");

    } else if (board[y][x].piece === 0) {

        //console.log("No Piece here");

    } else {
        type = board[y][x].piece.type;
        color = board[y][x].piece.color;
        hasMoved = board[y][x].piece.moved;

		if (color === (whiteTurn ? "w" : "b")) {
            if (type === "B") {

                possibleMoves = bishopPath(x, y , color, hasMoved);

            }
            else if (type === "R") {

                possibleMoves = rookPath(x, y , color, hasMoved);

            } else if (type === "Q") {

                possibleMoves = queenPath(x, y , color, hasMoved);

            } else if (type === "N") {

                 possibleMoves = knightpath(x, y , color, hasMoved);

            } else if (type === "P") {

                possibleMoves = pawnpath(x, y , color, hasMoved);

			} else if (type === "K") {

                 possibleMoves = kingpath(x, y , color, hasMoved);

			}
			console.log("Legal moves for " + color + type + " at " + board[y][x].id + ":\n" + possibleMoves);
			return possibleMoves;
		} else {
            console.log("The turn belongs to " + (whiteTurn ? "white" : "black"));
		}
	}
}

/*
stores input data to corresponding board coordinates (board[y][x].piece = {color: color, type: type}),
and finds the right location for it
*/
function putPieceAtLocation(x, y, type, color, first) {
    var t = convertType.indexOf(type),
        c = convertColor.indexOf(color),
        path = findPath(x, y), bg;

    if(color == 'w') {
       if(type == 'R')
            bg = "-50px -100px"
        else if (type == 'N')
            bg = "-50px -50px"
        else if (type == 'B')
            bg = "-0px -100px"
        else if (type == 'Q')
            bg = "-0px -150px"
        else if (type == 'K')
            bg = "-50px -150px"
        else if (type == 'P')
            bg = "-0px -50px"

    }else{

       if(type == 'R')
            bg = "-150px -100px"
        else if (type == 'N')
            bg = "-150px -50px"
        else if (type == 'B')
            bg = "-100px -100px"
        else if (type == 'Q')
            bg = "-100px -150px"
        else if (type == 'K')
            bg = "-150px -150px"
        else if (type == 'P')
            bg = "-100px -50px"
    }

    board[y][x].piece = {};
    board[y][x].piece.color = color;
    board[y][x].piece.type = type;
    if (first) {
        board[y][x].piece.moved = false;
    } else {
        board[y][x].piece.moved = true;
    }
    document.getElementById(board[y][x].id).style.backgroundPosition = bg;
    return;
}

function clear(x, y) {
    board[y][x].piece = 0;
    document.getElementById(board[y][x].id).style.backgroundPositionX = "-200";
	document.getElementById(board[y][x].id).style.backgroundPositionY = "0";
}

function clearVisualPath() {
    var a, b;
	for (a = 0; a < 8; a += 1) {
		for (b = 0; b < 8; b += 1) {
            id = board[a + 1][b + 1].id;
            document.getElementById(id).style.backgroundColor = "";
        }
    }
}

function clicked(almostX, y) {
    var isPathSquare = false, x = convertX.indexOf(almostX), type, color, i, marked, replacedtype, checkpath;
    //console.log(x)

    //console.log(gameover);
    if(gameover == true)
        return;

        //check if the clicked square is a potential move
    if (possiblepaths) {
        for (i = 0; i < possiblepaths.length && !isPathSquare; i += 1) {
            isPathSquare = possiblepaths[i].x + possiblepaths[i].y === (almostX + y);
		}
		if (isPathSquare) {
            type = board[highlight.y][highlight.x].piece.type;
			color = board[highlight.y][highlight.x].piece.color;
			clear(highlight.x, highlight.y);
            replacedtype = board[y][x].piece.type;

            //If this move puts a pawn at one of edges, offer a promotion
            if (type === "P" && (x === 8 || x === 1)) {
                //*_ offer selection of pieces
                type = "Q";
            }
            putPieceAtLocation(x, y, type, color);
			whiteTurn = !whiteTurn;

            if(replacedtype == "K")
                gameover = true;
        }

        clearVisualPath();
        possiblepaths = "";
    } else {
		highlight = {"x": x, "y": y};
        possiblepaths = findPath(x, y);
		if (possiblepaths) {

            for (i = 0; i < possiblepaths.length; i += 1) {
                document.getElementById(possiblepaths[i].x + possiblepaths[i].y).style.backgroundColor = "white";
            }

        }
    }
	return;
}

/*
    creates 8 arrays each containing 8 arrays that will be used to store and access piece location and color on the chess board
    also styles each div element of the chess board on the html page with the pieces.png sprite centred on a blank area
*/

function initializeBoard() {
    var x, y;
    for (y = 1; y < 9; y += 1) {
        board[y] = [];
        for (x = 1; x < 9; x += 1) {
            board[y][x] = {"id": convertX[x] + y, "piece": 0, "emptyBoardPathFor": []};
            div = document.createElement("DIV");
            div.setAttribute("class", "square");
            document.getElementById(board[y][x].id).style.backgroundImage = "url('image.png')";
            document.getElementById(board[y][x].id).style.backgroundPosition = "0 -200";
        }
    }
}


//could be a new program
function ArrangeBoard() {

    initializeBoard();
    var a, b, i;
	for (a = 1; a < 9; a += 1) {
		for (b = 1; b < 9; b += 1) {
            clear(a, b);
		}
	}

	whiteTurn = true;
    gameover = false;

    putPieceAtLocation(1, 1, "R", "b", 1);
    putPieceAtLocation(1, 8, "R", "b", 1);

    putPieceAtLocation(1, 2, "N", "b", 1);
    putPieceAtLocation(1, 7, "N", "b", 1);
    putPieceAtLocation(1, 3, "B", "b", 1);
    putPieceAtLocation(1, 6, "B", "b", 1);


    putPieceAtLocation(1, 4, "Q", "b", 1);
    putPieceAtLocation(1, 5, "K", "b", 1);
    putPieceAtLocation(8, 1, "R", "w", 1);
    putPieceAtLocation(8, 8, "R", "w", 1);
    putPieceAtLocation(8, 2, "N", "w", 1);
    putPieceAtLocation(8, 7, "N", "w", 1);
    putPieceAtLocation(8, 3, "B", "w", 1);
    putPieceAtLocation(8, 6, "B", "w", 1);
    putPieceAtLocation(8, 4, "Q", "w", 1);
    putPieceAtLocation(8, 5, "K", "w", 1);
    console.log("done")
    for (i = 1; i < 9; i += 1) {
        putPieceAtLocation(2, i, "P", "b", 1);
        putPieceAtLocation(7, i, "P", "w", 1);
    }
}

ArrangeBoard();
