import axios from "axios";
const Server_Url = "http://localhost:9000";

//@desc get All contacts
//@route GET http://localhost:9000/contacts
export const getAllContacts = () => {
    const url = `${Server_Url}/contacts`;
    return axios.get(url);
}

//@desc get contact with contact id
//@route GET http://localhost:9000/contacts/:contactid
export const getContact = (contactId) => {
    const url = `${Server_Url}/contacts/${contactId}`;
    return axios.get(url);
}

//@desc create a new contact
//@route POST http://localhost:9000/contacts
export const createContact = (contact) => {
    const url = `${Server_Url}/contacts`;
    return axios.post(url, contact);
}

//@desc update contact with contact id and contact object
//@route PUT http://localhost:9000/contacts/:contactid
export const updateContact = (contact, contactId) => {
    const url = `${Server_Url}/contacts/${contactId}`;
    return axios.put(url, contact);
}

//@desc delete contact with contact id
//@route PUT http://localhost:9000/contacts/:contactid
export const deleteContact = (contactId) => {
    const url = `${Server_Url}/contacts/${contactId}`;
    return axios.delete(url);
}

//@desc get All Groups
//@route PUT http://localhost:9000/:groups
export const getAllGroups = () => {
    const url = `${Server_Url}/groups`;
    return axios.get(url);
}

//@desc get Group with group id
//@route PUT http://localhost:9000/groups/:groupId
export const getGroup = (groupId) => {
    const url = `${Server_Url}/groups/${groupId}`;
    return axios.get(url);
}
