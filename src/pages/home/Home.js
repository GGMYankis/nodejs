import { Grid } from "semantic-ui-react";
 import Feed from "../../components/Home/Feed/Feed"; 
import "./Home.css";
import Catalogo from "../catalogo/Catalogo";
import Img from "../../images/NOtFound.png";
const Home = () => {
  return (
    <div className="home">
         <div className="home__left">
       
          <Feed />  
      </div> 
    </div>

  ); 

};

export default Home;
