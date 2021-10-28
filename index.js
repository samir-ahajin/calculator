let total = document.querySelector('.result');
let usedequation = document.querySelector('.equation')
let symbol= ["x","/","+","-"]

function getSum(firstNum,secondNum){
    return parseFloat(firstNum)+ parseFloat(secondNum);
}
function getProd(firstNum,secondNum){
    return parseFloat(firstNum)* parseFloat(secondNum);
}
function getDiff(firstNum,secondNum){
    return parseFloat(firstNum)- parseFloat(secondNum);
}
function getQuo(firstNum,secondNum){
    return parseFloat(firstNum)/ parseFloat(secondNum);
}
function getTotal(){
    let equation = total.textContent.split(" ");
    usedequation.textContent = equation.join(" ") +" =";
    for(let counter = 0; counter < symbol.length;counter++){
        let mdas = equation.findIndex(a => a === symbol[counter]); 
        if(mdas !== -1){
            let sign = equation.filter(sign=>sign === symbol[counter]).length; 
            while(sign != 0){ 
                console.log("x"+sign); 
                console.log(equation);
                console.log(mdas+"s");
                let signloc = equation.findIndex(currentSign => currentSign === symbol[counter])
                switch(symbol[counter]){
                    case "x":
                        let prod = String(getProd(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,prod);
                        console.log(prod);
                        break;
                    case "/":
                        let quo = String(getQuo(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,quo);
                        console.log(quo);
                        break;
                    case "+":
                        let sum = String(getSum(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,sum);
                        console.log(sum);
                        break;
                    case "-":
                        let diff = String(getDiff(equation[signloc-1],equation[signloc+1]));
                        equation.splice(signloc-1,3,diff);
                        console.log(diff);
                        break;
                    default:
                        console.log("error");
                    break;
                }
                sign--; 
            }
            continue;    
        }else{
            continue;
        }    
    }
    total.textContent =String(equation) ;  
}
function insertNewValue(val){
    let newV = document.createTextNode(`${val}`);
    total.append(newV);
    
    if(symbol.includes(val)){
        total.append(" "); 
        total.append(newV);
        total.append(" ");
    }
}
function eraseValue(){
            let lastNode = total.textContent
            if(lastNode == "0" || usedequation.textContent != "0"){
                total.textContent ="0";
            }else if(symbol.includes(lastNode[lastNode.length-2])){
                console.log(lastNode[lastNode.length-2]);
                total.textContent = lastNode.slice(0,lastNode.length-3);
            }else if(total.hasChildNodes()){
                if(lastNode == "NaN"){
                    total.textContent ="0";
                }
                total.textContent = lastNode.slice(0,-1); 
            }
}
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
                        let lastnode = total.textContent
                        eraseValue(); 
                        usedequation.textContent = "0";
                        total.textContent ="";
                        if(lastnode !== "NaN"){insertNewValue(lastnode);} 
                       
                    }
                    if(total.textContent == "0"){
                        total.textContent ="";//removes the 0 value in the result div
                    }
                   
                    insertNewValue(e.target.textContent);//add the number or sign thats selected
                    break;
        }  
}))