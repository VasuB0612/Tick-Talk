import { useState, React } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useChat } from "../Context/ChatProvider";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Input,
  Box,
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import UserListItem from "./UserListItem";
import UserBadgeItem from "./UserBadgeItem";

const GroupChat = ({ children }) => {
  const { user, chats, setChats } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupchatName, setGroupchatName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);

  const toast = useToast();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user?search=${search}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(response.data);
      setSearchResult(response.data);
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

  const handleSubmit = () => {
    if (!groupchatName || !participants) {
      toast({
        title: "Enter a group name and atleast 3 members",
        description: "Failed to load the search results",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = axios.post(
        "http://localhost:5000/api/chat/group",
        {
          chatName: groupchatName,
          users: JSON.stringify(participants.map((u) => u._id)),
        },
        config
      );
      console.log(data);
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "A new group chat is created.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      console.log(data);
    } catch (error) {
      toast({
        title: "Action failed",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleDelete = (delUser) => {
    setParticipants(participants.filter((part) => part._id !== delUser._id));
  };

  const handleGroup = async (user) => {
    if (participants.includes(user)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    } else {
      setParticipants([...participants, user]);
    }
  };

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(58, 58, 60)">
          <ModalHeader
            fontSize="35px"
            display="flex"
            fontFamily="Work Sans"
            justifyContent="center"
            color="bisque"
          >
            Create a group chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat name"
                value={groupchatName}
                mb={3}
                color="bisque"
                onChange={(e) => {
                  setGroupchatName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Users"
                value={search}
                mb={4}
                color="bisque"
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch();
                }}
              />
            </FormControl>

            <Box display="flex" flexWrap="wrap" width="100%">
              {participants.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {searchResult.slice(0, 4).map((res) => (
              <UserListItem
                key={res._id}
                user={res}
                handleFunction={() => handleGroup(res)}
              />
            ))}
          </ModalBody>

          <ModalFooter>
            <Button
              color="bisque"
              _hover={{ backgroundColor: "rgb(24, 23, 23)" }}
              variant="ghost"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
            >
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default GroupChat;
