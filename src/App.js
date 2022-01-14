import './App.css';
import React from 'react';
import Preview from './Components/Preview';
import Queue from './Components/Queue';
import fileContainer from './Services/fileContainer';
import pageContainer from './Services/pageContainer';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: new fileContainer(),
      pageList: new pageContainer(),
      clickedFile: null,
      clickedPage: null,
      clickedId: null
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

  onClickPage = (n, k, id) => {
    this.setState({
      clickedFile: n,
      clickedPage: k,
      clickedId: id
    });
  }

  renderHeader = () => (
    <header className="App-header">
      <div>In progress</div>
    </header>
  )

  renderCentralPage = () => {
    if (this.state.clickedFile == null || this.state.clickedPage == null) {
      return <div className="pageviz">PDF page</div>;
    }
    else {
      return (
        <div className="pageviz">
          <div id="vCenter">
            <Document file={ this.state.uploadedFiles.getFiles()[this.state.clickedFile].file }>
              <Page
                pageNumber={ this.state.clickedPage }
                width={ 300 }>
              </Page>
            </Document>
          </div>
        </div>
      );
    }
  }

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
          { this.state.pageList.groupByFile().map((value, index) =>
              <Preview
                value={ value }
                file={ this.state.uploadedFiles.getFiles()[value.fileId].file }
                clicked={ this.state.clickedId }
                index={ index }
                key={ `doc_${ index }` }
                callback={ this.onClickPage }
              >
              </Preview>
            )
          }
        </div>
      </div>
      { this.renderCentralPage() }
    </div>
  )

  render() {
    console.log("Uploaded ", this.state.uploadedFiles.getFiles().length, " files in total");
    console.log("Files : ", this.state.uploadedFiles.getFiles());
    console.log("Total number of pages : ", this.state.pageList.getLength());
    console.log(
      "Clicked page ",
      this.state.clickedPage,
      " from file ",
      this.state.clickedFile,
      ", id : ",
      this.state.clickedId
    );
    console.log("========================")
    return (
      <div className="App">
        { this.renderHeader() }
        { this.renderScrollbars() }
      </div>
    );
  }
}

export default App;
