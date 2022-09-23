import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await fetch(url);
      console.log("useFetch response --> ", response);
      const result = await response.json();
      console.log(result);
      setData(result);
      setTotalItems(result.totalItems);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);
  return { data, totalItems, error, loading };
};
export default useFetch;
