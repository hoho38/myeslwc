/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CustomerTile extends NavigationMixin(LightningElement)
{
    @api customer;
    @api object;
    @track navRef;

    get icon() {
        return 'standard:' + this.object.toLowerCase();
    }

    get alttext() {
        return (
            'Navigate to ' +
            this.object +
            ' record detail for ' +
            this.customer.name
        );
    }

    connectedCallback() {
        this.customerRecordRef = {
            type: 'standard__recordPage',
            attributes: {
                recordId: this.customer.Id,
                actionName: 'view',
            },
        };

        this[NavigationMixin.GenerateUrl](this.customerRecordRef).then(
            url => (this.navRef = url),
        );
    }

    handleClick() {
        debugger;
        console.log('here!  1');

        const clickevt = new CustomEvent('customerselect', {
            detail: {
                customerId: this.customer.Id,
                sobjectType: this.object,
                state: this.customer.state,
            },
        });

        this.dispatchEvent(clickevt);
    }
}