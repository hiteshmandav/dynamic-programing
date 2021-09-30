

var problemSelector = document.getElementById("problems");
var problem;


function fibMemo(n) {
    let map = new Map()
    for (let i = 1; i <= n ; i++){
        if(i <= 2 ){
            map.set(i ,1)
        }else {
            val = map.get(i-1) + map.get(i-2)
            map.set(i, val)
        }
    }
    return map.get(n)
}

function fibTabulation(n){
    num1 = 0
    num2 = 1
    returnVal = 1
    for(let i=0; i<n-1; i++){
        returnVal = num1 + num2;
        num1 = num2;
        num2 = returnVal
    }
    return returnVal
}

function gridTravelerMemo(m, n , memo = {}) {
    // console.log(memo)
    if([m,n] in memo) {
        return memo[[m,n]]
    }
    if(m == 0 || n == 0){
        return 0
    }
    if (m ==1 && n == 1){
        return 1
    }
    memo[[m,n]] = gridTravelerMemo(m-1, n, memo) + gridTravelerMemo(n-1,m,memo)
    return memo[[m,n]]
}

function gridTravelerTabulation(rows, cols) {
    // console.log(memo)
    let totalWays = new Array(rows+1).fill().map(x => new Array(cols+1).fill(0))
    totalWays[1][1] = 1
    // console.log(totalWays)
    for (let row = 0; row <= rows; row++){
        for (let col = 0; col <= cols; col++){
            // console.log(totalWays)
            if(col+1 <= cols) totalWays[row][col+1] += totalWays[row][col]
            if(row+1 <= rows) totalWays[row+1][col] += totalWays[row][col]
        }
    }
    return totalWays[rows][cols]
}



function selectTheProblem() {
    problem = problemSelector.value;
    hideAll();
    if(problem == "fib" ) {
        document.getElementById('fiboInput').style.display = "block";
        document.getElementById('fiboInputLabel').style.display = "block";
        document.getElementById('fiboInput').value = 6;
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "Fibonacci Series is a series of numbers in which each number (Fibonacci number) is the sum of the two preceding numbers. Enter a number in the below feild to find the nth number in the sequence"
    } else if(problem == "grid" ) {
        document.getElementById('gridColInput').style.display = "block";
        document.getElementById('gridRowInput').style.display = "block";
        document.getElementById('gridColInputLabel').style.display = "block";
        document.getElementById('gridRowInputLabel').style.display = "block";
        document.getElementById('gridColInput').value = 2;
        document.getElementById('gridRowInput').value = 3;
        document.getElementById('executeButton').style.display = "block";
        // document.getElementById('problemStatement').innerHTML = "Fibonacci Series is a series of numbers in which each number (Fibonacci number) is the sum of the two preceding numbers. Enter a number in the below feild to find the nth number in the sequence"
        document.getElementById('problemStatement').innerHTML = "grid"
    } else if(problem =="canSum" ) {
        document.getElementById('problemStatement').innerHTML = "canSum"
    } else if(problem =="howSum" ) {
        document.getElementById('problemStatement').innerHTML = "howSum"
    } else if(problem =="bestSum" ) {
        document.getElementById('problemStatement').innerHTML = "bestSum"
    } else if(problem =="canConstruct" ) {
        document.getElementById('problemStatement').innerHTML = "canConstruct"
    } else if(problem =="countConstruct" ) {
        document.getElementById('problemStatement').innerHTML = "countConstruct"
    } else if(problem =="allConstruct" ) {
        document.getElementById('problemStatement').innerHTML = "allConstruct"
    } else  {
        document.getElementById('problemStatement').innerHTML = "Please Select a Problem"
    }

}

function execute() {
    var t0,t1,t2,t3,tabValue,memoValue = 0;

    if(problem == "fib" ) {
        var input = parseInt(document.getElementById('fiboInput').value);
        // console.log(`value entered:: ${input}`)
        t0 = performance.now();
        tabValue = fibTabulation(input);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = fibMemo(input);
        t3 = performance.now();
    } else if(problem =="grid" ) {
        var row = parseInt(document.getElementById('gridRowInput').value);
        var col = parseInt(document.getElementById('gridColInput').value);
        t0 = performance.now();
        tabValue = gridTravelerTabulation(row, col);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = gridTravelerMemo(row, col);
        t3 = performance.now();
    } else if(problem =="canSum" ) {
        document.getElementById('problemStatement').innerHTML = "canSum"
    } else if(problem =="howSum" ) {
        document.getElementById('problemStatement').innerHTML = "howSum"
    } else if(problem =="bestSum" ) {
        document.getElementById('problemStatement').innerHTML = "bestSum"
    } else if(problem =="canConstruct" ) {
        document.getElementById('problemStatement').innerHTML = "canConstruct"
    } else if(problem =="countConstruct" ) {
        document.getElementById('problemStatement').innerHTML = "countConstruct"
    } else if(problem =="allConstruct" ) {
        document.getElementById('problemStatement').innerHTML = "allConstruct"
    } else  {
        document.getElementById('problemStatement').innerHTML = "Please Select a Problem"
    }
    

    document.getElementById('tabulationTime').style.display = "block";
    document.getElementById('tabulation').style.display = "block";
    document.getElementById('memoisation').style.display = "block";
    document.getElementById('memoisationTime').style.display = "block";
    document.getElementById('tabulationTime').innerHTML = `Time Taken :: ${t1 - t0} milliseconds`;
    document.getElementById('tabulation').innerHTML = `Solution is ${tabValue}`;
    document.getElementById('memoisation').innerHTML = `Solution is ${memoValue}`;
    document.getElementById('memoisationTime').innerHTML = `Time Taken :: ${t3 - t2} milliseconds`;
}

function hideAll() {
    document.getElementById('fiboInput').style.display = "none";
    document.getElementById('fiboInputLabel').style.display = "none";
    document.getElementById('executeButton').style.display = "none";
    document.getElementById('tabulationTime').style.display = "none";
    document.getElementById('tabulation').style.display = "none";
    document.getElementById('memoisation').style.display = "none";
    document.getElementById('memoisationTime').style.display = "none";
    document.getElementById('gridColInput').style.display = "none";
    document.getElementById('gridRowInput').style.display = "none";
    document.getElementById('gridColInputLabel').style.display = "none";
    document.getElementById('gridRowInputLabel').style.display = "none";

}


hideAll();
problemSelector.addEventListener("change", function() {
    selectTheProblem();
});