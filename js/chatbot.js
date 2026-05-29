document.addEventListener('DOMContentLoaded', () => {
    const bubble = document.getElementById('chatbotBubble');
    const windowEl = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');

    if (!bubble || !windowEl || !closeBtn || !form || !input || !messagesContainer) return;

    // Toggle Chat Window
    bubble.addEventListener('click', () => {
        windowEl.classList.toggle('active');
        if (windowEl.classList.contains('active')) {
            input.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        windowEl.classList.remove('active');
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && windowEl.classList.contains('active')) {
            windowEl.classList.remove('active');
        }
    });

    // Chatbot Knowledge Base
    const qaDatabase = [
        {
            keywords: ['hello', 'hi', 'hey', 'greetings', 'yo', 'morning', 'afternoon', 'hola'],
            answer: "Hello! I'm Huzefa's AI assistant. Ask me anything about my design services, pricing, projects, or how to hire me!"
        },
        {
            keywords: ['who are you', 'what is this', 'what can you do', 'purpose', 'help', 'bot', 'assistant', 'ai'],
            answer: "I'm Huzefa's virtual assistant. I'm here to answer your questions about my work, skills, services, and rates instantly."
        },
        {
            keywords: ['about', 'huzefa', 'who is', 'background', 'freelancer', 'experience', 'story', 'history'],
            answer: "Huzefa Jamil Syed is a freelance graphic designer and digital creative. He specializes in creating clean, eye-catching visual identities, logos, banners, posters, photo/video editing, and websites, adapting his style to match client requirements."
        },
        {
            keywords: ['skills', 'expert', 'software', 'photoshop', 'illustrator', 'premiere', 'after effects', 'coding', 'web', 'html', 'css', 'javascript'],
            answer: "My key skills include Graphic Design, Logo Design, Banner & Poster Design, Photo & Video Editing, Flyer Design, and Website Development. I work with industry-standard Adobe Creative Suite programs (Photoshop, Illustrator, Premiere) and modern web tech."
        },
        {
            keywords: [
                'services', 'what do you do', 'offer', 'job', 'work', 'deliver', 'logo', 'banner', 'video', 'poster', 'flyer', 
                'thumbnail', 'video editing', 'video edit', 'edit video', 'edit a video', 'editing video', 'video price'
            ],
            answer: "I offer professional graphic design and video services, including:\n• Logo Design (starting at $50)\n• Social Media Posts ($25)\n• Posters / Flyers ($40)\n• YouTube/Twitch Banners & Thumbnails ($20)\n• Basic Video Editing ($60)\n• Responsive Website Development (custom quotes)"
        },
        {
            keywords: [
                'price', 'rates', 'cost', 'how much', 'packages', 'pricing', 'starter', 'pro', 'elite', 'charge', 
                'logo price', 'banner price', 'poster price', 'flyer price', 'thumbnail price'
            ],
            answer: "I have 3 tiers of pricing packages:\n• **Starter ($10)**: 1 basic concept, high-res file, 1 revision.\n• **Pro ($25)**: 3 premium concepts, high-res & vector files, 3 revisions, source file included.\n• **Elite ($50)**: 5 elite concepts, full brand guidelines, unlimited revisions, social media kit."
        },
        {
            keywords: ['revision', 'change', 're-design', 'edit', 'updates', 'modifications'],
            answer: "My Starter package includes 1 revision, the Pro package includes 3, and the Elite package comes with unlimited revisions! Standard tweaks are typically turned around in 24 hours."
        },
        {
            keywords: ['turnaround', 'time', 'how long', 'duration', 'days', 'speed', 'fast'],
            answer: "Custom logo projects usually take 3 to 7 days, depending on details and reviews. Banners, posters, and photo editing are quicker (1-3 days). If you need it urgently, let me know!"
        },
        {
            keywords: ['source file', 'vector', 'raw file', 'psd', 'ai', 'pdf', 'png', 'jpg', 'high res', 'format', 'deliverables'],
            answer: "Yes, I deliver high-resolution exports (PNG, JPG, PDF) for all projects. Original vector files (AI) and editable layered source files (PSD) are included with Pro & Elite packages, or can be added onto Starter orders."
        },
        {
            keywords: ['payment', 'pay', 'deposit', 'upfront', 'terms', 'half'],
            answer: "I require a 50% upfront deposit to begin a project, with the remaining 50% paid upon final design approval before clean files are delivered."
        },
        {
            keywords: ['contact', 'email', 'whatsapp', 'hire', 'instagram', 'fiverr', 'upwork', 'social', 'phone', 'reach', 'talk'],
            answer: "You can reach me directly via:\n• **Email**: Huzefajamilsyed@gmail.com\n• **WhatsApp**: +60 172167235\n• **Instagram**: @huz3efa_\nOr hire me on Fiverr, Upwork, Guru, and Freelancer.com using the links in the footer!"
        },
        {
            keywords: ['portfolio', 'work', 'projects', 'esports', 'porsche', 'card', 'dashboard', 'examples'],
            answer: "Some of my featured projects are on this page, including the Porsche GT3 RS Poster, esports marketing logos, branding kits, and web UI dashboards. You can view them in the 'Recent Work' section!"
        }
    ];

    // Stop words to filter out of token matching to prevent false positives (like 'a', 'to', etc.)
    const stopWords = ['a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'arent', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'cant', 'cannot', 'could', 'couldnt', 'did', 'didnt', 'do', 'does', 'doesnt', 'doing', 'dont', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadnt', 'has', 'hasnt', 'have', 'havent', 'having', 'he', 'hed', 'hell', 'hes', 'her', 'here', 'heres', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'hows', 'i', 'id', 'ill', 'im', 'ive', 'if', 'in', 'into', 'is', 'isnt', 'it', 'its', 'itself', 'lets', 'me', 'more', 'most', 'mustnt', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shant', 'she', 'shed', 'shell', 'shes', 'should', 'shouldnt', 'so', 'some', 'such', 'than', 'that', 'thats', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'theres', 'these', 'they', 'theyd', 'theyll', 'theyre', 'theyve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasnt', 'we', 'wed', 'well', 'were', 'weve', 'werent', 'what', 'whats', 'when', 'whens', 'where', 'wheres', 'which', 'while', 'who', 'whos', 'whom', 'why', 'whys', 'with', 'wont', 'would', 'wouldnt', 'you', 'youd', 'youll', 'youre', 'youve', 'your', 'yours', 'yourself', 'yourselves'];

    // Simple NLP / keyword matching
    function getResponse(userMessage) {
        const cleaned = userMessage.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").trim();
        const words = cleaned.split(/\s+/).filter(w => !stopWords.includes(w));
        
        let bestMatch = null;
        let highestScore = 0;

        for (const qa of qaDatabase) {
            let score = 0;

            // 1. Check for phrase matches (high weight)
            for (const keyword of qa.keywords) {
                if (cleaned.includes(keyword)) {
                    const wordCount = keyword.split(/\s+/).length;
                    score += wordCount * 6; // High weight to matching entire key phrases (e.g. 'how much', 'video edit')
                }
            }

            // 2. Check for individual word matches (excluding stop words)
            for (const word of words) {
                if (word.length < 2) continue; // Ignore single letter noises
                
                for (const keyword of qa.keywords) {
                    const keywordParts = keyword.split(/\s+/);
                    for (const part of keywordParts) {
                        if (part === word) {
                            score += 3; // Exact match of content word
                        } else if (part.length > 3 && (part.includes(word) || word.includes(part))) {
                            score += 1.5; // Partial match for root words
                        }
                    }
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = qa;
            }
        }

        if (highestScore > 0 && bestMatch) {
            return bestMatch.answer;
        }

        // Polite fallback
        return "I don't have that information right now, but you can contact Huzefa directly using the contact form below, or drop an email to Huzefajamilsyed@gmail.com!";
    }

    // Append Message to UI
    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        // Convert newlines to breaks and simple markdown bolding to strong tags
        let formattedText = text.replace(/\n/g, '<br>');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedText = formattedText.replace(/• (.*?)/g, '• $1');

        messageDiv.innerHTML = `<div class="message-content">${formattedText}</div>`;
        messagesContainer.appendChild(messageDiv);
        
        // Auto Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userText = input.value.trim();
        if (!userText) return;

        appendMessage('user', userText);
        input.value = '';

        // Add Typing Indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-message bot typing-msg';
        typingIndicator.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate typing delay
        setTimeout(() => {
            // Remove typing indicator
            const indicator = messagesContainer.querySelector('.typing-msg');
            if (indicator) indicator.remove();

            // Get bot response
            const botResponse = getResponse(userText);
            appendMessage('bot', botResponse);
        }, 800 + Math.random() * 400); // 0.8 to 1.2 seconds delay
    });
});
