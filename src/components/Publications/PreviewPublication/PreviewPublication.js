import { map } from "lodash";
import { Image } from "semantic-ui-react";
import ModalPublication from "../../Modal/ModalUpload/ModalPublication/ModalPublication";
import { useState } from "react";

const PreviewPublication = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { publication } = props;
  return (
    <>
      <div className="box-publication" onClick={() => setShowModal(true)}>
        <div className="cont-img-public">
          <img src={publication.file} className="img-public" />
        </div>
        <div className="footer-public">
          <p>{publication.name}</p>
          <p>
            Trenzas en oferta solo por este mes no dejes pasar esta oferta.{" "}
          </p>
          <p>
            <span>DOP</span> {publication.price}
          </p>
      {/*     <button className="btn">Ver Detalle</button> */}
        </div>
      </div>
      <ModalPublication
        publication={publication}
        show={showModal}
        setShow={setShowModal}
      />
    </>
  );
};

export default PreviewPublication;
