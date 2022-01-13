import './App.css';
import React from 'react';
import Preview from './Components/Preview';
import Queue from './Components/Queue';
import fileContainer from './Services/fileContainer';
import pageContainer from './Services/pageContainer';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: new fileContainer(),
      pageList: new pageContainer(),
      clicked: null
    };
  }

  onFileChange = event => {
    let newFiles = event.target.files;
    console.log("File event : " + newFiles.length + " added");
    this.setState({
      uploadedFiles: this.state.uploadedFiles.append(newFiles)
    });
  }

  addNumPages = (index, n) => {
    let newFiles = this.state.uploadedFiles.addPages(index, n);
    this.setState({
      uploadedFiles: newFiles,
      pageList: newFiles.toPageContainer()
    });
  }

  renderHeader = () => (
    <header className="App-header">
      <div>In progress</div>
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
            { this.state.uploadedFiles.getFiles().map((value, index) =>
                <Queue
                  docId={ index }
                  fileFormat={ value }
                  key={ `doc_${ index }` }
                  callback={ this.addNumPages }
                >
                </Queue> 
              )
            }
        </div>
        <div className="scroller">
          { this.state.uploadedFiles.getFiles().map((value, index) =>
              <Preview
                docId={ index }
                file={ value.file }
                key={ `doc_${ index }` }
              >
              </Preview> 
            )
          }
        </div>
      </div>
      <div className="pageviz">PDF page</div>
    </div>
  )

  render() {
    console.log("Uploaded ", this.state.uploadedFiles.getFiles().length, " files in total");
    console.log("Files : ", this.state.uploadedFiles.getFiles())
    console.log("Total number of pages : ", this.state.pageList.getPages().length)
    return (
      <div className="App">
        { this.renderHeader() }
        { this.renderScrollbars() }
      </div>
    );
  }
}

export default App;
