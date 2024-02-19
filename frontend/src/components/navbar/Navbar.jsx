import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const pages = [
  ["New Blog", "/create"],
  ["My Blogs", "/blogs"],
  ["Register", "/register"],
  ["Login", "/login"],
];

function NavBar({ user }) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3310/api/user/logout", {
      withCredentials: true,
    });
    navigate("/");
    window.location.reload();
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">BLOG-APP</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              My Website
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user?.isLoggedIn ? (
              <>
                {" "}
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to="/blog">MY BLOG</Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to="/blog/create">NEW BLOG</Link>
                  </Typography>
                </MenuItem>
              </>
            ) : (
              ""
            )}

            {!user?.isLoggedIn && (
              <>
                {" "}
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to="/register">REGISTER</Link>
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">
                    <Link to="/login">LOGIN</Link>
                  </Typography>
                </MenuItem>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <ul className={styles.profile}>
              <li>{user.name?.toUpperCase()}</li>
              <ul className={styles.profile_items}>
                <li onClick={() => navigate("/profile")}>Profile</li>
                <li>
                  <button onClick={handleLogout} className={styles.profile_btn}>
                    Logout
                  </button>
                </li>
              </ul>
            </ul>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {/* {settings.map((setting) => (
                                <MenuItem key={setting} >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
