import "./CommentForm.css";
import { Form, Button, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COMMENT, GET_COMMENT } from "../../../../../gql/comments";

const CommentForm = (props) => {
  const { publication } = props;
  const [addComment] = useMutation(ADD_COMMENT);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      console.log(formData);
      const result = await addComment({
        variables: {
          input: {
            idPublication: publication.id,
            comment: formData.comment,
          },
        },
      });

      console.log(result);
      formik.handleReset();
    },
  });
  return (
    <form className="comment-form" onSubmit={formik.handleSubmit}>
      <button type="submit" className="btn">
        <Icon name="send" />
      </button>

      <input
        onChange={formik.handleChange}
        placeholder="Escribe algo..."
        name="comment"
      />
    </form>
  );
};

export default CommentForm;
