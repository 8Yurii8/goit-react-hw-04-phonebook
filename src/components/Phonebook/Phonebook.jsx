import React, { useState, useEffect } from 'react';
import { Filter } from './filter';
import css from './style.module.css';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

const Phonebook = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = localStorage.getItem('contacts');
    return storedContacts ? JSON.parse(storedContacts) : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = ({ name, number }) => {
    if (isContactExist(name, number)) {
      alert(`Name ${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: Date.now(),
      name,
      number,
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const isContactExist = (name, number) => {
    return contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className={css.section}>
      <h1>Phonebook</h1>
      <ContactForm handleAddContact={handleAddContact} />
      {contacts.length > 0 ? (
        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={handleFilterChange} />
          <ContactList
            contacts={contacts}
            filter={filter}
            onDeleteContact={handleDeleteContact}
          />
        </div>
      ) : (
        <p>No contacts yet.</p>
      )}
    </div>
  );
};

export default Phonebook;
