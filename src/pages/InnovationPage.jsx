import React, { useEffect } from 'react';

import GlobalSourcing from '../components/GlobalSourcing';
import Manufacturing from '../components/Manufacturing';

import FutureFactory from '../components/FutureFactory';

const InnovationPage = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#0B1121] min-h-screen pt-20">
            {/* Components Assembly */}
            <div className="pt-0">
                <Manufacturing />
                <GlobalSourcing />
                <FutureFactory />
            </div>
            
        </div>
    );
};

export default InnovationPage;
