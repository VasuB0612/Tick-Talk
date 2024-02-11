import { useState, React } from "react";
import axios from "axios";
import { useChat } from "../Context/ChatProvider";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getInfo } from "../Sender/getSender";
import Profile from "./Profile";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import { Spinner, FormControl, Input, useToast } from "@chakra-ui/react";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = useChat();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();

  const textSent = async (event) => {
    if (event.key === "Enter" && newMessage) {
      console.log(newMessage);
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.post(
          "http://localhost:5000/api/messages",
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        console.log(data);

        setNewMessage("");
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typeHandler = (event) => {
    setNewMessage(event.target.value);
  };

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
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignItems="center"
                margin="auto"
              />
            ) : (
              <div>{/* Messages go here */}</div>
            )}
            <FormControl onKeyDown={textSent} py={1} px={1} mt={3} isRequired>
              <Input
                placeholder="Enter your text here"
                border="1px solid grey"
                onChange={typeHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
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
