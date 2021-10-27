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
    let all = Array.from(total.querySelectorAll("p"));
    let equation = all.map(each=>each.textContent)
    usedequation.textContent = equation.join(" ") +" =";
    for(let counter = 0; counter < symbol.length;counter++){
        let mdas = equation.findIndex(a => a === symbol[counter]); 
        if(mdas !== -1){
            let sign = equation.filter(sign=>sign === symbol[counter]).length; 
            while(sign != 0){  
                switch(symbol[counter]){
                    case "x":
                        let prod = String(getProd(equation[mdas-1],equation[mdas+1]));
                        equation.splice(mdas-1,3,prod);
                        console.log(prod);
                        break;
                    case "/":
                        let quo = String(getQuo(equation[mdas-1],equation[mdas+1]));
                        equation.splice(mdas-1,3,quo);
                        console.log(quo);
                        break;
                    case "+":
                        let sum = String(getSum(equation[mdas-1],equation[mdas+1]));
                        equation.splice(mdas-1,3,sum);
                        console.log(sum);
                        break;
                    case "-":
                        let diff = String(getDiff(equation[mdas-1],equation[mdas+1]));
                        equation.splice(mdas-1,3,diff);
                        console.log(diff);
                        break;
                    default:
                        console.log("error");
                    break;
                }
                sign--; 
            }    
        }else{
            continue;
        }    
    }
    total.textContent = equation;  
}
function insertNewValue(val){
    let newValue = document.createElement("p");

    if(symbol.includes(val)){
        console.log(val+"a");
        newValue.innerHTML = val;
        total.appendChild(newValue);
    }else{
        let lastNode = total.lastElementChild
        let newNumber = document.createTextNode(`${val}`);
        if(!(total.hasChildNodes()) ||  symbol.includes(lastNode.textContent)){
            console.log(val+"s");
            newValue.innerHTML = val;
            total.appendChild(newValue);
        }
        else{
          lastNode.appendChild(newNumber);
          
        }
        
    }

}
let numpad = document.querySelectorAll(".button");
numpad.forEach(npad =>npad.addEventListener('click',function(e){
    console.log(e.target.textContent);
    switch(e.target.textContent){
        case "=":
            getTotal();
            break;
        case "C":
            total.textContent ="0";
            break;
        case "CE":
            let lastNode = total.lastElementChild
            if(total.hasChildNodes() && symbol.includes(lastNode.textContent)){
                total.removeChild(lastNode);
            }
            break;
        default:
            if(total.textContent === "0"){
                total.textContent ="";
            }
            insertNewValue(e.target.textContent);
            break;
    }
   
}))