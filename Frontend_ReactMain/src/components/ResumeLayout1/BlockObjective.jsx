import React from "react";

export default function BlockObjective({objective}) {
  return (
    <>
    <div className="p-2">
      <h3 className="text-start mb-2">Objective:</h3>
      <hr className="mb-3 mt-0 " />
      {objective && 
      <p className="text-start">
        {objective}
      </p>
      }
    </div>
    </>
  );
}
