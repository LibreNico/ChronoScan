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


    constructor(form: any, eventId: string){
        if( form && eventId) {
            this.lastName = form.lastName;
            this.firstName = form.firstName;
            this.gender = form.gender === 'male';
            this.email = form.email;
            this.challenge = form.challenge === true;
            this.birthDate = form.dateOfBirth;
            this.postalCode = form.postalCode;
            this.club = form.club;
            this.event_id=eventId;
        }

    }

  }
  