import React from 'react';
import './Preview.css'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Preview extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        numPages: null
      }
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
      this.props.callback(numPages);
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

export default Preview;
