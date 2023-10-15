import "./catalogo.css";
import { ALL_PUBLICATION } from "../../gql/home";
import {
  GET_PUBLICATIONS_FOR_MAN,
  GET_PUBLICATIONS_FOR_WOMEN,
} from "../../gql/publication";
import { useQuery, useLazyQuery } from "@apollo/client";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const Catalogo = () => {
  const [categori, setCategori] = useState(false);

  const { data, loading, startPolling, stopPolling } =
    useQuery(ALL_PUBLICATION);
  const [getPublicationMan, result] = useLazyQuery(GET_PUBLICATIONS_FOR_MAN);

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading || result.loading)
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );

  const { allPublication } = data;
  const { data: dataMan } = result;

  const { getPublicationForMan } = dataMan ? dataMan : "";

  function GetPublicationForMan(e) {
    setCategori(true);
    getPublicationMan({
      variables: {
        category: e,
      },
    });
  }

  return (
    <div className="catalogo">
      <div className="categoria">
        <p onClick={() => GetPublicationForMan("hombre")}>Hombres</p>
        <p onClick={() => GetPublicationForMan("mujer")}>Mujeres</p>
      </div>
      <div className="box-padre">
        <div className="box_tikes_catalogo">
          {map(
            categori ? getPublicationForMan : allPublication,
            (publication, index) => (
              <div className="tikes_publication">
                <div className="header_catalogo">
                  <img src={publication.file} />
                </div>
                <div className="footer_catalogo">
                  <p>{publication.name}</p>
                  <p>
                    Trenzas en oferta solo por este mes no dejes pasar esta
                    oferta.
                  </p>
                  <p>
                    <span className="dop-catalogo">DOP</span>
                    <span>{publication.price}</span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
