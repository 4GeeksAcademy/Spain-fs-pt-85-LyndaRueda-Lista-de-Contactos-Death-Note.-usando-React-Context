import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contacts from "./views/Contacts.jsx";
import AddContact from "./views/AddContact.jsx";
import EditContact from "./views/EditContact.jsx";
import injectContext from "./store/appContext";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <BrowserRouter basename={basename}>
            <Routes>
                {/* Página principal: lista de contactos de la Death Note */}
                <Route path="/" element={<Contacts />} />

                {/* Agregar un nuevo contacto para la Death Note */}
                <Route path="/addContact" element={<AddContact />} />

                {/* Editar un contacto existente en la Death Note */}
                <Route path="/editContact/:id" element={<EditContact />} />

                {/* Página 404 - Ruta no encontrada por error*/}
                <Route path="*" element={
                    <div className="container text-center mt-5">
                        <h1 className="display-4">404</h1>
                        <p className="lead">Page Not Found</p>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
