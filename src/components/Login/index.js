import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { LoginUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { setErrors } from "../../redux/actions/errorActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(25),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login({ LoginUser, errors }) {
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(errors.loginError);
    if (errors.loginError) {
      setError(errors.loginError);
      setLoading(false);
      setSnackbar(true);
    }
  }, [errors]);

  const [error, setError] = useState("");

  const [snackbar, setSnackbar] = useState(false);

  const [formValues, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (prop) => (event) => {
    setFormValue({ ...formValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    setValues({
      showPassword: false,
    });

    if (formValues.email === "") setEmailError(true);
    else setEmailError(false);

    if (formValues.password === "") setPasswordError(true);
    else setPasswordError(false);

    if (formValues.email !== "" && formValues.password !== "") {
      LoginUser(formValues);
      setLoading(true);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const classes = useStyles();
  return (
    <Container
      className="animate__animated animate__fadeIn"
      component="main"
      maxWidth="xs"
    >
      <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
      >
        <Alert onClose={() => setSnackbar(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Admin Login</Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                fullWidth
                error={emailError}
                onChange={handleChange("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" size="small" fullWidth>
                <InputLabel style={passwordError ? { color: "#F44336" } : {}}>
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  error={passwordError}
                  onChange={handleChange("password")}
                  inputProps={{
                    maxLength: 30,
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={100}
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { LoginUser })(Login);
