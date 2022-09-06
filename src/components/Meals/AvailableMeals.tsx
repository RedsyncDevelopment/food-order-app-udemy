import { useQuery } from "@tanstack/react-query";
import type { MealInterface } from "../../../types";
import { fetchData } from "../../../utils/data/fetchData";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const { data, isLoading, isError, error } = useQuery<MealInterface[], Error>(
    ["meals"],
    fetchData
  );

  if (isLoading) {
    return (
      <section className={classes.meals}>
        <Card>Loading...</Card>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={classes.meals}>
        <Card>{error.message}</Card>
      </section>
    );
  }

  const loadedMeals = [];

  for (const key in data) {
    loadedMeals.push({
      id: key,
      name: data[key].name,
      description: data[key].description,
      price: data[key].price,
      amount: data[key].amount,
    });
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {loadedMeals.map(({ name, price, description, id }) => (
            <MealItem
              id={id}
              key={id}
              name={name}
              description={description}
              price={price}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
