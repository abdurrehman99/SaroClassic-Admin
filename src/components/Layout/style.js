import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#f0f2f5",
  },
  drawer: {
    width: 104,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 104,
    background: theme.palette.primary.main,
  },
  drawerContainer: {
    overflow: "auto",
    color: "white",
    marginTop: 55,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  toolbar: {
    paddingLeft: 10,
    paddingRight: 45,
    height: 100,
  },
  whiteIcon: {
    color: "white",
    margin: "auto",
    marginTop: 15,
    marginBottom: 15,
  },
  blackIcon: {
    color: "black",
    cursor: "pointer",
    marginRight: 15,
  },
  menuIcon: {
    color: "black",
    cursor: "pointer",
    marginRight: 20,
    marginLeft: 30,
  },
  navLogo: {
    width: 218,
    height: 65,
    marginRight: "auto",
  },
  avatar: {
    cursor: "pointer",
  },
}));

export default useStyles;
