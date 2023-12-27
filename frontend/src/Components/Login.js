import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "/api/user/login",
          { email, password },
          config
        );
        toast({
          title: "Login successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        console.log(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        window.location.href = "/chat";
      } catch (error) {
        toast({
          title: "Something went wrong",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        console.log(error.response.data.message);
        return;
      }
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl>
        <FormLabel isRequired>Email:</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <FormLabel isRequired>Password:</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={handleLogin}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
