import React, { Fragment } from "react";
import { Box, CircularProgress } from "@material-ui/core";

import { Save, Delete } from "@material-ui/icons";

export default function FullpageLoader() {
  return (
    <Fragment>
      <Box
        position="fixed"
        top="0"
        left="0"
        height="100vh"
        width="100vw"
        style={{ backgroundColor: "black", zIndex: 99, opacity: 0.2 }}
      ></Box>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          position: "fixed",
          height: "100vh ",
        }}
      >
        <CircularProgress style={{ marginTop: "40vh" }} color="primary" />
      </div>
    </Fragment>
  );
}
