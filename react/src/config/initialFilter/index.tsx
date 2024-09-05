import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { genderOptions, statusOptions } from "~/common/options-select";
import { FormInput, FormRangeDate, FormSelect } from "~/components/form";
import FormDatePicker from "~/components/form/formDatePicker";

dayjs.extend(utc);
export type PropsInitialFilters = {
  name?: string;
  names?: [string, string];
  placeholder?: string;
  format?: string;
  options?: any[];
  onChange?: (setValue: any) => (optionSelect) => void;
  value?: (watch: any) => any;
  fetchApi?: (query: any) => any;
  handleDataRes?: (response: any) => any;
  keySearch?: string;
  defaultValue?: any;
  label?: string;
};

export type FilterType = {
  key: string;
  col: number;
  control: (props: any) => JSX.Element;
};

export type KeyInitialFilters =
  | "keywords"
  | "createdDate"
  | "status"
  | "gender"
  | "fromDob"
  | "toDob";

export type IFValueType = (props: PropsInitialFilters) => FilterType;

export type InitialFiltersType<T> = {
  [key in KeyInitialFilters]?: T;
};

export const initialFilters: InitialFiltersType<IFValueType> = {
  keywords: ({ name = "keywords", label = "Tìm kiếm", placeholder }) => ({
    key: name,
    col: 6,
    control: (form) => (
      <FormInput
        name={name}
        form={form}
        defaultValue=""
        label={label}
        placeholder={placeholder}
        allowClear
      />
    ),
  }),
  createdDate: ({
    names = ["fromDate", "toDate"],
    label = "Thời gian tạo",
    defaultValue,
  }) => ({
    key: "createdDate",
    col: 6,
    control: (form) => (
      <FormRangeDate
        names={names}
        name={"createdDate"}
        form={form}
        defaultValue={defaultValue}
        label={label}
      />
    ),
  }),
  status: ({ name = "status", label = "Trạng thái", defaultValue = null }) => ({
    key: name,
    col: 6,
    control: (form) => (
      <FormSelect
        _name={name}
        defaultValue={defaultValue}
        form={form}
        options={statusOptions}
        label={label}
        allowClear
        placeholder="Chọn trạng thái"
      />
    ),
  }),
  gender: ({ name = "gender", label = "Giới tính", defaultValue = null }) => ({
    key: name,
    col: 6,
    colSm: 3,
    control: (form) => (
      <FormSelect
        _name={name}
        defaultValue={defaultValue}
        form={form}
        options={genderOptions}
        label={label}
        allowClear
        placeholder="Chọn giới tính"
      />
    ),
  }),
  fromDob: ({ name = "fromDob", label = "Ngày sinh" }) => ({
    key: name,
    col: 6,
    control: (form) => <FormDatePicker name={name} label={label} form={form} />,
  }),
  toDob: ({ name = "toDob", label = "Ngày mất" }) => ({
    key: name,
    col: 6,
    control: (form) => <FormDatePicker name={name} label={label} form={form} />,
  }),
};

export const getInitialFilters = (
  filterNames: KeyInitialFilters[],
  returnPropsFilter: (name: KeyInitialFilters) => PropsInitialFilters
) => {
  if (!filterNames?.length) return null;
  return filterNames.map((name: KeyInitialFilters) => {
    const filter = initialFilters[name];
    return filter ? filter(returnPropsFilter(name)) : null;
  });
};
