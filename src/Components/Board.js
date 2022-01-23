import React from 'react'
import './Board.css'

class Board extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="board">
              <input
                id="uploader"
                type="file"
                name="file"
                accept='.pdf'
                multiple
                onChange={ this.props.onUpload }
              />
              <button 
                id="uploadButton"
                title="Add new files"
                onClick={ () => {
                  const uploader = document.getElementById("uploader")
                  uploader.click();
                }}
              >Upload</button>
              <button
                title="Download result"
                id="downloadButton"
                onClick={ this.props.onDownload }
              >Download</button>
              <button
                title="Erase all"
                id="resetButton"
                onClick={ this.props.onReset }
              >Reset</button>
            </div>
        );
    }
}

export default Board;
