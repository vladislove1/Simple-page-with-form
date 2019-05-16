let levelSpecification = [
        {lvlId: 1, lvlName: 'Hardcore',  price: 10.99},
        {lvlId: 2, lvlName: 'Medium', price: 7.99},
        {lvlId: 3, lvlName: 'Easy', price: 4.99},
    ];
class Calculator {
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

class popUpForm {
    constructor(data){
        this.countryCodes = [
            {name: "Ukr", code: '+38', path: 'files/ukr.png'},
            {name: "Fr", code: '+33', path: 'files/fr.png'},
            {name: "UK", code: '+44', path: 'files/uk.jpg'},

        ];
        this.data = data;
        this.currentCountry = this.countryCodes[0];
    }
    getInputControl(){
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.confirmBtn = document.getElementsByClassName('pop-up__form-button')[0];
        this.popUp = document.getElementsByClassName('pop-up')[0];
        this.succes = document.getElementsByClassName('success')[0];
        this.errorUser = document.getElementsByClassName('pop-up__custom-input');
        this.selectCountry = document.getElementById('select-country');
        this.selectCountryOption = document.getElementsByClassName('select-country--opt');
        this.flagBlock = document.getElementsByClassName('flag')[0];

    }
    validateName(){
        this.nameInput.value = this.nameInput.value.replace(/ /g, "");
        if (this.nameInput.value.match(/[^0-9A-Za-zа-яА-Я]/g)){
            this.errorUser[0].style.borderColor = 'red';
            return false;
        }
        if (this.nameInput.value.length < 3){
            this.errorUser[0].style.borderColor = 'red';
            return false;
        }
        this.errorUser[0].style.borderColor = 'green';
        return true

    }
    validateEmail(){
        if (!this.emailInput.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)){
            this.errorUser[1].style.borderColor = 'red';
            return false;
        }
        this.errorUser[1].style.borderColor = 'green';
        return true
    }
    validatePhone(){
        if (this.phoneInput.value.slice(1).match(/[^0-9]/g)){
            this.errorUser[2].style.borderColor = 'red';
            return false;
        }
        if (this.phoneInput.value.length < 13){
            this.errorUser[2].style.borderColor = 'red';
            return false;
        }
        this.errorUser[2].style.borderColor = 'green';
        return true;
    }
    validateForm(){
        let valid = 0;
        if (this.validateName()) {
            valid++;
        }
        if (this.validateEmail()){
            valid++;
        }
        if (this.validatePhone()){
            valid++;
        }
        if (valid === 3){
            this.popUp.classList.add('hidden');
            this.succes.classList.remove('hidden');
            this.data.name = this.nameInput.value;
            this.data.email = this.emailInput.value;
            this.data.phone = this.phoneInput.value;
            this.data.success = true;
        }
    }
    changeCountryCode(){
        let currentCountry = {};
        for (let i = 0; i < this.selectCountryOption.length; i++){
            if (this.selectCountryOption[i].selected){
                this.countryCodes.forEach((item) => {
                        if (this.selectCountryOption[i].innerHTML === item.name) {
                            currentCountry = item;
                        }
                    }
                );
            }
        }
        this.currentCountry = currentCountry;
        this.flagBlock.style.background = 'url('+ currentCountry.path +') no-repeat 16px center';
        this.phoneInput.value = currentCountry.code;
    }
    defineEvent(){
        this.confirmBtn.addEventListener('click', this.validateForm.bind(this));
        this.selectCountry.addEventListener('change', this.changeCountryCode.bind(this));
        this.phoneInput.addEventListener('keydown', (e)=>{
            let input = e.target;

            if(input.value.length === 3 && e.key === 'Backspace') {
                e.preventDefault();
            }
        })
    }
    clearInput(){
        this.nameInput.value = '';
        this.emailInput.value = '';
        this.phoneInput.value = this.currentCountry.code;
        this.errorUser[0].style.borderColor = 'grey';
        this.errorUser[1].style.borderColor = 'grey';
        this.errorUser[2].style.borderColor = 'grey';

    }
    start(){
        this.getInputControl();
        this.defineEvent();
    }
}

class App {
    constructor(levelSpecification){
        this.mainData = [];
        this.calculatorData = {count: 1, price: 10.99, lvl: 'Hardcore'};
        this.formData = {name: '', email: '', phone: '', success: false};
        this.calculator = new Calculator(levelSpecification, this.calculatorData);
        this.popUpForm = new popUpForm(this.formData);
        this.popUpTarget = document.getElementsByClassName('pop-up__close');
        this.popUp = document.getElementsByClassName('pop-up')[0];
        this.success = document.getElementsByClassName('success')[0];
        this.confirmBtn = document.getElementsByClassName('pop-up__form-button')[0];
        this.hideBlock = document.getElementsByClassName('hide-content__close')[0];
        this.block = document.getElementsByClassName('hide')[0];

    }
    closePopUp(e){
        if (e.target.classList.contains('pop-up__close--form')){
            if (!this.popUp.classList.contains('hidden')){
                this.popUp.classList.add('hidden');
            }
        }
        if (e.target.classList.contains('pop-up__close--success')){
            if (!this.success.classList.contains('hidden')){
                this.success.classList.add('hidden');
                this.popUpForm.clearInput();
                this.calculator.clearCalculator();
            }
        }
    }
    getData(){
        setTimeout(()=>{
            let data = {
                count: this.calculatorData.count,
                price: this.calculatorData.price,
                lvl: this.calculatorData.lvl,
                name: this.formData.name,
                email: this.formData.email,
                phone: this.formData.phone
            };
            if (this.formData.success === true) {
                this.mainData.push(data);
                this.formData.success = false;
            }
            console.log(this.mainData);
        }, 1000);

    }
    defineEvent(){
        let i = 0;

        this.confirmBtn.addEventListener('click', this.getData.bind(this));
        this.hideBlock.addEventListener('click', () => {
            this.block.classList.add('hide-block');
        });
        while (i < this.popUpTarget.length){
            this.popUpTarget[i].addEventListener('click', this.closePopUp.bind(this));
            i++;
        }
        this.popUp.addEventListener('click', (e) => {
            let div = e.target;

            if (div.className === 'pop-up'){
                div.classList.add('hidden');
            }

        });
        this.success.addEventListener('click', (e) => {
            let div = e.target;

            if (div.className === 'success'){
                div.classList.add('hidden');
                this.popUpForm.clearInput();
                this.calculator.clearCalculator();
            }
            if (div.classList.contains('pop-up__close--success')) {
                this.popUpForm.clearInput();
                this.calculator.clearCalculator();
                this.success.classList.add('hidden');
            }

        });

    }
    start(){
        this.defineEvent();
        this.calculator.start();
        this.popUpForm.start();
    }
}


let app = new App(levelSpecification);
app.start();

