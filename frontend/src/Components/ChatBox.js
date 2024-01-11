import React from "react";
import { useChat } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SingleChat from "./SingleChat";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { user, chats, setChats, selectedChat } = useChat();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      padding="20px 0px"
      alignItems="center"
      flexDir="column"
      backgroundColor="rgb(60, 60, 60)"
      width={{ base: "100%", md: "69%" }}
      borderRadius="lg"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
