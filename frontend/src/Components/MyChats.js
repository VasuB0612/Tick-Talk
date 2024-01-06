import { React, useEffect, useState } from "react";
import { useChat } from "../Context/ChatProvider";
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import GroupChat from "./GroupChat";
import axios from "axios";

const MyChats = () => {
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

      const response = await axios.get("/api/chat", configuration);
      setChats(response.data);
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

  const getSender = (loggedUser, users) => {
    if (users && users.length === 2 && loggedUser && loggedUser._id) {
      return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    } else {
      return "";
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

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
        Nigga Chats
        <GroupChat>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "12px", lg: "15px" }}
            marginTop="7px"
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
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
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
