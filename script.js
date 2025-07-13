// DOMが読み込まれてから実行
document.addEventListener('DOMContentLoaded', function() {
    
    // ハンバーガーメニューの機能
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // ナビゲーションリンクをクリックした時の処理
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ハンバーガーメニューを閉じる
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // スムーズスクロール
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // モーダルウィンドウの機能
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeBtn = document.querySelector('.close');
    
    // 詳細ボタンのクリックイベント
    document.querySelectorAll('.learn-more').forEach(button => {
        button.addEventListener('click', function() {
            const topic = this.getAttribute('data-topic');
            showModal(topic);
        });
    });
    
    // モーダルを閉じる
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // モーダルの外側をクリックした時に閉じる
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // お問い合わせフォームの処理
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmit();
    });
    
    // スクロール時のナビゲーションハイライト
    window.addEventListener('scroll', function() {
        highlightActiveNavLink();
    });
    
    // スクロール時のアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象の要素を監視
    document.querySelectorAll('.service-card, .about-content, .contact').forEach(el => {
        observer.observe(el);
    });
});

// ウェルカムメッセージを表示する関数
function showWelcomeMessage() {
    const messages = [
        "ウェブ開発の世界へようこそ！",
        "HTML、CSS、JavaScriptを学んでいきましょう！",
        "一歩ずつ進んでいけば、きっと素晴らしいウェブサイトが作れます！",
        "頑張って学習しましょう！"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // アニメーション付きのアラート
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <h3>🎉 おめでとうございます！</h3>
            <p>${randomMessage}</p>
            <button onclick="closeAlert()" class="alert-close-btn">閉じる</button>
        </div>
    `;
    
    // アラートのスタイル
    alertDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 3000;
        animation: fadeIn 0.3s ease-out;
    `;
    
    const alertContent = alertDiv.querySelector('.alert-content');
    alertContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    const closeBtn = alertDiv.querySelector('.alert-close-btn');
    closeBtn.style.cssText = `
        background-color: #667eea;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
    `;
    
    document.body.appendChild(alertDiv);
    
    // アニメーションのためのスタイル追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        .fade-in {
            animation: fadeInUp 0.8s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// カスタムアラートを閉じる関数
function closeAlert() {
    const alert = document.querySelector('.custom-alert');
    if (alert) {
        alert.remove();
    }
}

// モーダルを表示する関数
function showModal(topic) {
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    
    const content = {
        'HTML': {
            title: 'HTML（HyperText Markup Language）',
            text: 'HTMLはウェブページの構造を定義するマークアップ言語です。タグを使って見出し、段落、リンク、画像などの要素を記述します。HTMLはウェブ開発の基礎となる技術です。'
        },
        'CSS': {
            title: 'CSS（Cascading Style Sheets）',
            text: 'CSSはHTMLで作成されたウェブページのスタイル（見た目）を定義する言語です。色、フォント、レイアウト、アニメーションなどを設定して、美しいデザインを実現します。'
        },
        'JavaScript': {
            title: 'JavaScript',
            text: 'JavaScriptはウェブページにインタラクティブな機能を追加するプログラミング言語です。ユーザーの操作に応じて動的にコンテンツを変更したり、アニメーションを実行したりできます。'
        }
    };
    
    const info = content[topic];
    modalTitle.textContent = info.title;
    modalText.textContent = info.text;
    modal.style.display = 'block';
}

// お問い合わせフォームの送信処理
function handleFormSubmit() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // 簡単なバリデーション
    if (!name || !email || !message) {
        alert('すべてのフィールドを入力してください。');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('有効なメールアドレスを入力してください。');
        return;
    }
    
    // 成功メッセージを表示
    showSuccessMessage(name);
    
    // フォームをリセット
    document.getElementById('contact-form').reset();
}

// メールアドレスの検証
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 成功メッセージを表示
function showSuccessMessage(name) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <h3>✅ 送信完了</h3>
            <p>${name}さん、お問い合わせありがとうございます！</p>
            <p>メッセージを受け取りました。後ほど返信いたします。</p>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // 3秒後に自動的に削除
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
    
    // アニメーションスタイル追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// アクティブなナビゲーションリンクをハイライト
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// ページロード時の初期化
window.addEventListener('load', function() {
    // ローディングアニメーション（簡単な実装）
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// 現在の時刻を表示する関数（練習用）
function showCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP');
    alert(`現在の時刻: ${timeString}`);
}

// 色をランダムに変更する関数（練習用）
function changeRandomColor() {
    const colors = ['#667eea', '#764ba2', '#ff6b6b', '#4CAF50', '#FFC107', '#9C27B0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
    
    // 2秒後に元に戻す
    setTimeout(() => {
        document.body.style.backgroundColor = '#f4f4f4';
    }, 2000);
}

// コンソールにメッセージを出力（デバッグ用）
console.log('🎉 ウェブサイトが正常に読み込まれました！');
console.log('📚 JavaScriptの学習を頑張りましょう！'); 