
const calculatorTemplate = document.createElement('template');
calculatorTemplate.innerHTML = `
    <style>
    @import "static/css/calculator.css"
    </style>
    <div id="calc-container" class="calc-container-light">
        <header>Calculator</header>
        <table>
            <tr>
                <td colspan="4"><input type="text" id="display" style="text-align:right"></td>
            </tr>
            <tr>
                <td><button id="7" value="7">7</button></td>
                <td><button id="8" value="8">8</button></td>
                <td><button id="9" value="9">9</button></td>
                <td><button id="*" value="*">*</button></td>
            </tr>
            <tr>
                <td><button id="4" value="4">4</button></td>
                <td><button id="5" value="5">5</button></td>
                <td><button id="6" value="6">6</button></td>
                <td><button id="-" value="-">-</button></td>
            </tr>
            <tr>
                <td><button id="1" value="1">1</button></td>
                <td><button id="2" value="2">2</button></td>
                <td><button id="3" value="3">3</button></td>
                <td><button id="+" value="+">+</button></td>
            </tr>
            <tr>
                <td><button id="C" value="C">C</button></td>
                <td><button id="0" value="0">0</button></td>
                <td><button id="=" value="=">=</button></td>
                <td><button id="/" value="/">/</button></td>
            </tr>
        </table>
    </div>
`;

class Calculator extends HTMLElement {
    #displayText = '';

    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(calculatorTemplate.content.cloneNode(true));
    }

    connectedCallback(){
        this.shadowRoot.getElementById('1').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('2').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('3').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('4').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('5').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('6').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('7').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('8').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('9').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('0').addEventListener('click', e => this.insertNumber(e));
        this.shadowRoot.getElementById('+').addEventListener('click', e => this.insertOperator(e));
        this.shadowRoot.getElementById('-').addEventListener('click', e => this.insertOperator(e));
        this.shadowRoot.getElementById('*').addEventListener('click', e => this.insertOperator(e));
        this.shadowRoot.getElementById('/').addEventListener('click', e => this.insertOperator(e));
        this.shadowRoot.getElementById('=').addEventListener('click', e => this.evaluate(e));
        this.shadowRoot.getElementById('C').addEventListener('click', e => this.clearDisplay(e));
        this.updateTheme(this.getAttribute('theme'));
    }

    updateTheme(theme){
        let val = "light";
        if(["dark", "light"].indexOf(theme) > -1){
            val = theme
        }
        this.shadowRoot.getElementById('calc-container').className = "calc-container-" + val;
    }

    insertNumber(event){
        this.#displayText = this.#displayText + event.target.value;
        let display = this.shadowRoot.getElementById('display');
        display.value = this.#displayText;
    }

    insertOperator(event){
        if (this.#displayText.length < 1){
            return;
        }
        if (this.#displayText.includes("+")){
            return;
        }
        if (this.#displayText.includes("-")){
            return;
        }
        if (this.#displayText.includes("*")){
            return;
        }
        if (this.#displayText.includes("/")){
            return;
        }
        this.#displayText = this.#displayText + event.target.value;
        this.setDisplayElement();
    }

    evaluate(event){
        const operator = this.getOperator();
        const parts = this.#displayText.split(operator);
        if (this.displayTextIsOperationReady(operator, parts)){
            if (operator == "+"){
                this.#displayText = String(Number(parts[0]) + Number(parts[1]));
            }
            if (operator == "-"){
                this.#displayText = String(Number(parts[0]) - Number(parts[1]));
            }
            if (operator == "*"){
                this.#displayText = String(Number(parts[0]) * Number(parts[1]));
            }
            if (operator == "/"){
                this.#displayText = String(Number(parts[0]) / Number(parts[1]));
            }
            this.setDisplayElement();
        }
    }

    clearDisplay(){
        this.#displayText = "";
        this.setDisplayElement();
    }

    getOperator(){
        if (this.#displayText.includes("+")){
            return "+";
        }
        if (this.#displayText.includes("-")){
            return "-";
        }
        if (this.#displayText.includes("*")){
            return "*";
        }
        if (this.#displayText.includes("/")){
            return "/";
        }
        return "";
    }

    displayTextIsOperationReady(operator, parts) {
        if (parts.length != 2){
            return false;
        }
        if (parts[parts.length-1].length < 1){
            return false;
        }
        return true;
    }

    setDisplayElement(){
        let display = this.shadowRoot.getElementById('display');
        display.value = this.#displayText;
    }
}

window.customElements.define('custom-calc', Calculator);
