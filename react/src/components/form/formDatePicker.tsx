import { DatePicker, Typography } from "antd";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/vi_VN";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
interface FormDatePickerType extends PickerProps {
  label: string;
  form: any;
  name: string;
}

const dateFormat = "DD/MM/YYYY";
const FormDatePicker = ({ name, label, form, ...rest }: FormDatePickerType) => {
  const { setValue, watch } = form;
  const localDate = watch(name)
    ? dayjs.tz(watch(name), dateFormat, "Asia/Ho_Chi_Minh")
    : null;
  return (
    <>
      <Typography.Text>{label}</Typography.Text>
      <DatePicker
        locale={locale}
        style={{ width: "100%" }}
        format={dateFormat}
        {...rest}
        onChange={(_, dateString) => {
          setValue(name, dateString);
        }}
        value={localDate}
      />
    </>
  );
};

export default FormDatePicker;
