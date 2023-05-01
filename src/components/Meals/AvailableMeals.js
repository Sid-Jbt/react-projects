import React, { useEffect, useState } from "react";
import "./AvailableMeals.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://fir-dc6b3-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className="mealsLoading">
        <p>Loading....</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className="mealsError">
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <div className="meals">
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </div>
  );
};

export default AvailableMeals;
