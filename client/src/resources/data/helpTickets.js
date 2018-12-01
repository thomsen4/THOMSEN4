import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class HelpTicket {
    constructor(data) {
        this.data = data;
        this.HELPTICKET_SERVICE = 'helpTickets';
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
        if userObj.role == 'user' {
            url += '/user/' + userObj._id;
        }

        let response = await this.data.get(url);
        if (!response.error) {
            this.helpTicketsArray = response;
        } else {
            this.helpTicketsArray = [];
        }
    }

    async delete(helpTicket) {
        if (helpTicket && helpTicket._id) {
            await this.data.delete(this.HELPTICKET_SERVICE + '/' + helpTicket._id)
        }
    }

};