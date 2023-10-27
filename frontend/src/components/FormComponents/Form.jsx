import { useForm } from "react-hook-form";
import SelectOptions from "./SelectOptions";

const Form = ({
  handleUpdateIssue,
  updateIssue,
  title,
  placeholderText,
  buttonValue,
}) => {
  const { register, handleSubmit } = useForm();

  const typeOptions = [
    { id: 1, title: "Epic" },
    { id: 2, title: "Story" },
    { id: 3, title: "Task" },
  ];

  const stateOptions = [
    { id: 1, title: "ToDo" },
    { id: 2, title: "InProgress" },
    { id: 3, title: "Done" },
  ];

  return (
    <form onSubmit={handleSubmit(handleUpdateIssue)} className="add-issue-form">
      <h2>Update {updateIssue && updateIssue.title} Issue</h2>
      <input {...register(title)} placeholder={placeholderText} />

      <SelectOptions isRegister={register} type="type" options={typeOptions} />
      <SelectOptions
        isRegister={register}
        type="state"
        options={stateOptions}
      />

      <input type="submit" className="button" value={buttonValue} />
    </form>
  );
};

export default Form;
