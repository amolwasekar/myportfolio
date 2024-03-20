import { LightningElement } from 'lwc';

export default class CurrencyConverterApp extends LightningElement {
    amountInput = '';
    currencyFromValue = 'USD';
    currencyToValue = 'INR';
    result='';
    currencyOptions = [
        { label: 'USD', value: 'USD' },
        { label: 'AUD', value: 'AUD' },
        { label: 'INR', value: 'INR' },
    ]

    inputHandler(event) {
        this.amountInput = event.detail.value;
        console.log('Amount Input : ' + this.amountInput);
        this.result = '';
    }

    handleCurrencyChange(event){
        console.log(event.target.name)
        console.log('choice selected : '+event.target.value)
        if(event.target.name === 'currencyFrom'){
            this.currencyFromValue = event.target.value;
        }else if(event.target.name === 'currencyTo'){
            this.currencyToValue = event.target.value;
        }else{

        }
    }

    calculateCurrency(event) {
        event.preventDefault();
        this.convert();
    }

    async convert() {
        const APIKey = '776016a29a5fd22c2bfdd0e2';
        const url = `https://v6.exchangerate-api.com/v6/${APIKey}/pair/${this.currencyFromValue}/${this.currencyToValue}`;
        console.log('URL to be called : '+url);
        try {
            const data = await fetch(url);
            const jsonData = await data.json();
            console.log('data is '+JSON.stringify(jsonData.conversion_rate))
            this.result = (Number(this.amountInput) * jsonData.conversion_rate).toFixed(2);
            console.log('result is : '+this.result);
        } catch (error) {
            console.log(error)
            this.error="An error occurred. Please try again..."
        }

    }

}