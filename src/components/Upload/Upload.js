import React, { useState, useCallback } from "react";
import "./Upload.css";
import { Modal, Icon, Button, Loader, Dimmer, Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { PUBLISH } from "../../gql/publication";
import formik, { useFormik } from "formik";
import * as Yup from "yup";

export default function Upload(props) {
  const { setShow } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [publish] = useMutation(PUBLISH);

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  function onClose() {
    setIsLoading(false);
    setShow(false);
    setFileUpload(null);
  }
  
  const formik = useFormik({
       initialValues:{
         price:"",
         name:"",
         typeImg:""
       }, 
       validationSchema:Yup.object({
            price: Yup.string().required("Precio invalido"),
            name: Yup.string().required(true) ,  
            typeImg: Yup.string().required(true)   
       }),
       onSubmit:async (formData) => {
        try {
          setIsLoading(true)
          const result = await publish({
            variables: {
               file: fileUpload.file,
               price:formData.price,
               name:formData.name,
               typeImg:formData.typeImg
            },
          });
    
          if (!result.data.publish.status) {
            alert("error en la publicacion");
          } else {
            onClose();
          }
        } catch (error) {
          console.log(error);
        }
       }
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image./png , image/svg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

 

  return (
      <Grid>
        <Grid.Column className="column__left">
          <div
            {...getRootProps()}
            className="dropzone"
            style={fileUpload && { border: 0 }}
          >
            {!fileUpload && (
              <>
                <Icon name="cloud upload" />
                <p>Arrastra tu foto que quieras publicar</p>
              </>
            )}

            <input {...getInputProps()} />
            {fileUpload?.type === "image" && (
              <div
                className="image"
              /*   style={{ backgroundImage: `url("${fileUpload.preview}")` }} */
              
              >
                <img className="img" src={fileUpload.preview}/>
              </div>
            )}

            {isLoading && (
              <Dimmer active className="publishing">
                <Loader />
                <p></p>
              </Dimmer>
            )}
          </div>

          <form className="footer" onSubmit={formik.handleSubmit}>
            <select onChange={formik.handleChange} name="typeImg">
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
            </select>
            <input placeholder="Precio" name="price" onChange={formik.handleChange}/>
            <input placeholder="Nombre" name="name" onChange={formik.handleChange} />
            <button className="btn" type="submit">
              Publicar
            </button>
          </form>
        </Grid.Column>
      </Grid>
  );
}
