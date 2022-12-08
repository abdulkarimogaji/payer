import { createContext, useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ThemeContext } from '../App'
import Header from './Header'
import Sidebar from './Sidebar'

// Icons

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'


const Home = () => {
    const { theme, sideBar } = useContext(ThemeContext)
    const [input, setInput] = useState()
    const [preview, setPreview] = useState(false)

    return (
        <div className='flex'>
            {/* Sidebar */}
            <div>
                <Sidebar />
            </div>

            <div className={sideBar ? 'ml-[250px] w-full ease-in-out duration-300 h-screen' : 'w-full ease-in-out duration-300 h-screen'}>
                <Header />
                <div className='flex'>
                    {/* Markdown text area */}
                    <div className='w-1/2 h-full'>
                        <h2 className='py-2 pl-5 font-semibold text-base tracking-widest bg-[#1d1f22] text-[#7c8187] border-r border-r-[#afb2b4]'>MARKDOWN</h2>
                        <textarea
                            autoFocus
                            placeholder='Text text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='w-full h-full p-5 text-xl outline-none break-words'></textarea>
                    </div>

                    {/* Rendered JSX */}
                    <div className='w-1/2'>
                        <div className='flex items-center justify-between py-2 px-5 font-semibold text-base tracking-widest bg-[#1d1f22] text-[#afb2b4]'><p>PREVIEW</p>
                            <button onClick={() => setPreview(!preview)}>{preview ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </button></div>

                        <ReactMarkdown
                            className='border-l overflow-y-scroll overflow-x-scroll break-words'
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "")
                                    return !inline && match ? (
                                        <SyntaxHighlighter style={docco} language={match[1]} PreTag="div" {...props}>
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>

                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {input}

                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home