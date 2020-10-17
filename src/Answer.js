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
      <h4>{this.props.text}</h4>
    );
  }
}

export default Image;
