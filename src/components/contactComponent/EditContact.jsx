import style from "../../style.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactContext } from "../../context/contactContext";
import { useContext, useEffect, useRef } from "react";
import Spinner from '../Spinner';
import { contactValidate } from '../../validations/contactValidation';
import { PURPLE, RED } from "../../helpers/colors";
import { Link, useParams } from "react-router-dom";
import { CURRENTLINE, COMMENT } from '../../helpers/colors';
import notFundGift from "../../assets/no-found.gif";

const EditContact = () => {
    const { setLoding,loding, editContact, groups, getContact, contact, setContact, group, setGroup } = useContext(contactContext);
    const { contactId } = useParams();
    const testPictury = useRef(contact.photo);

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

    const getValue = () => {
        let img = document.getElementById("photo").value;
        try{
            setLoding(prevLoding => !prevLoding);
            if(img && img){
                testPictury.current.src = img;
            }else{
                testPictury.current.src = notFundGift;
            }
            setLoding(prevLoding => !prevLoding);
        }catch{
            testPictury.current.src = notFundGift;
            setLoding(prevLoding => !prevLoding);
        }
    }

    return (
        loding ? <Spinner /> : (
            <>
                <div>
                    <h1 style={{ color: PURPLE }} className={style.Title}>Edit Contact</h1>
                </div>
                <div className={style.AddContact}>
                    <Formik initialValues={{
                        fullname: contact.fullname,
                        photo: contact.photo,
                        mobile: contact.mobile,
                        email: contact.email,
                        job: contact.job,
                        group: contact.group
                    }}
                        validationSchema={contactValidate}
                        onSubmit={(values) => {
                            editContact(values, contactId);
                        }}>
                        <Form className={style.form}>
                            <div className={style.formItem}>
                                <Field
                                    style={{ backgroundColor: CURRENTLINE, borderColor: COMMENT }}
                                    name="fullname"
                                    type="text"
                                    placeholder="fullname ..."
                                />
                                <ErrorMessage name="fullname">{(msg) => <span style={{ color: RED }}>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={style.formItem}>
                                {/* <input type="text" /> */}
                                <Field
                                    id="photo"
                                    style={{ backgroundColor: CURRENTLINE, borderColor: COMMENT }}
                                    name="photo"
                                    type="text"
                                    placeholder="photo ..."
                                />
                                <ErrorMessage name="photo">{(msg) => <span style={{ color: RED }}>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={style.formItem}>
                                <Field
                                    style={{ backgroundColor: CURRENTLINE, borderColor: COMMENT }}
                                    name="mobile"
                                    type="number"
                                    placeholder="mobile ..."
                                />
                                <ErrorMessage name="mobile">{(msg) => <span style={{ color: RED }}>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={style.formItem}>
                                <Field
                                    style={{ backgroundColor: CURRENTLINE, borderColor: COMMENT }}
                                    name="email"
                                    type="email"
                                    placeholder="email ..."
                                />
                                <ErrorMessage name="email">{(msg) => <span style={{ color: RED }}>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={style.formItem}>
                                <Field
                                    style={{ backgroundColor: CURRENTLINE, borderColor: COMMENT }}
                                    name="job"
                                    type="text"
                                    placeholder="job ..."
                                />
                                <ErrorMessage name="job">{(msg) => <span style={{ color: RED }}>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={style.formItem}>
                                <Field
                                    style={{ backgroundColor: CURRENTLINE, borderColor: COMMENT }}
                                    name="group"
                                    as="select"
                                >
                                    <option value={group.id}>{group.name}</option>
                                    {
                                        groups.length > 0 && groups.map(g =>
                                            <option key={g.id} value={g.id}>
                                                {g.name}
                                            </option>
                                        )
                                    }
                                </Field>
                                <ErrorMessage name="group">{(msg) => <span style={{ color: RED }}>{msg}</span>}</ErrorMessage>
                            </div>
                            <div className={style.formButtons}>
                                <button style={{ backgroundColor: PURPLE }} type="submit">
                                    Submit
                                </button>
                                <Link style={{ border: `3px solid ${CURRENTLINE}` }} to="/contacts">
                                    Cancel
                                </Link>
                            </div>
                        </Form>
                    </Formik>
                    <div style={{textAlign:"center"}}>
                        <img src={contact.photo} ref={testPictury} alt="" style={{width:"350px",height:"350px",objectFit:"cover", borderRadius:"100%",border:`3px solid ${PURPLE}`}}/>         
                        <button style={{ backgroundColor: PURPLE }} onClick={getValue} className={style.ButtonTest}>test new image</button>
                    </div>
                </div>
            </>
        )
    )
}

export default EditContact;