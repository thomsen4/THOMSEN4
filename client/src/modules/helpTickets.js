import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { HelpTicket } from '../resources/data/helpTickets';


@inject(Router, HelpTicket)
export class HelpTickets {
    constructor(router, helpTickets) {
        this.helpTickets = helpTickets;
        this.showHelpTicketEditForm = false;
        this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    }

    async activate() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }

    attached() {
        feather.replace()
    }


    async getHelpTickets() {
        await this.helpTickets.getHelpTickets(this.userObj);
    }


    newHelpTicket() {
        this.helpTicket = {
            title: "",
            status: "new",
            personID: this.userObj._id,
            ownerID: "a1a1a1a1a1a1a1a1a1a1a1a1"
        };

        this.helpTicketContent = {
            personID: this.userObj._id,
            content: '',
        };

        this.showEditForm();
    }

    async editHelpTicket(helpTicket) {
        this.helpTicket = helpTicket;
        this.helpTicketContent = {
            personID: this.userObj._id,
            content: ""
        };
        await this.helpTickets.getHelpTicketsContents(helpTicket._id)
        this.showEditForm();
    }


    logout() {
        this.router.navigate('home');
    }

    async save() {
        if (this.helpTicket && this.helpTicket.title && this.helpTicketContent && this.helpTicketContent.content) {
            if (this.userObj.role !== 'user') {
                this.helpTicket.ownerID = this.userObj._id;
            }
            let helpTicket = { helpTicket: this.helpTicket, content: this.helpTicketContent }
            await this.helpTickets.saveHelpTicket(helpTicket);
            await this.getHelpTickets(this.userObj);
            this.back();
        }
    }


    back() {
        this.showHelpTicketEditForm = false;
    }

    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#title").focus(); }, 500);
    }
}