import React from 'react';
import './Queue.css'
import { Document, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class Queue extends React.Component {

    constructor(props) {
        super(props);
    }
  
    onDocumentLoadSuccess = ({ numPages }) => {
        this.props.callback(this.props.docId, numPages);
    }
  
    render() {
        if (this.props.fileFormat.added) {
            return null;
        }
        else {
            return (
                <div id="addPages">
                    <Document
                        file={ this.props.fileFormat.file }
                        onLoadSuccess={ this.onDocumentLoadSuccess }
                        onLoadError={ () => { console.log("Failed to load"); } }
                    >
                    </Document>
                </div>
            )
        }
    }
}

export default Queue;
