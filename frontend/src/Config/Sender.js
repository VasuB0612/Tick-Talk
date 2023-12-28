const getSender = (loggedUser, allUsers) => {
  return allUsers[0]._id === loggedUser._id
    ? allUsers[1].name
    : allUsers[0].name;
};

export default getSender;
