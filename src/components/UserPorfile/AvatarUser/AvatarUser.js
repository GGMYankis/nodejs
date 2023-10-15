import React, { useState, useCallback } from "react";
import { Modal, Icon, Button, Loader, Dimmer, Grid } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { UDPADATE_AVATAR, GET_USER } from "../../../gql/user";
import useAuth from "../../../hooks/useAuth";
import "./AvatarUser.css";

const AvatarUser = (props) => {
  const { auth, refetch , setShowModal } = props;
  const [fileUpload, setFileUpload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { username } = auth;

  console.log(props)

  const [updateAvatar] = useMutation(
    UDPADATE_AVATAR /* , {
    update(cache, { data: { updateAvatar } }) {
      const { getUser } = cache.readQuery({
        query: GET_USER,
        variables: { username: username },
      });
      
    cache.writeQuery({
        query: GET_USER,
        variables: { username: username },
        data: {
          getUser: { ...getUser, avatar: "hola" },
        },
      });
    },
  } */
  );

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    setFileUpload({
      type: "image",
      file,
      preview: URL.createObjectURL(file),
    });
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image./png , image/svg",
    noKeyboard: true,
    multiple: false,
    onDrop,
  });

  async function PublishAvatar() {
    try {
      setIsLoading(true);
      const result = await updateAvatar({
        variables: {
          file: fileUpload.file,
        },
      });
      refetch()
      if (result.data.updateAvatar.status) {
        
        console.log("paso")
        setIsLoading(false);
        setShowModal(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      
    }
  }

  return (
    <div className="uploadPerfil">
      <div className="cont_text_uploadPerfil">
        <button>X</button>
        <p>Actualizar foto de Perfil</p>
        <button className="upload" onClick={PublishAvatar}>
          <Icon name="upload" />
        </button>
      </div>

      <div className="viewImg" {...getRootProps()}>
      {!fileUpload && (
              <>
                <Icon name="cloud upload" />
                <p>Arrastra tu foto que quieras publicar</p>
              </>
            )}
        {
          isLoading &&(
            <Dimmer active>
              <Loader/>
            </Dimmer>
          )
        }
        {fileUpload && (
          <div className="imgFondo">
            <img src={fileUpload.preview} />
            
          </div>
        )}

        <input {...getInputProps()} />
      </div>
    </div>
  );
};

export default AvatarUser;
