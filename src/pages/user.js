import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS } from "../gql/publication";
import { COUNT_USER } from "../gql/user";
import { size } from "lodash";
import Publication from "../components/Publications/Publications";
import { useEffect } from "react";
import UserPorfile from "../components/UserPorfile/UserPorfile";
import "./User.css";

const User = () => {
  const { username } = useParams();

   const { data, loading, startPolling, stopPolling } = useQuery(
    GET_PUBLICATIONS,
    {
      variables: { username },
    }
  );  
 const { data:dataCountUser, loading:loadingCountUser } = useQuery(COUNT_USER);

 
      useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);  

  if (loading || loadingCountUser) return null;

  /* onst { getPublication } = data; */
  const { countUser } = dataCountUser; 
  return (
    <>
      <div className="cont_porfile">
        <div className="porfile">
          <UserPorfile username={username} totalPublication={11} totalUsers={countUser} />
        </div>
        <div  className="title-publication">
          <h1>Tus Publicaciones</h1>
        </div> 
    {/*     <div className="publication">
         <Publication getPublication={getPublication} /> 
        </div>  */}
      </div>
    </>
  );
};

export default User;
