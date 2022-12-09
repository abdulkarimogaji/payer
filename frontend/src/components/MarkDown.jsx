import { useContext, useState } from "react"
import ReactMarkdown from "react-markdown"

// Icons

import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'
import { ThemeContext } from "../App"


const MarkDown = ({ input }) => {
    const { preview, setPreview } = useContext(ThemeContext)


    return (
        <div className={preview ? 'w-full' : 'w-1/2'}>
            <div className='flex items-center justify-between py-2 px-5 font-semibold text-base tracking-widest bg-[#1d1f22] '><p className="text-[#afb2b4] mb-0">PREVIEW</p>
                <button onClick={() => setPreview(!preview)}>{preview ? <AiOutlineEyeInvisible size={20} className="text-gray-400 hover:text-[#df7f4c]" /> : <AiOutlineEye size={20} className="text-gray-400 hover:text-[#df7f4c]" />}
                </button></div>

            <div className={preview && 'flex justify-center'}>
                <ReactMarkdown
                    className={preview ? 'w-[500px] py-6 px-5 h-[80vh] overflow-hidden overflow-y-scroll overflow-x-scroll break-words' : 'py-6 px-5 h-[80vh] overflow-hidden border-l overflow-y-scroll overflow-x-scroll break-words'}
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
    )
}
export default MarkDown