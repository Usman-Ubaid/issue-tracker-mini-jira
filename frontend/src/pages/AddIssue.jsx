import { useForm } from "react-hook-form";
import Layout from "../components/CommonComponents/Layout";
import { postData } from "../services/api";

const AddIssue = () => {
  const { register, handleSubmit } = useForm();

  const handlePostData = async (formData) => {
    await postData(formData);
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(async (data) => {
          await handlePostData(data);
        })}
        className="add-issue-form"
      >
        <h2>Add Issue</h2>
        <input
          {...register("title", { required: true })}
          placeholder="Title of the Issue"
        />
        <select {...register("type", { required: true })}>
          <option>Epic</option>
          <option>Story</option>
          <option>Task</option>
        </select>
        <input type="submit" className="button" value="Add" />
      </form>
    </Layout>
  );
};

export default AddIssue;
