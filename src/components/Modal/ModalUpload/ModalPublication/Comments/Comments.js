import { useQuery } from "@apollo/client";
import { GET_COMMENT } from "../../../../../gql/comments";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import ImageNotFound from "../../../../../images/NOtFound.png";
import { Link } from "react-router-dom";
import "./Comments.css";
import { useEffect } from "react";
import {timeago} from "../../../../../helpers/timestamp";

const Comments = (props) => {
  const { publication } = props;

  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENT, {
    variables: {
      idPublication: publication.id,
    },
  });

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return null;
  const { getComments } = data;


  return (
    <div className="commnets">
      {map(getComments, (comment, index) => (
        <Link to="/" className="comment">
          <div className="comment-avatar">
            <Image src={comment.idUser.avatar || ImageNotFound} avatar />
          </div>
          <div className="comment-text">
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
           {/*  <p>{timeago(comment.createAt)}</p> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
