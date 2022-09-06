import axios from "axios";

export const fetchData = async () =>
  axios
    .get(
      "https://food-order-app-udemy-23a1e-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
    )
    .then((res) => res.data);
