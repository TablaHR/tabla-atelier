import React from 'react';

// TUNABLE ENUMERATIONS
/*
text: Content of the text
size: Size of the text
color: Foreground color of the text
style: Default, Bold, Light
 */

class CText extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const style = {
      "fontSize": `${this.props.size || 1}em`,
      "color": `${this.props.color || "black"}`,
      "height": `${this.props.spacing}`,
    }

    switch(this.props.style) {
      case "bold":
        return <h1 className="bold" style={style}>{this.props.text}</h1>
        break;

      case "light":
        return <h1 className="light" style={style}>{this.props.text}</h1>
        break;

      case "semibold":
        return <h1 className="semibold" style={style}>{this.props.text}</h1>
        break;

      default:
        return <h1 className="default" style={style}>{this.props.text}</h1>
        break;
    }
  }
}


// Render this view to index.jsx to see text options
class CTextDemoView extends React.Component {
  constructor(props) {super(props);}

  render() {
    return (
      <div>

        <CText style="bold" color="red" size={3} text="Bold Size 3" />
        <CText style="bold" color="orange" size={2} text="Bold Size 2" />
        <CText style="bold" color="yellow" text="Bold Size 1" />

        <CText style="light" color="green" size={3} text="Light Size 3" />
        <CText style="light" color="blue" size={2} text="Light Size 2" />
        <CText style="light" color="purple" text="Light Size 1" />

        <CText size={3} text="Default Size 3" />
        <CText size={2} text="Default Size 2" />
        <CText text="Default Size 1" />

      </div>
    )
  }
}

export {
  CText,
  CTextDemoView
}