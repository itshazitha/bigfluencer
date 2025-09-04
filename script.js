/* =================================================================== */
/* ===================== BIGFLUENCER COMPLETE JS ==================== */
/* ======== Navigation Fix + News System + FAQ + Core Features ====== */
/* =================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Bigfluencer - Enhanced System Loading...');
    
    // Initialize all systems
    initNavigation();
    initNewsSystem();
    initFAQSystem();
    initScrollEffects();
    
    console.log('%c🌟 BIGFLUENCER %c- Complete Creator Platform', 
        'color: #1DBF73; font-weight: bold; font-size: 16px;',
        'color: #4A5568; font-size: 12px;');
});

/* =================================================================== */
/* ==================== NAVIGATION SYSTEM ============================ */
/* =================================================================== */

function initNavigation() {
    // Active Menu Management - Fix Multiple Active Issue
    setActiveMenu();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    console.log('✅ Navigation system initialized');
}

function setActiveMenu() {
    // Get current page name from URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().replace('.html', '') || 'index';
    
    // Page mapping for consistency
    const pageMapping = {
        'index': 'home',
        'news': 'news',
        'influencers': 'influencers',
        'brands': 'brands',
        'about': 'about',
        'pricing': 'pricing'
    };
    
    // Remove all active classes first
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate current page link
    const currentPageKey = pageMapping[currentPage] || currentPage;
    const activeLink = document.querySelector(`[data-page="${currentPageKey}"]`);
    
    if (activeLink) {
        activeLink.classList.add('active');
        console.log(`✅ Active page set: ${currentPageKey}`);
    }
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                window.scrollTo({
                    top: target.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* =================================================================== */
/* ==================== SCROLL EFFECTS ============================== */
/* =================================================================== */

function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

/* =================================================================== */
/* ===================== NEWS SYSTEM ================================= */
/* =================================================================== */

// News data for modal display
const newsData = {
    1: {
        title: "iPhone 16 Pro Max: The Creator's Dream Device",
        author: "Bigfluencer",
        time: "2 hours ago",
        image: "news1.png",
        likes: "1.2K",
        views: "25.4K",
        shares: "892",
        content: `
            <p>Apple has once again revolutionized the smartphone industry with the launch of the iPhone 16 Pro Max, specifically designed with content creators in mind. This flagship device introduces groundbreaking video recording capabilities that will fundamentally change how creators produce and share content.</p>
            
            <h3>Revolutionary Camera System</h3>
            <p>The iPhone 16 Pro Max features a new triple-camera system with enhanced computational photography, allowing creators to capture stunning 4K videos with minimal effort. The improved image stabilization ensures smooth footage even during dynamic recording sessions.</p>
            
            <h3>Creator-Focused Features</h3>
            <p>New features include:</p>
            <ul>
                <li>AI-powered video editing tools</li>
                <li>Real-time color grading</li>
                <li>Advanced microphone array for crystal-clear audio</li>
                <li>Extended battery life for all-day shooting</li>
            </ul>
            
            <p>This device represents Apple's commitment to empowering the creator economy and supporting the next generation of digital storytellers.</p>
        `
    },
    2: {
        title: "Samsung Galaxy Z Fold 5 Breaking Boundaries",
        author: "Samsung",
        time: "4 hours ago",
        image: "news2.png",
        likes: "900",
        views: "18.2K",
        shares: "450",
        content: `
            <p>Samsung continues to push the boundaries of mobile technology with the Galaxy Z Fold 5, offering creators unprecedented flexibility in content creation and consumption.</p>
            
            <h3>Foldable Innovation</h3>
            <p>The Z Fold 5's unique form factor allows creators to use the device as both a smartphone and tablet, opening up new possibilities for content creation workflows.</p>
        `
    },
    3: {
        title: "Breakthrough in AI Video Editing",
        author: "Tech News Daily",
        time: "6 hours ago",
        image: "news3.png",
        likes: "2.5K",
        views: "34.7K",
        shares: "1.1K",
        content: `
            <p>Artificial Intelligence is transforming the video editing landscape, making professional-quality content creation accessible to creators of all skill levels.</p>
            
            <h3>AI-Powered Tools</h3>
            <p>The latest AI video editing tools offer automatic color correction, intelligent audio cleanup, and smart content suggestions that can reduce editing time by up to 70%.</p>
        `
    },
    4: {
        title: "Meta's Revolutionary VR Headset for Content Creators",
        author: "Meta",
        time: "8 hours ago",
        image: "news4.png",
        likes: "1.8K",
        views: "22.1K",
        shares: "675",
        content: `
            <p>Meta unveils its latest VR headset designed specifically for immersive content creation, bringing virtual reality to the mainstream creator economy.</p>
        `
    },
    5: {
        title: "Google Pixel 8 Pro: Camera Magic for Creators",
        author: "Google",
        time: "1 day ago",
        image: "news5.png",
        likes: "3.1K",
        views: "45.2K",
        shares: "1.5K",
        content: `
            <p>Google's Pixel 8 Pro introduces AI-powered photography features that make every creator look like a professional photographer.</p>
        `
    },
    6: {
        title: "TikTok Algorithm Update: What Creators Need to Know",
        author: "Bigfluencer",
        time: "1 day ago",
        image: "news6.png",
        likes: "4.2K",
        views: "67.8K",
        shares: "2.8K",
        content: `
            <p>TikTok's latest algorithm changes prioritize authentic content and creator engagement, marking a significant shift in how content is discovered and promoted on the platform.</p>
        `
    }
};

// Like functionality - Fixed
let likedNews = new Set();

function initNewsSystem() {
    // Initialize like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const newsId = parseInt(this.dataset.newsId);
            if (!isNaN(newsId)) {
                toggleLike(newsId);
            }
        });
    });
    
    // Initialize modal close functionality
    const modalClose = document.querySelector('.news-modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeNewsModal);
    }
    
    // Close modal when clicking outside
    const newsModal = document.getElementById('newsModal');
    if (newsModal) {
        newsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeNewsModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeNewsModal();
        }
    });
    
    console.log('✅ News system initialized');
}

function toggleLike(newsId) {
    const likeBtn = document.querySelector(`[data-news-id="${newsId}"]`);
    if (!likeBtn) return;
    
    const likeSpan = likeBtn.querySelector('span');
    if (!likeSpan) return;
    
    // Parse current likes (handle K format)
    let currentLikes = parseFloat(likeSpan.textContent.replace('K', '').replace('.', ''));
    if (isNaN(currentLikes)) currentLikes = 0;
    
    if (likedNews.has(newsId)) {
        // Unlike
        likedNews.delete(newsId);
        likeBtn.classList.remove('liked');
        likeSpan.textContent = formatNumber(Math.max(0, currentLikes - 1));
    } else {
        // Like
        likedNews.add(newsId);
        likeBtn.classList.add('liked');
        likeSpan.textContent = formatNumber(currentLikes + 1);
    }
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.round(num).toString();
}

// Modal functionality - Enhanced
function openNewsModal(newsId) {
    const news = newsData[newsId];
    if (!news) return;
    
    const modal = document.getElementById('newsModal');
    if (!modal) return;
    
    // Update modal content
    const elements = {
        title: document.getElementById('modalTitle'),
        author: document.getElementById('modalAuthor'),
        time: document.getElementById('modalTime'),
        image: document.getElementById('modalImage'),
        content: document.getElementById('modalContent'),
        likes: document.getElementById('modalLikes'),
        views: document.getElementById('modalViews'),
        shares: document.getElementById('modalShares')
    };
    
    // Check if all elements exist
    if (Object.values(elements).some(el => !el)) {
        console.warn('Modal elements missing');
        return;
    }
    
    elements.title.textContent = news.title;
    elements.author.innerHTML = `By <strong>${news.author}</strong>`;
    elements.time.textContent = news.time;
    elements.image.src = news.image;
    elements.image.alt = news.title;
    elements.content.innerHTML = news.content;
    elements.likes.textContent = news.likes;
    elements.views.textContent = news.views;
    elements.shares.textContent = news.shares;
    
    // Set up modal like button
    const modalLikeBtn = document.getElementById('modalLikeBtn');
    if (modalLikeBtn) {
        modalLikeBtn.onclick = () => toggleLike(newsId);
        
        if (likedNews.has(newsId)) {
            modalLikeBtn.classList.add('liked');
        } else {
            modalLikeBtn.classList.remove('liked');
        }
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeNewsModal() {
    const modal = document.getElementById('newsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }
}

/* =================================================================== */
/* ====================== FAQ SYSTEM ================================= */
/* =================================================================== */

function initFAQSystem() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
    
    if (faqItems.length > 0) {
        console.log('✅ FAQ system initialized');
    }
}

/* =================================================================== */
/* ==================== UTILITY FUNCTIONS ============================ */
/* =================================================================== */

// Debug function
function debugActiveMenu() {
    const activeLinks = document.querySelectorAll('.nav-link.active');
    console.log(`🔍 Active menu items found: ${activeLinks.length}`);
    activeLinks.forEach((link, index) => {
        console.log(`   ${index + 1}. ${link.textContent.trim()}`);
    });
}

// Export functions for global access
window.BigfluencerApp = {
    setActiveMenu,
    openNewsModal,
    closeNewsModal,
    toggleLike,
    debugActiveMenu
};

console.log('📱 BIGFLUENCER Complete System Ready!');

/* =================================================================== */
/* ====================== AUTH PAGES SCRIPT ========================== */
/* =================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Auth system loaded');
    
    // Initialize role tabs
    initRoleTabs();
    
    // Initialize forms
    initAuthForms();
    
    // Initialize social buttons
    initSocialLogin();
});

function initRoleTabs() {
    const roleTabs = document.querySelectorAll('.role-tab');
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            roleTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get selected role
            const selectedRole = this.dataset.role;
            
            // Update form based on role
            updateFormForRole(selectedRole);
            
            console.log(`👤 Role selected: ${selectedRole}`);
        });
    });
}

function updateFormForRole(role) {
    const roleSpecificFields = document.getElementById('roleSpecificFields');
    const paymentInfo = document.getElementById('paymentInfo');
    const signupBtn = document.getElementById('signupBtn');
    
    // Clear existing fields
    if (roleSpecificFields) {
        roleSpecificFields.innerHTML = '';
    }
    
    // Show/hide payment info
    if (paymentInfo) {
        if (role === 'user') {
            paymentInfo.style.display = 'none';
        } else {
            paymentInfo.style.display = 'block';
            const fee = role === 'influencer' ? '$2.99' : '$6.99';
            paymentInfo.querySelector('.payment-notice span').textContent = 
                `Registration requires a one-time fee of ${fee}. You'll be redirected to payment after account creation.`;
        }
    }
    
    // Add role-specific fields for signup
    if (roleSpecificFields && role !== 'user') {
        let extraFields = '';
        
        if (role === 'influencer') {
            extraFields = `
                <div class="form-group">
                    <label for="socialHandle">Primary Social Handle</label>
                    <input type="text" id="socialHandle" name="socialHandle" placeholder="@yourusername" required>
                </div>
                <div class="form-group">
                    <label for="platform">Primary Platform</label>
                    <select id="platform" name="platform" class="form-control" required>
                        <option value="">Select Platform</option>
                        <option value="youtube">YouTube</option>
                        <option value="tiktok">TikTok</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                    </select>
                </div>
            `;
        } else if (role === 'company') {
            extraFields = `
                <div class="form-group">
                    <label for="companyName">Company Name</label>
                    <input type="text" id="companyName" name="companyName" placeholder="Your company name" required>
                </div>
                <div class="form-group">
                    <label for="website">Company Website</label>
                    <input type="url" id="website" name="website" placeholder="https://yourcompany.com" required>
                </div>
            `;
        }
        
        roleSpecificFields.innerHTML = extraFields;
    }
    
    // Update submit button text
    if (signupBtn) {
        if (role === 'user') {
            signupBtn.textContent = 'Create Account';
        } else {
            const fee = role === 'influencer' ? '$2.99' : '$6.99';
            signupBtn.textContent = `Continue to Payment (${fee})`;
        }
    }
}

function initAuthForms() {
    // Sign In Form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignIn();
        });
    }
    
    // Sign Up Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignUp();
        });
    }
}

function handleSignIn() {
    const activeRole = document.querySelector('.role-tab.active').dataset.role;
    const formData = new FormData(document.getElementById('signinForm'));
    
    // Basic validation
    const email = formData.get('email');
    const password = formData.get('password');
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would normally send to your backend
    console.log('Sign In Data:', {
        role: activeRole,
        email: email,
        password: password
    });
    
    // For demo purposes
    alert(`Sign in successful! Welcome back, ${activeRole}!`);
    
    // Redirect based on role
    redirectAfterAuth(activeRole);
}

function handleSignUp() {
    const activeRole = document.querySelector('.role-tab.active').dataset.role;
    const formData = new FormData(document.getElementById('signupForm'));
    
    // Basic validation
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Here you would normally send to your backend
    console.log('Sign Up Data:', {
        role: activeRole,
        formData: Object.fromEntries(formData)
    });
    
    // For demo purposes
    if (activeRole === 'user') {
        alert('Account created successfully! Welcome to BIGFLUENCER!');
        redirectAfterAuth(activeRole);
    } else {
        // Simulate payment redirect
        const fee = activeRole === 'influencer' ? '$2.99' : '$6.99';
        alert(`Account created! Redirecting to payment (${fee})...`);
        // In real implementation, redirect to payment processor
        setTimeout(() => {
            alert('Payment successful! Account activated!');
            redirectAfterAuth(activeRole);
        }, 1000);
    }
}

function redirectAfterAuth(role) {
    // Redirect based on user role
    switch(role) {
        case 'user':
            window.location.href = 'index.html';
            break;
        case 'influencer':
            window.location.href = 'creator-dashboard.html';
            break;
        case 'company':
            window.location.href = 'company-dashboard.html';
            break;
        default:
            window.location.href = 'index.html';
    }
}

function initSocialLogin() {
    // Google login
    document.querySelectorAll('.google-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Google login will be implemented here');
        });
    });
    
    // Facebook login
    document.querySelectorAll('.facebook-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Facebook login will be implemented here');
        });
    });
}

// Initialize default role on page load
document.addEventListener('DOMContentLoaded', function() {
    // Default to 'user' role
    updateFormForRole('user');
});

console.log('🔐 Auth system ready!');

/* =================================================================== */
/* ================== Influencers Page JavaScript =================== */
/* =================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Influencers page loaded');
    
    // Initialize filters
    initFilters();
    
    // Initialize search
    initSearch();
    
    // Initialize load more
    initLoadMore();
});

function initFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Get filter value
            const platform = this.dataset.platform;
            
            // Filter influencers
            filterInfluencers(platform);
            
            console.log(`🔍 Filtered by: ${platform}`);
        });
    });
}

function filterInfluencers(platform) {
    const influencerCards = document.querySelectorAll('.influencer-card');
    
    influencerCards.forEach(card => {
        if (platform === 'all') {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            if (card.dataset.platform === platform) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function initSearch() {
    const searchInput = document.getElementById('influencerSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchInfluencers(searchTerm);
        });
    }
}

function searchInfluencers(searchTerm) {
    const influencerCards = document.querySelectorAll('.influencer-card');
    
    influencerCards.forEach(card => {
        const name = card.querySelector('.influencer-name').textContent.toLowerCase();
        const niche = card.querySelector('.influencer-niche').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = name.includes(searchTerm) || 
                             niche.includes(searchTerm) || 
                             tags.some(tag => tag.includes(searchTerm));
        
        if (matchesSearch || searchTerm === '') {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more influencers
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('More influencers loaded! (Demo)');
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Influencers';
                this.disabled = false;
            }, 1500);
        });
    }
}

function openInfluencerProfile(influencerId) {
    // In a real application, this would open a detailed profile
    console.log(`Opening profile for influencer ${influencerId}`);
    alert(`Opening detailed profile for influencer ${influencerId} (Demo)`);
    
    // You could implement a modal here or navigate to a detailed page
    // window.location.href = `influencer-profile.html?id=${influencerId}`;
}

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

console.log('🎬 Influencers system ready!');

/* =================================================================== */
/* ==================== Brands Page JavaScript ====================== */
/* =================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏢 Brands page loaded');
    
    // Initialize filters
    initBrandFilters();
    
    // Initialize search
    initBrandSearch();
    
    // Initialize load more
    initBrandLoadMore();
});

function initBrandFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Get filter value
            const industry = this.dataset.industry;
            
            // Filter brands
            filterBrands(industry);
            
            console.log(`🔍 Filtered by industry: ${industry}`);
        });
    });
}

function filterBrands(industry) {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        if (industry === 'all') {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            if (card.dataset.industry === industry) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

function initBrandSearch() {
    const searchInput = document.getElementById('brandSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchBrands(searchTerm);
        });
    }
}

function searchBrands(searchTerm) {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        const name = card.querySelector('.brand-name').textContent.toLowerCase();
        const tagline = card.querySelector('.brand-tagline').textContent.toLowerCase();
        const description = card.querySelector('.brand-description').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = name.includes(searchTerm) || 
                             tagline.includes(searchTerm) || 
                             description.includes(searchTerm) ||
                             tags.some(tag => tag.includes(searchTerm));
        
        if (matchesSearch || searchTerm === '') {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

function initBrandLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBrandsBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more brands
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('More brands loaded! (Demo)');
                this.innerHTML = '<i class="fas fa-plus"></i> Discover More Brands';
                this.disabled = false;
            }, 1500);
        });
    }
}

function openBrandProfile(brandId) {
    // In a real application, this would open a detailed brand profile
    console.log(`Opening profile for brand ${brandId}`);
    alert(`Opening detailed profile for brand ${brandId} (Demo)`);
    
    // You could implement a modal here or navigate to a detailed page
    // window.location.href = `brand-profile.html?id=${brandId}`;
}

// Add fade in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

console.log('🏢 Brands system ready!');
