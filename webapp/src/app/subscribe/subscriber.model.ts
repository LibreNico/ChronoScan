import { Event } from '../event/event.model'; 

export class Subscriber {
    lastName: string;
    firstName: string;
    gender: boolean;
    email: string;
    club: string;
    challenge: boolean;
    event_id: string;
    birthDate: string;
    postalCode: number;
    bankTransferId: string;
    active: boolean;

    constructor(form: any, event: Event){
        this.lastName = form.lastName;
        this.firstName = form.firstName;
        this.gender = form.gender === 'Male';
        this.email = form.email;
        this.challenge = form.challenge;
        this.birthDate = form.birthDate;
        this.postalCode = form.postalCode;
        this.event_id=event._id;
    }
  }
  