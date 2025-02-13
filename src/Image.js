import React from 'react';
import './App.css';

class Image extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    const style = {
      textAlign: 'center',
      width: '100%'
    }
    return (
      <img style={style} src={this.props.src}></img>
    );
  }
}

export default Image;
