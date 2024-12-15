import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";

const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams(); // Se obtiene el ID desde la URL

    // Estados para manejar los valores del formulario
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    // Guardar contacto
    const handleSaveContact = (e) => {
        e.preventDefault();

        // Validar campos vacíos
        if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
            alert("Please fill in all fields");
            return;
        }

        const payload = { name, phone, email, address };

        // Crear o editar contacto según la presencia del ID
        if (!id) {
            actions.addContact(payload);
        } else {
            actions.updateContact(id, payload);
        }

        // Mensaje de confirmación y navegación
        alert("Contact saved successfully!");
        navigate("/");

        // Limpiar los campos del formulario
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
    };

    // Cargar datos del contacto si se edita
    useEffect(() => {
        if (id && store.contacts.length > 0) {
            // Buscar el contacto actual basado en el ID
            const currentContact = store.contacts.find((contact) => contact.id == id);
    
            // Verificar si el contacto fue encontrado antes de usarlo
            if (currentContact) {
                setName(currentContact.name);
                setPhone(currentContact.phone);
                setEmail(currentContact.email);
                setAddress(currentContact.address);
            } else {
                console.error("Contact not found");
                alert("Contact not found. Please try again.");
                navigate("/"); // Redirige al usuario si no encuentra el contacto
            }
        }
    }, [id, store.contacts]);
    
    return (
        <div className="container">
            <h1 className="text-center my-4">
                {!id ? "Add a New Contact" : `Editing Contact: ${name}`}
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
