export type PageCommonListType = {
  initialQuery: InitialQueryType;
  columnsTable?: any;
  initialFilters: any;
  title: string;
  handleDataSubmit?: any;
  handleRequestDefault?: any;
  handleRequestParams?: any;
  actions?: APCLType | null;
  isTree?: boolean;
  renderTree?: (props: {
    listMember: any;
    setListMember: any;
    request: any;
  }) => JSX.Element;
};

export type InitialQueryType = {
  endpoint?: string;
  add?: string;
};

export type APCLType = {
  fieldId?: string;
  list: ActionType[];
};

export type NameAction = "view" | "edit" | "delete" | "changePassword";

type ActionType = {
  name?: NameAction;
  url: (id: string) => string;
  getTitle?: (record: any) => string;
  getObjId?: (id: string) => any;
  roles: string[];
};

export type RequestParamsType = {
  page: number;
  pageSize: number;
  [key: string]: unknown;
};
