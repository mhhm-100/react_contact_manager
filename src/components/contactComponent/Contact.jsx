import { Link } from "react-router-dom";
import style from "../../style.module.css";
import { PURPLE, CURRENTLINE, RED, BACKGROUND } from "../../helpers/colors";
import notFundImg from "../../assets/person.jpg";

const Contact = ({ value, deleteContact }) => {
    return (
        <div style={{ backgroundColor: CURRENTLINE }} className={style.contact}>
            <div className={style.contactImage}>
                <img src={value.photo ? value.photo : notFundImg} alt="" />
            </div>
            <div className={style.contactInfo}>
                <p style={{ color: PURPLE }}>fullname : <span>{value.fullname}</span></p>
                <p style={{ color: PURPLE }}>email : <span>{value.email}</span></p>
                <p style={{ color: PURPLE }}>mobile : <span>{value.mobile}</span></p>
            </div>
            <div className={style.contactIcon}>
                <button onClick={deleteContact} style={{ backgroundColor: RED }} ><i className="bi bi-trash"></i></button>
                <Link to={`/contacts/${value.id}`} style={{ backgroundColor: PURPLE }}><i className="bi bi-eye"></i></Link>
                <Link to={`/contacts/edit/${value.id}`} style={{ backgroundColor: BACKGROUND }}><i className="bi bi-pencil"></i></Link>
            </div>
        </div>
    )
}

export default Contact;