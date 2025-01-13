const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            loading: false,
            error: null,
        },
        actions: {
            performFetch: async (url, options = {}) => {
                try {
                    setStore({ loading: true, error: null });
                    const response = await fetch(url, options);

                    if (!response.ok) {
                        if (response.status === 404 && url.includes("Death Note")) {
                            await getActions().createUser();
                            return { status: 404, data: null };
                        }
                        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                    }

                    const text = await response.text();
                    const data = text ? JSON.parse(text) : null;
                    return { status: response.status, data };
                } catch (error) {
                    setStore({ error: error.message });
                    console.error("Fetch error:", error);
                    return { status: null, data: null };
                } finally {
                    setStore({ loading: false });
                }
            },

            createUser: async () => {
                const result = await getActions().performFetch("https://playground.4geeks.com/contact/agendas/Death Note", {
                    method: "POST",
                });
                if (result.status === 201 || result.status === 200) {
                    await getActions().fetchContacts();
                }
            },

            fetchContacts: async () => {
                const result = await getActions().performFetch(
                    "https://playground.4geeks.com/contact/agendas/Death Note/contacts"
                );
                if (result.status === 404) {
                    await getActions().createUser();
                    await getActions().fetchContacts(); // Reintenta después de crear la agenda
                } else if (result.data) {
                    setStore({ contacts: result.data.contacts });
                }
            },

            addContact: async (contact) => {
                const result = await getActions().performFetch(
                    "https://playground.4geeks.com/contact/agendas/Death Note/contacts",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact),
                    }
                );
                if (result.status === 201) getActions().fetchContacts();
            },

            updateContact: async (id, updatedContact) => {
                const result = await getActions().performFetch(
                    `https://playground.4geeks.com/contact/agendas/Death Note/contacts/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedContact),
                    }
                );
                if (result.status === 200) getActions().fetchContacts();
            },

            deleteContact: async (id) => {
                const store = getStore();
                const updatedContacts = store.contacts.filter(contact => contact.id !== id);
                setStore({ contacts: updatedContacts });

                const result = await getActions().performFetch(
                    `https://playground.4geeks.com/contact/agendas/Death Note/contacts/${id}`,
                    { method: "DELETE" }
                );

                if (!result.status === 200) {
                    console.error("Failed to delete contact from server. Rolling back state.");
                    setStore({ contacts: store.contacts });
                }
            },

            addContactToList: (contact) => {
                const store = getStore();
                setStore({ contacts: [...store.contacts, contact] });
            },

            editContact: async (id, contact) => {
                const result = await getActions().performFetch(
                    `https://playground.4geeks.com/contact/agendas/Death Note/contacts/${id}`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(contact),
                    }
                );
                if (result.status === 200) {
                    const store = getStore();
                    const updatedContacts = store.contacts.map((item) =>
                        item.id === id ? { ...item, ...contact } : item
                    );
                    setStore({ contacts: updatedContacts });
                }
            },
        },
    };
};

export default getState;
