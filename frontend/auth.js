// auth.js - Authentication and Authorization System

function checkAuth() {
    const user = localStorage.getItem('artGalleryUser');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(user);
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('artGalleryUser');
        window.location.href = 'login.html';
    }
}

function checkRole(allowedRoles) {
    const user = checkAuth();
    if (user && !allowedRoles.includes(user.Role)) {
        alert('You do not have permission to access this feature');
        return false;
    }
    return true;
}

// Check if user has permission to access current page
function checkPageAccess(allowedRoles) {
    const user = checkAuth();
    if (user && !allowedRoles.includes(user.Role)) {
        alert('Access Denied! You do not have permission to view this page.');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

function displayUserInfo() {
    const user = checkAuth();
    if (user) {
        // Add user info to navbar
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && !document.getElementById('userInfo')) {
            const userInfo = document.createElement('div');
            userInfo.id = 'userInfo';
            userInfo.style.cssText = 'display: flex; align-items: center; gap: 1rem;';
            userInfo.innerHTML = `
                <span style="color: #667eea; font-weight: 500;">👤 ${user.Username} (${user.Role})</span>
                <button onclick="logout()" class="btn" style="padding: 0.5rem 1rem;">Logout</button>
            `;
            navContainer.appendChild(userInfo);
        }
        
        // Hide/show navigation links based on role
        hideNavLinksBasedOnRole(user.Role);
    }
}

function hideNavLinksBasedOnRole(role) {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;
    
    // Find links
    const allLinks = navLinks.querySelectorAll('a');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Handle admin-submissions link
        if (href === 'admin-submissions.html') {
            if (role === 'Viewer') {
                // Viewer should NOT see admin submissions link
                link.parentElement.style.display = 'none';
            } else {
                // Admin and Manager can see it
                link.parentElement.style.display = '';
            }
        }
        
        // All roles can see artist-submit.html
        // No restrictions needed for other pages
    });
}

// Hide action buttons based on role
function hideButtonsBasedOnRole() {
    const user = checkAuth();
    if (!user) return;
    
    // If viewer, hide all edit/delete/approve/reject buttons
    if (user.Role === 'Viewer') {
        // Hide Edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide Delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide Approve buttons
        document.querySelectorAll('.btn-approve').forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide Reject buttons
        document.querySelectorAll('.btn-reject').forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Hide Add buttons
        document.querySelectorAll('.btn-primary').forEach(btn => {
            if (btn.textContent.includes('Add') || btn.textContent.includes('Record')) {
                btn.style.display = 'none';
            }
        });
    }
}

// Call on page load
window.addEventListener('DOMContentLoaded', () => {
    displayUserInfo();
    
    // Add small delay to ensure DOM is fully loaded
    setTimeout(hideButtonsBasedOnRole, 100);
});