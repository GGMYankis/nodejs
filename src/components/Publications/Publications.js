import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import PreviewPublication from "./PreviewPublication/PreviewPublication";
import ModalPublication from "../Modal/ModalUpload/ModalPublication/ModalPublication";
import "./Publications.css";
import { useState } from "react";

const Publication = (props) => {
  const { getPublication } = props;
  const[showModal , setShowModal] = useState(false);

  return (
    <div className="cont-publication">
    
      {map(getPublication, (publication, index) => (
        <>
          <PreviewPublication publication={publication}  />
        </>
      ))}
    </div>
  );
};

export default Publication;
