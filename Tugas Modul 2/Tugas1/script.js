let display = document.getElementById('display');

function clearDisplay() {
    display.value = '';
}

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    if (display.value !== '') {
        display.value += operator;
    }
}

function calculate() {
    try {
        // Menggunakan Function constructor sebagai pengganti eval() untuk alasan keamanan
        display.value = new Function('return ' + display.value)();
    } catch (error) {
        display.value = 'Error';
    }
}
