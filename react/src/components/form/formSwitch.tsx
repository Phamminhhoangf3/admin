import { Switch, SwitchProps } from "antd";

interface FormSwitchType extends SwitchProps {
  name: string;
  form: any;
  label: string;
}

const FormSwitch = ({ name, form, label, ...props }: FormSwitchType) => {
  const getChangeHandlerWithEvent = (name) => (checked) =>
    form.setValue(name, checked);

  return (
    <>
      <div>{label}</div>
      <Switch
        {...props}
        onChange={getChangeHandlerWithEvent(name)}
        value={form.watch(name)}
      />
    </>
  );
};

export default FormSwitch;
