import React from 'react'

export default function ButtonDelete({handle_onclick_delete, highlight}) {
  return (
    <button
    className="btn btn-sm btn-danger w-100"
    onClick={() =>
        handle_onclick_delete(highlight.id)
    }
  >
    X
  </button>
  )
}
