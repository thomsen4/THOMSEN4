import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/helpTickets';


@inject(Router, HelpTicket)
export class HelpTickets {
    constructor(router, helpTickets) {
        this.helpTickets = helpTickets;
        this.showTableEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem(userObj));
    }

    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }

    attached() {
        feather.replace()
    }


    async getHelpTickets(userObj) {
        await this.helpTickets.getHelpTickets(userObj);
    }


    newHelpTicket() {
        this.helpTicket = {
            title: "",
            personID: this.userObj._id,
            ownerID: 'InitialAssignment',
            role: "user",
            status: "new"
        };

        this.helpTicketContent = {
            personID: this.userObj._id,
            content: ''
        };

        this.showEditForm();
    }

    editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personID: this.userObj._id,
            content: ''
        };
        await thisHelpTickets.getHelpTicketContents(helpTicket._id)
        this.showEditForm();
    }


    logout() {
        this.router.navigate('home');
    }


    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerID = this.userObj._id
            };
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets();
            this.back();
        }
    }

    back() {
        this.showHelpTicketEditForm = false;
    }

    openEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#title").focus(); }, 500);
    }
}

}
