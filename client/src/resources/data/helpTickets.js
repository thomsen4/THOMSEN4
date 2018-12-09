import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class HelpTicket {
    constructor(data) {
        this.data = data;
        this.HELPTICKET_SERVICE = 'helpTickets';
        this.HELPTICKETCONTENT_SERVICE = 'helpTicketContent';
    }

    async saveHelpTicket(helpTicket) {
        let serverResponse;
        if (helpTicket) {
            if (helpTicket.helpTicket._id) {
                serverResponse = await this.data.put(helpTicket, this.HELPTICKET_SERVICE);
            } else {
                serverResponse = await this.data.post(helpTicket, this.HELPTICKET_SERVICE);
            }
            return serverResponse;
        }
    }


    async getHelpTickets(userObj) {
        let url = this.HELPTICKET_SERVICE;
        if (userObj.role == 'user') {
            url += '/user/' + userObj._id;
        }

        let response = await this.data.get(url);
        if (!response.error) {
            this.helpTicketsArray = response;
            console.log(this.helpTicketsArray);
        } else {
            this.helpTicketsArray = [];
        }
    }

    async getHelpTicketsContents(id) {
        let url = this.HELPTICKETCONTENT_SERVICE;
        url += '/helpticket/' + id;
        let response = await this.data.get(url);
        if (!response.error) {
            console.log(response);
            this.helpTicketsContentArray = response;
            console.log(this.helpTicketsContentArray);
        } else {
            this.helpTicketsContentArray = [];
        }
    }

    async delete(helpTicket) {
        if (helpTicket && helpTicket._id) {
            await this.data.delete(this.HELPTICKET_SERVICE + '/' + helpTicket._id)
        }
    }

    showEditForm() {
        this.showHelpTicketEditForm = true;
        setTimeout(() => { $("#firstName").focus(); }, 500);
    }

    async uploadFile(files, id) {
        await this.data.uploadFiles(files, this.HELPTICKETCONTENT_SERVICE + "/upload/" + id);
    }
};