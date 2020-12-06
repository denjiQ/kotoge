import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Image from './Image.js'
import Answer from './Answer.js'
import axiosBase from 'axios'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.submit = this.submit.bind(this)
    this.state = {
      imageData: null,
      text: ""
    }
    this.fileInput = React.createRef();
  }
  submit(e) {
    this.setState({ imageData: null })
    this.setState({ text: "判定中..." })
    const files = e.target.files

    if (files.length > 0) {

      var file = files[0]
      var reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ imageData: e.target.result })
        const axios = axiosBase.create({
          baseURL: process.env.REACT_APP_API_URL
        })
        const url = 'compare'
        const base64EncodedFile = e.target.result.replace(/data:.*\/.*;base64,/, '');
        const data = {
          image: base64EncodedFile
        }
        console.log(data)
        const config = {
          headers: {
            'x-api-key': `${process.env.REACT_APP_API_KEY}`
          }
        }
        // return
        axios.post(url, data, config).then((res) => {
          console.log(res)
          switch (res.data.body.matches) {
            case "kotoge":
              // alert('小峠英二です。')
              this.setState({ text: "小峠英二です。" })
              break
            case "masaoka":
              // alert('正岡子規です。')
              this.setState({ text: "正岡子規です。" })
              break
            default:
              // alert('小峠英二でも正岡子規でもありません。')
              this.setState({ text: "小峠英二でも正岡子規でもありません。" })
              break
          }
        })
      };
      reader.readAsDataURL(file)

    } else {

      this.setState({ imageData: null })

    }

  }
  render() {
    const style = {
      textAlign: 'center'
    }
    const containerImgStyle = {
      textAlign: 'center',
      marginTop: '10px',
      marginBottom: '10px'
    }
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: colors.blue[800],
        },
        type: "dark",
      },
    });
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container style={style}>
          <Container style={style} maxWidth="sm">
            <div>
              <h1>小峠英二と正岡子規を見分けるアプリ</h1>
              <p>画像をアップロードすると、<br />写っている人物が小峠英二か正岡子規かを<br />Amazon Rekognitionが判定します。</p>
            </div>
          </Container>
          <Container style={containerImgStyle} maxWidth="sm">
            <Image src={this.state.imageData}></Image>
          </Container>
          <Container style={style} maxWidth="sm">
            <Answer text={this.state.text}></Answer>
          </Container>
          <Container style={style}>
            <Button
              variant="contained"
              component="label"
              style={{ justifyContent: 'center' }}
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
      </ThemeProvider>
    );
  }
}

export default App;
