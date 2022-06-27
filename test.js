//Declarations:
const nums = document.getElementsByName("num")      //gives all num
const signs = document.getElementsByName("sign")    //sign buttons
const equals = document.getElementById("equals")    //equals or solve calculation sign
var field_firstOperand = document.getElementById("firstOperandtext")        //First Operand field in the html site 
var field_secondOperand = document.getElementById("secondOperandtext")      //Second Operand field in the html site
var field_solution = document.getElementById("solutiontext")                //Solution field in the html site

let operators = []      //declares a changeable array for the raw inputs
f = ""      //empty variable for use in function "formatNumbers()", has to be global because it will be used in "formatSigns" later
firstOperand = ""       //declares global var for this, needed in prepOperation() and following
calcSign = ""           //""
secondOperand = ""      //""
tempSolution = ""       //"" used in calculate and following
arrMain = []
arrInput = []
sign = ""
//arrTemp = []

//
//
//Code starts here:
//
//
nums.forEach(function(num){
    num.onclick = function(){
        operators.push(num.value);
        f += num.value;
        console.log("Numbers pressed");
    }
}
)

signs.forEach(function(sign){
    sign.onclick = function(){
        //operators.push(sign.value);       //not needed because this is done in formatSigns(), keeping it here in case of error
        formatSigns(arrMain, sign);

    }
}
)

function pullArraySpot(arrayInput, spot){
    return arrayInput.at(spot);
}

/*function formatNumbers(arrInput){                     //This function may be obsolete as the num value can be directly pushed to f in the num.onclick - Remains to be tested, delete if obsolete
    for (x=0; x < arrInput.length; x++){
        currentValue = pullArraySpot(arrInput, x)
        f += currentValue
    }

}*/

function formatSigns(arrInput, sign){
    operators.push(sign.value)
    if(arrInput.length < 2){
        arrMain.push(f);
        arrMain.push(sign.value)
        f = ""
    }
    else{
        arrMain.push(f)
        f = ""
        arrMain.push(sign.value)
        prepOperation(arrInput)
        calculate(firstOperand, calcSign, secondOperand)
        arrTemp = []
        overrideArr(tempSolution, arrMain)
        arrMain.length = 0
        arrMain =[...arrTemp]
        //arrMain.push(sign.value)
    }
    console.log("Sign pressed: ", sign.value)
}

function overrideArr(tempSolution, Array){
    arrTemp = []
    arrTemp.push(tempSolution);
    for (y = 3; y < Array.length; y++){
        arrTemp.push(pullArraySpot(Array, y))
    }

}

function prepOperation(calcArray){
    firstOperand = ""
    calcSign = ""
    secondOperand = ""
    firstOperand = pullArraySpot(calcArray, 0)
    calcSign = pullArraySpot(calcArray, 1)
    secondOperand = pullArraySpot(calcArray, 2)
}

function calculate(firstOperand, calcSign, secondOperand) {
    if (calcSign === "+") {
        tempSolution = ""
        add(firstOperand, secondOperand);
    }
    if (calcSign === "-") {
        subtract(firstOperand, secondOperand);
    }
    if(calcSign === "*"){
        multiply(firstOperand, secondOperand);
    }
    if(calcSign === "/"){
        divide(firstOperand, secondOperand);
    }
}

function add(firstOperand, secondOperand){
    tempSolution = "";
    intOne = parseInt(firstOperand);
    intTwo = parseInt(secondOperand);
    tempSolution = intOne + intTwo;
}
function subtract(firstOperand, secondOperand){
    tempSolution = "";
    intOne = parseInt(firstOperand);
    intTwo = parseInt(secondOperand);
    tempSolution = intOne - intTwo;
}
function multiply(firstOperand, secondOperand){
    tempSolution = "";
    intOne = parseInt(firstOperand);
    intTwo = parseInt(secondOperand);
    tempSolution = intOne * intTwo;
}
function divide(firstOperand, secondOperand){
    tempSolution = "";
    intOne = parseInt(firstOperand);
    intTwo = parseInt(secondOperand);
    tempSolution = intOne / intTwo;
}

equals.onclick = function calculator(){
    arrMain.push(f)
    prepOperation(arrMain);
    calculate(firstOperand, calcSign, secondOperand);
    console.log("Solution: ", tempSolution);
    field_solution.innerHTML = tempSolution
}