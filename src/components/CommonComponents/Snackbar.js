import React,{useState,useEffect} from 'react'

const Snackbar = ({errors}) => {
  const [snackbar, setSnackbar] = useState(false);

    useEffect(() => {
      console.log(errors.loginError);
      if (errors.loginError) {
        setError(errors.loginError);
        setSnackbar(true);
      }
    }, [errors]);
      function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }
    return (
        <Snackbar
        open={snackbar}
        autoHideDuration={4000}
        onClose={() => setSnackbar(false)}
      >
        <Alert onClose={() => setSnackbar(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    )
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { }(Snackbar);
