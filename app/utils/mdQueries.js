import fs from "fs"       
import path from "path" 
import matter from "gray-matter"

export const blogsPerPage = 5

export async function getAllBlogs() {  
    const files = fs.readdirSync(path.join("data"))
    const blogs = files.map((fileName) => {
        const slug = fileName.replace(".md", "")
        const fileData = fs.readFileSync(
            path.join("data", fileName),
            "utf-8"
        )
        const { data } = matter(fileData) 
        return {
            frontmatter: data,
            slug: slug, 
        }
    })

    const orderedBlogs = blogs.sort((a, b) => {
        return b.frontmatter.id - a.frontmatter.id
    })

    const numberPages = Math.ceil(orderedBlogs.length / blogsPerPage) 

    return{
        blogs: orderedBlogs,
        numberPages: numberPages
    }
}

export async function getSingleBlog(context) {
    const { slug } = context.params
    const data = await import(`../../data/${slug}.md`)
    const singleDocument = matter(data.default)

    return {
        singleDocument: singleDocument
    }
}