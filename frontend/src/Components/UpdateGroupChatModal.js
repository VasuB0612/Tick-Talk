import { IconButton, useDisclosure, useToast } from "@chakra-ui/react";
import { React, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  Input,
  FormControl,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { useChat } from "../Context/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";
import { Toast } from "@chakra-ui/react";
import UserListItem from "./UserListItem";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selectedChat, setSelectedChat, user } = useChat();
  const toast = useToast();

  const handleRemove = () => {};

  const handleAddUser = () => {};

  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const chatID = selectedChat._id;

      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupRename",
        { chatId: chatID, chatName: groupChatName },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        description: "Failed to load the chats",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Failed to load the search results",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  return (
    <div>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
        color="bisque"
        backgroundColor="rgb(30, 30, 30)"
        _hover={{ bg: "black" }}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent color="bisque" bg="rgb(58, 58, 59)">
          <ModalHeader color="bisque" fontFamily="Work Sans">
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" flexWrap="wrap" width="100%">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u._id)}
                />
              ))}
            </Box>

            {/* Renaming the group */}
            <FormControl display="flex">
              <Input
                placeHolder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                mr={1}
                mb={2}
              />
              <Button onClick={handleRename}>Update</Button>
            </FormControl>

            {/* Adding a member to the group */}
            <FormControl>
              <Input
                placeHolder="Add a member"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </FormControl>
            {searchResults.slice(0, 4).map((res) => (
              <UserListItem
                key={res._id}
                user={res}
                handleFunction={() => handleAddUser(res)}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              color="bisque"
              bg="rgb(40, 40, 40)"
              _hover={{ backgroundColor: "rgb(30, 30, 30)" }}
              mr={3}
              onClick={handleRemove(user)}
            >
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UpdateGroupChatModal;
