import { createContext, useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ThemeContext } from '../App'
import Header from './Header'
import Sidebar from './Sidebar'

const Home = () => {
    const { theme, sideBar } = useContext(ThemeContext)
    const [input, setInput] = useState()

    return (
        <div className='flex '>
            {/* Sidebar */}
            <div>
                <Sidebar />
            </div>

            <div className={sideBar ? 'ml-[200px] w-full ease-in-out duration-300' : 'w-full ease-in-out duration-300'}>
                <Header />
                <div className='flex'>
                    {/* Markdown text area */}
                    <div className='w-1/2'>
                        <textarea
                            autoFocus
                            placeholder='Text text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='w-1/2 min-h-screen p-5 text-xl outline-none'></textarea>
                    </div>

                    {/* Rendered JSX */}
                    <div className='w-1/2'>
                        <ReactMarkdown
                            className='w-1/2 border-l h-screen overflow-y-scroll'
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