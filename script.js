class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    
    clear() {
        this.current = "";
        this.previous = "";
        this.operation = undefined;
    }

    delete() {
        // Implement delete functionality
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        // the below one is for only using to use one dot only
        if (number === '.' && this.current.includes('.')) return;
        this.current = this.current.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.current === "") return
        if (this.previous !== ""){
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr))return 
        switch(this.operation){
            case "+":
                computation = prev + curr
                break
            case "-":
                computation = prev - curr
                break
            case "*":
                computation = prev * curr
                break
            case "/":
                computation = prev / curr
                break
            case "^":
                computation = prev ** curr
                break
            case "%":
                computation = prev % curr
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ""
        // Implement compute functionality
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

    updateDisplay() {
        this.currentTextElement.innerText = 
        this.getDisplayNumber(this.current);
        
        if (this.operation != null){
            this.previousTextElement.innerText = 
            `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        }
        else{
            this.previousTextElement.innerText = ""
        }
        
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-allclear]');
const deleteButton = document.querySelector('[data-deletes]');
const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText); 
        // console.log(button.innerText)
        calculator.updateDisplay();
    });
});


equalsButton.addEventListener("click", button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", button =>{
    calculator.delete()
    calculator.updateDisplay()
})
// Add event listeners for other buttons and implement their functionality
