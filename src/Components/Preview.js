import React from 'react';
import './Preview.css'
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Preview extends React.Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <Document
          file={ this.props.file }
          onLoadError={ () => { console.log("Failed to load"); } }
        >
          { this.props.value.pages.map((p, index) => {
              let name = "unclicked";
              if (p.id == this.props.clicked) {
                name = "clicked";
              }
              return (
                <div id="page" key={`id_${ p.id }`}>
                  <Page
                    pageNumber={ p.num }
                    className={ name }
                    width={ 200 }
                    onClick={ () => {
                      this.props.callback(p.id);
                    }}
                  />
                </div>
              );
            })
          }
        </Document>
      );
    }
  }

export default Preview;
