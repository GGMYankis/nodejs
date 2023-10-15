import React, { useState, useCallback, Children } from "react";
import "./ModalUpload.css";
import { Modal, Icon, Button, Loader, Dimmer, Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../../gql/publication";
import formik, { useFormik } from "formik";
import * as Yup from "yup";

export default function ModalUpload(props) {
  const { show, setShow , children} = props;
 

  function onClose() {
    setShow(false);
  }
  
  return (
    <Modal open={show} size="small" onClose={onClose} className="modal-upload">
     {children}
    </Modal>
  );
}
