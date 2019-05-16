export default class Calculator {
    constructor(levelSpecification, data){
        this.lvlSpecification = levelSpecification;
        this.currentLvl = this.lvlSpecification[0];
        this.data = data;
    }
    getCalculatorControl(){
        this.calculatorPrice = document.getElementsByClassName('calculator__price--elem');
        this.calculatorCounter = document.getElementsByClassName('calculator__count')[0];
        this.calculatorCounterElement = document.getElementsByClassName('calculator__count--elem');
        this.calculatorSelect = document.getElementById('calculator__select');
        this.calculatorOption = document.getElementsByClassName('calculator__option');
        this.popUp = document.getElementsByClassName('pop-up')[0];
    }
    changeSelectedLvl(){
        let currentLvl = {};
        for (let i = 0; i < this.calculatorOption.length; i++){
            if (this.calculatorOption[i].selected){
                this.lvlSpecification.forEach((item) => {
                        if (this.calculatorOption[i].innerHTML === item.lvlName) {
                            currentLvl = item;
                        }
                    }
                );
            }
        }
        this.calculatorCounterElement[1].innerHTML = '1';
        this.currentLvl = currentLvl;
        this.calculatorPrice[0].innerHTML = '$' + currentLvl.price;
    }
    delegateEvent(e){

        if (e.target.innerHTML === '+'){
            this.calculatorCounterElement[1].innerHTML = '' + (+this.calculatorCounterElement[1].innerHTML + 1);
            this.calculatorPrice[0].innerHTML = '$' +
                (this.currentLvl.price * +this.calculatorCounterElement[1].innerHTML).toFixed(2);
        }
        if (e.target.innerHTML === '-'){
            this.calculatorCounterElement[1].innerHTML = '' + (+this.calculatorCounterElement[1].innerHTML - 1);
            this.calculatorPrice[0].innerHTML = '$' +
                (this.currentLvl.price * +this.calculatorCounterElement[1].innerHTML).toFixed(2);
        }
        if (this.calculatorCounterElement[1].innerHTML === '0'){
            this.calculatorCounterElement[1].innerHTML = '1';
            this.calculatorPrice[0].innerHTML = '$' + this.currentLvl.price;
        }

    }
    openPopUp(){
        if (this.popUp.classList.contains('hidden')) {
            this.popUp.classList.remove('hidden');
            this.data.count = this.calculatorCounterElement[1].innerHTML;
            this.data.price = this.calculatorPrice[0].innerHTML;
            this.data.lvl = this.currentLvl.lvlName;
        }
    }
    defineEvent(){
        this.calculatorSelect.addEventListener('change', this.changeSelectedLvl.bind(this));
        this.calculatorCounter.addEventListener('click', this.delegateEvent.bind(this));
        this.calculatorPrice[1].addEventListener('click', this.openPopUp.bind(this));
    }
    clearCalculator(){
        this.calculatorPrice[0].innerHTML = this.currentLvl.price;
        this.calculatorCounterElement[1].innerHTML = 1;
    }
    start(){
        this.getCalculatorControl();
        this.defineEvent();

    }
}

