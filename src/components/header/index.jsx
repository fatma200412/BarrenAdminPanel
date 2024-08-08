import { Link, useNavigate } from "react-router-dom";
import style from "./index.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/images/header/logo-icon.svg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MultipleStopIcon from "@mui/icons-material/MultipleStop";
import ExploreIcon from "@mui/icons-material/Explore";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../layout/navbar";
import { AdminAuth } from "../../context/adminAuth";
import axios from "axios";
import { Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/adminSlice";

const ModalStyle = {
  position: "absolute",
  top: "150px",
  right: "0",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  height: "auto",
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
};

function Header({ toggleNavbar, isNavbarOpen }) {
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  console.log(user);

  const [mode, setMode] = useState(false);
  // const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  // const [profileInfo, setProfileInfo] = useState({});
  // const [isModalOpen, setIsModalOpen] = useState(false); // Modal durumu
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(profileInfo.id);

  const navigate = useNavigate();
  // console.log(profileInfo);

  // useEffect(() => {
  //   axios(`https://669b5625276e45187d352b89.mockapi.io/users/${user.id}`)
  //     .then((res) => {
  //       setProfileInfo(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching profile info:", error);
  //     });
  // }, []);

  function changeMode(e) {
    setMode(!mode);
    if (!mode) {
      e.target.classList.replace("light", "dark");
      document.body.style.backgroundColor = "black";
      header.style.backgroundColor = "black";
      setMode(mode);
    } else {
      e.target.classList.replace("dark", "light");
      document.body.style.backgroundColor = "white";
      setMode(!mode);
    }
  }

  // function toggleNavbar() {
  //   setIsNavbarOpen(!isNavbarOpen);
  // }
  // function openModal() {
  //   setIsModalOpen(true);
  // }

  // function closeModal() {
  //   setIsModalOpen(false);
  // }

  function handleLogout() {
    // localStorage.removeItem("isLogin");
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
      <header className={style.header}>
        <div className="container-fluid">
          <div className={style.row}>
            <div className={style.barAndLogo}>
              <button className={style.iconBtn} onClick={toggleNavbar}>
                <MenuIcon className={style.barIcon} />
              </button>
              <Link to="/admin">
                <img className={style.logo} src={logo} alt="" />
              </Link>
            </div>

            <div className={style.iconAndBtns}>
              <div className={style.naviget}>
                <Link to="/myProfile" className={style.iconAndNav}>
                  <MultipleStopIcon /> My Home
                </Link>
                <a href="" className={style.iconAndNav}>
                  <ExploreIcon /> Explore Events
                </a>
                <Link to="/createNewEvent" className={style.calendar}>
                  <CalendarMonthIcon
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                  Create Events
                </Link>
              </div>
              <div className={style.btns}>
                <button
                  className={`${style.btns} ${style.user} `}
                  onClick={handleOpen}
                >
                  {user.profilImage ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className={style.profileImage}
                    />
                  ) : (
                    <AccountCircleIcon />
                  )}
                </button>
                <button
                  className={`${style.btns} ${style.light}`}
                  onClick={(e) => changeMode(e)}
                >
                  <Brightness7Icon style={{ fontSize: "20px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Navbar isNavbarOpen={isNavbarOpen} />
      {/* {isNavbarOpen && <Navbar />} */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={ModalStyle}>
            <Box className={style.title}>
              <img
                src={user.image}
                alt="Profile"
                className={style.profileImageLarge}
              />

              <Typography
                variant="h6"
                component="h2"
                className={style.profileName}
              >
                {user.firstName} {user.lastName}
              </Typography>

              <p className={style.profileEmail}>{user.email}</p>
            </Box>

            <div className={style.btnModal}>
              <button
                onClick={() => navigate("/myProfile")}
                className={style.btn}
              >
                My Profile
              </button>
              <button onClick={handleLogout} className={style.btn}>
                Sign Out
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default Header;
