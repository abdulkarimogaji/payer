import { useContext } from "react"
import { ThemeContext } from "../App"

const Sidebar = () => {
    const { sideBar } = useContext(ThemeContext)
    return (
        <div className={
            sideBar
                ? 'absolute top-0 left-0 right-0 bottom-0 h-screen w-[200px] bg-black ease-in-out duration-300'
                : 'absolute top-0 left-[-100%] w-full h-screen  bg-black ease-in-out duration-300'
        }>
            <p className="text-white">Sidebar.</p>
        </div>
    )
}
export default Sidebar