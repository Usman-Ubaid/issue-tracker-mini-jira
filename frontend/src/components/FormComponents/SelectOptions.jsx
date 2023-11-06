const SelectOptions = ({ options }) => {
  return (
    <>
      {options &&
        options.map((option) => {
          return (
            <option
              value={option.issueId || option.optionValue}
              key={option.id || option.issueId}
            >
              {`${option.issueId ? option.issueId + "." : ""}`} {option.title}
            </option>
          );
        })}
    </>
  );
};

export default SelectOptions;
