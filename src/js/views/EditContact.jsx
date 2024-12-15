import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams(); // Obtener el ID del contacto desde la URL

    // Estados para los campos del formulario
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // Precargar los datos del contacto actual de la Death Note
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            const currentContact = store.contacts.find((contact) => contact.id == id);
            if (currentContact) {
                setName(currentContact.name);
                setEmail(currentContact.email);
                setPhone(currentContact.phone);
                setAddress(currentContact.address);
            } else {
                console.error("Contact not found");
                navigate("/"); // Redirigir si no encuentra el contacto en la Death Note
            }
        }
    }, [id, store.contacts, navigate]);

    // Función para manejar la actualización del contacto de la Death Note
    const handleUpdate = () => {
        const updatedContact = {
            name,
            email,
            phone,
            address,
        };

        actions.updateContact(id, updatedContact);
        alert("Contact updated successfully!");
        navigate("/"); // Redirigir a la página principal
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Update Contact</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput1" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput1"
                        placeholder="Full name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="formGroupExampleInput3"
                        placeholder="Enter phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput4" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput4"
                        placeholder="Enter address"
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                    />
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdate}
                    >
                        Update Contact
                    </button>
                    <Link to="/" className="btn btn-secondary">Back to Contacts</Link>
                </div>
            </form>
        </div>
    );
};

export default EditContact;
