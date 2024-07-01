
import React from 'react';

const ContactItem = ({ contact, onDelete, onEdit }) => (
  <div className="card mb-2">
    <div className="card-body">
      <h5 className="card-title">{contact.name}</h5>
      <p className="card-text">{contact.phone}</p>
      <button onClick={() => onEdit(contact.id)} className="btn btn-warning me-2">Modifier</button>
      <button onClick={() => onDelete(contact.id)} className="btn btn-danger">Supprimer</button>
    </div>
  </div>
);

export default ContactItem;
