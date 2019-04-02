import React, { Component } from 'react'

export default function SuperList({ items }) {
  return (
    <div>
      <h2>Super List</h2>

      {items.map(item => (
        <div key={item.id}>
          {item.id} - {item.name}
        </div>
      ))}
    </div>
  )
}
