import React from 'react';
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Button extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div title={ this.props.title }>
                <button onClick={ () => { this.props.callback(); } }>
                    <FontAwesomeIcon icon={ this.props.img }></FontAwesomeIcon>
                </button>
            </div>
        );
    }
}

export default Button;
