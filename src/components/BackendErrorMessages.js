import React from 'react';

// param takes error object
function BackendErrorMessages({backendErrors}) {
  // default error object & keys is properties like username, password...
  // helper variable
  const errorMessages = Object.keys(backendErrors).map(name => {
    const messages = backendErrors[name].join('')
    return `${name} ${messages}`
  })
  // console.log('errorMessages', errorMessages)
  
  return <ul className="error-messages">
    {errorMessages.map(errorMessage => {
      return <li key={errorMessage}>{errorMessage}</li>
    })}
  </ul>
}
export default BackendErrorMessages;