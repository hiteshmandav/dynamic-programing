

var problemSelector = document.getElementById("problems");
var problem;
var list = [];


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

function canSumMemo(n,arr, memo ={}){
    if(n in memo) return memo[n]
    min = Math.min(...arr)
    if (n == 0){
        return true
    }
    // console.log(min)
    for(let i=0; i< arr.length; i++){
        if (n>=min){
            val = canSumMemo(n-arr[i], arr, memo)
            memo[n-arr[i]] = val
            if (val){
                return true
            }
        }
    }
    memo[n] = false
    return false
}

function canSumTabulation(target, numArray){
    let canSumArray = new Array(target+1).fill(false);
    canSumArray[0] = true;
    for(let targetIndex = 0 ; targetIndex <= canSumArray.length ; targetIndex++){
        for(x of numArray){
            if(canSumArray[targetIndex]) {
                sumPosible = targetIndex + x;
                if (sumPosible <= target)
                canSumArray[targetIndex + x] = true;
            }
        }
    }

    // console.log(canSumArray)
    return canSumArray[target]
}

function howSumTabulation(target, numArray) {
    let sumArray = new Array(target+1).fill(null)
    sumArray[0] = []

    for( let targetIndex = 0 ; targetIndex <= target ; targetIndex++ ){
         for (x of numArray ) {
            
            if (sumArray[targetIndex] !== null ) {
                sumIndex =  targetIndex + x;
                if ( sumIndex <= target ) {
                        sumArray[sumIndex] = [...sumArray[targetIndex] , x ]
                }
            }
        }
    }
    return sumArray[target]
}

function howSumMemo(n,arr, memo ={}){
    // console.log(memo, n, arr)
    if(n in memo) return memo[n]
    min = Math.min(...arr)
    if (n == 0){
        return []
        // return true
    }
    // console.log(min)
    for(let i=0; i< arr.length; i++){
        if (n>=min){
            val = howSumMemo(n-arr[i], arr, memo)
            if (val !== null){
                // console.log('val ', val, memo[n-arr[i]] , arr[i])
                memo[n-arr[i]] = [...val,arr[i]]
                return memo[n-arr[i]]
            }
        }
    }
    memo[n] = null
    return null

}

function bestSumTabulation(targetSum , numbers) {
    const bestSumArray = new Array(targetSum+1).fill(null);
    bestSumArray[0] = [];
    for (let targetIndex = 0 ;  targetIndex <= targetSum ; targetIndex++ ) {
        if (bestSumArray[targetIndex] !== null ) {
            for (let num of numbers ) {
                let position = targetIndex + num;
                if (position <= targetSum ){
                    let sumArray = [...bestSumArray[targetIndex], num];
                // console.log(`targetIndex :: ${targetIndex} :: num :: ${num} position :: ${bestSumArray[position]}`)
                    if ( bestSumArray[position] === null || bestSumArray[position].length >= sumArray.length) {
                        bestSumArray[position] = sumArray;
                    }
                
                }
                
            }
        }
    }
    return bestSumArray[targetSum]
}

function bestSumMemo(n,arr, memo ={}){
    if (n in memo) return memo[n]
    if(n === 0 ) return [];
    if(n < 0) return null;
    let shortestVal = null;
    for (let number of arr){
        val = bestSumMemo(n-number, arr, memo)
        memo[n-number] = val
        if ( val !== null){
            let current = [...val, number]
            if (shortestVal === null || current.length < shortestVal.length){
                shortestVal = current
            }
        }
    }
    return shortestVal
}
function canConstructMemo(str, subStrArr, memo= {}){
    if(str in memo) return memo[str];
    if(str === '') return true;
    for(let subStr of subStrArr){
        if(str.startsWith(subStr)) {
            remainderStr = str.substr(subStr.length)
            if(canConstructMemo(remainderStr,subStrArr, memo)){
                memo[remainderStr] = true
                return true
            }
        }
    }
    memo[str] = false
    return false
}
function canConstructTabulation(target, wordBank) {
    let constructArray = new Array(target.length+1).fill(false)
    constructArray[0] = true;
    for (let split = 0 ; split<=target.length ; split++) {
        balanceTarget = target.substr(split)
        // console.log(balanceTarget)
        for ( let word of wordBank ) {
            if (balanceTarget.startsWith(word) && constructArray[split]) {
                let position = split + word.length;
                constructArray[position] = true
                // console.log(`word :: ${word} :: arr :: ${constructArray}`)
            }
        }
    }
    // console.log(constructArray)
    return constructArray[target.length]
}
function allConstructTabulation(target, wordBank) {

    let constructArray = new Array(target.length+1).fill().map(() => [])
    constructArray[0] = [[]]
    for (let split = 0 ; split <= target.length ; split++) {
        balancedTarget = target.substr(split);
        // console.log(balancedTarget)
        for ( let word of wordBank ) {
            // if(constructArray[split].length !== 0){
                // console.log(word)
                if (balancedTarget.startsWith(word)){
                    // console.log(word)
                    // let subArrayList = new Array()
                    // for(let subArray of constructArray[split]){
                    //     subArrayList.push([...subArray, word])
                    // }
                    const subArrrayList = constructArray[split].map(x => [...x, word])
                    constructArray[split+word.length].push(...subArrrayList)
                    // console.log(constructArray)
                // }
                // console.log(split)
            }
        }
    }
    // console.log(constructArray)
     return constructArray[target.length]
}

function countConstructTabulation(target, wordBank) {
    let constructCountArray = new Array(target.length + 1).fill(0)
    constructCountArray[0] = 1;
    for ( let split = 0 ; split <= target.length ; split++ ) {
        balanceTarget = target.substr(split)
        // console.log(balanceTarget)
        for (let word of wordBank ) {
            // console.log(`word 1:: ${word} :: split :: ${split} :: ${constructCountArray[split]}`)
            if (constructCountArray[split]!=0) {
                if(balanceTarget.startsWith(word)){
                    let position = split+word.length
                    constructCountArray[position]+=constructCountArray[split];
                    // console.log(`word 2:: ${word} position :: ${position} :: arr :: ${constructCountArray}`)
                }
            }
        }
    }
    return constructCountArray[target.length]
}

function allConstructMemo(target, wordBank, memo ={}){
    // console.log(target)
    if (target in memo) {return memo[target]}
    let resultant = []
    if(target == '') return [[]];
    for(let word of wordBank){
        // console.log(word)

        if(target.startsWith(word)){
            const suffix = target.slice(word.length)
            let val = allConstructMemo(suffix, wordBank, memo)
            // console.log(val)
            
            let returnVal = val.map(x => [word, ...x])
            resultant.push(...returnVal)
        }
    }
    // console.log(memo)
    memo[target] = resultant
    return resultant
}

function countConstructMemo(target, wordBank, memo = {}){
    if(target in memo){return memo[target]}
    let count = 0
    if(target === '') return 1;
    for(let word of wordBank){
        if(target.indexOf(word) === 0) {
            const sufix = target.slice(word.length)
            let val = countConstructMemo(sufix, wordBank, memo)
            count += val
        }
    }
    memo[target] = count
    return count
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
        document.getElementById('sumInput').style.display = "block";
        document.getElementById('sumInputList').style.display = "block";
        document.getElementById('sumInputLabel').style.display = "block";
        document.getElementById('sumInputListLabel').style.display = "block";
        
        document.getElementById('list').style.display = "block";
        
        document.getElementById('sumInput').value = 8;
        document.getElementById('sumInputList').value = 4;
        list.push(2);
        list.push(3);
        list.push(5);
        document.getElementById('list').innerHTML = `List contains Values : 2, 3, 5`;

        document.getElementById('addButton').style.display = "block";
        document.getElementById('deleteAllButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "canSum"
    } else if(problem =="howSum" ) {
        document.getElementById('sumInput').style.display = "block";
        document.getElementById('sumInputList').style.display = "block";
        document.getElementById('sumInputLabel').style.display = "block";
        document.getElementById('sumInputListLabel').style.display = "block";
        
        document.getElementById('list').style.display = "block";
        
        document.getElementById('sumInput').value = 8;
        document.getElementById('sumInputList').value = 4;
        list.push(2);
        list.push(3);
        list.push(5);
        document.getElementById('list').innerHTML = `List contains Values : 2, 3, 5`;
        console.log(list)

        document.getElementById('addButton').style.display = "block";
        document.getElementById('deleteAllButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "howSum"
    } else if(problem =="bestSum" ) {
        document.getElementById('sumInput').style.display = "block";
        document.getElementById('sumInputList').style.display = "block";
        document.getElementById('sumInputLabel').style.display = "block";
        document.getElementById('sumInputListLabel').style.display = "block";
        
        document.getElementById('list').style.display = "block";
        
        document.getElementById('sumInput').value = 8;
        document.getElementById('sumInputList').value = 4;
        list.push(2);
        list.push(3);
        list.push(5);
        document.getElementById('list').innerHTML = `List contains Values : 2, 3, 5`;

        document.getElementById('addButton').style.display = "block";
        document.getElementById('deleteAllButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "bestSum"
    } else if(problem =="canConstruct" ) {
        
        document.getElementById('textInput').style.display = "block";
        document.getElementById('textInputList').style.display = "block";
        document.getElementById('textInputLabel').style.display = "block";
        document.getElementById('textInputListLabel').style.display = "block";
        
        document.getElementById('listString').style.display = "block";
        
        document.getElementById('textInput').value = 'purple';
        document.getElementById('textInputList').value = '';
        list.push('purp');
        list.push('p');
        list.push('ur');
        list.push('le');
        list.push('purpl');
        document.getElementById('listString').innerHTML = `List contains Values : purp, p, ur, le, purpl`;

        document.getElementById('addStringButton').style.display = "block";
        document.getElementById('deleteAllStringButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "canConstruct"
    } else if(problem =="countConstruct" ) {
        
        
        document.getElementById('textInput').style.display = "block";
        document.getElementById('textInputList').style.display = "block";
        document.getElementById('textInputLabel').style.display = "block";
        document.getElementById('textInputListLabel').style.display = "block";
        
        document.getElementById('listString').style.display = "block";
        
        document.getElementById('textInput').value = 'purple';
        document.getElementById('textInputList').value = '';
        list.push('purp');
        list.push('p');
        list.push('ur');
        list.push('le');
        list.push('purpl');
        document.getElementById('listString').innerHTML = `List contains Values : purp, p, ur, le, purpl`;

        document.getElementById('addStringButton').style.display = "block";
        document.getElementById('deleteAllStringButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "countConstruct"
    } else if(problem =="allConstruct" ) {
        
        
        document.getElementById('textInput').style.display = "block";
        document.getElementById('textInputList').style.display = "block";
        document.getElementById('textInputLabel').style.display = "block";
        document.getElementById('textInputListLabel').style.display = "block";
        
        document.getElementById('listString').style.display = "block";
        
        document.getElementById('textInput').value = 'purple';
        document.getElementById('textInputList').value = '';
        list.push('purp');
        list.push('p');
        list.push('ur');
        list.push('le');
        list.push('purpl');
        document.getElementById('listString').innerHTML = `List contains Values : purp, p, ur, le, purpl`;

        document.getElementById('addStringButton').style.display = "block";
        document.getElementById('deleteAllStringButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = "allConstruct"
    } else  {
        document.getElementById('problemStatement').innerHTML = "Please Select a Problem"
    }

}

function addValue() {
    var input = parseInt(document.getElementById('sumInputList').value);
    list.push(input);
    console.log(list)
    if (document.getElementById('list').innerHTML == `List is empty`){
        document.getElementById('list').innerHTML = `List contains Values : ${input}`;
    } else {
        document.getElementById('list').innerHTML = `${document.getElementById('list').innerHTML}, ${input}`;
    }
}

function addStringValue() {
    var input = document.getElementById('textInputList').value;
    list.push(input);
    console.log(list)
    if (document.getElementById('listString').innerHTML == `List is empty`){
        document.getElementById('listString').innerHTML = `List contains Values : ${input}`;
    } else {
        document.getElementById('listString').innerHTML = `${document.getElementById('listString').innerHTML}, ${input}`;
    }
}

function deleteAllValues() {
    list = []
    console.log(list)
    document.getElementById('list').innerHTML = `List is empty`;
}
function deleteAllStringValues() {
    list = []
    console.log(list)
    document.getElementById('listString').innerHTML = `List is empty`;
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
        var input = parseInt(document.getElementById('sumInput').value);
        // console.log(`value entered:: ${input}`)
        t0 = performance.now();
        tabValue = canSumTabulation(input,list);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = canSumMemo(input,list);
        t3 = performance.now();
    } else if(problem =="howSum" ) {
        var input = parseInt(document.getElementById('sumInput').value);
        // console.log(`value entered:: ${input}`)
        t0 = performance.now();
        tabValue = howSumTabulation(input,list);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = howSumMemo(input,list);
        t3 = performance.now();
    } else if(problem =="bestSum" ) {
        var input = parseInt(document.getElementById('sumInput').value);
        // console.log(`value entered:: ${input}`)
        t0 = performance.now();
        tabValue = bestSumTabulation(input,list);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = bestSumMemo(input,list);
        t3 = performance.now();
    } else if(problem =="canConstruct" ) {
    var input = document.getElementById('textInput').value;
    // console.log(`value entered:: ${input}`)
    t0 = performance.now();
    tabValue = canConstructTabulation(input,list);
    t1 = performance.now();
    t2 = performance.now();
    memoValue = canConstructMemo(input,list);
    t3 = performance.now();
    } else if(problem =="countConstruct" ) {
        var input = document.getElementById('textInput').value;
        // console.log(`value entered:: ${input}`)
        t0 = performance.now();
        tabValue = countConstructTabulation(input,list);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = countConstructMemo(input,list);
        t3 = performance.now();
    } else if(problem =="allConstruct" ) {
        var input = document.getElementById('textInput').value;
        // console.log(`value entered:: ${input}`)
        t0 = performance.now();
        tabValue = allConstructTabulation(input,list);
        t1 = performance.now();
        t2 = performance.now();
        memoValue = allConstructMemo(input,list);
        t3 = performance.now();
    } else  {
        document.getElementById('problemStatement').innerHTML = "Please Select a Problem"
    }
    

    
    document.getElementById('tabulationTime').style.display = "block";
    document.getElementById('tabulation').style.display = "block";
    document.getElementById('memoisation').style.display = "block";
    document.getElementById('memoisationTime').style.display = "block";
    document.getElementById('tabulationTime').innerHTML = `Time Taken :: ${t1 - t0} milliseconds`;
    document.getElementById('memoisationTime').innerHTML = `Time Taken :: ${t3 - t2} milliseconds`;

    if(problem == "allConstruct" ) { 
        console.log(tabValue)
        console.log(memoValue)
        let memoString = '';
        let memoDiv = document.getElementById('memoisation');
        document.getElementById('memoisation').innerHTML = `Solution is`;
        for (var i = 0; i < memoValue.length; i++){
            // memoString += '${memoValue[i]} <br></br>';
            let p = document.createElement('p')
            p.innerHTML = memoValue[i];
            memoDiv.appendChild(p);
        }

        let tabDiv = document.getElementById('tabulation');
        document.getElementById('tabulation').innerHTML = `Solution is`;
        for (var i = 0; i < tabValue.length; i++){
            // memoString += '${memoValue[i]} <br></br>';
            let p = document.createElement('p')
            p.innerHTML = tabValue[i];
            tabDiv.appendChild(p);
        }
        // console.log(memoString)

    } else {
        document.getElementById('tabulation').innerHTML = `Solution is ${tabValue}`;
        document.getElementById('memoisation').innerHTML = `Solution is ${memoValue}`;
    }
    var divsToHide = document.getElementsByClassName("solutionContainer"); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            // divsToHide[i].style.visibility = "hidden"; // or
            divsToHide[i].style.display = "block"; // depending on what you're doing
        }
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


    document.getElementById('sumInput').style.display = "none";
    document.getElementById('sumInputList').style.display = "none";
    document.getElementById('sumInput').style.display = "none";
    document.getElementById('sumInputList').style.display = "none";
    document.getElementById('sumInputLabel').style.display = "none";
    document.getElementById('sumInputListLabel').style.display = "none";
    document.getElementById('addButton').style.display = "none";
    document.getElementById('deleteAllButton').style.display = "none";
    document.getElementById('list').style.display = "none";

    document.getElementById('textInput').style.display = "none";
    document.getElementById('textInputList').style.display = "none";
    document.getElementById('textInput').style.display = "none";
    document.getElementById('textInputList').style.display = "none";
    document.getElementById('textInputLabel').style.display = "none";
    document.getElementById('textInputListLabel').style.display = "none";
    document.getElementById('addStringButton').style.display = "none";
    document.getElementById('deleteAllStringButton').style.display = "none";
    document.getElementById('listString').style.display = "none";

    var divsToHide = document.getElementsByClassName("solutionContainer"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){
        // divsToHide[i].style.visibility = "hidden"; // or
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }
    list = [];
}


hideAll();

problemSelector.addEventListener("change", function() {
    selectTheProblem();
});