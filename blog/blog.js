// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const blogGrid = document.querySelector('.blog-grid');
    const blogHeader = document.querySelector('.blog-header');
    const blogCategories = document.querySelector('.blog-categories');
    const articleView = document.getElementById('articleView');
    const backBtn = document.getElementById('backBtn');
    const categoryButtons = document.querySelectorAll('.blog-category');
    const blogCards = document.querySelectorAll('.blog-card');

    // Cache for loaded data
    let articlesIndex = null;
    let loadedArticles = {};

    // Load articles index
    async function loadArticlesIndex() {
        try {
            const response = await fetch('./data/articles-index.json');
            articlesIndex = await response.json();
            return articlesIndex;
        } catch (error) {
            console.error('Failed to load articles index:', error);
            return null;
        }
    }

    // Load individual article
    async function loadArticle(articleId) {
        if (loadedArticles[articleId]) {
            return loadedArticles[articleId];
        }

        try {
            const response = await fetch(`./data/${articleId}.json`);
            const article = await response.json();
            loadedArticles[articleId] = article;
            return article;
        } catch (error) {
            console.error(`Failed to load article ${articleId}:`, error);
            return null;
        }
    }

    // Render article content from JSON structure
    function renderArticleContent(content) {
        let html = '';
        
        content.forEach(item => {
            switch (item.type) {
                case 'paragraph':
                    html += `<p>${item.text}</p>`;
                    break;
                case 'heading':
                    html += `<h3>${item.text}</h3>`;
                    break;
                case 'list':
                    const listTag = item.listType === 'ordered' ? 'ol' : 'ul';
                    const listItems = item.items.map(listItem => `<li>${listItem}</li>`).join('');
                    html += `<${listTag}>${listItems}</${listTag}>`;
                    break;
                case 'image':
                    html += `
                        <div class="article-image-inline">
                            <img src="${item.src}" alt="${item.alt}" class="article-inline-image">
                            ${item.caption ? `<p class="image-caption">${item.caption}</p>` : ''}
                        </div>
                    `;
                    break;
            }
        });
        
        return html;
    }

    // Load and render related articles
    async function loadRelatedArticles(relatedIds) {
        if (!articlesIndex) return;
        
        const relatedArticlesGrid = document.getElementById('relatedArticlesGrid');
        relatedArticlesGrid.innerHTML = '';
        
        relatedIds.forEach(articleId => {
            const articleInfo = articlesIndex.articles.find(a => a.id === articleId);
            if (articleInfo) {
                const relatedArticleHTML = `
                    <article class="related-article" data-article-id="${articleId}">
                        <img src="${articleInfo.image}" alt="${articleInfo.title}" class="related-article__image">
                        <div class="related-article__content">
                            <h4 class="related-article__title">${articleInfo.title}</h4>
                            <p class="related-article__excerpt">${articleInfo.excerpt}</p>
                        </div>
                    </article>
                `;
                relatedArticlesGrid.innerHTML += relatedArticleHTML;
            }
        });
    }

    // Function to show article
    async function showArticle(articleId) {
        const article = await loadArticle(articleId);
        if (!article) {
            console.error('Article not found');
            return;
        }
        
        // Get article metadata from index
        const articleMeta = articlesIndex.articles.find(a => a.id === articleId);
        
        // Update article content
        document.getElementById('articleTitle').textContent = article.title || '';
        document.getElementById('articleSubtitle').textContent = article.subtitle || '';
        document.getElementById('articleAuthor').textContent = article.author ? `By ${article.author}` : 'By Back to Roots Team';
        document.getElementById('articleDate').textContent = articleMeta ? formatDate(articleMeta.publishDate) : '';
        document.getElementById('articleReadTime').textContent = articleMeta ? articleMeta.readTime : '';
        document.getElementById('articleImage').src = articleMeta ? articleMeta.image : '../assets/icons/logo-C0GJMs8s.jpeg';
        document.getElementById('articleImage').alt = article.title || '';
        
        // Render content based on article structure
        let renderedContent = '';
        
        // Handle different article structures
        if (article.content) {
            // Handle the current JSON structure
            if (article.introduction) {
                renderedContent += `<p class="article-intro">${article.introduction}</p>`;
            }
            renderedContent += renderArticleContent(article.content);
        } else {
            // Handle the current JSON structure
            if (article.introduction) {
                renderedContent += `<p class="article-intro">${article.introduction}</p>`;
            }
            
            // Handle core_sections
            if (article.core_sections) {
                article.core_sections.forEach(section => {
                    renderedContent += `
                        <section class="article-section">
                            <h3>${section.heading}</h3>
                            <p>${section.description}</p>
                        </section>
                    `;
                });
            }
            
            // Handle other structured content
            if (article.why_slowing_down_matters) {
                renderedContent += '<section class="article-section"><h3>Why Slowing Down Matters</h3>';
                Object.entries(article.why_slowing_down_matters).forEach(([key, value]) => {
                    const heading = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    renderedContent += `<h4>${heading}</h4><p>${value}</p>`;
                });
                renderedContent += '</section>';
            }
            
            // Handle why_the_name_fits
            if (article.why_the_name_fits && article.why_the_name_fits.meaning) {
                renderedContent += '<section class="article-section"><h3>Why The Name Fits</h3>';
                article.why_the_name_fits.meaning.forEach(point => {
                    renderedContent += `<p>• ${point}</p>`;
                });
                renderedContent += '</section>';
            }
            
            // Handle b2r_message
            if (article.b2r_message) {
                renderedContent += `<section class="article-section"><h3>Our Message</h3><p>${article.b2r_message}</p></section>`;
            }
            
            // Handle closing_note
            if (article.closing_note) {
                renderedContent += `<div class="article-closing"><p><em>${article.closing_note}</em></p></div>`;
            }
        }
        
        document.getElementById('articleBody').innerHTML = renderedContent;
        
        // Load related articles and show section
        const relatedSection = document.querySelector('.related-articles');
        if (article.relatedArticles && article.relatedArticles.length > 0) {
            await loadRelatedArticles(article.relatedArticles);
            if (relatedSection) relatedSection.style.display = 'block';
        } else {
            if (relatedSection) relatedSection.style.display = 'none';
        }
        
        // Hide blog grid and show article
        blogGrid.style.display = 'none';
        if (blogCategories) blogCategories.style.display = 'none';
        articleView.style.display = 'block';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Function to show blog grid
    function showBlogGrid() {
        // Show blog grid and hide article
        blogGrid.style.display = 'block';
        if (blogCategories) blogCategories.style.display = 'block';
        articleView.style.display = 'none';
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Render blog grid from articles data
    function renderBlogGrid(articles) {
        const blogGridInner = document.getElementById('blogGridInner');
        if (!blogGridInner) {
            console.error('blogGridInner element not found!');
            return;
        }

        // Clear existing content
        blogGridInner.innerHTML = '';

        // Group articles into rows (2 articles per row)
        const rows = [];
        for (let i = 0; i < articles.length; i += 2) {
            rows.push(articles.slice(i, i + 2));
        }

        // Create blog rows
        rows.forEach(rowArticles => {
            const blogRow = document.createElement('div');
            blogRow.className = 'blog-row';

            rowArticles.forEach(article => {
                const articleCard = document.createElement('article');
                articleCard.className = `blog-card ${article.featured ? 'blog-card--featured' : ''}`;
                articleCard.innerHTML = `
                    <div class="blog-card__image">
                        <img src="${article.image}" alt="${article.title}" loading="lazy">
                    </div>
                    <div class="blog-card__content">
                        <h3 class="blog-card__title">${article.title}</h3>
                        <p class="blog-card__excerpt">${article.excerpt}</p>
                        <div class="blog-card__meta">
                            <span class="blog-card__date">${formatDate(article.publishDate)}</span>
                            <span class="blog-card__read-time">${article.readTime}</span>
                        </div>
                        <a href="#" class="blog-card__link" data-article-id="${article.id}">Read more</a>
                    </div>
                `;
                blogRow.appendChild(articleCard);
            });

            blogGridInner.appendChild(blogRow);
        });

        // Add click handlers to all "Read more" links
        addBlogCardClickHandlers();
    }

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Add click handlers to blog cards
    function addBlogCardClickHandlers() {
        const blogCardLinks = document.querySelectorAll('.blog-card__link');
        blogCardLinks.forEach(link => {
            link.addEventListener('click', handleBlogCardClick);
        });
    }

    // Handle blog card click to load individual article
    function handleBlogCardClick(event) {
        event.preventDefault();
        const articleId = event.target.getAttribute('data-article-id');
        
        if (!articleId) {
            console.error('No article ID found');
            return;
        }
        
        showArticle(articleId);
    }

    // Initialize blog grid with articles from JSON
    async function initializeBlogGrid() {
        const articles = await loadArticlesIndex();
        if (articles && articles.articles) {
            console.log('Articles loaded:', articles.articles.length, 'articles');
            renderBlogGrid(articles.articles);
        } else {
            console.error('Failed to load articles or articles.articles is missing');
        }
    }

    // Initialize the page
    async function init() {
        await initializeBlogGrid();
    }

    // Back button functionality
    backBtn.addEventListener('click', function() {
        showBlogGrid();
    });

    // Related articles click handlers
    document.addEventListener('click', function(e) {
        const relatedArticle = e.target.closest('.related-article');
        if (relatedArticle) {
            e.preventDefault();
            const articleId = relatedArticle.dataset.articleId;
            if (articleId) {
                showArticle(articleId);
            }
        }
    });

    // Category filter functionality
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.dataset.category;
                
                // Filter blog cards (for now, just show all - can be enhanced later)
                blogCards.forEach(card => {
                    card.style.display = 'flex';
                    // Add fade in animation
                    card.style.animation = 'none';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.6s ease forwards';
                    }, 10);
                });
            });
        });
    }

    // Smooth scroll for any internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add hover effect to blog cards
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize the application
    init();
});