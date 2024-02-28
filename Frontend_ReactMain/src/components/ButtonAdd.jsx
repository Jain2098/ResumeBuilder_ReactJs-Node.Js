import React from 'react'
import appIcons from './icons/appIconsBarrel';

export default function ButtonAdd({
    handle_onclick_add, 
    text, 
    appIcons, 
    extracss,
    isIconPreview,
    defaultcss
  }) {
  return (
    <button
    onClick={handle_onclick_add}
    className={`${defaultcss} ${extracss}`}
  >
    {isIconPreview && <span>{appIcons} </span>}
    {text && <span> {text}</span>}
  </button>
  )
}

ButtonAdd.defaultProps = {
  extracss: "",
  appIcons: appIcons.add,
  text:"",
  isIconPreview: true,
  defaultcss: "add-button text-center mt-0 justify-content-center"
}