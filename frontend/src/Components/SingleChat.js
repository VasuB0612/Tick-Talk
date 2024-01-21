import React from "react";
import { useChat } from "../Context/ChatProvider";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getInfo } from "../Sender/getSender";
import Profile from "./Profile";
import UpdateGroupChatModal from "./UpdateGroupChatModal";

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
              color="bisque"
              backgroundColor="rgb(30, 30, 30)"
              _hover={{ bg: "black" }}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <Profile user={getInfo(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          {/* <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            width="100%"
            height="100%"
            borderRadius="lg"
          >
            Messages Here
          </Box> */}
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
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
          <Text
            fontSize="3xl"
            fontFamily="Work Sans"
            textShadow="3px 3px 5px rgb(10, 10, 10)"
          >
            Select a chat.
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
