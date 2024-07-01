import React, { useState, useEffect } from 'react';

const ContactForm = ({ onSave, editContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setPhone(editContact.phone);
      setEmail(editContact.email);
      setAddress(editContact.address);
      setProfilePhoto(editContact.profilePhoto);
    }
  }, [editContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, phone, email, address, profilePhoto });
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setProfilePhoto(null);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3" style={{ backgroundImage: 'url(/path/to/background-image.jpg)', backgroundSize: 'cover', padding: '20px', borderRadius: '10px' }}>
      <div className="form-group">
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          className="form-control mb-2"
          pattern="[A-Za-z\s]+" 
          title="Veuillez saisir uniquement des lettres et des espaces"
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Phone" 
          className="form-control mb-2"
          pattern="[0-9]+" 
          title="Veuillez saisir uniquement des chiffres"
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          className="form-control mb-2"
          required 
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Address" 
          className="form-control mb-2"
          required 
        />
      </div>
      
      <button type="submit" className="btn btn-primary">Enregistrer</button>
    </form>
  );
};

export default ContactForm;
