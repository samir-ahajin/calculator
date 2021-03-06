let total = document.querySelector('.result');
let usedequation = document.querySelector('.equation');
let numButton = document.querySelectorAll('.number');
let decButton = document.querySelector('.dec');
let allButton = document.querySelectorAll('.button');
let symbol= ["(","^","*","/","+","-"];
let completeSymbol= ["(",")","^","*","/","+","-"];  
let paren = ["(",")"]
let posneg = ["+","-"];
let parentheses = document.querySelector(".parentheses");

//parentheses
function solveParentheses(cEquation,symboLoc){
            let leftPar = cEquation.findIndex(a => a === "(");
            let rightPar = cEquation.findIndex(b => b === ")");
            let insideVal = cEquation.slice(leftPar+1,rightPar)       
            if( insideVal.length >1){   
                let tempRes = getTotal(insideVal.join(" ")).join("");
                cEquation.splice(symboLoc+1,insideVal.length,tempRes);
                insideVal = cEquation.slice(leftPar+1,rightPar-2); 
                if(!(symbol.includes(cEquation[leftPar-1])) && insideVal.length ===1){  
                    if(cEquation[symboLoc-1] == undefined){
                        cEquation.splice(symboLoc,insideVal.length+2,insideVal);  
                    }else{
                        
                        cEquation.splice(symboLoc-1,insideVal.length+3,getProd(cEquation[leftPar-1],insideVal)); 
                    }   
                }else{  
                    cEquation.splice(symboLoc,insideVal.length+2,tempRes);
                }
            }else{ 
                if(cEquation[symboLoc-1] == undefined || symbol.includes(cEquation[symboLoc-1])) {
                    if(symbol.includes(cEquation[symboLoc-1])){
                        console.log("hello1");
                        cEquation.splice(symboLoc,insideVal.length+2,insideVal);
                    }else{
                        cEquation.splice(symboLoc,insideVal.length+2,insideVal);
                    } 
                }else{
                    cEquation.splice(symboLoc-1,insideVal.length+3,getProd(cEquation[leftPar-1],insideVal));
                }    
            }
}
//exponent
function getExponent(firstNum,secondNum){
    let res = 1 
    let expVal = parseFloat(secondNum)
    let value = parseFloat(firstNum)
    while( expVal != 0){
    	res = res * value;
        expVal--;
        } 
    return res;
}

//multiply
function getProd(firstNum,secondNum){
    return parseFloat(firstNum)* parseFloat(secondNum);
}//divide
function getQuo(firstNum,secondNum){
    return parseFloat(firstNum)/ parseFloat(secondNum);
}
//add
function getSum(firstNum,secondNum){
    return parseFloat(firstNum)+ parseFloat(secondNum);
}
//subtract
function getDiff(firstNum,secondNum){
    return parseFloat(firstNum)- parseFloat(secondNum);
}

//get the result
function getTotal(currentVal){
    let equation = currentVal
                        .split(" ")
                        .filter(a => a !== ""); //split the value of the current equation
    usedequation.textContent = total.textContent +" =";
    for(let counter = 0; counter < symbol.length;counter++){//counter for symbol
        let mdas = equation.findIndex(a => a === symbol[counter]);//getting the index of the symbol value 
        if(mdas !== -1){ //if the symbol value is in the equation
            let sign = equation.filter(sign=>sign === symbol[counter]).length;//getting all the symbol in the equation and to determine how many are there
            while(sign != 0){5
                //if value of sign is still not zero then proceed
                let signloc = equation.findIndex(currentSign => currentSign === symbol[counter]);//locate the first current symbol in the equation
                solveEquation(symbol,counter,equation,signloc);
                sign--;//reduces the value of the sign until it reaches zero
            }
                
        }else{ 
            continue;//if the symbol value is not in the equation proceed to the counter
        }    
    }
    return equation;
   
}
//solve the equation
function solveEquation(operators,counter,currentEquation,signloc){
    switch(operators[counter]){
        // equation[signloc] the current symbol index 
        // the equation[signloc-1] left side current symbol index 
        // the equation[signloc+1] right side current symbol index 
        case "(":
            solveParentheses(currentEquation,signloc);
            break;
        case "^":
            let exp = getExponent(currentEquation[signloc-1],currentEquation[signloc+1]);
            currentEquation.splice(signloc-1,3,exp);//remove the previous values in the eqaution that was used
            break;
        case "*":
            let prod = getProd(currentEquation[signloc-1],currentEquation[signloc+1]);
            currentEquation.splice(signloc-1,3,prod);//remove the previous values in the eqaution that was used
            break;
        case "/":
            let quo = getQuo(currentEquation[signloc-1],currentEquation[signloc+1]);
            currentEquation.splice(signloc-1,3,quo);//remove the previous values in the eqaution that was used
            break;
        case "+":
            let sum = getSum(currentEquation[signloc-1],currentEquation[signloc+1]);
            currentEquation.splice(signloc-1,3,sum);//remove the previous values in the eqaution that was used
            break;
        case "-":
            let diff = getDiff(currentEquation[signloc-1],currentEquation[signloc+1]);
            currentEquation.splice(signloc-1,3,diff);//remove the previous values in the eqaution that was used
            break;
        default:
            total.textContent = "ERROR";//if there is an error or not included
        break;
    }
    return currentEquation;  
}
//insert a value
function insertNewValue(e,val){
    let newV = document.createTextNode(`${val}`);//set the val as a textnode
    let currentNode = total.textContent;

    if(completeSymbol.includes(val)){
        if(paren.includes(val)){
            if(val == "(" && parentheses.textContent == ")"){//determine the given value is ( and the content of the button for parentheses is )
                return;// returns nothing meaning in this situation value has been already inputted and cannot be duplicated
            }else if(val == ")" && parentheses.textContent == "("){//determine the given value is ) and the content of the button for parentheses is (
                if(total.textContent == "0"){
                    return "0";// returns nothing meaning in this situation value has been already inputted and cannot be duplicated
                }else{  
                    return; 
                }
            } 
            determinePar(val);
             
        }
        if(symbol.includes(val)){
            removeEffect('all');
        }
        insertSign(newV);     
    }else{
        if((posneg.includes(currentNode[currentNode.length-1]) && symbol.includes(currentNode[currentNode.length-3])) || (posneg.includes(currentNode[currentNode.length-1]) && currentNode[currentNode.length-3] === undefined)){
            total.append(newV);
        }else{
           if(completeSymbol.includes(currentNode[currentNode.length-1])){  
                if(val == '.'){
                    decButton.classList.add('disabled');
                }
                insertSign(newV);  
           }
           else if(!(completeSymbol.includes(val))){ 
               if(val == '.' && e.code =="NumpadDecimal" ){
                   if(decButton.classList.contains("disabled")){
                        return;// returns nothing meaning in this situation value has been already inputted and cannot be duplicated
                   }else{
                    decButton.classList.add('disabled');
                    document.onkeydown = function (e) {
                    e.preventDefault();        
                     }
                    total.append(newV);
                   }   
               }else{
                   total.append(newV);
               }
               
            } 
        }
    }  
}
//insert the operator with a space
function insertSign(sign){
    total.append(" ");
    total.append(sign);
    
}
function removeEffect(remove){
    if(remove == 'dec'){
        decButton.classList.remove("disabled");
    }else if(remove == 'all'){
        numButton.forEach(val=>val.classList.remove("disabled"));
    }
    
}
//determin the parentheses
function determinePar(parVal){
    switch(parVal){
        case ")":
            numButton.forEach(val=>val.classList.add("disabled"));
            parentheses.textContent = "(";
            break;
        case "(":
            numButton.forEach(val=>val.classList.remove("disabled"));
            parentheses.textContent = ")";
            break;
    }
}

//erase a value
function eraseValue(){
        let currentNode = total.textContent;// get the current textContent of the node when value is added
        
        if(posneg.includes(currentNode[currentNode.length-2])){
            total.textContent = currentNode.slice(0,currentNode.length-1);  
        }else{
            if(!(completeSymbol.includes(currentNode[currentNode.length-1])) && currentNode[currentNode.length-1] !== " "){//delete the left side number 
                if(currentNode[currentNode.length-1]=="."){
                    removeEffect('dec');
                }
                total.textContent = currentNode.slice(0,currentNode.length-1);
            }else{
                if(currentNode[currentNode.length-1]==")"){
                    determinePar("(");
                    removeEffect('all');
                }
                total.textContent = currentNode.slice(0,currentNode.length-2);//delete the single number with space  
            }
            if(currentNode.length===0){total.textContent="0";}
        }     
}
//end list of the functions
function determineKey(e){
    let content;
    if(e.type =="keydown"){
                  // 0,    1,   2,   3,   4,    5,    6,    7,    8,    9,    *,    +,    -,    .,    /,   Enter(rep "="),  Backspace(rep "CE"), ^, (, ), DELETE(rep "C")]  
        let keys = ["96","97","98","99","100","101","102","103","104","105","106","107","109","110","111","13","8","54","57","48","46"] 
        let keyC = String(e.keyCode);
        let useKey = e.key;
        if(keys.includes(keyC)){
            if(["8","13","46"].includes(keyC)){
                switch(keyC){
                    case "8":
                        useKey="CE";
                        break;
                    case "13":
                        useKey="="; 
                        break; 
                    case "46":
                        useKey="C";
                        break; 
                }

            }
            content = useKey;
        }else{
            return;
        }
    }else{
        content = e.target.textContent;
    }
    switch(content){
        case "=":
            //result show with decimal or not
            parentheses.textContent = "(";
            let finalResult = getTotal(total.textContent);//shows the result of the equation
            let checkResult = finalResult;
            let decimal = checkResult.join("").split("");
            let decimalLoc = decimal.findIndex(decimal=>decimal==".");//locate decimal
            if(decimal.filter(decimal => decimal == ".").length === 1 ){// if there is a decimal
                   if(decimal.slice(decimalLoc,decimal.length).length-1 >= 5 && decimal.every(a => a !== "0")){//if the length after the decimal is greater than or equal 5  
                      console.log(decimal.slice(decimalLoc,decimalLoc+4));
                    if(decimal.slice(decimalLoc,decimalLoc+4).every(a => a == "0")){
                        total.textContent = String(Number(decimal.join("")));
                      }else{
                        total.textContent = String(Number(decimal.join("")).toFixed(4));
                      }
                       //round only upto 4 numbers
                   }else{
                    !(finalResult == "NaN") && finalResult.length == 1 ?total.textContent = String(finalResult):total.textContent ="ERROR!";  //just display the result if the value after dec is less than 5  
                   }
            }else{
            !(finalResult == "NaN") && finalResult.length == 1 ?total.textContent = String(finalResult):total.textContent ="ERROR!";// if there no dec just display result
            }
            //remove disabled class
            removeEffect('all');//remove each element disabled button
        
            break;
        case "C":
            //remove disabled class
            removeEffect('all');//remove each element disabled button
            total.textContent ="0";//set the content to 0 again
            parentheses.textContent = "(";
            break;
        case "CE":
            eraseValue();//removes the last value added
            if(total.textContent==""){
                total.textContent="0";
                parentheses.textContent = "(";
            } 
            break;
        default:
            if(usedequation.textContent != "0" ){
                let currentNode = total.textContent;
                eraseValue(); 
                usedequation.textContent = "0";
                total.textContent ="";
                if(currentNode !== "NaN"){insertNewValue(e,currentNode);}   
            }
            if(total.textContent == "0"){
                total.textContent ="";//removes the 0 value in the result div
            } 
            insertNewValue(e,content);//add the number or sign thats selected
            break;
        }
    
        
}


//start here
let numpad = document.querySelectorAll(".button");
let numpads = document.querySelector(".numbers");


numpad.forEach(npad =>npad.addEventListener('click',determineKey));
window.addEventListener('keydown',determineKey);
