const game = (function () {
    let _moves = 0
    let _currentPlayer = 'X'
    let grid = []
    let _matchOver = false
    const gameboard = document.querySelector('.game-board')
    const gamestatus = document.querySelector('.game-status')

    function _makeGrid() {
        for (let i = 0; i < 9; i++) {
            grid[i] = i
            const div = document.createElement('div')
            div.classList.add('box')
            div.setAttribute('data-index', i)
            gameboard.appendChild(div)
        }
    }

    function _updateStatus() {
        gamestatus.textContent = `Player ${_currentPlayer} turn to make a move`   
    }

    function _checkMove() {
        gameboard.addEventListener('click', _onMove)
    }

    function _onMove (e) {
        if (e.target.classList.contains('box') && e.target.textContent == '') {
            _moves += 1
            let index = e.target.getAttribute('data-index')
            grid[index] = _currentPlayer
            e.target.textContent = _currentPlayer
            if (_moves > 4) {
                _checkWin()
            }
            if (!_matchOver) {
                _updateCurrentPlayer()
                _updateStatus()             
            }  
        }
    }

    function _updateCurrentPlayer() {
        if (_currentPlayer == 'X') {
            _currentPlayer = 'O'
        }
        else {
            _currentPlayer = 'X'
        }
    }

    function _checkWin() {
        let matchWon = false
        if ((grid[0] === grid[1]) && (grid[1] === grid[2]) && (grid[0] === grid[2])) {
            matchWon = true
        }     
        if ((grid[3] === grid[4]) && (grid[4] === grid[5]) && (grid[3] === grid[5])) {
            matchWon = true
        }
        if ((grid[6] === grid[7]) && (grid[7] === grid[8]) && (grid[6] === grid[8])) {
            matchWon = true
        }
        if ((grid[0] === grid[3]) && (grid[3] === grid[6]) && (grid[0] === grid[6])) {
            matchWon = true
        }
        if ((grid[1] === grid[4]) && (grid[4] === grid[7]) && (grid[1] === grid[7])) {
            matchWon = true
        }
        if ((grid[2] === grid[5]) && (grid[5] === grid[8]) && (grid[2] === grid[8])) {
            matchWon = true
        }
        if ((grid[0] === grid[4]) && (grid[4] === grid[8]) && (grid[0] === grid[8])) {
            matchWon = true
        }
        if ((grid[2] === grid[4]) && (grid[4] === grid[6]) && (grid[2] === grid[6])) {
            matchWon = true
        }
        if (matchWon || _moves==9) {
            _matchOver = true
            _updateMatch(matchWon)
        } 
    }

    function _updateMatch (status) {
        gameboard.removeEventListener('click', _onMove)
        if (status) {
            gamestatus.textContent = `Player ${_currentPlayer} won the match`
        }
        else {
            gamestatus.textContent = 'The match is tie'
        }
        const restartBtn = document.querySelector('.restart-btn') 
        const btn = document.createElement('button')
        btn.textContent = 'Restart'
        restartBtn.appendChild(btn)
        btn.addEventListener('click', () => {
            location.reload()
        })
    }

    function startGame() {
        _makeGrid()
        _updateStatus()
        _checkMove()
    }

    return { startGame }
})()

game.startGame()