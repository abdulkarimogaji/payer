import { useContext } from "react"
import { ThemeContext } from "../App"
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineFile } from 'react-icons/ai'
import { AiOutlineSave } from 'react-icons/ai'
import { TfiClose } from 'react-icons/tfi'
import { BiTrashAlt } from 'react-icons/bi'

const Header = () => {
    const { sideBar, setSideBar } = useContext(ThemeContext)
    const handleClick = (e) => {
        setSideBar(!sideBar)
    }
    return (
        <div className="bg-[#0f0f0fde] flex w-full">
            <div className="bg-[#35393f] py-3 px-3">
                <button className="" onClick={handleClick}>{sideBar ? <TfiClose className="text-white" size={40} /> : <AiOutlineMenu className="text-white" size={40} />}</button>
            </div>

            {/* header */}
            <h1 className="text-base flex items-center self-center text-white ml-10 tracking-[0.2em] uppercase font-semibold border-r border-r-[#595b5e] h-10 pr-10">MarkDown</h1>

            {/* Document Name */}
            <div className="flex items-center ml-10">
                <AiOutlineFile size={20} className="text-white mr-2" />
                <div className="flex flex-col">
                    <label htmlFor="doc_name" className="text-[#7c8187] text-sm mb-.5 pl-2">Document name</label>
                    <input type="text" className="text-white rounded px-2 bg-inherit outline-none focus:ring-1 w-[150px] hover:ring-1"
                        placeholder="welcome.md"
                        id="doc_name" />
                </div>
            </div>

            {/* Header Buttons */}
            <div className="flex ml-auto items-center gap-x-5 mr-5">
                <BiTrashAlt size={35} className="text-gray-400" />
                <button className="font-semibold flex gap-2 justify-center items-center bg-[#f06820] py-2 px-3 rounded-md text-white h-auto w-full"><AiOutlineSave size={20} /> Save Changes</button>
            </div>
        </div>
    )
}
export default Header