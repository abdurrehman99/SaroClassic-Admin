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
  FormControlLabel,
  Switch,
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
  Search,
  DeleteOutline,
  Edit,
} from "@material-ui/icons";
import sweetAlert from "sweetalert";

const useStyles = makeStyles((theme) => ({
  bodyPadding: {
    // paddingBottom: theme.spacing(1),
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  card: {
    marginTop: 10,
    marginRight: 10,
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

  avatar: {
    marginRight: 10,
  },
  AddNewBtn: {
    float: "right",
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
  const [searchValue, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [modalTitle, setTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [fproducts, setfProducts] = useState([]);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    quantity: "",
    images: "",
    featured: false,
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
    setOpen(true);
  };

  useEffect(() => {
    getData();
  }, []);

  //Modal Close
  const onModalClose = () => {
    setImageURL(null);
    setOpen(false);
    setProduct({
      name: "",
      category: "",
      quantity: "",
      images: "",
      description: "",
      outOfStock: false,
      price: "",
      size: "[]",
    });
  };

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
      const res = await axios.get(ROUTES.GetAllProducts + "?q=WOMEN");
      console.log(res.data);
      const { products, categories } = res.data;
      setLoading(false);
      setCategories(categories);
      setProducts(products);
      setfProducts(products);
    } catch (error) {
      console.log(error.response);
      setState({
        snackbar: true,
        error: "Failed to fetch data",
        type: "error",
      });
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
        mainCategory: "MEN",
      });
      console.log(res.data);
      setLoading(false);
      setProduct({
        name: "",
        category: "",
        quantity: "",
        images: "",
        description: "",
        outOfStock: false,
        price: "",
        size: "[]",
      });
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

  //Delete Product
  const deleteProduct = (id) => {
    sweetAlert({
      title: "Are you sure want to delete ?",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
      closeOnClickOutside: false,
    }).then(async (yes) => {
      if (yes) {
        setLoading(true);
        try {
          const res = await axios.delete(ROUTES.DeleteProduct + id);
          console.log("res =>", res);
          setLoading(false);
          setState({
            snackbar: true,
            error: "Product deleted Successfully !",
            type: "success",
          });
          getData();
        } catch (error) {
          // console.log(error.response);
          setLoading(false);
          setState({
            snackbar: true,
            error: "Failed to delete Product !",
            type: "error",
          });
        }
      }
    });
  };

  //Edit Product
  const editProduct = (p) => {
    console.log("==>", p);
    setImageURL(p.images[0]);
    setProduct(p);
    toggleModal("Edit Product Details");
    setOpen(true);
  };

  //Filter Product on search
  const filterProducts = (value) => {
    setSearch(value);
    let f = products.filter((p) => p.name.toLowerCase().includes(value));
    setfProducts(f);
  };

  //Clear Filter
  const clearFilter = () => {
    setSearch("");
    setfProducts(products);
  };

  //Feature Product
  const featureProduct = async (id, f, i) => {
    setLoading(true);
    try {
      if (f) {
        let res = await axios.put(ROUTES.FeatureProduct + id, { featured: !f });
        setState({
          snackbar: true,
          error: "Product Featured !",
          type: "success",
        });
        getData();
        setLoading(false);
      } else {
        let res = await axios.put(ROUTES.FeatureProduct + id, {
          featured: true,
        });
        setState({
          snackbar: true,
          error: "Product Featured !",
          type: "success",
        });
        getData();
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setState({
        snackbar: true,
        error: "Failed feature this product",
        type: "error",
      });
    }
  };

  //Out of stock Product
  const outOfStockProduct = async (id, outOfStock) => {
    setLoading(true);
    try {
      let res = await axios.put(ROUTES.OutOfStockProduct + id, {
        outOfStock: !outOfStock,
      });
      console.log(res);
      setState({
        snackbar: true,
        error: "Product Updated !",
        type: "success",
      });
      getData();
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setState({
        snackbar: true,
        error: "Failed to update this product",
        type: "error",
      });
    }
  };

  const sizes = ["SMALL", "MEDIUM", "LARGE", "X-LARGE"];

  return (
    <div className={classes.container}>
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
              value={product.name}
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
                defaultValue={product.category}
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
              value={product.quantity}
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
              value={product.description}
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
              value={product.price}
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
            <FormControl
              margin="dense"
              variant="outlined"
              className={classes.formControl}
            >
              <InputLabel>Is Featured</InputLabel>
              <Select
                defaultValue={product.featured}
                onChange={(e) =>
                  setProduct({ ...product, featured: e.target.value })
                }
                labelWidth={110}
                margin="dense"
              >
                <MenuItem value={false}>No</MenuItem>
                <MenuItem value={true}>Yes</MenuItem>
              </Select>
            </FormControl>

            <div>
              <Autocomplete
                multiple
                id="tags-filled"
                // options={
                //   modalTitle === "Edit Product Details"
                //     ? JSON.parse(product.size).map((option) => option)
                //     : sizes.map((option) => option)
                // }
                options={sizes.map((option) => option)}
                freeSolo
                size="small"
                onChange={(e, v) => {
                  console.log(JSON.stringify(v));
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
            onClick={onModalClose}
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
      <div>
        <TextField
          margin="dense"
          placeholder="Seacrh by name..."
          value={searchValue}
          onChange={(e) => filterProducts(e.target.value.toLowerCase())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            endAdornment:
              searchValue.length > 0 ? (
                <InputAdornment position="end">
                  <IconButton onClick={() => clearFilter()} edge="end">
                    <Close />
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
          variant="outlined"
        />
        <Button
          onClick={() => toggleModal("Add New Product")}
          variant="contained"
          className={classes.AddNewBtn}
          color="primary"
        >
          Add new Product <Add style={{ width: 20, height: 20 }} />
        </Button>
      </div>
      <Grid container direction="row">
        {loading === false && products.length === 0 ? (
          <Typography variant="body1">No Products found in Database</Typography>
        ) : null}
        {fproducts.map((p, i) => {
          return (
            <Grid key={i} item xs={3}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia component="img" height="200" image={p.images[0]} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {p.name}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Rs {p.price}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {p.description}
                    </Typography>

                    <IconButton onClick={() => {}}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      style={{ color: "red" }}
                      onClick={() => deleteProduct(p._id)}
                    >
                      <DeleteOutline />
                    </IconButton>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={p.featured}
                          onChange={() => featureProduct(p._id, p.featured, i)}
                          name="featured"
                          color="primary"
                        />
                      }
                      label="Featured"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={p.outOfStock}
                          onChange={() =>
                            outOfStockProduct(p._id, p.outOfStock)
                          }
                          name="outOfStock"
                          color="primary"
                        />
                      }
                      label="Out of Stock"
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Index;
