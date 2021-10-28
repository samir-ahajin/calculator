let total = document.querySelector('.result');
let usedequation = document.querySelector('.equation');
let symbol= ["x","/","+","-"];
//functions
//add
function getSum(firstNum,secondNum){
    return parseFloat(firstNum)+ parseFloat(secondNum);
}
//multiply
function getProd(firstNum,secondNum){
    return parseFloat(firstNum)* parseFloat(secondNum);
}
//subtract
function getDiff(firstNum,secondNum){
    return parseFloat(firstNum)- parseFloat(secondNum);
}
//divide
function getQuo(firstNum,secondNum){
    return parseFloat(firstNum)/ parseFloat(secondNum);
}
//get the result
function getTotal(){
    let equation = total.textContent.split(" "); //split the value of the current equation
    usedequation.textContent = equation.join(" ") +" =";
    for(let counter = 0; counter < symbol.length;counter++){//counter for symbol
        let mdas = equation.findIndex(a => a === symbol[counter]);//getting the index of the symbol value 
        if(mdas !== -1){ //if the symbol value is in the equation
            let sign = equation.filter(sign=>sign === symbol[counter]).length;//getting all the symbol in the equation and to determine how many are there
            while(sign != 0){ //if value of sign is still not zero then proceed
                let signloc = equation.findIndex(currentSign => currentSign === symbol[counter]);//locate the first current symbol in the equation
                switch(symbol[counter]){
                    // equation[signloc] the current symbol index 
                    // the equation[signloc-1] left side current symbol index 
                    // the equation[signloc+1] right side current symbol index 
                    case "x":
                        let prod = String(getProd(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,prod);//remove the previous values in the eqaution that was used
                        break;
                    case "/":
                        let quo = String(getQuo(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,quo);//remove the previous values in the eqaution that was used
                        break;
                    case "+":
                        let sum = String(getSum(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,sum);//remove the previous values in the eqaution that was used
                        break;
                    case "-":
                        let diff = String(getDiff(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,diff);//remove the previous values in the eqaution that was used
                        break;
                    default:
                        total.textContent = "ERROR";//if there is an error or not included
                    break;
                }
                sign--;//reduces the value of the sign until it reaches zero
            }
                
        }else{ 
            continue;//if the symbol value is not in the equation proceed to the counter
        }    
    }
    
    total.textContent =String(equation) ;  //show the result
}
//insert a value
function insertNewValue(val){
    let newV = document.createTextNode(`${val}`);//set the val as a textnode
    let currentNode = total.textContent;
    let posneg = ["+","-"];
    //if val includes in posneg and (if the node is blank or the last node is not included in symbol array which is number or decimal.)
    if(posneg.includes(val) && (currentNode === "" || !(symbol.includes(currentNode[currentNode.length-1])))){
        //if the node is strictly equal to zero or the second to the last node is included in the symbol array
        if( currentNode.length === 0 || symbol.includes(currentNode[currentNode.length-2])){ 
            total.append(newV);//add the + or - sign 
        }else{
            insertSign(newV);// add the sign as a operator
        }  
    }
    else if(!(symbol.includes(val))){//if its not include in the val
        total.append(newV);//add
    }else{
        insertSign(newV);//insert the sign as an operator
    }
    
}
//insert the operator with a space
function insertSign(sign){
    total.append(" "); 
    total.append(sign);
    total.append(" ");
}
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
                    getTotal();//shows the result of the equation
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