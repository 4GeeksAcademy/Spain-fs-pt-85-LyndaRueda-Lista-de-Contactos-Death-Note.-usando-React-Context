import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import CardContact from "../component/CardContact.jsx";

const Contacts = () => {
    const { store, actions } = useContext(Context);

    // Llamar a fetchContacts al montar el componente
    useEffect(() => {
        actions.fetchContacts();
    }, []);

    return (
        <div className="w-75 mx-auto">
            {/* Botón para agregar un nuevo contacto */}
            <div className="d-flex justify-content-end my-3">
                <Link to="/addContact">
                    <button className="btn btn-success">Add New Contact</button>
                </Link>
            </div>

            {/* Mensaje de error */}
            {store.error && (
                <div className="alert alert-danger text-center" role="alert">
                    {store.error}
                </div>
            )}

            {/* Indicador de carga */}
            {store.loading && (
                <div className="text-center mt-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading contacts...</p>
                </div>
            )}

            {/* Lista de contactos */}
            <ul className="list-group mt-3">
                {store.contacts.length > 0 ? (
                    store.contacts.map((contact) => (
                        <CardContact contact={contact} key={contact.id} />
                    ))
                ) : (
                    !store.loading && (
                        <li className="list-group-item text-center">
                            No contacts available. Add a new one!
                        </li>
                    )
                )}
            </ul>
        </div>
    );
};

export default Contacts;
