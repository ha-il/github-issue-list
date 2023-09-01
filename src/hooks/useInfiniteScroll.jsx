import { useCallback, useEffect, useState } from 'react';

import { getIssues } from '../apis';
import { throttle } from '../utils';

const useInfiniteScroll = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchIssues = useCallback(
    async page => {
      try {
        const { data } = await getIssues(page);
        setErrorMessage('');
        setIsLoading(true);
        setIssues(prev => [...prev, ...data]);
        setPageNumber(pageNumber + 1);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [pageNumber],
  );

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if ((window.innerHeight + scrollTop >= offsetHeight) & (isLoading === false)) {
        fetchIssues(pageNumber);
      }
    });
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageNumber]);

  useEffect(() => {
    fetchIssues(pageNumber);
  }, []);
  return { issues, isLoading, errorMessage };
};

export default useInfiniteScroll;
