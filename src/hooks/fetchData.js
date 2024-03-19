import { useState, useEffect } from 'react';

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
         if(!isLoading) {
            setIsLoading(true);
            const response = await fetch(url);
            const json = await response.json();
            setData(json);

            setIsLoading(false);
         } else {
            return;
         }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);
  return [data, isLoading];
};
export default useFetchData;