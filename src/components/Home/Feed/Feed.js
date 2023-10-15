import { useQuery, useMutation } from "@apollo/client";
import { Image } from "semantic-ui-react";
import "./Feed.css";
import { Form, Button, Icon } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { map } from "lodash";
import useAuth from "../../../hooks/useAuth";
import { ALL_PUBLICATION } from "../../../gql/home";
import Actions from "../../../components/Modal/ModalUpload/ModalPublication/Actions/Actions";
import ImageNotFound from "../../../images/NOtFound.png";
import CommentForm from "../../../components/Modal/ModalUpload/ModalPublication/CommentForm/CommentForm";
import ModalPublication from "../../Modal/ModalUpload/ModalPublication/ModalPublication";
import { DELETE_PUBLICATIONS } from "../../../gql/publication";
import ActionsHome from "../../Modal/ModalUpload/ModalPublication/ActionsHome/ActionsHome";
import {Link} from "react-router-dom";

const Feed = () => {
  const { data, loading, startPolling, stopPolling } =
    useQuery(ALL_PUBLICATION);
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState(null);
  const [deletePublication] = useMutation(DELETE_PUBLICATIONS);

  const { auth } = useAuth();

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]); 
  if (loading) return null;

   const { allPublication } = data; 

  const openPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  };

  async function DeletePublication(e) {
    const result = await deletePublication({
      variables: { idPublication: e },
    });
  }
  return (
    <>
      <div className="feed" id="up">
        {map(allPublication, (publication, index) => (
          <div className="box-feed" key={index}>
            <div className="home-header">
              <div className="avatar_date">
                <div className="box-avatar">
                  <img
                    src={publication.idUser.avatar}
                    className="avatar-home"
                  />
                </div>
                <div className="box-header-footer">
                  <p>{publication.idUser.username}</p>
                  <p>28 de agosto a las 19:15</p>
                </div>
              </div>

              {auth.rol === "administrador" && (
                <button
                  onClick={() =>
                    auth.rol === "administrador" &&
                    DeletePublication(publication.id)
                  }
                  className="btn-home"
                >
                  x
                </button>
              )}
            </div>

            <div
              onClick={() => openPublication(publication)}
              className="home-body"
              style={{ backgroundImage: `url("${publication.file}")` }}
            ></div>
            <div className="feed__box__actions">
              <ActionsHome publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          show={showModal}
          setShow={setShowModal}
          publication={publicationSelect}
        />
      )}

      <div className="caret" >
        <a href="#up"><Icon name="caret up"/></a>     
      </div>
    </>
  );
};

export default Feed;
