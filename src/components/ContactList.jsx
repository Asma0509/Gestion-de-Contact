import React from 'react';

const ContactList = ({ contacts, onDelete, onEdit }) => {
  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact.id} className="card mb-3">
          <div className="card-body">
            
            <h5 className="card-title">{contact.name}</h5>
            <p className="card-text">Phone: {contact.phone}</p>
            <p className="card-text">Email: {contact.email}</p>
            <p className="card-text">Address: {contact.address}</p>
            <button onClick={() => onEdit(contact.id)} className="btn btn-warning mr-2">Modifier</button>
            <button onClick={() => onDelete(contact.id)} className="btn btn-danger">Supprimer</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
