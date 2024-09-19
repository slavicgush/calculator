document.addEventListener("DOMContentLoaded", function () {
  class Calculator {
    constructor(prevOperandTextElement, currOperandTextElement) {
      this.prevOperandTextElement = prevOperandTextElement;
      this.currOperandTextElement = currOperandTextElement;
      this.clear();
    }
    clear() {
      this.currOperand = "";
      this.prevOperand = "";
      this.operation = undefined;
    }
    delete() {
      this.currOperand = this.currOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
      if (number === "." && this.currOperand.includes(".")) return;
      this.currOperand = this.currOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
      // if(operation === "-"){
      //   if(this.currOperand === ""){
      //     this.appendNumber('-');
      //     this.updateDisplay();
      //     return;
      //   }
      // } else{
      //   if(this.currOperand == "") return;
      // }
      
      if (this.prevOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.prevOperand = this.currOperand;
      this.currOperand = "";
    }
    compute() {
      let math;
      const prev = parseFloat(this.prevOperand);
      const curr = parseFloat(this.currOperand);
      if (isNaN(prev) || isNaN(curr)) return;
      switch (this.operation) {
        case "+":
          math = prev + curr;
          break;
        case "-":
          math = prev - curr;
          break;
        case "x":
          math = prev * curr;
          break;
        case "÷":
          math = prev / curr;
          break;
        default:
          return;
      }
      this.currOperand = math;
      this.operation = undefined;
      this.prevOperand = "";
    }
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split(".")[0]);
      const decimalDigits = stringNumber.split(".")[1];

      let intergerDisplay;
      if (isNaN(integerDigits)){
        intergerDisplay = '';
        }
       else {
        
        intergerDisplay = integerDigits.toLocaleString("en", {
          maximumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${intergerDisplay}.${decimalDigits}`;
      } else {
        return intergerDisplay;
      }
    }
    updateDisplay() {
      this.currOperandTextElement.innerText = this.getDisplayNumber(this.currOperand);
      if (this.operation != null) {
        this.prevOperandTextElement.innerText = `${this.prevOperand} ${this.operation}`;
      } else {
        this.prevOperandTextElement.innerText = "";
      }
    }
  }

  const numberButtons = document.querySelectorAll("[data-number]");
  const operationButtons = document.querySelectorAll("[data-operation]");
  const equalsButton = document.querySelector("[data-equals]");
  const deleteButton = document.querySelector("[data-delete]");
  const clearButton = document.querySelector("[data-clear]");
  const prevOperandTextElement = document.querySelector("[data-prev-operand]");
  const currOperandTextElement = document.querySelector("[data-curr-operand]");
  const negativeButton = document.querySelector("[data-negative]");

  const calculator = new Calculator(
    prevOperandTextElement,
    currOperandTextElement
  );

  numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  negativeButton.addEventListener('click',(button) => {
   // calculator.appendNumber('-');
   // calculator.updateDisplay();
  })

  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });

  equalsButton.addEventListener("click", (button) => {
    calculator.compute();
    calculator.updateDisplay();
  });

  clearButton.addEventListener("click", (button) => {
    calculator.clear();
    calculator.updateDisplay();
  });

  deleteButton.addEventListener("click", (button) => {
    calculator.delete();
    calculator.updateDisplay();
  });
});
