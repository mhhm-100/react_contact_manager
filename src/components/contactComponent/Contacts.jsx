import { Link } from "react-router-dom";
import style from "../../style.module.css";
import { PURPLE, COMMENT } from "../../helpers/colors";
import Contact from "./Contact";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
import notFundGift from "../../assets/no-found.gif";
import Spinner from "../Spinner";

const Contacts = () => {
    const { loding, deleteContact, filterContact } = useContext(contactContext);

    return (
        <main>
            <div className={style.contacts}>
                <div className={style.contactsTitle}>
                    <h1 style={{ color: PURPLE }}>Contacts</h1>
                    <Link to="/contacts/add" style={{ backgroundColor: COMMENT, borderColor: COMMENT }}>
                        Add Contact
                        <i className="bi bi-person-plus"></i>
                    </Link>
                </div>
                <div className={style.contactsItems}>
                    {
                        loding ? <Spinner /> :
                            filterContact.length > 0 ?
                                filterContact.map((c) => (
                                    <Contact key={c.id} value={c} deleteContact={() => deleteContact(c.id)} />
                                )) : (
                                    <div className={style.notFundGift} style={{ textAlign: "center" }}>
                                        <img src={notFundGift} style={{ width: "380px"}} alt="" />
                                        <p style={{ color: PURPLE, fontSize: "1.6rem" }}>not find contact ...</p>
                                    </div>
                                )
                    }
                </div>
            </div>
        </main>
    )
}

export default Contacts;