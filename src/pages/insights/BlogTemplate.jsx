import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import blogPosts from '../../data/blogPosts.json';
import './BlogTemplate.css';

const BlogTemplate = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const foundPost = blogPosts.find(p => p.slug === slug);
        if (foundPost) {
            setPost(foundPost);
            // SEO Metadata Hooks
            document.title = `${foundPost.title} | Pentalogic Insights`;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', foundPost.excerpt);
            }
        } else {
            // Graceful Exception Catching (404 Fallback)
            // In a real app, we might redirect or show a 404 state. 
            // The requirement says "triggers a graceful, un-broken 404 block state showing a clean route redirection path"
            setPost(404);
        }
    }, [slug]);

    if (!post) return null;

    if (post === 404) {
        return (
            <div className="blog-error-container">
                <h1>404 - Article Not Found</h1>
                <p>The insight you are looking for might have moved or doesn't exist.</p>
                <Link to="/blog" className="back-link">Return to Blog Listing</Link>
            </div>
        );
    }

    const { title, author, date, readingTime, featuredImage, content } = post;

    return (
        <article className="blog-template">
            {/* Hero Metadata Banner */}
            <header className="blog-hero" style={{ backgroundImage: `linear-gradient(rgba(7, 25, 30, 0.8), rgba(7, 25, 30, 0.95)), url(${featuredImage})` }}>
                <div className="hero-content">
                    <div className="metadata">
                        <span className="category-label">{post.category}</span>
                        <span className="reading-duration">{readingTime}</span>
                    </div>
                    <h1 className="blog-title">{title}</h1>
                    <div className="author-node">
                        <div className="author-info">
                            <span className="author-name">By {author}</span>
                            <span className="publish-date">{date}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Long-Form Body Block */}
            <main className="blog-body-wrapper">
                <div className="blog-content-column">
                    {content.map((block, index) => {
                        switch (block.type) {
                            case 'paragraph':
                                return <p key={index}>{block.text}</p>;
                            case 'heading':
                                const HeadingTag = `h${block.level || 2}`;
                                return <HeadingTag key={index}>{block.text}</HeadingTag>;
                            case 'blockquote':
                                return <blockquote key={index}>{block.text}</blockquote>;
                            case 'code':
                                return <pre key={index}><code>{block.text}</code></pre>;
                            default:
                                return null;
                        }
                    })}
                </div>
            </main>

            {/* Social Utility & Back Panel */}
            <footer className="blog-footer">
                <div className="utility-bar">
                    <button className="share-btn" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                        Copy URL
                    </button>
                    <Link to="/blog" className="back-to-blog">
                        ← Back to Insights
                    </Link>
                </div>
            </footer>
        </article>
    );
};

export default BlogTemplate;
