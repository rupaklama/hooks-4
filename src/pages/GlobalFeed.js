import React, { useEffect, Fragment } from 'react';

import useFetch from '../hooks/useFetch';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import PopularTags from '../components/PopularTags';
import Article from './Article';

function GlobalFeed() {
  // fetching api post data from backend
  const apiUrl = '/api/posts/?limit=5&offset=5';

  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  return (
    <div className="home-page">
      <div className="banner">
        <p>Place to share knowlege & hang out!</p>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">

            {/*isLoading && <div>Loading...</div>*/}
            {isLoading && <Loading /> }

            {error && <ErrorMessage /> }
            
            {!isLoading && response && (
              <Fragment>
                <Article />
              </Fragment>
            )}
          </div>

          <div className="col-md-3"><PopularTags /></div>
        </div>
      </div>
    </div>
  );
}

export default GlobalFeed;
