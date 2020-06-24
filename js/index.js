/**
 * Tic Tac Toe
 *
 * A Tic Tac Toe game in HTML/JavaScript/CSS.
 *
 * No dependencies - Uses Vanilla JS
 *
 * @author: Vasanth Krishnamoorthy
 */
var N_SIZE = 5,
    EMPTY = '&nbsp;',
    boxes = [],
    turn = 'X',
    score = {
        'X': 0,
        'O': 0
    },
    moves;

/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
    var board = document.createElement('ul');
    board.id = 'game';
    board.classList = 'row'
    var identifier = 1;

    for (var i = 0; i < N_SIZE; i++) {
        var row = document.createElement('div');
        row.classList.add('row');
        board.appendChild(row);
        for (var j = 0; j < N_SIZE; j++) {
            var cell = document.createElement('li');
            cell.classList.add('col' + j, 'row' + i);
            cell.classList.add('btn', 'span1');
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == N_SIZE - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.identifier = identifier;
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
            identifier += identifier;
        }
    }

    var panel = document.getElementById('board_placeholder');
    panel.insertBefore(board, panel.childNodes[2]);
    startNewGame();
}

/**
 * New game
 */
function startNewGame() {
    $('#x_win').text(score['X']);
    $('#o_win').text(score['O']);
    moves = 0;
    turn = 'X';
    boxes.forEach(function(square) {
        square.innerHTML = '+';
        square.classList.remove('disable');
        square.classList.remove('o');
        square.classList.remove('x');
        square.classList.remove('btn-primary');
        square.classList.remove('btn-info');
    });
}

/**
 * Check if a win or not
 */
function win(clicked) {
    // Get all cell classes
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var memberClass = memberOf[i]
        if (memberClass.startsWith('col') ||
            memberClass.startsWith('row') ||
            memberClass.startsWith('diagonal')) {

            var testClass = '.' + memberClass;
            var items = contains('#board_placeholder ' + testClass, turn);
            // winning condition: turn == N_SIZE
            if (items.length == N_SIZE) {
                return true;
            }
        } else continue;
    }
    return false;
}

/**
 * Helper function to check if NodeList from selector has a particular text
 */
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element) {
        return RegExp(text).test(element.textContent);
    });
}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
    if ($(this).hasClass('disable')) {
        // alert('Already selected');
        return;
    }
    $(this).addClass('disable o btn-primary')
    this.innerHTML = turn;
    moves += 1;
    // score[turn] += this.identifier;
    if (win(this)) {
        alert('Winner: Player ' + turn);
        if (turn === 'O') {
            score['O']++;
        } else
            score['X']++;
        startNewGame();
    } else if (moves === N_SIZE * N_SIZE) {
        alert('Draw');
        startNewGame();
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}


$("#reset").click(function() {
    $("#game li").text("+");
    $("#game li").removeClass('disable')
    $("#game li").removeClass('o')
    $("#game li").removeClass('x')
    $("#game li").removeClass('btn-primary')
    $("#game li").removeClass('btn-info')
    count = 0

});

init();