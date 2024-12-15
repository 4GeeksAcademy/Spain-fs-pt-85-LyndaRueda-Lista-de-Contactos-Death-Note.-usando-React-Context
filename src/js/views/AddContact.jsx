import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleSaveContact = (e) => {
        e.preventDefault();

        if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
            alert("Please fill in all fields");
            return;
        }

        const payload = { name, phone, email, address };

        if (!id) {
            actions.addContact(payload);
        } else {
            actions.updateContact(id, payload);
        }

        alert("Contact saved successfully!");
        navigate("/");

        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
    };

    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find((contact) => contact.id == id);
    
            if (currentContact) {
                setName(currentContact.name);
                setPhone(currentContact.phone);
                setEmail(currentContact.email);
                setAddress(currentContact.address);
            } else {
                console.error("Contact not found");
                alert("Contact not found. Please try again.");
                navigate("/"); 
            }
        }
    }, [id, store.contacts]);
    
    return (
        <div className="container">
            <h1 className="text-center my-4">
                {!id ? "Add a New Contact For Your Death ⚰️ " : `Editing Contact: ${name}`}
            </h1>
            <form className="container" onSubmit={handleSaveContact}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Save</button>
                    <Link to="/" className="btn btn-secondary">Back to Contacts</Link>
                </div>
            </form>
        </div>
    );
};

export default AddContact;
