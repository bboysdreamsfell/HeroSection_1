document.addEventListener('DOMContentLoaded', () => {
    const linksElement = document.querySelector('nav .links');
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let initialBottom = -270;
    const fullyHiddenBottom = -270;
    const fullyVisibleBottom = 0;
    const mediaQuery = window.matchMedia('(max-width: 820px)');
    function updateLinksPosition(newBottom) {
        linksElement.style.bottom = `${newBottom}px`;
    }
    function startDrag(clientY) {
        if (!mediaQuery.matches) { return; }
        isDragging = true;
        startY = clientY;
        currentY = clientY;
        initialBottom = parseFloat(getComputedStyle(linksElement).bottom);
        linksElement.style.transition = 'none';
    }
    function duringDrag(clientY) {
        if (!isDragging || !mediaQuery.matches) { return; }
        currentY = clientY;
        const deltaY = startY - currentY;
        let newBottom = initialBottom + deltaY;
        newBottom = Math.min(fullyVisibleBottom, newBottom);
        newBottom = Math.max(fullyHiddenBottom, newBottom);
        updateLinksPosition(newBottom);
    }
    function endDrag() {
        if (!isDragging || !mediaQuery.matches) { return; }
        isDragging = false;
        linksElement.style.transition = 'bottom 0.3s ease-out';
        const currentBottom = parseFloat(getComputedStyle(linksElement).bottom);
        const dragDistance = startY - currentY;
        const swipeThreshold = 50;
        if (dragDistance > swipeThreshold) {
            updateLinksPosition(fullyVisibleBottom);
        } else if (dragDistance < -swipeThreshold) {
            updateLinksPosition(fullyHiddenBottom);
        } else {
            const midPoint = (fullyVisibleBottom + fullyHiddenBottom) / 2; 
            currentBottom > midPoint ?
            updateLinksPosition(fullyVisibleBottom) :
            updateLinksPosition(fullyHiddenBottom);
        }
    }
    linksElement.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            startDrag(e.touches[0].clientY);
        }
    });
    linksElement.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            duringDrag(e.touches[0].clientY);
        }
    }, { passive: false });
    linksElement.addEventListener('touchend', endDrag);
    linksElement.addEventListener('touchcancel', endDrag);
    linksElement.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDrag(e.clientY);
    });
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            duringDrag(e.clientY);
        }
    });
    document.addEventListener('mouseup', endDrag);
    mediaQuery.addEventListener('change', (e) => {
        if (!e.matches) {
            linksElement.style.bottom = `${fullyHiddenBottom}px`;
            linksElement.style.transition = 'none';
            isDragging = false;
        }
    });
});
