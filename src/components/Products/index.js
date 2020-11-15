import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Snackbar,
  InputAdornment,
  CircularProgress,
  Dialog,
  Backdrop,
  IconButton,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiAlert from "@material-ui/lab/Alert";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { ROUTES } from "../../utils/routes";
import axios from "axios";
import { fieldValidate } from "../../utils/formValidation";
import {
  Close,
  Add,
  Done,
  ChevronRight,
  NavigateNextIcon,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  actionButtons: {
    marginRight: 20,
    width: 122,
    height: 40.7,
    fontSize: "13px",
    fontWeight: "bold",
    textTransform: "none",
  },
  card: {
    margin: 10,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  formControl: {
    width: "100%",
    marginBottom: 15,
    marginTop: 5,
  },
  iconButton: {
    paddingTop: 0,
    paddingButtom: 0,
  },
  searchBar: {
    width: 255.4,
    marginRight: 20,
  },
  avatar: {
    marginRight: 10,
  },
  imageClearBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 500,
  },
  previewImg: {
    height: 250,
    width: 250,
    border: "2px solid " + theme.palette.primary.main,
  },
  navLink: {
    fontSize: 14,
    fontWeight: "600",
  },
  navLinkActive: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0582ff",
  },
  searchRow: {
    marginTop: theme.spacing(3),
    marginLeft: 40.1,
    verticalAlign: "center",
  },
  inlineFlex: {
    display: "inline-flex",
    verticalAlign: "center",
    width: "100%",
  },
  para: {
    fontWeight: "light",
    paddingBottom: 0,
  },
  box: {
    marginLeft: 40.1,
    // marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: 0,
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Index = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    snackbar: false,
    error: "",
    type: "",
  });
  const [open, setOpen] = useState(false);
  const [modalTitle, setTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    images: "",
    description: "",
    outOfStock: false,
    price: "",
    size: "[]",
  });
  const [nameError, setNameError] = useState({
    error: false,
    helperText: "",
  });

  const [priceError, setPriceError] = useState({
    error: false,
    helperText: "",
  });
  const [descriptionError, setDescriptionError] = useState({
    error: false,
    helperText: "",
  });
  const [imageError, setImageError] = useState({
    error: false,
    helperText: "",
  });
  const [quantityError, setQuantityError] = useState({
    error: false,
    helperText: "",
  });
  const [categoryError, setCategoryError] = useState({
    error: false,
    helperText: "",
  });
  const [sizeError, setSizeError] = useState({
    error: false,
    helperText: "",
  });

  const [loading, setLoading] = useState(true);

  //toggle Modal for Edit & add new Product
  const toggleModal = (title) => {
    setTitle(title);
    setOpen(!open);
  };

  useEffect(() => {
    getData();
  }, []);

  //validate Data
  const validateData = () => {
    const { name, category, quantity, description, price, size } = product;
    let nError,
      cError,
      dError,
      iError,
      pError,
      sError = {};
    if (name.length < 3) {
      nError = {
        error: true,
        helperText: "Name must contain atleast 3 characters",
      };
    } else {
      nError = {
        error: false,
        helperText: "",
      };
    }
    if (category === "") {
      cError = {
        error: true,
        helperText: "Please select category",
      };
    } else {
      cError = {
        error: false,
        helperText: "",
      };
    }

    if (description.length < 10) {
      dError = {
        error: true,
        helperText: "Description id too short",
      };
    } else {
      dError = {
        error: false,
        helperText: "",
      };
    }

    let qError = fieldValidate(quantity, "code");
    setQuantityError(qError);

    if (price === "") {
      pError = {
        error: true,
        helperText: "",
      };
    } else if (Number(price) > 9999) {
      pError = {
        error: true,
        helperText: "Price can not be greater than 9999",
      };
    } else {
      pError = {
        error: false,
        helperText: "",
      };
    }

    if (size === "[]") {
      sError = {
        error: true,
        helperText: "Please select size(s)",
      };
    } else {
      sError = {
        error: false,
        helperText: "",
      };
    }

    if (image === null) {
      iError = {
        error: true,
        helperText: "Please upload an image",
      };
    } else {
      iError = {
        error: false,
        helperText: "",
      };
    }
    setNameError(nError);
    setCategoryError(cError);
    setDescriptionError(dError);
    setPriceError(pError);
    setSizeError(sError);
    setImageError(iError);
    if (
      nError.error === true ||
      cError.error === true ||
      dError.error === true ||
      pError.error === true ||
      iError.error === true ||
      qError.error === true
    )
      return false;
    else uploadToCloudinary();
  };

  //Get all data of products
  const getData = async () => {
    try {
      const res = await axios.get(ROUTES.GetAllProducts);
      console.log(res.data);
      const { products, categories } = res.data;
      setLoading(false);
      setCategories(categories);
      setProducts(products);
    } catch (error) {
      console.log(error.response);
    }
  };

  //Image upload to Cloudinary
  const uploadToCloudinary = async () => {
    console.log("img", image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "zc6hmngr");
    setLoading(true);

    try {
      const response = await axios.post(ROUTES.ImageUpload, formData);
      setProduct({ ...product, images: response.data.secure_url });
      console.log(response.data);
      AddNew(response.data.secure_url);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
      setOpen(false);
      setState({
        snackbar: true,
        error: "Failed to upload image on Cloudinary",
        type: "error",
      });
    }
  };

  //Hit Server End point
  const AddNew = async (url) => {
    console.log(url);
    console.log(product);
    try {
      const res = await axios.post(ROUTES.AddNewProduct, {
        ...product,
        images: url,
      });
      console.log(res.data);
      setLoading(false);
      setState({
        snackbar: true,
        error: "New Product Uploaded !",
        type: "success",
      });
      setOpen(false);
      getData();
    } catch (error) {
      console.log(error.response);
      setState({
        snackbar: true,
        error: "Failed to upload New Product",
        type: "error",
      });
      setLoading(false);
    }
  };

  //Setting Img in State
  const onImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setImageURL(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const sizes = ["SMALL", "MEDIUM", "LARGE"];

  return (
    <Container container>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress style={{ width: 60, height: 60 }} color="primary" />
      </Backdrop>
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
      <Dialog disableBackdropClick onClose={() => toggleModal("")} open={open}>
        <MuiDialogTitle style={{ display: "flex" }}>
          {modalTitle}
        </MuiDialogTitle>
        <DialogContent dividers>
          <form style={{ marginLeft: 40, marginRight: 40 }}>
            <TextField
              className={classes.formControl}
              label="Name"
              variant="outlined"
              margin="dense"
              error={nameError.error}
              helperText={nameError.helperText}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
                labelWidth={95}
                margin="dense"
                error={categoryError.error}
                helperText={categoryError.helperText}
              >
                {categories.map((item, i) => (
                  <MenuItem key={i} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Quantity Available"
              type="number"
              variant="outlined"
              margin="dense"
              error={quantityError.error}
              helperText={quantityError.helperText}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
              className={classes.formControl}
            />
            <TextField
              label="Description"
              variant="outlined"
              margin="dense"
              error={descriptionError.error}
              helperText={descriptionError.helperText}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
              className={classes.formControl}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              className={classes.formControl}
              margin="dense"
              error={priceError.error}
              helperText={priceError.helperText}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Rs</InputAdornment>
                ),
              }}
            />
            <div>
              <Autocomplete
                multiple
                id="tags-filled"
                options={sizes.map((option) => option)}
                freeSolo
                size="small"
                onChange={(e, v) => {
                  console.log(v);
                  setProduct({ ...product, size: JSON.stringify(v) });
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, i) => (
                    <Chip
                      key={i}
                      variant="default"
                      label={option}
                      margin="dense"
                      {...getTagProps({ i })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="dense"
                    error={sizeError.error}
                    helperText={sizeError.helperText}
                    label="Size(s) Available"
                  />
                )}
              />
            </div>
            <InputLabel style={{ marginTop: 10 }}>Upload Image</InputLabel>
            <TextField
              onChange={(e) => onImageChange(e)}
              type="file"
              margin="dense"
              variant="outlined"
              error={imageError.error}
              helperText={imageError.helperText}
              className={classes.formControl}
            />
            {imageURL ? (
              <img src={imageURL} alt="" className={classes.previewImg} />
            ) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            color="primary"
            disabled={loading}
          >
            <Close />
            Cancel
          </Button>
          <Button
            onClick={validateData}
            variant="outlined"
            color="primary"
            disabled={loading}
          >
            <Done />
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Grid item xs={6}>
        <Button
          onClick={() => toggleModal("Add New Product")}
          variant="contained"
          color="primary"
        >
          Add new Product <Add style={{ width: 20, height: 20 }} />
        </Button>
      </Grid>
      <Grid container direction="row">
        {loading === false && products.length === 0 ? (
          <Typography variant="h5" gutterBottom justif>
            No Products present in Database
          </Typography>
        ) : null}
        {products.map((p, i) => {
          return (
            <Grid key={i} item xs={4}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    // alt="Contemplative Reptile"
                    height="200"
                    image={p.images[0]}
                    // title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {p.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {p.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Index;
