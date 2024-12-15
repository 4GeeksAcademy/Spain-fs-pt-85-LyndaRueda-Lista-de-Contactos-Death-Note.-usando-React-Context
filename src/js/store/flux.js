const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [], // Lista de contactos
            loading: false, // Indicador de que estan cargando
            error: null,    // Almacena los mensajes de error
        },
        actions: {
            // Función auxiliar para manejar peticiones y errores
            performFetch: async (url, options = {}) => {
                try {
                    setStore({ loading: true, error: null }); // Inicia la carga
                    const response = await fetch(url, options);
                    if (!response.ok) throw new Error("Network response was not ok");
                    return await response.json();
                } catch (error) {
                    setStore({ error: error.message });
                    console.error("Fetch error:", error);
                    return null;
                } finally {
                    setStore({ loading: false }); // Termina la carga
                }
            },

            // Obtiende todos los contactos de la Api Death Note
            fetchContacts: async () => {
                const data = await getActions().performFetch(
                    "https://playground.4geeks.com/contact/agendas/Death%20Note"
                );
                if (data) setStore({ contacts: data.contacts }); // Extrae 'contacts' del objeto recibido
            },

            // Crear un nuevo contacto
            addContact: async (contact) => {
                const success = await getActions().performFetch(
                    "https://playground.4geeks.com/contact/agendas/Death%20Note/contacts",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact),
                    }
                );
                if (success) getActions().fetchContacts();
            },

            // Actualizar un contacto
            updateContact: async (id, updatedContact) => {
                const success = await getActions().performFetch(
                    `https://playground.4geeks.com/contact/agendas/Death%20Note/contacts/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact),
                    }
                );
                if (success) getActions().fetchContacts();
            },

            // Eliminar un contacto
            deleteContact: async (id) => {
                const success = await getActions().performFetch(
                    `https://playground.4geeks.com/contact/agendas/Death%20Note/contacts/${id}`,
                    { method: "DELETE" }
                );
                if (success) getActions().fetchContacts();
            },
        },
    };
};

export default getState;
