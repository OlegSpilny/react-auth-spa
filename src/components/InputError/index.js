import React from 'react';

export default ({ text, ...rest }) => {
  if (!text) {
    return null;
  }
  return (
    <div className='invalid-feedback'>{ text }</div>
  )
}