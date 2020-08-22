import React, { useEffect } from 'react';

import useFetch from '../hooks/useFetch';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function PopularTags() {

  const [{ response, isLoading, error }, doFetch] = useFetch('/api/posts/');

  useEffect(() => {
    doFetch()
  }, [doFetch])

  // error handling
  if (isLoading || !response) {
    return <Loading />
  }

  if (error) {
    return <ErrorMessage />
  }


  return <div>Popular tags!</div>
}
