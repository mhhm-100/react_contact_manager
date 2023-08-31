import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useImmer } from "use-immer";
import { contactContext } from "./context/contactContext";
import { getAllContacts, getAllGroups, createContact, deleteContact, getContact, getGroup, updateContact } from "./server/contactServer";
import { ToastContainer, toast } from "react-toastify";
import style from "./style.module.css";
import _ from "lodash";
import {
  Navbar,
  Contacts,
  Contact,
  AddContact,
  ViewContact,
  EditContact
} from "./components/index";
import { useCallback, useEffect } from "react";

function App() {
  const [loding, setLoding] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filterContact, setFilterContact] = useImmer([]);
  const [groups, setGroups] = useImmer([]);
  const [contact, setContact] = useImmer({});
  const [group, setGroup] = useImmer({});
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoding(prevLoding => !prevLoding);

        const { data: contactData } = await getAllContacts();
        const { data: groupData } = await getAllGroups();

        setContacts(contactData);
        setFilterContact(contactData);
        setGroups(groupData);
        setLoding(prevLoding => !prevLoding);
      } catch (err) {
        console.log(err.masseag);
        setLoding(prevLoding => !prevLoding);
      }
    }

    fetchData()
  }, []);

  const createContactForm = async (values) => {
    try {
      setLoding(prevLoding => !prevLoding);

      const { status, data } = await createContact(values);

      if (status === 201) {
        setContacts((draf) => { draf.push(data) });
        setFilterContact((draf) => { draf.push(data) });
        setLoding(prevLoding => !prevLoding);
        toast.success("create new contact successfull");
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.masseag);
      setLoding(prevLoding => !prevLoding);
      toast.error("create new contact faild");
    }
  }

  const removeContact = async (contactId) => {
    const contactBackup = { ...contacts };
    try {
      setContacts((draf) => draf.filter(c => c.id !== contactId));
      setFilterContact((draf) => draf.filter(c => c.id !== contactId));

      const { status } = await deleteContact(contactId);

      toast.success("delete contact successfull");

      if (status !== 200) {
        setContacts(contactBackup);
        setFilterContact(contactBackup);
        toast.error("delete contact faild");
      }
    } catch (err) {
      console.log(err);
      setContacts(contactBackup);
      setFilterContact(contactBackup);
      toast.error("delete contact faild");
    }
  }


  const search = (query) => {
    setFilterContact((draf) => (
      draf.filter(c => c.fullname.toString().toLowerCase().includes(query.toString().toLowerCase()))
    ))
  };

  let debounceSearch = useCallback(_.debounce(search, 1000), []);

  const serachContact = (query) => {
    if (!query) return setFilterContact([...contacts]);
    debounceSearch(query);
  };

  const findContact = async (contactId) => {
    try {
      setLoding(prevLoding => !prevLoding);

      const { data: dataContact } = await getContact(contactId);
      const { data: dataGroup } = await getGroup(dataContact.group);

      setLoding(prevLoding => !prevLoding);

      return { dataContact, dataGroup };
    } catch (err) {
      console.log(err.masseag);
      setLoding(prevLoding => !prevLoding);
    }
  }

  const editContact = async (values, contactId) => {
    const allContcat = [...contacts];
    try {
      setLoding(prevLoding => !prevLoding);
      let { status, data } = await updateContact(values, contactId);

      if (status === 200) {
        setContacts((draf) => {
          const contactID = draf.findIndex((c) => (c.id === parseInt(contactId)));
          draf[contactID] = { ...data };
        });
        setFilterContact((draf) => {
          const contactID = draf.findIndex((c) => (c.id === parseInt(contactId)));
          draf[contactID] = { ...data };
        });
        setLoding(prevLoding => !prevLoding);
        toast.success("edit contact successfull");
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.masseag);
      setContacts(allContcat);
      setFilterContact(allContcat);
      toast.error("edit contact fail");
      setLoding(prevLoding => !prevLoding);
    }
  }

  return (
    <contactContext.Provider value={{
      contacts,
      loding,
      groups,
      filterContact,
      serachContact,
      contact,
      setContact,
      setLoding,
      setFilterContact,
      setContacts,
      createContact: createContactForm,
      deleteContact: removeContact,
      getContact: findContact,
      editContact,
      group,
      setGroup
    }}>
      <ToastContainer theme="colored" />
      <Navbar />
      <span className={style.background_top}></span>
      <span className={style.background_boutton}></span>
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
      </Routes>
    </contactContext.Provider>
  );
}

export default App;
