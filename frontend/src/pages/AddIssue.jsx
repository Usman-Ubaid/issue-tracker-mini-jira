import { useForm } from "react-hook-form";
import Layout from "../components/Layout";

const AddIssue = () => {
  const { register, handleSubmit } = useForm();
  return (
    <Layout>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
