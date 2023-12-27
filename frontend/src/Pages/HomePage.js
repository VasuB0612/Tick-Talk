import "../App.css";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React from "react";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import { useEffect } from "react";

const HomePage = () => {
  return (
    <Container className="home" maxW="x1" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="30%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderColor={"hotpink"}
        borderWidth="2px"
      >
        <Text fontSize="2xl">Tick Talk</Text>
      </Box>
      <Box
        bg="white"
        p={4}
        borderColor={"hotpink"}
        borderWidth="2px"
        borderRadius="lg"
        color="black"
        w="30%"
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList display="flex" justifyContent="center">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>
                <Login />
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <SignUp />
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
