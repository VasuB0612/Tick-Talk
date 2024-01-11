import React from "react";
import { useChat } from "../Context/ChatProvider";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getAll } from "../Sender/getSender";
import Profile from "./Profile";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChat();

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={4}
            width="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            fontFamily="Work Sans"
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user={getAll(user, selectedChat.users)} />
              </>
            ) : (
              <></>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            // justifyContent="flex-end"
            // p={6}
            bg="rgb(20, 20, 20)"
            height="95%"
            width="97%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Text fontSize="3xl" fontFamily="Work Sans">
            Select a chat.
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
