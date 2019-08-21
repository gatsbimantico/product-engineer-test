import React from 'react';

const cipher = typeof window !== undefined && window.require && window.require('@pet/cipher');

export default function CipheredMessage({ message }) {
  return (
    <div>{cipher ? cipher.decode(message) : message}</div>
  );
}
