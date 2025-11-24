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
        
        // Update article content
        document.getElementById('articleTitle').textContent = article.title;
        document.getElementById('articleSubtitle').textContent = article.subtitle;
        document.getElementById('articleAuthor').textContent = `By ${article.author}`;
        document.getElementById('articleDate').textContent = article.publishDate;
        document.getElementById('articleReadTime').textContent = article.readTime;
        document.getElementById('articleImage').src = article.image;
        document.getElementById('articleImage').alt = article.title;
        
        // Render content
        const renderedContent = renderArticleContent(article.content);
        document.getElementById('articleBody').innerHTML = renderedContent;
        
        // Load related articles
        if (article.relatedArticles) {
            await loadRelatedArticles(article.relatedArticles);
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

    // Initialize the page
    async function init() {
        await loadArticlesIndex();
        
        // Add click handlers to "Read more" links
        blogCards.forEach((card, index) => {
            const readMoreLink = card.querySelector('.blog-card__link');
            if (readMoreLink) {
                readMoreLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Map card titles to article IDs
                    const title = card.querySelector('.blog-card__title').textContent;
                    let articleId = 'unlearning-usual'; // Default
                    
                    if (title.includes('Unlearning the Usual')) {
                        articleId = 'unlearning-usual';
                    } else if (title.includes('Face the Calm')) {
                        articleId = 'childhood-wisdom';
                    } else if (title.includes('Ubtan')) {
                        articleId = 'nature-connection';
                    } else if (title.includes('Weather or Not')) {
                        articleId = 'emotional-wellbeing';
                    }
                    
                    showArticle(articleId);
                });
            }
        });
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