import React from 'react'

function Buttons({ text , onclick , bgColor , textColor , width , btnType , disabled }) {
  return (
    <button 
    type={btnType}
    className={`${ width} ${textColor}  ${bgColor}  T rounded-lg bor py-2`} 
    onClick ={ onclick }
    disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Buttons