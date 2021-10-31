let total = document.querySelector('.result');
let usedequation = document.querySelector('.equation');
let symbol= ["(","^","x","/","+","-"]; 
let paren = ["(",")"]
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
                if(cEquation[symboLoc-1] == undefined){
                    cEquation.splice(symboLoc,insideVal.length+2,insideVal);  
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
            while(sign != 0){ //if value of sign is still not zero then proceed
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
        case "x":
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
function insertNewValue(val){
    let newV = document.createTextNode(`${val}`);//set the val as a textnode
    let currentNode = total.textContent;
    let posneg = ["+","-","(",")"];
    if(posneg.includes(val)){
        //if the node is strictly equal to zero or the second to the last node is included in the symbol array
        if(currentNode.length > 0){
                if(currentNode[currentNode.length-1] === " "){
                    total.append(newV);  
                }else{ 
                    if(val === ")"){
                        parentheses.textContent = "(";
                    }else if(val=="("){
                        parentheses.textContent = ")";
                    };
                    insertSign(newV);
                }        
        }
        else if( currentNode.length === 0){  //add the + or - sign or (
                total.append(newV); 
        } 
    }
    //
    else if(!(symbol.includes(val))){//if val does not include in the symbol
        if((currentNode.length === 1 && symbol.includes(val)) || symbol.includes(currentNode[currentNode.length-1])){
            currentNode === ")"?  parentheses.textContent = "(":parentheses.textContent = ")";
            total.append(" ");
            total.append(newV);
            
        }else{
            total.append(newV);//add
        }
       
    }else{
        insertSign(newV);//insert the sign as an operator
        determinePar(val);
   
    }
    
}
//insert the operator with a space
function insertSign(sign){
    total.append(" "); 
    total.append(sign);
    total.append(" ");
}
function determinePar(parVal){
    switch(parVal){
        case ")":
            parentheses.textContent = "(";
            break;
        case "(":
            parentheses.textContent = ")";
            break;
    }
}

//erase a value
function eraseValue(){
            let currentNode = total.textContent;// get the current textContent of the node when value is added
            if(currentNode == "0" || usedequation.textContent != "0"||currentNode === "NaN"){ // value of currentNode and usedEquation is "0" or "NaN"
                total.textContent="0";
            }else if(symbol.includes(currentNode[currentNode.length-2])){//if the 2nd to the last value of node is included the symbol
                total.textContent = currentNode.slice(0,currentNode.length-3);//remove the operator with the space added
                
            }else{
                total.textContent = currentNode.slice(0,-1);//remove the current number
                if(total.textContent.length === 0){//when the lenght is zero add a "0"
                    total.textContent ="0";
                }    
            }
}
//end list of the functions

//start here
let numpad = document.querySelectorAll(".button");
numpad.forEach(npad =>npad.addEventListener('click',function(e){
     switch(e.target.textContent){
                case "=":
                    let finalResult = getTotal(total.textContent);//shows the result of the equation
                    !(finalResult == "NaN")?total.textContent = String(finalResult):total.textContent ="ERROR!";
                    //show the result
                    break;
                case "C":
                    total.textContent ="0";//set the content to 0 again
                    break;
                case "CE":
                    eraseValue();//removes the last value added
                    break;
                default:
                    if(usedequation.textContent != "0" ){
                        let currentNode = total.textContent;
                        eraseValue(); 
                        usedequation.textContent = "0";
                        total.textContent ="";
                        if(currentNode !== "NaN"){insertNewValue(currentNode);}   
                    }
                    if(total.textContent == "0"){
                        total.textContent ="";//removes the 0 value in the result div
                    } 
                    insertNewValue(e.target.textContent);//add the number or sign thats selected
                    break;
        }  
}))