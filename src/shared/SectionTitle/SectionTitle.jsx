import React from 'react';

const SectionTitle = ({title}) => {
    return (
        <div>
            <h1 className='text-center mt-5 text-white  text-2xl'>{title}</h1>
            <hr className='mb-10 mt-5' />
        </div>
    );
};

export default SectionTitle;