import React, { useEffect } from 'react';

const DialogFlowMessenger = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <df-messenger
            intent="WELCOME"
            chat-title="Assistant"
            agent-id="ce3f48ce-4a10-4fa0-9e02-e472d23100a7"
            language-code="en"
        ></df-messenger>
    );
};

export default DialogFlowMessenger;
