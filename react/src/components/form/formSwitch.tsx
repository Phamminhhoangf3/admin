import { Switch, SwitchProps, Typography } from "antd";

interface FormSwitchType extends SwitchProps {
  name: string;
  form: any;
  label: string;
}

const FormSwitch = ({ name, form, label, ...props }: FormSwitchType) => {
  const getChangeHandlerWithEvent = (name) => (checked) =>
    form.setValue(name, checked);

  return (
    <div>
      <Typography.Title level={5} style={{ fontWeight: 400 }}>
        {label}
      </Typography.Title>
      <Switch
        {...props}
        onChange={getChangeHandlerWithEvent(name)}
        value={form.watch(name)}
      />
    </div>
  );
};

export default FormSwitch;
