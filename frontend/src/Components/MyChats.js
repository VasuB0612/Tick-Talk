import { React, useEffect, useState } from "react";
import { useChat } from "../Context/ChatProvider";
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import GroupChat from "./GroupChat";
import axios from "axios";
import { getSender } from "../Sender/getSender";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const { user, selectedChat, setSelectedChat, chats, setChats } = useChat();

  const fetchChats = async () => {
    try {
      const configuration = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", configuration);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error fetching chats.",
        status: "warning",
        description: "Failed to load the chats",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      padding="3px 3px"
      width={{ base: "100%", md: "30%" }}
      borderRadius="lg"
      bg="rgb(56, 56, 56)"
    >
      <Box
        width="100%"
        pb={3}
        px={3}
        fontSize={{ base: "20px", md: "30px" }}
        display="flex"
        justifyContent="space-between"
      >
        My Chats
        <GroupChat>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "12px", lg: "15px" }}
            marginTop="7px"
            color="bisque"
            bg="rgb(30, 30, 30)"
            _hover={{ backgroundColor: "rgb(20, 20, 20)", color: "bisque" }}
          >
            <AddIcon marginRight="6px" />
            New group chat
          </Button>
        </GroupChat>
      </Box>

      <Box
        marginxTop="20px"
        display="flex"
        flexDir="column"
        padding="5px 5px"
        width="95%"
        height="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat ? "rgb(30, 30, 30)" : "rgb(10, 10, 10)"
                }
                px={3}
                py={2}
                borderRadius="lg"
                marginBottom="12px"
                key={chat._id}
              >
                {selectedChat === chat ? console.log(chat.users) : ""}
                {chat.isGroupChat === false
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </Box>
            ))}
          </stack>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
