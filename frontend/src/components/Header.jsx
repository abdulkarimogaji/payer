import { useContext } from "react"
import { ThemeContext } from "../App"

const Header = () => {
    const { sideBar, setSideBar } = useContext(ThemeContext)
    const handleClick = (e) => {
        console.log(sideBar)
        setSideBar(!sideBar)
    }
    return (
        <div className="py-5 bg-[#0f0f0fde] flex w-full">
            <button onClick={handleClick} className="border">Large X</button>
            <p>MarkDown</p>
        </div>
    )
}
export default Header