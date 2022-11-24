import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Login from './Login/Login';

Authenticated.propTypes = {
    
};
function Authenticated({reload}) {

    return (
        <div>
            <Login reload={reload}/>
        </div>
    );
}

export default Authenticated;