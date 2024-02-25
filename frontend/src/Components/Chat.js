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
                  m.sender._id === user._id
                    ? "rgb(40, 40, 40)"
                    : "rgb(40, 40, 40)"
                }`,
                color: `${m.sender._id === user._id ? "red" : "#83f28f"}`,
                fontFamily: "Work Sans",
                borderRadius: "20px",
                padding: "3px 10px",
                maxWidth: "75%",
                marginBottom: "5px",
                // fontWeight: "bold",
                fontSize: "small",
                marginLeft: `${m.sender._id !== user._id ? "1%" : "auto"}`,
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
