import './App.css';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// import axios from 'axios'; or fetch

/* Test Button */

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = { clicked: 0 };
  }

  handleClick = () => {
    console.log(this.state.clicked)
    this.setState({ clicked: this.state.clicked + 1 });
  }

  render() {
    return (
      <button onClick={ this.handleClick }>{ this.state.clicked }</button>
    );
  }
}

class Preview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      numPages: null
    }
    console.log(props)
  }

  renderPages = (n) => {
    let items = [];
    for (let k = 0; k < n; k++){
      items.push(
        <Page
          key={`doc_${ this.props.docId }:page_${ k + 1 }`}
          pageNumber={ k + 1 }
          width={ 200 }
          onClick={ () => { console.log('Clicked page ', k + 1) }}
        />
      );
    }
    return items;
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages: numPages
    });
  }

  render() {
    return (
      <div>
        <Document
          file={ this.props.file }
          onLoadSuccess={ this.onDocumentLoadSuccess }
          onLoadError={ () => { console.log("Failed to load"); } }
        >
          { this.renderPages(this.state.numPages) }
        </Document>
      </div>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: []
    };
  }

  onFileChange = event => {
    let newFiles = event.target.files;
    console.log("File event : " + newFiles.length + " added");
    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(Object.values(newFiles))
    });
  }

  renderHeader = () => (
    <header className="App-header">
      <div>
        <Button></Button>
      </div>
    </header>
  )

  renderScrollbars = () => (
    <div className="container">
      <div className="subcontainer">
        <div className="uploader">
          <input
            id="uploadArea"
            type="file"
            name="file"
            accept='.pdf'
            multiple
            onChange={ this.onFileChange }
          />
        </div>
        <div className="scroller">
          { this.state.uploadedFiles.map((value, index) =>
              <Preview docId={ index } file={ value } key={ `doc_${ index }` }></Preview> 
            )
          }
        </div>
      </div>
      <div className="pageviz">PDF page</div>
    </div>
  )

  render() {
    console.log("Uploaded ", this.state.uploadedFiles.length, " files in total");
    return (
      <div className="App">
        { this.renderHeader() }
        { this.renderScrollbars() }
      </div>
    );
  }
}

export default App;
