import { Select, Typography } from "antd";

const FormSelect = ({ _name, form, defaultValue, options, label }) => {
  const getChangeHandlerWithEvent = (name) => (value) =>
    form.setValue(name, value);

  return (
    <div>
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        {label}
      </Typography.Title>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={getChangeHandlerWithEvent(_name)}
        value={form.watch(_name)}
        options={options}
        defaultValue={defaultValue}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default FormSelect;
