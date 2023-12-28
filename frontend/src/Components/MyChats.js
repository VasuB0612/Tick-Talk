import { React, useEffect, useState } from "react";
import { useChat } from "../Context/ChatProvider";
import { Box, useToast, Button, Stack, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import getSender from "../Config/Sender";
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
      console.log(response.data);
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
      width={{ base: "100%", md: "40%" }}
      borderRadius="lg"
    >
      <Box
        width="100%"
        fontSize={{ base: "20px", md: "30px" }}
        display="flex"
        justifyContent="space-between"
      >
        Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "12px", lg: "17px" }}
          marginTop="4px"
        >
          <AddIcon marginRight="6px" />
          New group chat
        </Button>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        padding="5px 5px"
        width="100%"
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
                bg={selectedChat === chat ? "rgb(56, 56, 56)" : "rgb(0, 0, 0)"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatname}
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
