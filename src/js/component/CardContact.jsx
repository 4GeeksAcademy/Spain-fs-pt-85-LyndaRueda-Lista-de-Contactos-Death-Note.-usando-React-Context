import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const CardContact = ({ contact }) => {
  const { store, actions } = useContext(Context);

  const eliminarContacto = () => {
    console.log(contact);
    actions.deleteContact(contact.id);
  };

  return (
    <li className="list-group-item d-flex align-items-center">
      <div className="d-flex align-items-center w-100">
        <div className="col-md-2 d-flex justify-content-center">
          <img
            className="rounded-circle"
            src="https://www.lavanguardia.com/peliculas-series/images/serie/backdrop/2006/10/w1280/mOlEbXcb6ufRJKogI35KqsSlCfB.jpg"
            alt="Death Note"
            style={{ width: "64px", height: "64px", objectFit: "cover" }}
          />
        </div>

        {/* Información del contacto */}
        <div className="col-md-7">
          <h5 className="mb-1">{contact.name}</h5>
          <p className="mb-1">
            <i className="fas fa-map-marker-alt me-2"></i>
            {contact.address}
          </p>
          <p className="mb-1">
            <i className="fas fa-phone me-2"></i>
            {contact.phone}
          </p>
          <p className="mb-1">
            <i className="fas fa-envelope me-2"></i>
            {contact.email}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="col-md-3 d-flex justify-content-end">
          <Link
            to={`/editContact/${contact.id}`}
            className="btn btn-light text-warning me-2"
          >
            <i className="fas fa-pencil-alt"></i>
          </Link>

          <button
            className="btn btn-light text-danger"
            data-bs-toggle="modal"
            data-bs-target={`#delete-contact-${contact.id}`}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      <div
        className="modal fade"
        id={`delete-contact-${contact.id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Are you sure?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              If you delete this thing the entire universe will go down!
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Oh no!
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={eliminarContacto}
              >
                Yes baby!
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CardContact;
