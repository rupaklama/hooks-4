import React, { useState } from 'react';

import useFetch from '../hooks/useFetch';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const apiUrl = '/api/posts/'
  const [{respose}, doFetch] = useFetch(apiUrl)

  const handleSubmit = event => {
    event.preventDefault();
    doFetch({
      method: 'post',
      data: {
        title, description
      }
    })

    setTitle('')
    setDescription('')
  };

  return (
    <div>
      Create Posts!
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
