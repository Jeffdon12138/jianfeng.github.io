// 简单的页面加载完成处理
document.addEventListener('DOMContentLoaded', function () {
    // 社交链接点击处理
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const platform = this.getAttribute('title');
            console.log(`点击了${platform}链接`);
            // 这里可以替换为真实的链接
        });
    });

    // 简单的复制邮箱功能
    const emailElements = document.querySelectorAll('.contact-item span, .contact-method span');
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.title = '点击复制邮箱地址';
            element.addEventListener('click', function () {
                const email = this.textContent.replace('邮箱：', '');
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(email).then(() => {
                        showSimpleMessage('邮箱地址已复制到剪贴板');
                    });
                }
            });
        }
    });

    // 简单的消息提示
    function showSimpleMessage(message) {
        // 创建简单的消息提示
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #0969da;
            color: white;
            padding: 10px 15px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 3s ease;
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 3000);
    }

    // 添加简单的CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(100%); }
            15%, 85% { opacity: 1; transform: translateX(0); }
            100% { opacity: 0; transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);

    console.log('个人简历页面加载完成');

    // 导航功能
    initNavigation();

    // 响应式导航
    initResponsiveNavigation();

    // 其他功能
    initOtherFeatures();
});

// 简单的懒加载（如果需要）
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// 页面加载完成后初始化
window.addEventListener('load', initLazyLoading);

// 导航切换功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // 移除所有活动状态
            navLinks.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // 添加活动状态
            this.classList.add('active');

            // 显示对应的内容区域
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');

                // 平滑滚动到顶部
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// 响应式导航
function initResponsiveNavigation() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // 移动端菜单切换
    function toggleMobileMenu() {
        sidebar.classList.toggle('mobile-open');
    }

    // 创建移动端菜单按钮
    if (window.innerWidth <= 1024) {
        createMobileMenuButton();
    }

    // 监听窗口大小变化
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 1024) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenuButton();
            }
        } else {
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (mobileBtn) {
                mobileBtn.remove();
            }
            sidebar.classList.remove('mobile-open');
        }
    });

    function createMobileMenuButton() {
        const mobileBtn = document.createElement('button');
        mobileBtn.className = 'mobile-menu-btn';
        mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileBtn.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1002;
            padding: 10px;
            border: none;
            background: #3498db;
            color: white;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            display: none;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;

        mobileBtn.addEventListener('click', toggleMobileMenu);
        document.body.appendChild(mobileBtn);

        // 在移动端显示按钮
        if (window.innerWidth <= 1024) {
            mobileBtn.style.display = 'block';
        }
    }
}

// 其他功能
function initOtherFeatures() {
    // 邮箱复制功能
    const emailElements = document.querySelectorAll('.contact-item');
    emailElements.forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.setAttribute('title', '点击复制邮箱');

            element.addEventListener('click', function () {
                const email = element.textContent.match(/[\w\.-]+@[\w\.-]+\.\w+/);
                if (email) {
                    copyToClipboard(email[0]);
                    showNotification('邮箱已复制到剪贴板');
                }
            });
        }
    });

    // 学术链接功能
    const academicLinks = document.querySelectorAll('.link-item');
    academicLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            const linkText = this.textContent.trim();

            // 如果是真实链接（不是#），允许正常跳转
            if (href && href !== '#' && href.startsWith('http')) {
                // 允许正常跳转，不阻止默认行为
                return;
            }

            // 只对placeholder链接阻止默认行为并显示提示
            e.preventDefault();
            if (linkText.includes('CV')) {
                showNotification('CV文件功能待完善');
            } else {
                showNotification(`${linkText}链接功能待完善`);
            }
        });
    });

    // 论文链接功能
    const pubLinks = document.querySelectorAll('.publication-links a');
    pubLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const linkText = this.textContent.trim();
            showNotification(`${linkText}功能待完善`);
        });
    });

    // 平滑滚动优化
    optimizeScrolling();
}

// 复制到剪贴板功能
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('复制失败:', err);
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

// 备用复制方法
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('复制失败:', err);
    }

    document.body.removeChild(textArea);
}

// 显示通知
function showNotification(message) {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1003;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // 3秒后自动消失
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 滚动优化
function optimizeScrolling() {
    let ticking = false;

    function updateScroll() {
        // 这里可以添加滚动相关的优化
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScroll);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// 添加必要的CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @media (max-width: 1024px) {
        .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            position: fixed !important;
            width: 280px !important;
            height: 100vh !important;
            left: 0 !important;
            top: 0 !important;
            z-index: 1001 !important;
        }
        
        .sidebar.mobile-open {
            transform: translateX(0);
        }
        
        .mobile-menu-btn {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后的初始化
window.addEventListener('load', function () {
    // 确保默认显示第一个内容区域
    const firstSection = document.querySelector('.content-section');
    if (firstSection && !document.querySelector('.content-section.active')) {
        firstSection.classList.add('active');
    }

    // 移除加载动画（如果有的话）
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// 防止快速点击导致的问题
let isNavigating = false;
document.addEventListener('click', function (e) {
    if (e.target.matches('.nav-link') && isNavigating) {
        e.preventDefault();
        return false;
    }

    if (e.target.matches('.nav-link')) {
        isNavigating = true;
        setTimeout(() => {
            isNavigating = false;
        }, 300);
    }
});

// 键盘导航支持
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }
    }
});

// 外部点击关闭移动菜单
document.addEventListener('click', function (e) {
    const sidebar = document.querySelector('.sidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    if (window.innerWidth <= 1024 &&
        sidebar.classList.contains('mobile-open') &&
        !sidebar.contains(e.target) &&
        !mobileBtn.contains(e.target)) {
        sidebar.classList.remove('mobile-open');
    }
});

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 使用节流优化resize事件
const throttledResize = throttle(function () {
    // 响应式相关的处理
    const sidebar = document.querySelector('.sidebar');
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    if (window.innerWidth > 1024) {
        sidebar.classList.remove('mobile-open');
        if (mobileBtn) {
            mobileBtn.style.display = 'none';
        }
    } else {
        if (mobileBtn) {
            mobileBtn.style.display = 'block';
        }
    }
}, 250);

window.addEventListener('resize', throttledResize); 