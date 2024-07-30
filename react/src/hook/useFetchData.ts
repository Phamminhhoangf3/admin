import { useEffect, useState } from "react";
import http from "~/common/http";
import { ROOT_URL } from "~/constants/common";

const _ROOT_URL = `${ROOT_URL}/v1/`;
export const useFetchData = ({
  endpoint,
  paramsQuery = {},
  handleData = (data) => data,
  disable = false,
  defaultData = null,
  method = "GET",
}) => {
  const [data, setData] = useState(defaultData);
  const [error, setError] = useState();
  const [request, setRequest] = useState(paramsQuery);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const fullEndpoint = _ROOT_URL + endpoint;
      let response;
      if (method === "GET")
        response = await http.get(fullEndpoint, { params: request });
      else if (method === "POST") {
        response = await http.post(fullEndpoint, request);
      }
      if (response.status === 200) {
        const dataNew = handleData(response.data);
        setData(dataNew);
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  };

  const updateParamsQuery = (params: any) => {
    setRequest({ ...request, ...params });
  };

  const updateData = (updater: (prev: typeof data) => typeof data) => {
    setData((prev: typeof data) => updater(prev));
  };

  useEffect(() => {
    if (disable) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, disable]);

  return {
    data,
    error,
    loading,
    updateParamsQuery,
    updateData,
    setRequest,
  };
};
