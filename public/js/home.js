document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all cards (Features + Split Covers)
    const cards = document.querySelectorAll('.js-touch-card'); 

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            
            // 🛑 PC KILL SWITCH: If screen is wider than 768px, do nothing.
            // This ensures touch effects never trigger on laptop/desktop.
            if (window.innerWidth > 768) return;

            e.stopPropagation(); // Stop document "Close All" listener

            const isActive = card.classList.contains('touch-active');
            const isGlassBox = e.target.closest('.glass-desc-box');

            // Scenario A: Card is CLOSED. We want to OPEN it.
            if (!isActive) {
                // 1. Close all other cards first
                cards.forEach(c => c.classList.remove('touch-active'));
                // 2. Open this card
                card.classList.add('touch-active');
                return; // Done.
            }

            // Scenario B: Card is OPEN. 
            if (isActive) {
                
                // If user touched the Glass Box (content), DO NOT CLOSE.
                if (isGlassBox) {
                    return; 
                }
                
                // If user touched the Background/Header, CLOSE IT.
                card.classList.remove('touch-active');
            }
        });
    });

    const glassCards = document.querySelectorAll('.js-glass-trigger');

    glassCards.forEach(glass => {
        glass.addEventListener('click', (e) => {
            // STOP PC:
            if (window.innerWidth > 768) return;

            // STOP BUBBLING: Don't tell the parent card we clicked!
            e.stopPropagation();

            // Toggle ONLY this glass card
            const isGlassActive = glass.classList.contains('glass-active');
            
            // Close glass card
            glassCards.forEach(g => g.classList.remove('glass-active'));

            if (!isGlassActive) {
                glass.classList.add('glass-active');
            }
        });
    });

    //Global Closer
    document.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('touch-active'));
        glassCards.forEach(g => g.classList.remove('glass-active'));
    });
});