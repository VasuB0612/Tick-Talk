import React from "react";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const UserBadgeItem = ({ handleFunction, user }) => {
  return (
    <div>
      <Box
        px={2}
        py={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        backgroundColor="black"
        color="bisque"
        marginBottom="10px"
      >
        {user.name}
        <CloseIcon pl={1} onClick={handleFunction} />
      </Box>
    </div>
  );
};

export default UserBadgeItem;
