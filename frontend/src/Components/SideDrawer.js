import React, { useState } from "react";
import Profile from "./Profile";
import axios from "axios";
import UserListItem from "./UserListItem";
import "./style.css";
import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  Button,
  Avatar,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { BellIcon } from "@chakra-ui/icons";
import { FaCaretDown } from "react-icons/fa";
import { useDisclosure } from "@chakra-ui/hooks";
import { useChat } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loadingChat, setLoadingChat] = useState();
  const { user, setSelectedChat, chats, setChats } = useChat();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/user?search=${search}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setSearchResult(response.data);
    } catch (error) {
      toast({
        title: "Error Occurred",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  const createChat = async (userID) => {
    try {
      setLoadingChat(true);

      const configuration = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("/api/chat", { userID }, configuration);

      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occurred fetching chats",
        description: error.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div>
      <Box className="boxContainer">
        <button variant="ghost" className="search" onClick={onOpen}>
          <IoSearch style={{ marginTop: "5px" }} />
          <Text display={{ base: "none", md: "flex" }} px="4">
            Search users
          </Text>
        </button>
        <Text fontSize="2xl" fontFamily="Work Sans">
          Tick-Talk
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<FaCaretDown />}
              bg="rgb(58, 58, 60)"
              color="beige"
              _hover={{ bg: "bisque", color: "rgb(58, 58, 60)" }}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg="rgb(70, 70, 70)" border="none">
              <Profile user={user}>
                <MenuItem
                  color="bisque"
                  bg="rgb(70, 70, 70)"
                  _hover={{ bg: "rgb(76, 75, 75)" }}
                >
                  My Profile
                </MenuItem>
                <MenuDivider />
              </Profile>
              <MenuItem
                color="bisque"
                bg="rgb(70, 70, 70)"
                _hover={{ bg: "rgb(76, 75, 75)" }}
                onClick={handleLogOut}
              >
                Log Out{" "}
              </MenuItem>
            </MenuList>
            <br />
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="rgb(20, 20, 20)" color="bisque">
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" paddingBottom="2px">
              <Input
                placeholder="Search user here"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleSearch();
                }}
                marginBottom="12px"
              />
            </Box>
            {searchResult.map((USER) => (
              <UserListItem
                key={USER._id}
                user={USER}
                handleFunction={() => createChat(USER._id)}
              />
            ))}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
