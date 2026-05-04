import { useEffect, useState } from 'react'
import './App.css'

interface Meal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strMealThumb: string
  strTags: string | null
  strYoutube: string
  [key: string]: string | null
}

interface ApiResponse {
  data: {
    page: number
    totalPages: number
    data: Meal[]
  }
}

function getIngredients(meal: Meal) {
  const ingredients: string[] = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure?.trim() ? measure.trim() + ' ' : ''}${ingredient}`)
    }
  }
  return ingredients
}

export default function App() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetch(`https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=10`)
      .then(r => r.json())
      .then((json: ApiResponse) => {
        setMeals(json.data.data)
        setTotalPages(json.data.totalPages)
      })
      .catch(() => setError('Failed to fetch meals. Please try again.'))
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="app">
      <header>
        <h1>Meals Explorer</h1>
        <p>Discover delicious recipes from around the world</p>
      </header>

      {error && <div className="error">⚠️ {error}</div>}

      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p>Fetching delicious meals…</p>
        </div>
      ) : (
        <div className="grid-container">
          <div className="grid">
            {meals.map(meal => {
            const ingredients = getIngredients(meal)
            return (
              <div key={meal.idMeal} className="card">
                <div className="card-img-wrap">
                  <img src={meal.strMealThumb} alt={meal.strMeal} loading="lazy" />
                  <div className="img-overlay">
                    <span className="badge area">📍 {meal.strArea}</span>
                  </div>
                </div>
                <div className="card-body">
                  <h2>{meal.strMeal}</h2>
                  <span className="badge category">🏷️ {meal.strCategory}</span>

                  {meal.strTags && (
                    <div className="tags">
                      {meal.strTags.split(',').map(tag => tag.trim()).filter(Boolean).map(tag => (
                        <span key={tag} className="tag">#{tag}</span>
                      ))}
                    </div>
                  )}

                  <div className="ingredients-box">
                    <p className="ingredients-title">Ingredients</p>
                    <ul>
                      {ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  {meal.strYoutube && (
                    <a href={meal.strYoutube} target="_blank" rel="noreferrer" className="yt-btn">
                      <span className="yt-icon">▶</span> Watch Recipe
                    </a>
                  )}
                </div>
              </div>
            )
            })}
          </div>
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1} className="page-btn">
          ← Prev
        </button>
        <div className="page-info">
          <span className="page-current">{page}</span>
          <span className="page-sep">of</span>
          <span className="page-total">{totalPages}</span>
        </div>
        <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} className="page-btn">
          Next →
        </button>
      </div>
    </div>
  )
}
