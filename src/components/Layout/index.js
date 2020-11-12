import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  MenuItem,
  Drawer,
  AppBar,
  Toolbar,
  Container,
  // Typography,
  // Divider,
  CssBaseline,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  List,
  Collapse,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
// import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import salesfooLogo from "../../assets/icons/salesfoo.png";

import AnalyticsIcon from "../../assets/icons/Analytics.svg";
import GroupIcon from "../../assets/icons/Group.svg";
import HomeIcon from "../../assets/icons/Home.svg";
import SettingsIcon from "../../assets/icons/Settings.svg";
import UserIcon from "../../assets/icons/User.svg";
// import BellIcon from "../../assets/icons/Bell.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import MenuIcon from "../../assets/icons/Menu.svg";
// import SearchIcon from "../../assets/icons/Search.svg";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#f0f2f5",
  },
  toolbar: {
    paddingLeft: 10,
    paddingRight: 45,
    height: 80,
  },
  nested: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 30,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  submenu: {},
  drawerOpen: {
    width: drawerWidth,
    background: theme.palette.primary.main,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    background: theme.palette.primary.main,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  content: {
    flexGrow: 1,
    paddingTop: 100,
    backgroundColor: "white",
    padding: theme.spacing(0),
  },
  navLogo: {
    width: 218,
    height: 65,
    marginRight: "auto",
  },
  drawerIcon: {
    color: "white",
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 8,
  },
  toggleIcon: {
    marginLeft: 8,
    color: "white",
    marginTop: 10,
    marginRight: 0,
    marginBottom: 10,
  },
  textWhite: {
    color: "white",
    paddingTop: 110,
    fontSize: 10,
  },
  blackIcon: {
    color: "black",
    cursor: "pointer",
    // marginRight: 15,
  },
  menuIcon: {
    color: "black",
    cursor: "pointer",
  },
  listItemIcon: {},
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  avatar: {
    cursor: "pointer",
    marginLeft: 10,
  },
  lineDiv: {
    borderLeft: "3px solid white",
    marginLeft: 50,
    marginTop: 10,
    marginBottom: 10,
  },
}));

const Index = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [configuration, setConfiguration] = useState(false);
  const [user, setUser] = useState(false);
  const [sales, setSales] = useState(false);
  const [customer, setCustomer] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
    setConfiguration(false);
    setUser(false);
    setSales(false);
    setCustomer(false);
  };

  const handleConfigurationClick = () => {
    setConfiguration(!configuration);
    if (!open) setOpen(true);
  };

  const handleUserClick = () => {
    setUser(!user);
    if (!open) setOpen(true);
  };

  const handleSalesClick = () => {
    setSales(!sales);
    if (!open) setOpen(true);
  };

  const handleCustomerClick = () => {
    setCustomer(!customer);
    if (!open) setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <MenuItem style={{ marginRight: "auto" }} component={Link} to={"/"}>
            <img src={salesfooLogo} alt="" className={classes.navLogo} />
          </MenuItem>
          <IconButton color="primary" component="span">
            <img
              src={FilterIcon}
              alt=""
              className={classes.blackIcon}
              width={18}
            />
          </IconButton>
          <IconButton color="primary" component="span">
            <SearchOutlinedIcon className={classes.blackIcon} />
          </IconButton>
          <IconButton color="primary" component="span">
            <img
              src={MenuIcon}
              alt=""
              className={classes.blackIcon}
              width={18}
            />
          </IconButton>
          <IconButton color="primary" component="span">
            <NotificationsOutlinedIcon className={classes.blackIcon} />
          </IconButton>
          <IconButton color="primary" component="span">
            <MoreVertOutlinedIcon className={classes.menuIcon} />
          </IconButton>
          <Avatar alt="Sales" src="" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List className={classes.textWhite}>
          <ListItem className={classes.listItem} button>
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src={HomeIcon}
                alt=""
                className={classes.drawerIcon}
                width={22}
              />
            </ListItemIcon>
            <ListItemText primary={"DASHBOARD"} />
          </ListItem>

          <ListItem
            className={classes.listItem}
            onClick={handleConfigurationClick}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src={SettingsIcon}
                alt=""
                className={classes.drawerIcon}
                width={22}
              />
            </ListItemIcon>
            <ListItemText primary={"CONFIGURATION"} />
          </ListItem>
          <Collapse
            className={classes.lineDiv}
            in={configuration}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.submenu} component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Template" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Picklist" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Currency" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            className={classes.listItem}
            onClick={handleUserClick}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src={UserIcon}
                alt=""
                className={classes.drawerIcon}
                width={22}
              />
            </ListItemIcon>
            <ListItemText primary={"USER"} />
          </ListItem>
          <Collapse
            className={classes.lineDiv}
            in={user}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.submenu} component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Access Management" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            className={classes.listItem}
            onClick={handleSalesClick}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src={AnalyticsIcon}
                alt=""
                className={classes.drawerIcon}
                width={22}
              />
            </ListItemIcon>
            <ListItemText primary={"SALES"} />
          </ListItem>
          <Collapse
            className={classes.lineDiv}
            in={sales}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.submenu} component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Path" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Lead" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Deal" />
              </ListItem>
              <ListItem button className={classes.nested}>
                <ListItemText primary="Story Board" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            className={classes.listItem}
            onClick={handleCustomerClick}
            button
          >
            <ListItemIcon className={classes.listItemIcon}>
              <img
                src={GroupIcon}
                alt=""
                className={classes.drawerIcon}
                width={22}
              />
            </ListItemIcon>
            <ListItemText primary={"CUSTOMER"} />
          </ListItem>
          <Collapse
            className={classes.lineDiv}
            in={customer}
            timeout="auto"
            unmountOnExit
          >
            <List className={classes.submenu} component="div" disablePadding>
              <MenuItem
                component={Link}
                to={"/account"}
                button
                className={classes.nested}
              >
                <ListItemText primary="Account"></ListItemText>
              </MenuItem>

              <ListItem button className={classes.nested}>
                <ListItemText primary="Customer" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <ListItem style={{ marginTop: "auto" }} onClick={toggleDrawer} button>
          <ListItemIcon>
            {open ? (
              <ChevronLeftIcon className={classes.toggleIcon} />
            ) : (
              <ChevronRightIcon className={classes.toggleIcon} />
            )}
          </ListItemIcon>
        </ListItem>
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Index;
