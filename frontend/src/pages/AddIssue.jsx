import { useForm } from "react-hook-form";
import fetch from "node-fetch";
import Layout from "../components/Layout";

const AddIssue = () => {
  const { register, handleSubmit } = useForm();

  const postData = async (formData) => {
    await fetch("http://localhost:5000/api/issues", {
      method: "post",
      body: JSON.stringify({ title: formData.title, type: formData.type }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log("Your Issue has been successfully added."))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(async (data) => {
          await postData(data);
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
