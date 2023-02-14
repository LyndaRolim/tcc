import React from 'react';
import LoadingIcons from 'react-loading-icons'

const Loading = (props) => {
    return (
    <> 
        <div className={'loading text-center d-flex '+ props.className}>
            <div className='align-self-center text-center w-100'>
                <LoadingIcons.Puff width={60} height={100} />
            </div>
        </div>
    </>
    )
}

export default Loading;
