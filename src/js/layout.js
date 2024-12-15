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
                <Route path="/" element={<Contacts />} />

                <Route path="/addContact" element={<AddContact />} />

                <Route path="/editContact/:id" element={<EditContact />} />

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
