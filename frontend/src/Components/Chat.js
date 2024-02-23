import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useChat } from "../Context/ChatProvider";
import { Tooltip, Avatar } from "@chakra-ui/react";
import { isSameSender, isLastSender } from "../Logic/ChatLogics";

const Chat = ({ messages }) => {
  const { user } = useChat();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {/* {isSameSender(messages, m, i, user._id) ||
            isLastSender(messages, i, user._id) ? (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt={7}
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  pic={m.sender.pic}
                />
              </Tooltip>
            ) : (
              console.log("Cannot render")
            )} */}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#0088cc" : "#83f28f"
                }`,
                fontFamily: "Work Sans",
                borderRadius: "20px",
                padding: "0px 10px",
                maxWidth: "75%",
                color: "black",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "small",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default Chat;
