import React from 'react';
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Button extends React.Component {

    constructor(props){
        super(props);
    }

    // App state already has clickedId and information up or down through the nature of callback given
    render() {
        return (
            <button onClick={ () => { this.props.callback(); } }>
                <FontAwesomeIcon icon={ this.props.img }></FontAwesomeIcon>
            </button>
        );
    }
}

export default Button;
