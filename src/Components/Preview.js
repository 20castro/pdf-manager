import React from 'react';
import './Preview.css'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Preview extends React.Component {

    constructor(props) {
      super(props);
    }
  
    renderPages = (pages) => {
      let items = [];
      for (let k of pages){
        items.push(
          <Page
            key={`doc_${ this.props.index }:page_${ k }`}
            pageNumber={ k }
            width={ 200 }
            onClick={ () => { console.log('Clicked page ', k) }}
          />
        );
      }
      return items;
    }
    
    render() {
      return (
        <div>
          <Document
            file={ this.props.file }
            onLoadError={ () => { console.log("Failed to load"); } }
          >
            { this.renderPages(this.props.pages) }
          </Document>
        </div>
      );
    }
  }

export default Preview;
