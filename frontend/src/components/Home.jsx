import { createContext, useContext, useState } from 'react'
import { ThemeContext } from '../App'
import Header from './Header'
import Sidebar from './Sidebar'


import MarkDown from './MarkDown'



const Home = () => {
    const { theme, sideBar, preview } = useContext(ThemeContext)
    const [input, setInput] = useState(`# Hello \n\ \n\This is markdown`)

    return (
        <div className={theme === 'dark' ? 'bg-[#151619] flex' : 'flex'}>
            {/* Sidebar */}
            <div>
                <Sidebar />
            </div>

            <div className={sideBar ? 'ml-[250px] w-full ease-in-out duration-300 h-screen' : 'w-full ease-in-out duration-300 h-screen'}>
                <Header />

                <div className='flex'>

                    {/* Markdown text area */}
                    <div className={preview ? 'hidden' : 'w-1/2 h-full'}>
                        <h2 className='py-2 pl-5 font-semibold text-base tracking-widest bg-[#1d1f22] text-[#afb2b4] border-r border-r-[#afb2b4] my-0'>MARKDOWN</h2>
                        <textarea
                            autoFocus
                            placeholder='Text text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`px-5 resize-none overflow-y-scroll w-full h-[80vh] max-h-screen p-5 text-[14px] outline-none break-words ${theme === 'dark' && 'bg-[#151619] text-white'}`}></textarea>
                    </div>

                    {/* Rendered JSX */}
                    <MarkDown
                        input={input}
                    />

                </div>
            </div>
        </div>
    )
}
export default Home