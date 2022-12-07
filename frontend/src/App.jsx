import { createContext, useState } from 'react'
import Home from './components/Home'

export const ThemeContext = createContext(null)

const App = () => {

  const [sideBar, setSideBar] = useState(false)
  const [theme, setTheme] = useState("dark")
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        sideBar,
        setSideBar
      }}>
      <Home />
    </ThemeContext.Provider>
  )
}
export default App