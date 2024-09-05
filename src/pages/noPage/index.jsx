import { Link } from "react-router-dom";
import style from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function NoPage() {
  return (
    <>
      <div className={style.nav}>
        <nav>
          <div className={style.navlink}>
            <Link to="/admin" className={style.link}>
              Home
            </Link>
            /<Link>Error 404</Link>
          </div>
        </nav>
      </div>
      <div className={style.errPage}>
        <div className={style.title}>
          <h1 className={style.heading}>404</h1>
          <p className={style.paraqraf}>Opps! Page not found</p>
          <p className={style.errorTitle}>
            Seems you're looking for something that doesn't exist. If you think
            this is a problem with us, please tell us .
          </p>
          <div className={style.btnBack}>
            <button>
              <Link to="/admin" className={style.link}>
                <FontAwesomeIcon icon={faHome} /> Back to home
              </Link>
              
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NoPage;
