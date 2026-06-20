function switchArchiveTab(targetPanelId, navigationMenuAnchor) {
    // Deactivate all panels
    const structuralPanels = document.querySelectorAll('.archive-panel');
    structuralPanels.forEach(panel => panel.classList.remove('active'));

    // Clear active nav link styling
    const navigationMenuItems = document.querySelectorAll('.nav-item');
    navigationMenuItems.forEach(item => item.classList.remove('active'));

    // Activate the target panel
    const destinationPanel = document.getElementById(targetPanelId);
    if (destinationPanel) destinationPanel.classList.add('active');

    if (navigationMenuAnchor) {
        navigationMenuAnchor.classList.add('active');
    }

    // Close mobile sidebar if open
    document.getElementById('global-sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('visible');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function triggerWidgetNavigation(panelId) {
    const sidebarLinks = document.querySelectorAll('.nav-item');
    let matchedLink = null;
    sidebarLinks.forEach(link => {
        const clickAttr = link.getAttribute('onclick');
        if (clickAttr && clickAttr.includes(panelId)) {
            matchedLink = link;
        }
    });
    switchArchiveTab(panelId, matchedLink);
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('global-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.classList.remove('visible');
    } else {
        sidebar.classList.add('open');
        overlay.classList.add('visible');
    }
}
