import React from 'react';
import Loader from './Loading-Image-1.gif';

function WithLoading(Component) {
    console.log('Component Loader:',Component)
    return function WithLoadingComponet({isloading, ...props}) {
        console.log('isloading Loader:',isloading)
        if(!isloading) return (<Component {...props} />);
        return (<img style={{width:'50%'}} src={Loader} />)
    }
}

export default WithLoading;