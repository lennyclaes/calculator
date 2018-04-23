let btns;
let inputArr = [];
let calcOutput;
let calcInput;
let calc;

document.addEventListener('click', init);

function init() {
    btns = document.querySelectorAll('.input-btn').forEach(b => {
        b.addEventListener('click', keyPressed);
    });

    calcOutput = document.querySelector('#output-screen');
    calcInput = document.querySelector('#input-screen');
    document.addEventListener('keypress', keyboardPress);
}

let tmpValue = "";

function keyboardPress(e) {
    if(!isNaN(e.key)) {
        tmpValue += e.key;
        calcInput.innerHTML += e.key;
    } else {
        if(e.key == "Enter") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            calculate();
        } else if (e.key == "*") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("*");
            calcInput.innerHTML += "*";
        } else if (e.key == "/") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("/");
            calcInput.innerHTML += "/";
        } else if (e.key == "+") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("+");
            calcInput.innerHTML += "+";
        } else if (e.key == "-") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("-");
            calcInput.innerHTML += "-";
        } else if (e.key == ".") {
            tmpValue = "";
            clearWindow();
        }
    }
}

function keyPressed(e) {
    if(!isNaN(e.target.innerHTML)) {
        tmpValue += e.target.innerHTML;
        calcInput.innerHTML += e.target.innerHTML;
    } else {
        if(e.target.innerHTML == "=") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            calculate();
        } else if (e.target.innerHTML == "*") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("*");
            calcInput.innerHTML += "*";
        } else if (e.target.innerHTML == "/") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("/");
            calcInput.innerHTML += "/";
        } else if (e.target.innerHTML == "+") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("+");
            calcInput.innerHTML += "+";
        } else if (e.target.innerHTML == "-") {
            inputArr.push(parseInt(tmpValue));
            tmpValue = "";
            inputArr.push("-");
            calcInput.innerHTML += "-";
        } else if (e.target.innerHTML == "C") {
            tmpValue = "";
            clearWindow();
        }
    }
}

function calculate() {
    calc = new Calculator(inputArr);
    calcOutput.innerHTML = calc.output;
}

function clearWindow() {
    calcInput.innerHTML = "&nbsp;";
    calcOutput.innerHTML = "&nbsp;";
    inputArr = [];
    calc.clearCalculator();
}