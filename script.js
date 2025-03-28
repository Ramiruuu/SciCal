const history = [];
const num1Group = document.getElementById('num1-group');
const num2Group = document.getElementById('num2-group');
const operationSelect = document.getElementById('operation');
const resultDiv = document.getElementById('result');
const historyDiv = document.getElementById('history');

operationSelect.addEventListener('change', updateInputs);

function updateInputs() {
    const operation = operationSelect.value;
    if (operation === 'history') {
        num1Group.style.display = 'none';
        num2Group.style.display = 'none';
    } else if (['add', 'subtract', 'multiply', 'divide', 'power'].includes(operation)) {
        num1Group.style.display = 'block';
        num2Group.style.display = 'block';
    } else {
        num1Group.style.display = 'block';
        num2Group.style.display = 'none';
    }
}

function calculate() {
    const operation = operationSelect.value;
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    let result;

    if (operation === 'history') {
        showHistory();
        return;
    }

    if (isNaN(num1) && ['add', 'subtract', 'multiply', 'divide', 'power'].includes(operation)) {
        showResult('Please enter valid numbers');
        return;
    }

    switch (operation) {
        case 'add':
            result = num1 + num2;
            history.push(`${num1} + ${num2} = ${result.toFixed(2)}`);
            break;
        case 'subtract':
            result = num1 - num2;
            history.push(`${num1} - ${num2} = ${result.toFixed(2)}`);
            break;
        case 'multiply':
            result = num1 * num2;
            history.push(`${num1} × ${num2} = ${result.toFixed(2)}`);
            break;
        case 'divide':
            if (num2 === 0) {
                showResult('Error: Division by zero');
                return;
            }
            result = num1 / num2;
            history.push(`${num1} ÷ ${num2} = ${result.toFixed(2)}`);
            break;
        case 'sqrt':
            if (num1 < 0) {
                showResult('Error: Negative number');
                return;
            }
            result = Math.sqrt(num1);
            history.push(`√${num1} = ${result.toFixed(2)}`);
            break;
        case 'power':
            result = Math.pow(num1, num2);
            history.push(`${num1} ^ ${num2} = ${result.toFixed(2)}`);
            break;
        case 'factorial':
            if (num1 < 0 || !Number.isInteger(num1)) {
                showResult('Error: Enter a non-negative integer');
                return;
            }
            result = factorial(num1);
            history.push(`${num1}! = ${result}`);
            break;
        case 'log':
            if (num1 <= 0) {
                showResult('Error: Undefined for non-positive numbers');
                return;
            }
            result = Math.log10(num1);
            history.push(`log(${num1}) = ${result.toFixed(2)}`);
            break;
        case 'sin':
            result = Math.sin(num1 * Math.PI / 180);
            history.push(`sin(${num1}°) = ${result.toFixed(2)}`);
            break;
        case 'cos':
            result = Math.cos(num1 * Math.PI / 180);
            history.push(`cos(${num1}°) = ${result.toFixed(2)}`);
            break;
        case 'tan':
            result = Math.tan(num1 * Math.PI / 180);
            history.push(`tan(${num1}°) = ${result.toFixed(2)}`);
            break;
        case 'c_to_f':
            result = (num1 * 9/5) + 32;
            history.push(`${num1}°C = ${result.toFixed(2)}°F`);
            break;
        case 'm_to_km':
            result = num1 / 1000;
            history.push(`${num1}m = ${result.toFixed(2)}km`);
            break;
    }
    showResult(`Result: ${result.toFixed(2)}`);
}

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

function showResult(message) {
    resultDiv.style.display = 'block';
    resultDiv.textContent = message;
    historyDiv.style.display = 'none';
}

function showHistory() {
    historyDiv.style.display = 'block';
    resultDiv.style.display = 'none';
    historyDiv.innerHTML = history.length > 0 
        ? history.map((item, index) => `<div class="history-item">${index + 1}. ${item}</div>`).join('')
        : 'No history available';
}

// Initialize input visibility
updateInputs();