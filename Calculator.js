function executionObjectClass(a, b, c) {
    this.index = null;
    this.num1 = a;
    this.num2 = b;
    this.operand = c;
}

/**
 * 
 * @param {[int]|[function]} input the input the calculator has to process
 */
function Calculator(input) {
    this.input = [];
    this.output = 0;
    this.readInput(input);
}

Calculator.prototype.readInput = function(inputArray) {
    console.log(inputArray);
    if(inputArray != null && inputArray.length > 0) {
        let executionOrder = [];
        let executeObject = {
            "num1": null,
            "num2": null,
            "operand": null
        };

        inputArray.forEach(x => {
            if(!isNaN(x)) {
                if(executeObject.num1 == null) {
                    executeObject.num1 = x;
                } else if(executeObject.num2 == null) {
                    executeObject.num2 = x;
                } else {
                    console.warn('Something went wrong...');
                    return;
                }
            } else {
                if(typeof x != NaN && typeof x != 'function') {
                    if(executeObject.operand == null) {
                        executeObject.operand = x;
                    }
                }
            }

            if(executeObject.num1 != null && executeObject.num2 != null && executeObject.operand != null) {
                executionOrder.push(new executionObjectClass(executeObject.num1, executeObject.num2, executeObject.operand));
                executeObject.num1 = null;
                executeObject.num2 = null;
                executeObject.operand = null;
            }
        });
        this.input.push.apply(this.input, executionOrder);
        this.executeInput(executionOrder, false);

    } else {
        console.warn("No input is given");
        this.output = "ERROR: NO VALUE ASSIGNED";
    }
}

let orderedExecution = [];

Calculator.prototype.executeInput = function(arr, ignore) {
    if(arr.length > 0 && Array.isArray(arr)) {
        for(let i = 0; i < arr.length; i++) {
            switch(arr[i].operand) {
                case "*":
                arr[i].operand = this.multiply;
                break;
                case "/":
                arr[i].operand = this.divide;
                break;
                case "+":
                arr[i].operand = this.add;
                break;
                case "-":
                arr[i].operand = this.substract;
                break;
            }
            
            if(!ignore) {
                if(arr[i].operand == this.multiply || arr[i].operand == this.divide) {
                    arr[i].index = i;
                    orderedExecution.push(arr.splice(i, 1)[0]);
                }
            } else {
                arr[i].index = i;
                orderedExecution.push(arr.splice(i, 1)[0]);
            }
        };
    }

    if(orderedExecution.length == this.input.length || arr.length == 0) {
        for(let i = 0; i < orderedExecution.length; i++) {
            this.output += orderedExecution[i].operand(orderedExecution[i].num1, orderedExecution[i].num2);
            console.log(this.output);
        }
    } else {
        this.executeInput(arr, true);
    }
    
}

Calculator.prototype.add = function(a, b) {
    return a + b;
}

Calculator.prototype.substract = function(a, b) {
    return a - b;
}

Calculator.prototype.multiply = function(a, b) {
    return a * b;
}

Calculator.prototype.divide = function(a, b) {
    return a / b;
}

Calculator.prototype.clearCalculator = function() {
    this.input = [];
    this.output = 0;
}