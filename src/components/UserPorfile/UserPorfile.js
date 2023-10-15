import ImageNotFound from "../../images/NOtFound.png";
import "./UserPorfile.css";
import Followers from "./Followers/Followers";
import ModalUpload from "../Modal/ModalUpload/ModalUpload";
import { useState } from "react";
import AvatarUser from "../UserPorfile/AvatarUser/AvatarUser";
import Upload from "../Upload/Upload";
import { GET_USER } from "../../gql/user";
import { useQuery } from "@apollo/client";
import useAuth from "../../hooks/useAuth";
import { Icon } from "semantic-ui-react";

const UserPorfile = (props) => {
  const { totalPublication, totalUsers, username } = props;
  const [showModal, setShowModal] = useState(false);
  const [childrenModal, setChildrenModal] = useState(null);

  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { username },
  });

  const { auth } = useAuth();
  if (loading) return null;

  const { getUser } = data;

  function handelModal(type) {
    switch (type) {
      case "avatar":
        setChildrenModal(
          <AvatarUser
            setShowModal={setShowModal}
            refetch={refetch}
            auth={auth}
          />
        );
        setShowModal(true);
        break;

      case "upload":
        setChildrenModal(<Upload setShow={setShowModal} />);
        setShowModal(true);
        break;
    }
  }
  return (
    <>
      <div className="porfile-avatar">
        <div className="box-avatar-porfile">
          <div className="porfile_left">
            <img src={getUser.avatar ? getUser.avatar : ImageNotFound} />
          </div>
          <div className="porfile_rigth">
            <h1>{getUser.username}</h1>
            <Followers
              totalPublication={totalPublication}
              totalUsers={totalUsers}
            />
          </div>
        </div>

        <div className="other">
          <button onClick={() => handelModal("upload")}>+ Añadir Post</button>

          {username === auth.username && (
            <button
              onClick={() =>
                username === auth.username && handelModal("avatar")
              }
            >
              <Icon name="upload" /> Perfil
            </button>
          )}
        </div>
      </div>

      <ModalUpload show={showModal} setShow={setShowModal}>
        {childrenModal}
      </ModalUpload>
    </>
  );
};

export default UserPorfile;
