import { useEffect } from "react";
import process from "process";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

return (
    <>
        <link
            rel="stylesheet"
            href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
        />
        <df-messenger
            location={process.env.LOCATION}
            project-id={process.env.PROJECT_ID}
            agent-id={process.env.AGENT_ID}
            language-code="en"
            max-query-length="-1"
        >
            <df-messenger-chat-bubble chat-title="SecureDocChatbot"></df-messenger-chat-bubble>
        </df-messenger>

        <style>
            {`
                df-messenger {
                    z-index: 999;
                    position: fixed;
                    --df-messenger-font-color: #000;
                    --df-messenger-font-family: Google Sans;
                    --df-messenger-chat-background: #f3f6fc;
                    --df-messenger-message-user-background: #d3e3fd;
                    --df-messenger-message-bot-background: #fff;
                    bottom: 16px;
                    right: 16px;
                }
            `};
        </style>
    </>
);
};

export default Chatbot;
