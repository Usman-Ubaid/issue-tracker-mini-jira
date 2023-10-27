const SelectOptions = ({ isRegister, type, options }) => {
  return (
    <select {...isRegister(type)}>
      {options &&
        options.map((option) => {
          return (
            <option value={option.title} key={option.id}>
              {option.title}
            </option>
          );
        })}
    </select>
  );
};

export default SelectOptions;
