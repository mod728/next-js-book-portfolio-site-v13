import Image from 'next/image'
import ReactMarkdown from "react-markdown"
import PrevNext from '../../components/prevNext'
import { getAllBlogs, getSingleBlog } from "../../utils/mdQueries" 

export async function generateMetadata(props) {
    const { singleDocument } = await getSingleBlog(props)
    return { 
        title: singleDocument.data.title,
        description: singleDocument.data.excerpt,
    }
}

const SingleBlog = async(props) => {
    const { singleDocument } = await getSingleBlog(props)

    const { blogs } = await getAllBlogs()
    const prev = blogs.filter(blog => blog.frontmatter.id === singleDocument.data.id - 1)
    const next = blogs.filter(blog => blog.frontmatter.id === singleDocument.data.id + 1)
    return (
        <>
            <div className="img-container">
                <Image src={singleDocument.data.image} alt="blog-image" height={500} width={1000} quality={90} priority={true} />
            </div>
            <div className="wrapper">
                <div className="container">               
                    <h1>{singleDocument.data.title}</h1>
                    <p>{singleDocument.data.date}</p> 
                    <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
                </div> 
                <PrevNext prev={prev} next={next} /> 
            </div>
        </>
    )
}

export default SingleBlog

export async function generateStaticParams() {
    const { blogs } = await getAllBlogs()
    const paths = blogs.map((blog) => `/${blog.slug}`)
    return paths
}