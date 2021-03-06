// import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { logout } from "../store";
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useNavStyles } from "../theme";
import DropDownMenu from "./DropdownMenu";
import CartCheckoutIcon from "./CartCheckoutIcon";
import { Box } from "@material-ui/core";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => {
  const classes = useNavStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <DropDownMenu handleClick={handleClick} isLoggedIn={isLoggedIn} isAdmin={isAdmin} classes={classes} />
          <Typography className={classes.title} variant="h6" noWrap>
            GS-TEAM-Q
          </Typography>
          <div className="Cart-badge">
            <CartCheckoutIcon />
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
