import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Image from './Image.js'
import axiosBase from 'axios'

class App extends React.Component {
  constructor(props, context){
    super(props, context)
    this.submit = this.submit.bind(this)
    this.state = {
      imageData: null
    }
    this.fileInput = React.createRef();
  }
  submit(e){
    const files = e.target.files

    if(files.length > 0) {

        var file = files[0]
        var reader = new FileReader()
        reader.onload = (e) => {
          this.setState({ imageData: e.target.result })
          const axios = axiosBase.create({
            baseURL: 'https://gvzm68sipf.execute-api.ap-northeast-1.amazonaws.com/default'
          })
          const url = 'compare'
          const base64EncodedFile = e.target.result.replace(/data:.*\/.*;base64,/, '');
          const data = {
            image: base64EncodedFile
          }
          console.log(data)
          axios.post(url, data).then((res)=>{
            console.log(res)
            switch (res.data.body.matches){
              case "kotoge":
                alert('小峠英二です。')
                break
              case "masaoka":
                alert('正岡子規です。')
                break
              default:
                alert('小峠英二でも正岡子規でもありません。')
                break
            }
          })
        };
        reader.readAsDataURL(file)

    } else {

        this.setState({ imageData: null })

    }

  }
  render(){
    const style = {
      textAlign: 'center',
      margin: '5px'
    }
    return (
      <Container style={style} maxWidth="sm">
        <Container style={style} maxWidth="sm">
          <Image src={this.state.imageData}></Image>
        </Container>
        <Container style={style} maxWidth="sm">
          <Button
            variant="contained"
            component="label"
            style={{justifyContent: 'center'}}
            >
            ファイル送信
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={this.fileInput}
              onChange={this.submit}
              />
          </Button>
        </Container>
      </Container>
    );
  }
}

export default App;
