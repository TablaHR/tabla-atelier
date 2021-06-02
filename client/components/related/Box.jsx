import React,{Component} from 'react'
// import './box.css'
export default class Dialog extends Component {
    constructor(props){
       super(props);
       this.state={}
    }



    render(){

      let mask = {
        // width: '100%',
        // height: '100%',
        // position: 'fixed',
        // left: '0',
        // right: '0',
        // backgroundColor: '#000',
        // opacity: '0.4',
        // color:'#f00',
        display:this.props.display
      }
    let content ={
        position: 'fixed',
        height: '300px',
        width: '300px',
        left: '50%',
        top:'50%',
        backgroundColor: '#fff',
        transform: 'translate(-50%,-50%)'
    }


        return (
            <div className="mask" style={mask}>
                <div className="content" style={content}>
                    <button onClick={this.props.hide}>&times;</button>
                </div>
            </div>
        );
    }
}
