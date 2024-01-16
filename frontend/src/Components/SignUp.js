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

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics.length === 0) {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pics[0].type === "image/jpeg" || pics[0].type === "image/png") {
      const data = new FormData();
      data.append("file", pics[0]);
      data.append("upload_preset", "Tick Talk");
      data.append("cloud_name", "dc3r0ior7");
      fetch("https://api.cloudinary.com/v1_1/dc3r0ior7/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password || !conPassword) {
      toast({
        title: "Please enter all the required fields.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/signup",
          { name, email, password, pic },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 201) {
          toast({
            title: "Registration was successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          console.log(response);
          setLoading(false);
          setName("");
          setEmail("");
          setPassword("");
          setConPassword("");
          setPic(null);
        }
      } catch (error) {
        if (error.response) {
          const errMessage = error.response.data.message;
          if (errMessage === "User already exists.") {
            toast({
              title: "This user already exists.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            console.log(errMessage);
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl>
        <FormLabel isRequired>Name:</FormLabel>
        <Input
          type="name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
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
        <FormLabel>Confirm Password:</FormLabel>
        <Input
          type={"password"}
          placeholder="Re-write your password"
          onChange={(e) => setConPassword(e.target.value)}
        ></Input>
        <FormLabel>Pic:</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image"
          onChange={(e) => postDetails(e.target.files)}
        ></Input>
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign Up!
      </Button>
    </VStack>
  );
};

export default SignUp;
