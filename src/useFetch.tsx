import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // fetching blog data from json file (mock rest api)
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error");
      });
  }, [url]);

  return { data, isLoading, errorMessage };
};

export default useFetch;
