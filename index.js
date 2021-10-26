let total = document.querySelector('.result');
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
    const symbol= ["x","/","+","-"]
    for(let counter = 0; counter < symbol.length;counter++){
        let mdas = equation.findIndex(a => a === symbol[counter]); 
        if(!(mdas === -1)){
            let sign = equation.filter(sign=>sign === symbol[counter]).length; 
            while(sign != 0){  
                switch(symbol[counter]){
                    case "x":
                        let prod = getProd(equation[mdas-1],equation[mdas+1]);
                        equation.splice(mdas-1,3);
                        equation.unshift(prod); 
                        console.log(prod);
                        break;
                    case "/":
                        let quo = getQuo(equation[mdas-1],equation[mdas+1]);
                        equation.splice(mdas-1,3);
                        equation.unshift(quo);
                        console.log(quo);
                        break;
                    case "+":
                        let sum = getSum(equation[mdas-1],equation[mdas+1]);
                        equation.splice(mdas-1,3);
                        equation.unshift(sum);
                        console.log(sum);
                        break;
                    case "-":
                        let diff = getDiff(equation[mdas-1],equation[mdas+1]);
                        equation.splice(mdas-1,3);
                        equation.unshift(diff);
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
    console.log(equation+"final");   
}
function insertNewValue(val){
    let newValue = document.createElement("p");

    if(val == "+" || val== "-" || val== "/" || val== "x"){
        console.log(val+"a");
        newValue.innerHTML = val;
        total.appendChild(newValue);
    }else{
        let lastNode = total.lastElementChild
        let newNumber = document.createTextNode(`${val}`);
        if(!(total.hasChildNodes()) ||  lastNode.textContent == "+" || lastNode.textContent == "-" || lastNode.textContent== "/" || lastNode.textContent== "x" ){
            console.log(val+"s");
            newValue.innerHTML = val;
            total.appendChild(newValue);
        }
        else{
            console.log(total.lastElementChild.textContent);
           total.lastElementChild.appendChild(newNumber);
          
        }
        
    }

}
let numpad = document.querySelectorAll(".button");
numpad.forEach(npad =>npad.addEventListener('click',function(e){
    if(e.target.textContent === "="){
        getTotal();
    }else{
        if(total.textContent === "0"){
            total.textContent ="";
        }
        insertNewValue(e.target.textContent);
    }
}))