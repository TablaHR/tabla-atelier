import React, { Component } from 'react'
import {CText} from './CText.jsx'
/*
Use：<CButton onClick={click_method} Text={'display_text} style = {css_Style} type={'add'}/>
 */
import './css/CButton.css'
export default class CButton extends Component {

  render() {
    return (
      <div className="cbutton-wrapper">
        <div className="cbutton-text">
          <CText text={this.props.Text} style="semibold" size={0.8}/>
        </div>

        <button variant="outline-dark" className="CButton" onClick={this.props.onClick}></button>
        <h3 className="plus">+</h3>
      </div>
    )
  }
}