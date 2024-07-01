import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(5); 
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (contact) => {
    if (editContact) {
      setContacts(
        contacts.map((c) => (c.id === editContact.id ? { ...c, ...contact } : c))
      );
      setEditContact(null);
    } else {
      setContacts([...contacts, { ...contact, id: Date.now() }]);
    }
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const editContactHandler = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setEditContact(contactToEdit);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  return (
    <div className="App">
      <h1>Gestion de Contact</h1>
      <input
        type="text"
        placeholder="Barre de recherche"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactForm onSave={addContact} editContact={editContact} />
      <ContactList
        contacts={currentContacts}
        onDelete={deleteContact}
        onEdit={editContactHandler}
      />
      
      <ul className="pagination">
        {Array(Math.ceil(filteredContacts.length / contactsPerPage))
          .fill()
          .map((_, index) => (
            <li key={index} className="page-item">
              <a
                href="#"
                onClick={() => handlePageChange(index + 1)}
                className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
              >
                {index + 1}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;
