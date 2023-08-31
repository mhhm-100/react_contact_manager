import style from "../style.module.css";
import { PURPLE } from "../helpers/colors";
import SearchNavbar from "./contactComponent/SearchNavbar";
import Colorfull from "../hoc/Colorfull";

const Navbar = () => {
    return (
        <>
            <div className={style.headerContecntTitle}>
                <p style={{ color: PURPLE }}>Contacts Maneager</p>
            </div>
            <SearchNavbar />
        </>
        // <header>
        //     <div>
        //         <div className={style.headerContecntTitle}>
        //             <p style={{ color: PURPLE }}>Contacts Maneager</p>
        //         </div>
        //         <SearchNavbar/>
        //     </div>
        // </header>
    )
}

export default Colorfull(Navbar);