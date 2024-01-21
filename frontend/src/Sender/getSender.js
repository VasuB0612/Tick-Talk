export const getSender = (loggedUser, users) => {
  if (users && users.length === 2 && loggedUser && loggedUser._id) {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  }
};
export const getInfo = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
