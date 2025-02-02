import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useEffect, useState } from 'react'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchMeals = async () => {
      const respone = await fetch(
        'https://react-http-lab-12-1-default-rtdb.firebaseio.com/meals.json'
      )

      if (!respone.ok) {
        throw new Error('Something went wrong')
      }

      const responeData = await respone.json()

      const loadedMeals = []
      for (const key in responeData) {
        loadedMeals.push({
          id: key,
          name: responeData[key].name,
          description: responeData[key].description,
          price: responeData[key].price
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  if (isLoading) {
    return (
      <section className={classes.Mealsloading}>
        <p>Loading.....</p>
      </section>
    )
  }
  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
