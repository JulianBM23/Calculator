equals = document.getElementById("equals")
let operators = []

const btns = document.getElementsByName("btn")
//button = []

var field_firstOperand = document.getElementById("firstOperandtext")
var field_secondOperand = document.getElementById("secondOperandtext")
var field_solution = document.getElementById("solutiontext")
var btn_autoCalc = document.getElementById("btn_autoCalc")

autoCalc = 0
btn_autoCalc.onclick = function(){
    autoCalc = 0
}

btns.forEach(function(btn){
    btn.onclick = function() {
        operators.push(btn.value)
        console.log("Number pressed.");   //Used to be "command.push(operators)"", commented out because it spammed the console too much
        formatArray(operators, arrTwo)
    }
})
console.log ("Operators: ", operators)


x = 0       //This is the variable that determines the progress of the array
let arrTwo = []
function formatArray(arrInput, arrTwo) {
    //x = 0       //This is the variable that determines the progress of the array
    f = ""      //This is the variable for the first operand
    console.log ("Array Two: ", arrTwo)
    for (x=0; x < arrInput.length; x++) {
        function funcTest(arrInput){
            return arrInput.at(x)
        }
        currentValue = funcTest(arrInput)
        if (currentValue != "-") {
            if (currentValue != "+") {
                f +=  currentValue   //gives f the value that is at place x in the array arrInput aka. operators aka. the general input array
                field_secondOperand.innerHTML = f
            }
            else {      //If the array has a plus
                arrTwo.push (f)     //f combines all the digits of a intended number and combines them, here they get pushed onto the arrTwo array as a single string number
                arrTwo.push ("+")   //after pushing the number that was before the plus onto the array, the plus itself gets pushed on the array as a separate string
                console.log ("Plus added to arrTwo array: ", arrTwo)
                f = ""      //clears the variable f again so that it can be used to combine digits of a following number to one string
                field_firstOperand.innerHTML = arrTwo
            }
        }
        else {      //If the array has a minus
            arrTwo.push (f)     //refer to the explanations under the else statement above
            arrTwo.push ("-")   //""
            console.log ("Minus added to arrTwo array: ", arrTwo)
            f = ""      //also refer to above
            field_firstOperand.innerHTML = arrTwo
        }
    }
    arrTwo.push (f)     //this is necessary here because the last number of the entire input will not be pushed to arrTwo as there is no special sign to do this. If the push was directly in the loop where the digits get combined to a number string, it would cause a separate string to get pushed for each loop the for() loop will have to go though in order to combine multiple digits.
    console.log ("Array ready to be calculated: ", arrTwo)

    /*console.log ("First Operand: ", f)
    m = parseInt(f)
    console.log ("This will add 5 to the first Operand: ", m + 5)*/
}

tempArr2 = []
tempSolution = ""
firstOperand = ""
calcSign = ""
secondOperand = ""

function prepOperation(arrTwo){
    firstOperand = ""
    calcSign = ""
    secondOperand = ""
    firstOperand = pullArraySpot(arrTwo, 0)
    calcSign = pullArraySpot(arrTwo, 1)
    secondOperand = pullArraySpot(arrTwo, 2)
}

function pullArraySpot(arrayInput, spot){
    return arrayInput.at(spot)
}

function calculate(firstOperand, calcSign, secondOperand) {
    if (calcSign === "+") {
        add(firstOperand, secondOperand)
    }

    if (calcSign === "-") {
        subtract(firstOperand, secondOperand)
    }
}

function add(firstOperand, secondOperand) {
    tempSolution = ""
    intOne = parseInt(firstOperand)
    intTwo = parseInt(secondOperand)
    tempSolution = intOne + intTwo
    console.log ("This will show the solution of the addition: ", tempSolution)
} //including the subtraction in the first if(){}

function subtract(firstOperand, secondOperand) {
    console.log ("This will show the first Operand: ", firstOperand, "This will show the second operand: ", secondOperand)
    tempSolution = ""
    intOne = parseInt(firstOperand)
    intTwo = parseInt(secondOperand)
    tempSolution = intOne - intTwo
    console.log ("This will show the solution of the addition: ", tempSolution)
}

//Idk where i was going with this, archived for now because i may need in the future?
/*function checkCalcStatus(currentArray, m) {
    if (currentArray.length === m) {
        console.log ("The array has the length of ", m, ", ")
    }
}*/


function solveNextCalc(asdarrTwo, tempSolution) {
    console.log ("arrTwo length in solveNextCalc: ", arrTwo.length)
    console.log (arrTwo)
    z = ""
    tempArr2.length = 0
    tempArr2.push(tempSolution)
    console.log ("Length arrTwo: ", arrTwo)
    for (z = 3; z < arrTwo.length; z++) {
        tempArr2.push(pullArraySpot(arrTwo, z))
        console.log ("Next string pulled from arrTwo and pushed to tempArr2.", pullArraySpot(arrTwo, z), ", ", z)
        console.log (arrTwo.length)
    }
    console.log ("This should give the new Calculation from tempArr2: ", tempArr2)
    arrTwo.length = 0
    console.log ("arrTwo has been cleared: ", arrTwo)
    arrTwo =[...tempArr2]
    console.log("arrTwo is now tempArr2: ", arrTwo, tempArr2)
    prepOperation(tempArr2)
    console.log("PrepOperation has been initiated")
    console.log("firstOperand: ", firstOperand, "calcSign: ", calcSign, "secondOperand: ", secondOperand)
    calculate(firstOperand, calcSign, secondOperand)
    
}

function clearAll(){
    arrTwo.length = 0
    tempArr2.length = 0
    failsafe = 0
    f = ""
}

let failsafe = 0
show = document.getElementById("show")
show.onclick = function calculator() {
    //clears everything but operators
    clearAll()
    //
    formatArray(operators, arrTwo)
    do{
        prepOperation(arrTwo)
        calculate(firstOperand, calcSign, secondOperand)

        console.log("Making sure tempSolution is correct: ", tempSolution)
        if (arrTwo.length === 3) {
            console.log("The calculation is done. Solution: ", tempSolution, "Length: ", arrTwo.length)
            failsafe = 1
            console.log ("Failsafe has been triggered: ", failsafe)
        }
        else {
            console.log ("- - - - - - - - - - -")
            console.log ("arrTwo: ", arrTwo, "tempSolution: ", tempSolution, "tempArr2", tempArr2)
            console.log ("- - - - Calculation not done yet. Continuing...")
            solveNextCalc(arrTwo, tempSolution)
        }
        console.log ("arrTwo: ", arrTwo, "tempSolution: ", tempSolution, "tempArr2", tempArr2)
        console.log ("failsafe: ", failsafe)
    }while(failsafe === 0)
    console.log("- - - - - - -")
    console.log("- - - - - - -")
    console.log("- - - - - - -")
    console.log("Solution: ", tempSolution)
    field_solution.innerHTML = tempSolution
}

clear = document.getElementById("clear")
clear.onclick = function() {
    operators = []
    clearAll()
    console.log ("Cleared")
}

