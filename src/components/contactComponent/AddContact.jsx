import style from "../../style.module.css";
import img from "../../assets/man-taking-note.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
import Spinner from '../Spinner';
import { contactValidate } from '../../validations/contactValidation';
import { PURPLE, RED } from "../../helpers/colors";
import { Link } from "react-router-dom";
import { CURRENTLINE, COMMENT } from '../../helpers/colors';

const AddContact = () => {
    const { loding, createContact, groups } = useContext(contactContext);

    return (
        loding ? <Spinner /> : (
            <>
                <div>
                    <h1 style={{color:PURPLE}} className={style.Title}>Add Contact</h1>
                </div>
                <div className={style.AddContact}>
                    <Formik initialValues={{
                        fullname: "",
                        photo: "",
                        mobile: "",
                        email: "",
                        job: "",
                        group: ""
                    }}
                        validationSchema={contactValidate}
                        onSubmit={(values) => {
                            createContact(values);
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
                                <Field
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
                                    <option value="">chose a group ...</option>
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
                    <div className={style.AddContactImg}>
                        <img src={img} alt="" />
                    </div>
                </div>
            </>
        )
    )
}

export default AddContact;