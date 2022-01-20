import './App.css';
import React from 'react';
import { faArrowCircleUp, faArrowCircleDown, faTrash } from '@fortawesome/free-solid-svg-icons'

import Preview from './Components/Preview';
import Button from './Components/Button';
import Board from './Components/Board';

import fileContainer from './Services/fileContainer';
import pageContainer from './Services/pageContainer';

import { PDFDocument } from 'pdf-lib';

import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: new fileContainer(),
      pageList: new pageContainer(),
      clickedId: null
    };
  }

  createPdf = async() => {
    const byFile = this.state.pageList.arrayByFile();
    let doc = await PDFDocument.create();
    for (const el of byFile) {
        const input = this.state.uploadedFiles.getFiles(el.fileId).file;
        const data = await input.arrayBuffer();
        const file = await PDFDocument.load(data);
        const copy = await doc.copyPages(file, el.pages);
        copy.forEach(page => {
          const { width, height } = page.getSize();
          if (height > width) {
            const alpha = 595.276/width;
            page.scale(alpha, alpha);
          }
          else {
            const alpha = 595.276/height;
            page.scale(alpha, alpha);
          }
          return doc.addPage(page);
        });
    }
    const pdfBytes = await doc.save();
    const docUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    return docUrl;
  }

  // Board buttons

  onUpload = async(event) => {
    const newFiles = event.target.files;
    console.log("File event : " + newFiles.length + " added");
    const files = await this.state.uploadedFiles.append(newFiles);
    this.setState({
      uploadedFiles: files,
      pageList: files.toPageContainer(this.state.pageList)
    });
  }

  onReset = () => {
    console.log("Reset asked")
    this.setState({
      uploadedFiles: this.state.uploadedFiles.empty(),
      pageList: this.state.pageList.empty(),
      clickedId: null
    });
  }

  onDownload = () => {
    if (this.state.pageList.getLength() == 0) {
      console.log('Nothing to download');
    }
    else {
      console.log('Donwload asked')
      this.createPdf().then(url => {
        let downloader = document.getElementById('downloader');
        downloader.href = url;
        downloader.click();
      });
    }
  }

  // Center page buttons

  onClickPage = (id) => {
    this.setState({
      clickedId: id
    });
  }

  onClickUp = () => {
    this.setState({
      pageList: this.state.pageList.goUp(this.state.clickedId)
    });
  }

  onClickDown = () => {
    this.setState({
      pageList: this.state.pageList.goDown(this.state.clickedId)
    });
  }

  onTrash = () => {
    console.log("Trash asked")
    this.setState({
      pageList: this.state.pageList.remove(this.state.clickedId),
      clickedId: this.state.clickedId + 1
    });
  }

  // Render

  centerPage = () => {
    const clickedPage = this.state.pageList.getById(this.state.clickedId);
    if (this.state.clickedId == null || clickedPage == null) {
      return <div className="pageviz"></div>;
    }
    else {
      return (
        <div className="pageviz">
          <div id="vCenter" style={{ margin: 'auto' }}>
            <Button callback={ this.onClickUp } img={ faArrowCircleUp } title={ "Go up" }></Button>
            <Button callback={ this.onClickDown } img={ faArrowCircleDown } title={ "Go down" }></Button>
          </div>
          <div id="vCenter">
            <Document file={ this.state.uploadedFiles.getFiles(clickedPage.fileId).file }>
              <Page
                pageNumber={ clickedPage.page }
                width={ 300 }
                // className={ "centerPage" }
              > 
              </Page>
            </Document>
          </div>
          <div id="vCenter" style={{ margin: 'auto' }}>
            <Button callback={ this.onTrash } img={ faTrash } title={ "Delete this page" }></Button>
          </div>
        </div>
      );
    }
  }

  render() {
    console.log("Uploaded ", this.state.uploadedFiles.getLength(), " files in total");
    console.log("Files : ", this.state.uploadedFiles.getFiles());
    console.log("Total number of pages : ", this.state.pageList.getLength());
    console.log("Clicked page ", this.state.clickedId);
    console.log("========================");
    return (
      <div className="App">
        <header className="App-header">
          <div>In progress</div>
        </header>
        <a download="result.pdf" id="downloader"></a>
        <div className="container">
          <div className="subcontainer">
            <Board onUpload={ this.onUpload } onReset={ this.onReset } onDownload={ this.onDownload }></Board>
            <div className="scroller">
              { this.state.pageList.groupByFile().map((value, index) =>
                  <Preview
                    value={ value }
                    file={ this.state.uploadedFiles.getFiles(value.fileId).file }
                    clicked={ this.state.clickedId }
                    index={ index }
                    key={ `doc_${ index }` }
                    callback={ this.onClickPage }
                  ></Preview>
                )
              }
            </div>
          </div>
          { this.centerPage() }
        </div>
      </div>
    );
  }
}

export default App;
