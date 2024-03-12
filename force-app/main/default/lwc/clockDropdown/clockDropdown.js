import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {
    @api uniqueId = '';
    @api label = '';
    @api options = '';

    inputHandler(event) {
        console.log(this.label);
        console.log(event.target.value);
        let value = event.target.value;
        this.sentEventToParent(value);
    }

    sentEventToParent(value) {
        this.dispatchEvent(new CustomEvent('optionhandler', {
            detail: {
                label: this.label,
                value: value
            }
        }))
    }

    @api reset(value){
        this.template.querySelector('select').value = value;
        this.sentEventToParent(value);
    }
}