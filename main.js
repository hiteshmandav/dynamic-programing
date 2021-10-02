

var problemSelector = document.getElementById("problems");
var problem;
var list = [];
var fibProblem = `<span><strong>Fibonacci Series</strong> is a series of numbers in which each number (Fibonacci number) is the sum of the two preceding numbers.<br>
 Enter a number in the below feild to find the nth number in the sequence<br/><br/>
 Example 6th fib number is 8 as the fib series is 1, 1, 2, 3, 5, 8 ...
 </span>`
var gridTraveler = `<span><h2>Grid Traveler Problem :</h2><br/> Say that you are a traveler on a 2D grid.<br/> 
You begin in the top-left corner and your goal is to travel to the bottom-right corner.<br/>
You may only move down or right.<br/>
<br/>
In How many ways can you travel to the goal on the grid with dimensions rows*col?<br/><br/>
Example for a grid 3*2 you can travel in 3 total ways <br/>
1. right, right, down <br/>
2. right, down, right <br/>
3. down, down, right</span>`

var canSumProblem = `<span><h2>Can Sum Problem :</h2><br/> 
Need to generate a boolean (True/False) indicating weather or not it is possible to generate a target number<br/> 
using the sum of some or all the numbers from a list of given numbers.<br/> 
A number from the list can be used as many times as needed.<br/>
Assumption all the input numbers are non negetive.<br/>
<br/><br/>
Example from a list of numbers 2, 3, 5 you can generate target of 8 by adding some or all the values<br/></span>`;

var howSumProblem = `<span><h2>How Sum Problem :</h2><br/> 
Need to list out a set of numbers using which it is possible to generate a target sum<br/> 
from a list of given numbers.<br/> 
A number from the list can be used as many times as needed.<br/>
Assumption all the input numbers are non negetive.<br/>
<br/><br/>
Example from a list of numbers 2, 3, 5 you can generate target of 8 by adding 2, 2, 2, 2<br/></span>`;

var bestSumProblem = `<span><h2>Best Sum Problem :</h2><br/> 
Need to list out shortest set of numbers using which it is possible to generate a target sum<br/> 
from a list of given numbers.<br/> 
A number from the list can be used as many times as needed.<br/>
Assumption all the input numbers are non negetive.<br/>
<br/><br/>
Example from a list of numbers 2, 3, 5 you can generate target of 8 by adding 3, 5<br/></span>`

var canCostructProblem = `<span><h2>Can Construct Problem :</h2><br/> 
Need to generate a boolean (True/False) indicating weather or not it is possible to generate a target word<br/> 
using the given Word bank<br/> 
A word from the word bank can be used as many times as needed.<br/>
<br/><br/>
Example from a word bank of purp, p, ur, le, purpl you can generate target word purple.<br/></span>`;


var countCostructProblem = `<span><h2>Count Construct Problem :</h2><br/> 
Need to generate a count of in how many unique ways it is possible to generate a target word<br/> 
using the given Word bank<br/> 
A word from the word bank can be used as many times as needed.<br/>
<br/><br/>
Example from a word bank of purp, p, ur, le, purpl you can generate target word purple with 2 differnt combinations.<br/></span>`;


var allCostructProblem = `<span><h2>All Construct Problem :</h2><br/> 
Need to generate a list of unique ways it is possible to generate a target word<br/> 
using the given Word bank<br/> 
A word from the word bank can be used as many times as needed.<br/>
<br/><br/>
Example from a word bank of purp, p, ur, le, purpl you can generate target word purple with 2 differnt combinations.<br/>
1. purp,le<br/>
2. p,ur,p,le<br/>
<br/></span>`;


function fibMemo(n) {
    let map = new Map();
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
    for(let i=0; i< n-1; i++){
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
        document.getElementById('problemStatement').innerHTML = fibProblem;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function fibMemo(n) {

            let map = new Map()

            for (let i = 1; i <= n ; i++){

                if(i <= 2 ){

                    map.set(i ,1)

                } else {

                    val = map.get(i-1) + map.get(i-2)
                    map.set(i, val)

                }
            }
            return map.get(n)
        }`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function fibTabulation(n) {

            num1 = 0

            num2 = 1

            returnVal = 1

            for(let i=0; i < n-1; i++){

                returnVal = num1 + num2;
                
                num1 = num2;

                num2 = returnVal

            }

            return returnVal
        }`;
    } else if(problem == "grid" ) {
        document.getElementById('gridColInput').style.display = "block";
        document.getElementById('gridRowInput').style.display = "block";
        document.getElementById('gridColInputLabel').style.display = "block";
        document.getElementById('gridRowInputLabel').style.display = "block";
        document.getElementById('gridColInput').value = 2;
        document.getElementById('gridRowInput').value = 3;
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = gridTraveler;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function gridTravelerMemo(m, n , memo = {}) {

        if ([m,n] in memo)  return memo[[m,n]]

        if(m == 0 || n == 0) return 0

        if (m ==1 && n == 1) return 1

        memo[[m,n]] = gridTravelerMemo(m-1, n, memo) 
                      + gridTravelerMemo(n-1,m,memo)

        return memo[[m,n]]
    }`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function gridTravelerTabulation(rows, cols) {

        let totalWays = new Array(rows+1)
                            .fill()
                            .map(x => new Array(cols+1).fill(0))

        totalWays[1][1] = 1

        for (let row = 0; row <= rows; row++) {

            for (let col = 0; col <= cols; col++) {

                if(col+1 <= cols) {
                    
                    totalWays[row][col+1] += totalWays[row][col]
                }

                if(row+1 <= rows) {

                    totalWays[row+1][col] += totalWays[row][col]

                } 
            }
        }
        return totalWays[rows][cols]
    }`;
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
        document.getElementById('problemStatement').innerHTML = canSumProblem;
        
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function canSumMemo(n,arr, memo ={}) {

            if(n in memo) return memo[n]

            min = Math.min(...arr)

            if (n === 0)  true
            
            for(let i=0; i< arr.length; i++) {
                if (n >= min) {

                    val = canSumMemo(n-arr[i], arr, memo)

                    memo[n-arr[i]] = val

                    if (val) return true
                }
            }

            memo[n] = false
            return false
    }`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function canSumTabulation(target, numArray) {

            let canSumArray = new Array(target+1).fill(false)

            canSumArray[0] = true
            
            for(let targetIndex = 0 ; 
                targetIndex <= canSumArray.length ; 
                targetIndex++){

                for(x of numArray){

                    if(canSumArray[targetIndex]) {

                        sumPosible = targetIndex + x;

                        if (sumPosible <= target) canSumArray[targetIndex + x] = true;
                    }
                }
            }
            return canSumArray[target]
    }`;
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
        document.getElementById('problemStatement').innerHTML = howSumProblem;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function howSumTabulation(target, numArray) {

    let sumArray = new Array(target+1).fill(null)
    sumArray[0] = []
        
    for( let targetIndex = 0 ;
         targetIndex <= target ;
         targetIndex++ ){

         for (x of numArray ) {

            if ( sumArray[targetIndex] !== null ) {

                sumIndex =  targetIndex + x;

                if ( sumIndex <= target ) {

                    sumArray[sumIndex] = [...sumArray[targetIndex] , x ]

                }
            }
        }
    }
    return sumArray[target]
}`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function howSumMemo(n,arr, memo ={}) {

    if(n in memo) return memo[n]

    min = Math.min(...arr)

    if (n === 0) return []

    for(let i=0; i< arr.length; i++) {

        if (n >= min) {

            val = howSumMemo(n-arr[i], arr, memo)

            if ( val !== null ) {

                memo[n-arr[i]] = [...val,arr[i]]

                return memo[n-arr[i]]

            }
        }
    }

    memo[n] = null
    return null
}`;
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
        document.getElementById('problemStatement').innerHTML = bestSumProblem;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function bestSumMemo(n,arr, memo ={}) {

    if (n in memo) return memo[n]

    if(n === 0 ) return []

    if(n < 0) return null

    let shortestVal = null

    for (let number of arr) {

        val = bestSumMemo(n-number, arr, memo)

        memo[n-number] = val

        if ( val !== null) {

            let current = [...val, number]

            if (shortestVal === null 
                || current.length < shortestVal.length) {

                shortestVal = current
            }
        }
    }
    return shortestVal
}`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function bestSumTabulation(targetSum , numbers) {

    const bestSumArray = new Array(targetSum+1)
                    .fill(null)

    bestSumArray[0] = []

    for (let targetIndex = 0 ;
         targetIndex <= targetSum ;
         targetIndex++ ) {

        if (bestSumArray[targetIndex] !== null ) {

            for (let num of numbers ) {

                let position = targetIndex + num

                if (position <= targetSum ) {

                    let sumArray = [...bestSumArray[targetIndex], num]

                    if ( bestSumArray[position] === null 
                || bestSumArray[position].length >= sumArray.length) {

                        bestSumArray[position] = sumArray;
                    }
                }
            }
        }
    }
    return bestSumArray[targetSum]
}`;
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
        document.getElementById('listString').innerHTML = `Word Bank contains Values : purp, p, ur, le, purpl`;

        document.getElementById('addStringButton').style.display = "block";
        document.getElementById('deleteAllStringButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = canCostructProblem;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function canConstructMemo(str, subStrArr, memo= {}) {

    if(str in memo) return memo[str];

    if(str === '') return true;

    for(let subStr of subStrArr) {

        if(str.startsWith(subStr)) {

            remainderStr = str.substr(subStr.length)

            if(canConstructMemo(remainderStr,subStrArr, memo)) {

                memo[remainderStr] = true

                return true
            }
        }
    }
    memo[str] = false
    return false
}`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function canConstructTabulation(target, wordBank) {

    let constructArray = new Array(target.length+1).fill(false)

    constructArray[0] = true;

    for (let split = 0 ; split<=target.length ; split++) {

        balanceTarget = target.substr(split)

        for ( let word of wordBank ) {

            if (balanceTarget.startsWith(word) && constructArray[split]) {

                let position = split + word.length;

                constructArray[position] = true
            }
        }
    }
    return constructArray[target.length]
}`;
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
        document.getElementById('listString').innerHTML = `Word Bank contains Values : purp, p, ur, le, purpl`;

        document.getElementById('addStringButton').style.display = "block";
        document.getElementById('deleteAllStringButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = countCostructProblem;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function countConstructMemo(target, wordBank, memo = {}) {

    if(target in memo) { return memo[target] }
    
    let count = 0

    if(target === '') return 1;

    for(let word of wordBank) {

        if(target.indexOf(word) === 0) {

            const sufix = target.slice(word.length)

            let val = countConstructMemo(sufix, wordBank, memo)

            count += val
        }
    }
    memo[target] = count
    return count
}`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function countConstructTabulation(target, wordBank) {

    let constructCountArray = new Array(target.length + 1)
                                  .fill(0)
    constructCountArray[0] = 1;

    for ( let split = 0 ; split <= target.length ; split++ ) {

        balanceTarget = target.substr(split)

        for (let word of wordBank ) {

            if (constructCountArray[split]!=0) {

                if(balanceTarget.startsWith(word)){

                    let position = split+word.length
                    constructCountArray[position]+=constructCountArray[split];

                }
            }
        }
    }
    return constructCountArray[target.length]
}`;
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
        document.getElementById('listString').innerHTML = `Word Bank contains Values : purp, p, ur, le, purpl`;

        document.getElementById('addStringButton').style.display = "block";
        document.getElementById('deleteAllStringButton').style.display = "block";
        document.getElementById('executeButton').style.display = "block";
        document.getElementById('problemStatement').innerHTML = allCostructProblem;
        document.getElementById('memoCode').style.display = "block";
        document.getElementById('memoCode').innerHTML = `function allConstructMemo(target, wordBank, memo ={}) {

    if (target in memo) {return memo[target]}

    let resultant = []

    if(target == '') return [ [] ];

    for(let word of wordBank) {
        
        if(target.startsWith(word)){

            const suffix = target.slice(word.length)

            let val = allConstructMemo(suffix, wordBank, memo)
            
            let returnVal = val.map(x => [word, ...x])

            resultant.push(...returnVal)

        }
    }
    memo[target] = resultant
    return resultant
}`;
        document.getElementById('tabCode').style.display = "block";
        document.getElementById('tabCode').innerHTML = `function allConstructTabulation(target, wordBank) {

    let constructArray = new Array(target.length+1)
                            .fill()
                            .map(() => [])

    constructArray[0] = [[]]

    for (let split = 0 ; split <= target.length ; split++) {

        balancedTarget = target.substr(split);
        
        for ( let word of wordBank ) {
            
                if (balancedTarget.startsWith(word)){
                    
                    const subArrrayList = constructArray[split].map(x => [...x, word])

                    constructArray[split+word.length].push(...subArrrayList)
                    
            }
        }
    }
     return constructArray[target.length]
}
        `;
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
    if (document.getElementById('listString').innerHTML == `Word Bank is empty`){
        document.getElementById('listString').innerHTML = `Word Bank contains Values : ${input}`;
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
    document.getElementById('listString').innerHTML = `Word Bank is empty`;
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
            let p = document.createElement('p')
            p.innerHTML = `${i+1}. ${memoValue[i]}`;
            memoDiv.appendChild(p);
        }

        let tabDiv = document.getElementById('tabulation');
        document.getElementById('tabulation').innerHTML = `Solution is`;
        for (var i = 0; i < tabValue.length; i++){
            let p = document.createElement('p')
            p.innerHTML = `${i+1}. ${tabValue[i]}`;
            tabDiv.appendChild(p);
        }
        // console.log(memoString)

    } else {
        document.getElementById('tabulation').innerHTML = `Solution is ${tabValue}`;
        document.getElementById('memoisation').innerHTML = `Solution is ${memoValue}`;
    }
    var divsToHide = document.getElementsByClassName("solutionContainer"); 
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "block"; 
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
    document.getElementById('memoCode').style.display = "none";
    document.getElementById('tabCode').style.display = "none";

    var divsToHide = document.getElementsByClassName("solutionContainer");
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none";
    }
    list = [];
}


hideAll();

problemSelector.addEventListener("change", function() {
    selectTheProblem();
});