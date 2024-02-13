import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { useChat } from "../Context/ChatProvider";
import { Tooltip, Avatar } from "@chakra-ui/react";
import { isSameSender, isLastSender } from "../Sender/getSender";

const Chat = ({ messages }) => {
  const { user } = useChat();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastSender(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar mt={7} mr={1} size="sm" cursor="pointer" />
              </Tooltip>
            )}
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default Chat;
