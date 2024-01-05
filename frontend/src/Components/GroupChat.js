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
} from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/form-control";
import UserListItem from "./UserListItem";

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
      const response = await axios.get(`/api/user?search=${search}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
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

  const handleSubmit = () => {};
  const handleGroup = async () => {};

  return (
    <div>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="rgb(58, 58, 60)" color="bisque">
          <ModalHeader
            fontSize="35px"
            display="flex"
            fontFamily="Work Sans"
            justifyContent="center"
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
                onChange={(e) => {
                  setGroupchatName(e.target.value);
                  handleSearch();
                }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Users"
                value={search}
                mb={4}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch();
                }}
              />
            </FormControl>
            {/* Selected users */}

            {searchResult?.slice(0, 4).map((res) => (
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
