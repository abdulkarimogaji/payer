import { createContext, useContext, useState } from 'react'
import { ThemeContext } from '../App'
import Header from './Header'
import Sidebar from './Sidebar'


import MarkDown from './MarkDown'



const Home = () => {
    const { theme, sideBar, preview } = useContext(ThemeContext)
    const [input, setInput] = useState(`# Welcome to Markdown \n\n Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. \n\n ## How to use this?\n\n 1. Write markdown in the markdown editor window\n2. See the rendered markdown in the preview window\n\n ### Features \n\n- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists\n- Name and save the document to access again later\n- Choose between Light or Dark mode depending on your preference\n\n> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).\n\n#### Headings\n\nTo create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.\n\n##### Lists\n\nYou can see examples of ordered and unordered lists above.\n\n###### Code Blocks\n\nThis markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:\n\n\`\`\`\n<main>
    <h1>This is a larger code block</h1>\n</main>\n\`\`\`
    `)



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
                    <div className={preview ? 'hidden' : 'w-1/2 border-r border-r-[#afb2b4]'}>
                        <h2 className={`py-2 pl-5 font-semibold text-base tracking-widest ${theme === 'dark' ? 'bg-[#1d1f22] text-[#afb2b4]' : 'text-gray-600 bg-[#d8d6d6]'} my-0`}>MARKDOWN</h2>
                        <textarea
                            autoFocus
                            placeholder='Text text'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className={`px-5 resize-none overflow-y-scroll w-full h-[80vh] max-h-screen p-5 text-[14px] outline-none break-words ${theme === 'dark' ? 'bg-[#151619] text-white' : 'text-gray-700'}`}></textarea>
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