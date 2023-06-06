import Link from 'next/link'

const Footer = () => {
    return (
        <footer>
            <div>
                <a href="https://www.google.com/"><img src="/images/github.svg" alt="logo"/></a>
                <a href="https://www.google.com/"><img src="/images/linkedin.svg" alt="logo"/></a>
                <a href="https://www.google.com/"><img src="/images/twitter.svg" alt="logo"/></a>
                <a href="https://www.google.com/"><img src="/images/facebook.svg" alt="logo"/></a>
                <hr/>
                <Link href="/blog">Blog</Link>
                <Link href="/contact">Contact</Link>
                <p>©{new Date().getFullYear()} Abe Hiroki</p>
            </div>
        </footer>
    )
}

export default Footer