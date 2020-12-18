import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/VpnKey";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import { ROUTES } from "../../utils/routes";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Saro Classic{" "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    height: 40,
    width: 40,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [state, setState] = useState({
    snackbar: false,
    error: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

  const [formValues, setValues] = useState({
    passwordOld: "",
    passwordNew: "",
  });

  const handleChange = (e) => {
    setValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async () => {
    if (formValues.passwordOld.length < 3) {
      setPassword1Error(true);
    } else {
      setPassword1Error(false);
    }
    if (formValues.passwordNew.length < 3) {
      setPassword2Error(true);
    } else {
      setPassword2Error(false);
    }
    if (
      formValues.passwordOld.length >= 3 &&
      formValues.passwordNew.length >= 3
    ) {
      try {
        setLoading(true);
        const res = await axios.post(ROUTES.AdminPasswordChange, formValues);
        console.log(res.data);
        setState({
          snackbar: true,
          error: res.data.msg,
          type: "success",
        });
      } catch (error) {
        setLoading(false);
        console.log(error.response);
        setState({
          snackbar: true,
          error:
            error.response && error.response.data
              ? error.response.data.message
              : "Request failed !",
          type: "error",
        });
      }
    }
  };

  return (
    <Container
      className="animate__animated animate__fadeIn"
      component="main"
      maxWidth="xs"
    >
      <Snackbar
        style={{ marginLeft: 90 }}
        open={state.snackbar}
        autoHideDuration={3000}
        onClose={() => setState({ ...state, snackbar: false })}
      >
        <Alert
          onClose={() => setState({ ...state, snackbar: false })}
          severity={state.type}
        >
          {state.error}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Change Password</Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            onChange={(e) => handleChange(e)}
            margin="dense"
            fullWidth
            type="password"
            error={password1Error}
            label="*Old Password"
            name="passwordOld"
          />
          <TextField
            variant="outlined"
            onChange={(e) => handleChange(e)}
            margin="dense"
            fullWidth
            name="passwordNew"
            label="*New Password"
            type="password"
            error={password2Error}
          />
          <Button
            fullWidth
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
            className={classes.submit}
          >
            Confirm
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
