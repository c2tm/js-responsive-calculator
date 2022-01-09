(function(){

("use strict");


// Variables

const numberButtons = document.getElementsByClassName("number");
const opButtons = document.getElementsByClassName("operator");
const plusMinus = document.getElementsByClassName("plus-minus");
const clearButton = document.getElementsByClassName("clear");
const percent = document.getElementsByClassName("percent");
const equals = document.querySelector(".equal-sign");
const screen = document.querySelector(".calculator-screen");
const decimal = document.querySelector(".decimal");

let tempCalc = [];
let calculation = [];
let result = '';
let roundedResult = ``;
let allPoss = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`, `.`];
let allOpPoss = [`-` , `/` , `*`, `+`];
let currentNum1 = 0;
let currentNum2 = 0;
let currentOPPreCalc = undefined;
let currentOp = undefined;
let displayNumber = 0;
let pmAmount = 0;
let opAmount = 0;


// Functions


function pushNumber() {
    for(let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", function(){
            // alert(numberButtons[i].textContent);
            calculation.push(numberButtons[i].value);
            if(displayNumber === `-0`   ) {
                displayNumber = `-` + numberButtons[i].value - 0;
            } else if(displayNumber === 0) {
                displayNumber = numberButtons[i].value - 0;
            } else {
                displayNumber += `${numberButtons[i].value - 0}`;
            }

            if(displayNumber.length >= 9) {
                displayNumber = displayNumber.slice(1);
            }
            screen.value = `${displayNumber}`;
            console.log(calculation);

        })
    }
}pushNumber();


function pushOperator() {
    for(let i = 0; i < opButtons.length; i++) {
        opButtons[i].addEventListener("click", function(){
            opAmount += 1;
            if(opAmount > 1) {
                let tempResult = 0;
                for(let i = 0; i < calculation.length; i++) {
        
                    if(currentOp == undefined && allPoss.includes(calculation[i])) {
                        currentNum1 += calculation[i];
                    } else if(currentOp == undefined && allOpPoss.includes(calculation[i])) {
                        currentOp = calculation[i];
                    } else {                                                             
                        currentNum2 += calculation[i];           
                    }
                                                                                        //multiple number + operator combos                         
                   }
                    if(currentOp === `+`) {
                        // alert('Addition!');
                        tempResult = Number(currentNum1) + Number(currentNum2);
                    } else if (currentOp === `-`) {
                        // alert('Subtraction!');
                        tempResult = Number(currentNum1) - Number(currentNum2);
                    } else if (currentOp === `/`) {
                        // alert('Division!')
                        tempResult = Number(currentNum1) / Number(currentNum2);
                    } else {
                        // alert('Multiplication!')
                        tempResult = Number(currentNum1) * Number(currentNum2);
                    }
                calculation = [];
                tempCalc.push(tempResult);
                tempCalc = tempCalc.toString();
                    for(let i = 0; i < tempCalc.length; i++) {
                        calculation.push(tempCalc[i]);
                    }
                currentNum1 = 0;
                currentNum2 = 0;
                currentOp = undefined;
                currentOPPreCalc = undefined;
                displayNumber = 0;
                pmAmount = 0;
                opAmount = 1;
                tempCalc = [];
            }
            // alert(opButtons[i].textContent);
            calculation.push(opButtons[i].value);
            screen.value = `${opButtons[i].value}`;
            currentOPPreCalc = opButtons[i].value;
            displayNumber = 0;
        })
    }
    for(let i = 0; i < clearButton.length; i++) {                                           //Removed alerts from final 
        clearButton[i].addEventListener("click", function(){
            // alert(clearButton[i].textContent);
            calculation = [];
            currentNumber1 = 0;
            currentNumber2 = 0;
            result = 0;
            displayNumber = 0;
            pmAmount = 0;
            screen.value = `0`;
            opAmount = 0;
        })
    }
}pushOperator();


function pushNP() {
    
    for(let i = 0; i < plusMinus.length; i++) {

        plusMinus[i].addEventListener("click", function(){

            if(pmAmount % 2 == 0) {
                if (currentOPPreCalc == undefined) {
                    currentNum1 = `-` + currentNum1;
                    displayNumber = `-` + displayNumber;
                    screen.value = `${displayNumber}`;
                } else if(currentOPPreCalc != undefined) {
                    currentNum2 = `-` + currentNum2;
                    displayNumber = `-` + displayNumber;
                    screen.value = `${displayNumber}`;
                }

            } else if(pmAmount % 2 != 0) {
                if (currentOPPreCalc == undefined) {
                    currentNum1 = currentNum1.slice(1);
                    displayNumber = Number(displayNumber.slice(1));
                    screen.value = `${displayNumber}`;
                } else if(currentOPPreCalc != undefined) {
                    currentNum2 = currentNum2.slice(1);
                    displayNumber = displayNumber.slice(1);
                    screen.value = `${displayNumber}`;
                }
            }

            pmAmount += 1;
       
        })
    }
}pushNP();

function decimalButton() {
    decimal.addEventListener("click", function(){
        calculation.push(decimal.value);
        displayNumber += `.`;
        screen.value = `${displayNumber}`;
    })
    
}decimalButton();

function multiCalc() {
   
}multiCalc();

function calculate() {
   
    equals.addEventListener("click", function(){

        for(let i = 0; i < calculation.length; i++) {
        
                if(currentOp == undefined && allPoss.includes(calculation[i])) {
                    currentNum1 += calculation[i];
                } else if(currentOp == undefined && allOpPoss.includes(calculation[i])) {
                    currentOp = calculation[i];
                } else {                                                             
                    currentNum2 += calculation[i];
                }

               }
                if(currentOp === `+`) {
                    // alert('Addition!');
                    result = Number(currentNum1) + Number(currentNum2);
                } else if (currentOp === `-`) {
                    // alert('Subtraction!');
                    result = Number(currentNum1) - Number(currentNum2);
                } else if (currentOp === `/`) {
                    // alert('Division!')
                    result = Number(currentNum1) / Number(currentNum2);
                } else {
                    // alert('Multiplication!')
                    result = Number(currentNum1) * Number(currentNum2);
                }

       
        if(result.length > 8) {
            roundedResult = result.toExponential();
            screen.value = `${roundedResult}`;
        }else {
            screen.value = `${result}`;
        }
       
        // alert(`The answer is ${result}!`);
        
        currentNum1 = 0;
        currentNum2 = 0;
        currentOp = undefined;
        currentOPPreCalc = undefined;
        calculation = []; 
        displayNumber = 0;
        pmAmount = 0;
        opAmount = 0;
        result = ``;

    })
}calculate();







})()