import { statusOptions } from "~/common/options-select";
import { FormInput, FormRangeDate, FormSelect } from "~/components/form";

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
  name: string;
  col: number;
  colSm: number;
  value: string;
  control: (props: any) => JSX.Element;
};

export type KeyInitialFilters = "keywords" | "createdDate" | "status";

export type IFValueType = (props: PropsInitialFilters) => FilterType;

export type InitialFiltersType<T> = {
  [key in KeyInitialFilters]?: T;
};

export const initialFilters: InitialFiltersType<IFValueType> = {
  keywords: ({ name = "keywords", label = "Tìm kiếm", placeholder }) => ({
    key: name,
    name: name,
    col: 6,
    colSm: 3,
    value: "",
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
    name: "createdDate",
    col: 6,
    colSm: 3,
    value: "",
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
  status: ({ name = "status", label = "Trạng thái", defaultValue = "" }) => ({
    key: name,
    name: name,
    col: 6,
    colSm: 3,
    value: "",
    control: (form) => (
      <FormSelect
        _name={name}
        defaultValue={defaultValue}
        form={form}
        options={statusOptions}
        label={label}
      />
    ),
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
