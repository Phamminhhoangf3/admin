import React, { useEffect, useMemo, useRef, useState } from "react";
import { Select, Spin, Typography } from "antd";
import type { SelectProps } from "antd";
import debounce from "lodash/debounce";

const { Text } = Typography;

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: any;
  handleResponse: any;
  debounceTimeout?: number;
  label: string;
}

export default function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  handleResponse,
  label,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const loadOptions = async (filter = {}) => {
    try {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      if (fetchId === fetchRef.current) {
        setLoading(true);
        const response = await fetchOptions(filter);
        if (response.status === 200) {
          if (response.data) {
            const newOptions = response.data.map(handleResponse);
            setOptions(newOptions);
            setFetching(false);
          }
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const debounceFetcher = useMemo(() => {
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout]);

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <>
      <Text>{label}</Text>
      <Select
        allowClear
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        loading={loading}
      />
    </>
  );
}
