export const formatDate = (createAt: Date) => {
  const date =
    createAt.getDate() +
    "/" +
    (Number(createAt.getMonth()) + 1) +
    "/" +
    createAt.getFullYear() +
    " " +
    createAt.getHours() +
    ":" +
    createAt.getMinutes() +
    ":" +
    createAt.getSeconds();

  return date;
};

export const formatDateNow = (createAt: Date) => {
  const date =
    Number(createAt.getDate()) +
    1 +
    "/" +
    (Number(createAt.getMonth()) + 1) +
    "/" +
    createAt.getFullYear() +
    " " +
    createAt.getHours() +
    ":" +
    createAt.getMinutes() +
    ":" +
    createAt.getSeconds();

  return date;
};
