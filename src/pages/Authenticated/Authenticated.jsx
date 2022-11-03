import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Login from './Login/Login';

Authenticated.propTypes = {
    
};
function Authenticated(props) {

    return (
        <div>
            <Login/>
        </div>
    );
}

export default Authenticated;