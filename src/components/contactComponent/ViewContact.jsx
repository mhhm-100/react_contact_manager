import style from "../../style.module.css";
import { contactContext } from "../../context/contactContext";
import { useContext, useEffect } from "react";
import Spinner from '../Spinner';
import { PURPLE } from "../../helpers/colors";
import { Link, useParams } from "react-router-dom";
import { CURRENTLINE } from '../../helpers/colors';

const ViewContact = () => {
    const { loding, getContact, contact, setContact, group, setGroup } = useContext(contactContext);
    const { contactId } = useParams();

    useEffect(() => {
        setContact({});
        setGroup({});

        const fetchData = async () => {
            const { dataContact, dataGroup } = await getContact(contactId);
            setContact(dataContact);
            setGroup(dataGroup);
        };

        fetchData();
    }, [])

    return (
        loding ? <Spinner /> : (
            <>
                <div>
                    <h1 style={{ color: PURPLE }} className={style.Title}>View Contact</h1>
                </div>
                <div className={style.AddContact}>
                    <div className={style.viewImage}>
                        <img style={{ borderColor: PURPLE }} src={contact.photo} alt="" />
                    </div>
                    <div className={style.viewInfo}>
                        <ul className={style.viewInfoList}>
                            <li>
                                <p style={{ color: PURPLE }}>fullname :</p><span>{contact.fullname}</span>
                            </li>
                            <li>
                                <p style={{ color: PURPLE }}>mobile :</p><span>{contact.mobile}</span>
                            </li>
                            <li>
                                <p style={{ color: PURPLE }}>email :</p><span>{contact.email}</span>
                            </li>
                            <li>
                                <p style={{ color: PURPLE }}>job :</p><span>{contact.job}</span>
                            </li>
                            <li>
                                <p style={{ color: PURPLE }}>group :</p><span>{group.name}</span>
                            </li>
                        </ul>
                        <div className={style.viewButtons}>
                            <Link style={{ backgroundColor: PURPLE }} to={`/contacts/edit/${contact.id}`}>
                                Edit
                            </Link>
                            <Link style={{ border: `3px solid ${CURRENTLINE}` }} to="/contacts">
                                Back to contacts
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default ViewContact;