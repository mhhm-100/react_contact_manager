import style from "../../style.module.css";
import { BACKGROUND, COMMENT } from "../../helpers/colors";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";

const SearchNavbar = () => {
    const { serachContact } = useContext(contactContext);
    return (
        <div className={style.headerContecntSearch}>
            <input onChange={(event) => serachContact(event.target.value)} type="text" placeholder="search contact" style={{ backgroundColor: BACKGROUND, borderColor: BACKGROUND }} />
            <button style={{ backgroundColor: COMMENT, color: COMMENT }}><i className="bi bi-search"></i></button>
        </div>
    )
}

export default SearchNavbar;