function MazeCntl($scope, $http, $resource) {

    $scope.newGame = function() {
        $scope.board = init($scope.height, $scope.width);
    };

    $scope.findSolution = function() {
        solveMaze();
        $scope.board = init($scope.height, $scope.width);
    }

    function init(height, width) {
        var board = [];
        wasHere = [];

        for (var h = 0; h < height; h++) {
            var row = [],
                row2 = [];

            for (var w = 0; w < width; w++) {
                row.push(true);
                row2.push(false);
            }
            board.push(row), wasHere.push(row2);
        }
        correctPath = angular.copy(wasHere);
        height = board.length, width = board[0].length;
        return board;
    }
    var maze = [],
        wasHere = [],
        correctPath = [];
    var startX, startY, endX, endY;

    var height,
        width;

    function solveMaze() {
        maze = $scope.board;
        for (var i = 0; i < maze[0].length; i++) {
            if (maze[0][i] === true) {
                startX = 0, startY = i;
            }
        }
        for (var i = 0; i < maze[maze.length - 1].length; i++) {
            if (maze[maze.length - 1][i] === true) {
                endX = maze.length - 1, endY = i;
            }
        }
        var isSolved = recursiveSolve(startX, startY);
        correctPath[endX][endY] = -1;
        console.info(isSolved);
        console.log(correctPath);
        $scope.board = correctPath;
        $scope.$digest();
    }

    function recursiveSolve(x, y) {
        if (x == endX && y == endY) return true; // If you reached the end
        if (maze[x][y] == false || wasHere[x][y]) return false;
        // If you are on a wall or already were here
        wasHere[x][y] = true;
        if (x != 0) // Checks if not on left edge
            if (recursiveSolve(x - 1, y)) { // Recalls method one to the left
                correctPath[x][y] = -1; // Sets that path value to true;
                return true;
            }
        if (x != width - 1) // Checks if not on right edge
            if (recursiveSolve(x + 1, y)) { // Recalls method one to the right
                correctPath[x][y] = -1;
                return true;
            }
        if (y != 0) // Checks if not on top edge
            if (recursiveSolve(x, y - 1)) { // Recalls method one up
                correctPath[x][y] = -1;
                return true;
            }
        if (y != height - 1) // Checks if not on bottom edge
            if (recursiveSolve(x, y + 1)) { // Recalls method one down
                correctPath[x][y] = -1;
                return true;
            }
        if ((y != height - 1) && (x != width - 1)) {
            if (recursiveSolve(x + 1, y + 1)) { // Recalls method one down
                correctPath[x][y] = -1;
                return true;
            }
        }
        if ((y != 0) && (x != width - 1)) {
            if (recursiveSolve(x + 1, y - 1)) { // Recalls method one down
                correctPath[x][y] = -1;
                return true;
            }
        }

        if ((y != 0) && (x != 0)) {
            if (recursiveSolve(x - 1, y - 1)) { // Recalls method one down
                correctPath[x][y] = -1;
                return true;
            }
        }

        if ((y != height - 1) && (x != 0)) {
            if (recursiveSolve(x - 1, y + 1)) { // Recalls method one down
                correctPath[x][y] = -1;
                return true;
            }
        }
        return false;
    }

    $scope.toggle = function(row, cell) {
        //$scope.history = []; // Reset history as it is no longer accurate       
        $scope.board[row][cell] = !$scope.board[row][cell];
    };

    $scope.height = 5;
    $scope.width = 5;
    $scope.newGame();

}