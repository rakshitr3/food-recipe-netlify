import React from 'react'

export default function Modal({children,onClose}) {             //for creating a dialog box for taking user input //receiving onClose callback fn as a prop from navbar
  return (
    <>
        <div className='backdrop' onClick={onClose}></div>             {/*on click of this div covers 100% width of screen(check in css) popup close or if we click anywhere than popup it will close(as popup excludes this div) as onClose triggered, if we wont close div here then when we type something in email or pass field dialogue will also close*/}
            <dialog className='modal' open>                      {/*open will open the dialog box*/}
          {children}                                                {/*children is nothing but inputForm*/}
            </dialog>
    </>
  )
}