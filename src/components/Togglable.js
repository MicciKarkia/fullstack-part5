import React, { useState, useImperativeHandle } from 'react'

const Toggable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
      return {
          toggleVisibility
      }
    })

    return (
      <div>
          <div style={hideWhenVisible} className={props.buttonContainer}>
              {props.title}
              <button className={props.button} onClick={toggleVisibility}>{props.buttonLabelHidden}</button>
          </div>
          <div style={showWhenVisible}>
            <div className={props.buttonContainer}>
              {props.children? props.children: props.title}
              <button className={props.button} onClick={toggleVisibility}>{props.buttonLabelVisible}</button>
            </div>
            {props.content}
          </div>
      </div>
    )

})

export default Toggable