import React from 'react';
import './Preview.css'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Preview extends React.Component {

    constructor(props) {
      super(props);
    }
  
    renderPages = () => {
      let items = [];
      for (let p of this.props.value.pages){
        let page = (
          <Page
            pageNumber={ p.num }
            width={ 200 }
            onClick={ () => {
              this.props.callback(this.props.value.fileId, p.num, p.id);
            }}
          />
        );
        if (p.id == this.props.clicked) {
          items.push(
            <div id="clicked" key={`id_${ p.id }`}>
              { page }
            </div>
          );
        }
        else {
          items.push(
            <div id="unclicked" key={`id_${ p.id }`}>
              { page }
            </div>
          );
        }
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
            { this.renderPages() }
          </Document>
        </div>
      );
    }
  }

export default Preview;
