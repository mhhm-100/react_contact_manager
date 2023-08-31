import { createContext } from "react";

export const contactContext = createContext({
    setLoding: () => { },
    setContacts: () => { },
    setFilterContact: () => { },
    createContact: () => { },
    serachContact: () => { },
    deleteContact: () => { },
    getContact: () => { },
    setContact: () => { },
    setGroup: () => { },
    editContact: () => { },
    contacts: [],
    filterContact: [],
    groups: [],
    loding: {},
    contact: {},
    group: {},
});