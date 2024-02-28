import React from 'react'

export default function BlockKeyHighlights({keyHighlights}) {
  return (
    <div className="p-2">
            <h3 className="text-start mb-2">Key Highlights:</h3>
              <hr className="mb-1 mt-0 "/>
            <ul className="text-start py-2 mb-0">
              {keyHighlights.map((highlight) => {
                // Check if both title and description are empty
                if (highlight.title === "" && highlight.description === "") {
                  return (
                    <li key={highlight.id}>
                      <strong>Practical Skills:</strong> proficient in
                      multitasking with strong verbal and interpersonal
                      communication skills
                    </li>
                  );
                } else {
                  return (
                    <li key={highlight.id}>
                      <strong>{highlight.title}:</strong>{" "}
                      {highlight.description}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
  )
}
