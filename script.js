class Calculator {

   constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
   }

   clear() {

      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
   }

   back() {

      this.currentOperand = this.currentOperand.toString().slice(0, -1)
   }

   appendNumber(number) 
   {
   if (number === '.' && this.currentOperand.includes('.'))
         return
      this.currentOperand = this.currentOperand.toString() + number.toString()
   }

   chooseOperation(operation) {

      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
         this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
   }

   compute() {

      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
         case '+':
            computation = prev + current
            break
         case '-':
            computation = prev - current
            break
         case '*':
            computation = prev * current
            break
         case '/':

            computation = prev / current

            break
         default:
            return
      }

      this.currentOperand = parseFloat(computation.toFixed(8))
      this.operation = undefined
      this.previousOperand = ''
   }
   getDisplayNumber(number) {

      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
         integerDisplay = ''
      } else {
         integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 8
         })
         if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
         } else {
            return integerDigits
         }
      }

      const floatNumber = parseFLoat(number)
      if (isNaN(floatNumber)) return ''
      return number.toLocaleString('en')
   }
   
   updateDisplay() {

      this.currentOperandTextElement.innerText = this.currentOperand
      if (this.currentOperandTextElement.innerText === 'Infinity') {
         this.currentOperandTextElement.innerText = 'error'
      }
      if (this.operation != null) {
         this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
      } else {
         this.previousOperandTextElement.innerText = ''
      }
   }
}

const allButtons = document.querySelectorAll('.item')
const numberButtons = document.querySelectorAll('.numbs')
const operationButtons = document.querySelectorAll('.operation')
const equalButton = document.querySelector('.equal')
const backButton = document.querySelector('.back')
const cleanButton = document.querySelector('.clean')
const previousOperandTextElement = document.querySelector('.previous-operand')
const currentOperandTextElement = document.querySelector('.current-operand')
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {

   document.addEventListener('keydown', (event) => {
      if (button.innerText == event.key) {
         calculator.appendNumber(button.innerText)
         calculator.updateDisplay()
      }

   })
   button.addEventListener('click', () => {

      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()

   })
})

operationButtons.forEach(button => {

   document.addEventListener('keydown', (event) => {
      if (button.innerText == event.key) {
         calculator.chooseOperation(button.innerText)
         calculator.updateDisplay()
         
      }

   })

   button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
   })
})

equalButton.addEventListener('click', () => {
   calculator.compute()
   calculator.updateDisplay()
})

cleanButton.addEventListener('click', () => {
   calculator.clear()
   calculator.updateDisplay()
})

backButton.addEventListener('click', () => {
   calculator.back()
   calculator.updateDisplay()
})


document.addEventListener('keydown', (event) => {
   if (event.key == 'Enter') {
      calculator.compute()
      calculator.updateDisplay()
   }
   if (event.key == 'Backspace') {
      calculator.back()
      calculator.updateDisplay()
   }
   if (event.key == 'Escape') {
      calculator.clear()
      calculator.updateDisplay()
   }

})