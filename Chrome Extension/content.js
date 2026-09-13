console.log("Content script loaded");

const COMPOSE_SELECTORS = '.aDj, .btC, [role="dialog"], .gU.Up';

function createAIButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function findComposeToolbar() {
    const selectors = [
        '.aDj',
        '.btC',
        '[role="dialog"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolbar = document.querySelector(selector);
        if (toolbar) {
            return toolbar;
        }
    }
    return null;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '[role="presentation"]',
        '.gmail_quote'
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content) {
            return content.innerText.trim();
        }
    }
    return '';
}

function injectButton() {
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) existingButton.remove();

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
    }
    console.log("Toolbar found creating AI reply button");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    const sendButton = toolbar.querySelector('div[role="button"][data-tooltip^="Send"]')
        || toolbar.querySelector('.T-I.J-J5-Ji.aoO.T-I-atl.L3')
        || toolbar.querySelector('[aria-label^="Send"]');

    button.addEventListener('click', async () => {
        console.log("AI reply button clicked");
        try {
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();
            const response = await fetch('https://replymate-backend-k8uu.onrender.com/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailContent: emailContent,
                    tone: "professional",
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch generated email');
            }

            const generatedEmail = await response.text();
            const composeBox = document.querySelector('[g_editable="true"][role="textbox"]');

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedEmail);
            } else {
                console.error("Compose box not found");
            }
        } catch (error) {
            console.error(error);
            alert('Failed to generate AI reply: ' + error.message);
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

        if (sendButton && sendButton.parentNode) {
        sendButton.parentNode.insertBefore(button, sendButton);
    } else {
        toolbar.insertBefore(button, toolbar.firstChild);
    }
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches(COMPOSE_SELECTORS) || node.querySelector(COMPOSE_SELECTORS))
        );
        if (hasComposeElements) {
            console.log("Compose window detected");
            setTimeout(injectButton, 1000);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});