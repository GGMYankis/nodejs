import imagen from "../../images/NOtFound.png";
import "./creador.css";
const Creador = () => {
  return (
    <div className="creador">
      <div className="box_creador">
        <div>
          <h1>Hola<p className="head_creador">👋</p></h1>
          <p className="text">
            Soy un <span>ingeniero de software junior</span> y llevo más de 1 año trabajando con{" "}
            <span className="html">Html,</span><span className="javascript">JavaScript,</span> <span className="net">.Net,</span><span className="graghql">Graghql</span>y<span className="react">React</span>
          </p>
        </div>
        <div className="creador_img">
          <img src={imagen} />
        </div>
      </div>
    </div>
  );
};

export default Creador;
