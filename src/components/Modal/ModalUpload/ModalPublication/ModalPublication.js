
import "./ModalPublication.css";
import {Grid, GridColumn, Modal} from "semantic-ui-react";
import CommentForm from "./CommentForm/CommentForm";
import Commenst from "./Comments/Comments";
import Actions from "./Actions/Actions";



const ModalPublication = (props) => {

    const {show , setShow , publication} = props;
    const onClose = () => setShow(false);

    return (
        <>
     
        <Modal open={show} onClose={onClose} className="modal-publication">
              <Grid>
                 <Grid.Column 
                 style={{backgroundImage:`url("${publication.file}")`}} className="modal-publication__left" width={10}>
                     <Actions publication={publication}/>  
                 </Grid.Column> 
                 <Grid.Column className="modal-publication__right" width={6}>
                  <Commenst publication={publication}/>
                   <CommentForm publication={publication}/>
                 </Grid.Column>
              </Grid>
        </Modal>

        </>
    )
}


export default ModalPublication