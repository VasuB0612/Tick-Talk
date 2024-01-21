import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  IconButton,
  Modal,
  ModalFooter,
  Button,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Image,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

const Profile = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          d={{ base: "flex" }}
          icon={<ViewIcon />}
          color="bisque"
          backgroundColor="rgb(30, 30, 30)"
          _hover={{ bg: "black" }}
          onClick={onOpen}
        />
      )}
      <Modal
        size="lg"
        bg="rgb(58, 58, 60)"
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent height="410px" color="bisque" bg="rgb(58, 58, 60)">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="50%"
              src={user.pic}
              alt={user.name}
              boxSize="150px"
            />
            <Text
              fontSize={{ base: "28px", md: "27px" }}
              fontFamily="Work Sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              color="bisque"
              colorScheme="rgb(24, 23, 23)"
              mr={3}
              onClick={onClose}
              _hover={{ backgroundColor: "rgb(24, 23, 23)" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
