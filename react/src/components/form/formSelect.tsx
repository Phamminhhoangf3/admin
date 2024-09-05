import { Select, Typography } from "antd";
import { SelectProps } from "antd/lib";

interface FormSelectType extends SelectProps {
  _name: string;
  form: any;
  defaultValue: any;
  options: any;
  label: string;
}

const FormSelect = ({
  _name,
  form,
  defaultValue,
  options,
  label,
  ...rest
}: FormSelectType) => {
  const getChangeHandlerWithEvent = (name) => (value) =>
    form.setValue(name, value);

  return (
    <div>
      <Typography.Text>{label}</Typography.Text>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={getChangeHandlerWithEvent(_name)}
        value={form.watch(_name)}
        options={options}
        defaultValue={defaultValue}
        style={{ width: "100%" }}
        {...rest}
      />
    </div>
  );
};

export default FormSelect;
