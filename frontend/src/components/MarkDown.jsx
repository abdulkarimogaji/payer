import { useContext, useState } from "react"
import ReactMarkdown from "react-markdown"

// Icons

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { ThemeContext } from "../App"

// 
import style from '../app.module.css'


const MarkDown = ({ input }) => {
    const { preview, setPreview, theme } = useContext(ThemeContext)

    return (
        <div className={preview ? 'w-full' : 'w-1/2'}>
            <div className={`flex items-center justify-between py-2 px-5 font-semibold text-base tracking-widest ${theme === 'dark' ? 'bg-[#1d1f22]' : 'bg-[#d8d6d6]'}`}><p className={`${theme === 'dark' ? 'text-[#afb2b4]' : 'text-gray-600'} mb-0`}>PREVIEW</p>
                <button onClick={() => setPreview(!preview)}>{preview ? <AiOutlineEyeInvisible size={20} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'} hover:text-[#df7f4c]`} /> : <AiOutlineEye size={20} className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-800'} hover:text-[#df7f4c]`} />}
                </button></div>

            <div className={preview && 'flex justify-center'}>
                <div className={preview ? 'w-[800px] py-6 px-5 h-[80vh] overflow-hidden overflow-y-scroll overflow-x-scroll break-words' : 'h-[80vh] overflow-hidden overflow-y-scroll overflow-x-scroll break-words'}>
                    <ReactMarkdown
                        className={theme === 'dark' ? style.reactMarkDownDark : style.reactMarkDownLight}
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
    )
}
export default MarkDown