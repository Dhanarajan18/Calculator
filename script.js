const display = document.getElementById("display");
const buttonscontainer = document.querySelector(".buttons");
const clearBtn = document.getElementById("clear");
const backBtn = document.getElementById("back");
const equalsBtn = document.getElementById("equals");

buttonscontainer.addEventListener("click", (e) => {
    const btn = e.target;
    if(!btn.matches("button"))return;
    const val = btn.getAttribute("data-value");
    if(val !== null){
        appendtodisplay(val);
    }
});

function appendtodisplay(ch){
    if(display.value === "0" ){
        display.value = ch;
    }else{
        display.value += ch;
    }
    
}

clearBtn.addEventListener("click",() => {
    display.value="0";
});

backBtn.addEventListener("click",() => {
    display.value=display.value.slice(0,-1);
});

equalsBtn.addEventListener("click",() => {
    const expr =display.value.trim();
    if(!expr) return;

    if(!/^[0-9+\-*/().\s]+$/.test(expr)){
        display.value = "ERROR" ;
        return;
    }

    try{
        const result = eval(expr);
        if(typeof result === 'number' & !Number.isInteger(result)){
            display.value = parseFloat(result.toFixed(8).toString());
        }else{
            display.value = String(result);
        }
    } catch(err){
        display.value="ERROR";
    }
});

window.addEventListener('keydown', (e) => {
  
  if (e.key >= '0' & e.key <= '9') appendToDisplay(e.key);
  else if ('+-*/().'.includes(e.key)) appendToDisplay(e.key);
  else if (e.key === 'Enter') equalsBtn.click();
  else if (e.key === 'Backspace') backBtn.click();
  else if (e.key === 'Escape') clearBtn.click();
});