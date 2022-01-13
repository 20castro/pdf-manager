import './App.css';
import React from 'react';
import Preview from './Components/Preview';
import fileContainer from './Services/fileContainer';

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

/* Test Button */

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: new fileContainer()
    };
  }

  onFileChange = event => {
    let newFiles = event.target.files;
    console.log("File event : " + newFiles.length + " added");
    this.setState({
      uploadedFiles: this.state.uploadedFiles.append(newFiles)
    });
  }

  addNumPages = (n) => {
    this.setState({
      uploadedFiles: this.state.uploadedFiles.addPages(n)
    })
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
          { this.state.uploadedFiles.getFiles().map((value, index) =>
              <Preview docId={ index } file={ value } key={ `doc_${ index }`} callback={ this.addNumPages }></Preview> 
            )
          }
        </div>
      </div>
      <div className="pageviz">PDF page</div>
    </div>
  )

  render() {
    console.log("Uploaded ", this.state.uploadedFiles.getFiles().length, " files in total");
    console.log("Pages : ", this.state.uploadedFiles.getPages())
    return (
      <div className="App">
        { this.renderHeader() }
        { this.renderScrollbars() }
      </div>
    );
  }
}

export default App;
