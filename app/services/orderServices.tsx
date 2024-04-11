const URL = "/api/order";
export const getOrders = () => {
  return fetch(`${URL}?userId=${sessionStorage.getItem("userId")}`);
};

export const postOrder = (order: any) => {
  return fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      order,
      userId: sessionStorage.getItem("userId"),
    }),
  });
};
