import { useMutation, useQuery } from "@apollo/client";
import {ADD_LIKE, DELETE_LIKE, IS_LIKE, COUNT_LIKE } from "../../../../../gql/like";
import{COUNT_COMMENTS} from "../../../../../gql/comments";
import { Icon } from "semantic-ui-react";
import "./ActionsHome.css";
import { useEffect, useState } from "react";

const ActionsHome = (props) => {
  const { publication } = props;
  const[loadingAction , setLoadingAction] = useState(false);

  const [addLike] = useMutation(ADD_LIKE);
  const [deletLike] = useMutation(DELETE_LIKE);


 
  const {data:dataCommets , loading:loadingComments, startPolling ,stopPolling} = useQuery(COUNT_COMMENTS,{
    variables:{idPublication:publication.id}
  })

  useEffect(() => { 
    startPolling(10000)

   return () => {
     stopPolling()
   }
 }, [startPolling, stopPolling])
  const { data, loading ,  refetch } = useQuery(IS_LIKE, {
    variables: { idPublication: publication.id },
  });

  const {data:dataCount , loading:loadingCount , refetch:refetchCount} = useQuery(COUNT_LIKE , {
    variables:{idPublication:publication.id}
  })
  async function onAddLike() {
    setLoadingAction(true)
    try {
      await addLike({
        variables: {
          idPublication: publication.id,
        },
      });
      refetch()
      refetchCount();

    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  }

  const onDeletLike = async () => {
    setLoadingAction(true)
    await deletLike({
      variables: { idPublication: publication.id },
    });

    refetch()
    refetchCount();
    setLoadingAction(false);
  };

  function onAction (){
    if(!loadingAction){
        if(isLike){
          onDeletLike();
        }else{
            onAddLike();
        }
    }
  }
  if (loading || loadingCount || loadingComments) return null;
  
  const { isLike } = data;
  const { countLike } = dataCount;
  const {countComments} = dataCommets

  return (
    <div className="actionHome">
      <div className="firt-div">
        <p><span>{countLike === 1  || countLike === 0 ? "h" : "Likes"}</span> <span>{countLike}</span></p>
        <p>{countComments} {countComments === 1  ? "comentario" : "comentarios"}</p>
      </div>
      <div className="footerHome">
        <div
          className="footer-actions"
          onClick={onAction}
        >
          <Icon
            name={isLike ? "thumbs up" : "thumbs up outline"}
            className={isLike ? "like active" : "like"}
          />
          <p className={isLike ? "like active" : "like"}>Me gusta</p>
        </div>
      </div>
    </div>
  );
};

export default ActionsHome;
