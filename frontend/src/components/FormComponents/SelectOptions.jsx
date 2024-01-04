const SelectOptions = ({ options }) => {
  return (
    <>
      {options &&
        options.map((option) => {
          return (
            <option
              value={option._id || option.optionValue}
              key={option._id || option.id}
            >
              {`${option.issueId ? option.issueId + "." : ""}`} {option.title}
            </option>
          );
        })}
    </>
  );
};

export default SelectOptions;
