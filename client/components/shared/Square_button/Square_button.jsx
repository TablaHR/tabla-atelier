import React, { Component } from 'react'
/*
Used：<Square_button click={click_method} Text={'display_text} style = {css_Style} type={'add'}/>
 */
import './SquareButton.css'
export default class Square_button extends Component {

  render() {
    const btnstyle = this.props.style || {
      color:'gray',
      textAlign: 'left',
      fontSize:'15px',width: 200 +'px', height:50+'px', border: '1px solid',background: 'White'}
    return (
      <div>
        <button variant="outline-dark" class = {this.props.type} style = {btnstyle} onClick={this.props.Click} >{this.props.Text}</button>
      </div>
    )
  }

}
