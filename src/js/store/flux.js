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
                        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                    }
            
                    const text = await response.text();
            
                    const data = text ? JSON.parse(text) : null;
            
                    return data;
                } catch (error) {
                    setStore({ error: error.message });
                    console.error("Fetch error:", error);
                    return null;
                } finally {
                    setStore({ loading: false });
                }
            },
            
            fetchContacts: async () => {
                const data = await getActions().performFetch(
                    "https://playground.4geeks.com/contact/agendas/Death%20Note"
                );
                if (data) setStore({ contacts: data.contacts });
            },

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
