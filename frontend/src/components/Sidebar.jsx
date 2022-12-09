import { useContext, useState } from "react"
import { ThemeContext } from "../App"
import { FiPlus } from 'react-icons/fi'
import { HiOutlineMoon } from 'react-icons/hi'
import { HiOutlineSun } from 'react-icons/hi'
import Switch from './Switch'

const Sidebar = () => {
    const { sideBar, toggleTheme, theme } = useContext(ThemeContext)
    // console.log(theme)
    const [value, setValue] = useState(false)

    const switchTheme = () => {
        setValue(!value)
        toggleTheme()
    }
    return (
        <div className={
            sideBar
                ? 'absolute top-0 left-0 right-0 bottom-0 h-screen w-[250px] bg-[#1d1f22] ease-in-out duration-300'
                : 'absolute top-0 left-[-100%] w-full h-screen  bg-[#1d1f22] ease-in-out duration-300'
        }>
            <h2 className="pl-5 py-5 text-[#c1c4cb] text-base font-semibold capitalize leading-5 tracking-widest">MY DOCUMENTS</h2>
            <div className="grid  mx-5 h-[80vh]">
                <div><button className="flex justify-center items-center bg-[#f06820] hover:bg-[#ff5a01] py-1.5 rounded-md text-white h-auto w-full"><FiPlus size={17} /> New Document</button></div>


                <div className="flex self-end items-center">
                    <HiOutlineMoon className={theme === 'light' ? 'text-gray-400 mr-2' : 'text-white mr-2'} />
                    <Switch
                        isOn={value}
                        handleSwitch={switchTheme}
                    />
                    <HiOutlineSun className={theme === 'dark' ? 'text-gray-400 ml-2' : 'text-white ml-2'} />

                </div>

            </div>

        </div>
    )
}
export default Sidebar