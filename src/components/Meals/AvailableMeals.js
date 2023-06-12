import React, { useState, useEffect, useCallback } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMealsHandler = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://react-http-test-247bb-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const data = await response.json();

            const loadedMeals = [];
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                })
            }

            setMeals(loadedMeals);

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchMealsHandler();
        }, [fetchMealsHandler]
    );

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    let content = <p>No meals found!</p>;

    if (meals.length > 0) {
        content = <ul>{mealsList}</ul>;
    }

    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <section className={`${styles.meals} ${isLoading ? styles.MealsLoading : ''}`}>
            <Card>
                {content}
            </Card>
        </section>
    )
}

export default AvailableMeals