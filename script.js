class Calculator {
    constructor(previousOperandTexEl, currentOperandTexEl) {
        this.previousOperandTexEl = previousOperandTexEl;
        this.currentOperandTexEl = currentOperandTexEl;
        this.clear();
    }

    clear() {
        this.curr = '';
        this.prev = '';
        this.oper = undefined;
    }

    delete() {
        this.curr = this.curr.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.curr.includes('.')) return;
        this.curr = this.curr.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.curr === '') return;
        if(this.prev !== '' || this.operation !== operation) {
            this.compute();
        }
        this.operation = operation;
        this.prev = this.curr;
        this.curr = '';
    }

    compute() {
        let computation;
        const previous = parseFloat(this.prev);
        const current = parseFloat(this.curr);
        if(isNaN(previous) || isNaN(current)) return;
        switch (this.operation)
        {
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case '*':
                computation = previous * current;
                break;
            case '/':
                computation = previous / current;
                break;
            default:
                return;                
        }
        this.curr = computation;
        this.operation = undefined;
        this.prev = '';
    }

    updateDisplay() {
        this.currentOperandTexEl.innerText = this.curr;
        if(this.operation != null) {
            this.previousOperandTexEl.innerText = `${this.prev} ${this.operation}`;
        }
    }
}

const numberBtn = document.querySelectorAll('[data-num]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalBtn = document.querySelector('[data-equal]');
const clearBtn = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandTexEl= document.querySelector('[data-prev]');
const currentOperandTexEl = document.querySelector('[data-curr]');

const calculator = new Calculator(previousOperandTexEl, currentOperandTexEl);

numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})
