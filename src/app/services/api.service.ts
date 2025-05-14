import {inject, Injectable} from '@angular/core';
import { Contact } from '../model/contact.model';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpClient = inject(HttpClient);
  // private delay = 1000; // Simulate network delay
  contacts: BehaviorSubject<Contact[]> = new  BehaviorSubject<Contact[]>([]);
  constructor() {
    this.getContacts().subscribe(c => {this.contacts.next(c)});
  }
  //   = [
  //   {
  //     id: '1',
  //     name: 'Bibbye Gutcher',
  //     phone: '885-131-9176',
  //     email: 'bgutcher0@smh.com.au',
  //   },
  //   {
  //     id: '2',
  //     name: 'John Smith',
  //     phone: '555-123-4567',
  //     email: 'john.smith@email.com',
  //   },
  //   {
  //     id: '3',
  //     name: 'Sarah Johnson',
  //     phone: '555-234-5678',
  //     email: 'sarah.j@email.com',
  //   },
  //   {
  //     id: '4',
  //     name: 'Michael Williams',
  //     phone: '555-345-6789',
  //     email: 'mwilliams@email.com',
  //   },
  //   {
  //     id: '5',
  //     name: 'Emma Brown',
  //     phone: '555-456-7890',
  //     email: 'emma.b@email.com',
  //   },
  //   {
  //     id: '6',
  //     name: 'James Davis',
  //     phone: '555-567-8901',
  //     email: 'james.d@email.com',
  //   },
  //   {
  //     id: '7',
  //     name: 'Lisa Garcia',
  //     phone: '555-678-9012',
  //     email: 'lisa.g@email.com',
  //   },
  //   {
  //     id: '8',
  //     name: 'David Miller',
  //     phone: '555-789-0123',
  //     email: 'david.m@email.com',
  //   },
  //   {
  //     id: '9',
  //     name: 'Jennifer Wilson',
  //     phone: '555-890-1234',
  //     email: 'jwilson@email.com',
  //   },
  //   {
  //     id: '10',
  //     name: 'Robert Taylor',
  //     phone: '555-901-2345',
  //     email: 'rtaylor@email.com',
  //   },
  //   {
  //     id: '11',
  //     name: 'Maria Martinez',
  //     phone: '555-012-3456',
  //     email: 'maria.m@email.com',
  //   },
  //   {
  //     id: '12',
  //     name: 'Daniel Anderson',
  //     phone: '555-123-7890',
  //     email: 'dan.a@email.com',
  //   },
  //   {
  //     id: '13',
  //     name: 'Patricia Thomas',
  //     phone: '555-234-8901',
  //     email: 'pat.t@email.com',
  //   },
  //   {
  //     id: '14',
  //     name: 'Kevin Lee',
  //     phone: '555-345-9012',
  //     email: 'kevin.l@email.com',
  //   },
  //   {
  //     id: '15',
  //     name: 'Nancy White',
  //     phone: '555-456-0123',
  //     email: 'nancy.w@email.com',
  //   },
  //   {
  //     id: '16',
  //     name: 'Christopher Moore',
  //     phone: '555-567-1234',
  //     email: 'chris.m@email.com',
  //   },
  //   {
  //     id: '17',
  //     name: 'Amanda Jackson',
  //     phone: '555-678-2345',
  //     email: 'amanda.j@email.com',
  //   },
  //   {
  //     id: '18',
  //     name: 'Joseph Martin',
  //     phone: '555-789-3456',
  //     email: 'joe.m@email.com',
  //   },
  //   {
  //     id: '19',
  //     name: 'Michelle Thompson',
  //     phone: '555-890-4567',
  //     email: 'michelle.t@email.com',
  //   },
  //   {
  //     id: '20',
  //     name: 'Ryan Rodriguez',
  //     phone: '555-901-5678',
  //     email: 'ryan.r@email.com',
  //   },
  //   {
  //     id: '21',
  //     name: 'Sandra Lewis',
  //     phone: '555-012-6789',
  //     email: 'sandra.l@email.com',
  //   },
  // ];

  private generateUniqueId(): string {
    let existingIds: number[] = []
    this.contacts.asObservable().pipe(
      map(contacts=> contacts.map(c => parseInt(c.id)))
    ).subscribe(ids => {
      existingIds = ids;
      console.log(ids);
    });
    console.log(existingIds);

    // ((c: Observable<Contact>):Contact => {
    //   map(c) => parseInt(c.id)
    // });
    const maxId = Math.max(...existingIds);
    return (maxId + 1).toString();
  }

  getContacts(): Observable<Contact[]> {
    // await this.simulateDelay();
    // return [...this.contacts];
    return this.httpClient.get<Contact[]>(`http://localhost:3000/contacts`);
  }

  addContact(contact: Contact): Observable<Contact> {
    // await this.simulateDelay();
    const newContact = {
      ...contact,
      id: this.generateUniqueId(),
    };
    // this.contacts = [newContact, ...this.contacts];
    // return newContact;
    return this.httpClient.post<Contact>(`http://localhost:3000/contacts`, newContact);
  }

  deleteContact(id: string): Observable<void> {
    // await this.simulateDelay();
    // this.contacts = this.contacts.filter((c) => c.id !== id);
    return this.httpClient.delete<void>(`http://localhost:3000/contacts/${id}`);
  }

  updateContact(updatedContact: Contact): Observable<Contact> {
    // await this.simulateDelay();
    // const index = this.contacts.findIndex((c) => c.id === id);
    // if (index === -1) {
    //   throw new Error('Contact not found');
    // }
    // this.contacts[index] = updatedContact;
    // return updatedContact;
    return this.httpClient.put<Contact>(`http://localhost:3000/contacts/${updatedContact.id}`, updatedContact);
  }

  getContact(id: string): Observable<Contact> {
    // await this.simulateDelay();
    // const contact = this.contacts.find((c) => c.id === id);
    // if (!contact) {
    //   throw new Error('Contact not found');
    // }
    // return contact;
    return this.httpClient.get<Contact>(`http://localhost:3000/contacts/${id}`);
  }

  // private simulateDelay(): Promise<void> {
  //   return new Promise((resolve) => setTimeout(resolve, this.delay));
  // }
}
