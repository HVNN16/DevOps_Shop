import { useEffect, useState } from "react";
import axiosClient from "../api/axios_client";

export default function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient.get(endpoint)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading };
}
