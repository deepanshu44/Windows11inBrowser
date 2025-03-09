let windows = {
    fileExplorer: {
        isOpen: false,
        isMinimized: false,
        isMaximized: false
    }
};

// Initialize windows
function initWindows() {
    // Initial state for File Explorer window
    updateWindowState('fileExplorer');
    updateTaskbarIcons();
}

// Show or hide window and update taskbar icon
function updateWindowState(windowId) {
    const windowElement = document.getElementById(windowId);
    const windowState = windows[windowId];
    
    if (windowState.isOpen) {
        windowElement.style.display = 'flex';
        
        if (windowState.isMinimized) {
	    windowElement.classList.add('minimized');
        } else {
	    windowElement.classList.remove('minimized');
        }
        
        if (windowState.isMaximized) {
	    windowElement.classList.add('maximized');
        } else {
	    windowElement.classList.remove('maximized');
        }
    } else {
        windowElement.style.display = 'none';
    }
}

// Update taskbar icons based on window states
// function updateTaskbarIcons() {
//     const fileExplorerIcon = document.getElementById('fileExplorerTaskbarIcon');
    
//     if (windows.fileExplorer.isOpen) {
//         if (windows.fileExplorer.isMinimized) {
// 	    // Apply minimized styling to the taskbar icon
// 	    fileExplorerIcon.classList.remove('active');
// 	    fileExplorerIcon.classList.add('minimized');
//         } else {
// 	    // Apply active styling to the taskbar icon
// 	    fileExplorerIcon.classList.add('active');
// 	    fileExplorerIcon.classList.remove('minimized');
//         }
//     } else {
//         // Remove both styles if window is closed
//         fileExplorerIcon.classList.remove('active');
//         fileExplorerIcon.classList.remove('minimized');
//     }
// }

function updateTaskbarIcons() {
    const icons = document.querySelectorAll('.taskbar-icon');

    icons.forEach(icon => {
        icon.classList.remove('active');
    });

    if (windows.fileExplorer.isOpen) {
        document.getElementById('fileExplorerTaskbarIcon').classList.add('active');
    }
}

// Toggle window visibility from taskbar
function toggleWindow(windowId) {
    const windowState = windows[windowId];
    
    if (windowState.isOpen) {
        if (windowState.isMinimized) {
	    windowState.isMinimized = false;
        } else {
	    windowState.isMinimized = true;
        }
    } else {
        windowState.isOpen = true;
        windowState.isMinimized = false;
    }
    
    updateWindowState(windowId);
    updateTaskbarIcons();
}

// Open File Explorer window
function openFileExplorer() {
    windows.fileExplorer.isOpen = true;
    windows.fileExplorer.isMinimized = false;
    updateWindowState('fileExplorer');
    updateTaskbarIcons();
}

// Minimize window
function minimizeWindow(windowId) {
    windows[windowId].isMinimized = true;
    updateWindowState(windowId);
    updateTaskbarIcons();
}

// Maximize/restore window
function maximizeWindow(windowId) {
    windows[windowId].isMaximized = !windows[windowId].isMaximized;
    updateWindowState(windowId);
}

// Close window
function closeWindow(windowId) {
    windows[windowId].isOpen = false;
    updateWindowState(windowId);
    updateTaskbarIcons();
}

document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('startMenu').classList.toggle('active');
});

document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('startMenu');
    const startButton = document.getElementById('startButton');
    
    if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.remove('active');
    }
});

function toggleSelect(element) {
    // First clear any existing selections
    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
        icon.classList.remove('selected');
    });
    
    // Then select the clicked icon
    element.classList.add('selected');
}

// Handle clicking on desktop to clear selections
document.getElementById('desktop').addEventListener('click', function(event) {
    if (event.target === this) {
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => {
	    icon.classList.remove('selected');
        });
    }
});

// Update the clock
function updateClock() {
    const now = new Date();
    
    // Update time (12-hour format with AM/PM)
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('taskbarTime').textContent = `${hours}:${minutes} ${ampm}`;
    
    // Update date (MM/DD/YYYY format)
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    document.getElementById('taskbarDate').textContent = `${month}/${day}/${year}`;
}

// Update clock immediately and then every minute
updateClock();
setInterval(updateClock, 60000);

// Initialize windows when the page loads
window.onload = function() {
    initWindows();
};


// File system interaction functions
function initializeFileExplorer() {
    // Set up file item selection behavior
    const fileItems = document.querySelectorAll('.file-item');
    fileItems.forEach(item => {
	item.addEventListener('click', function() {
	    // First remove any existing selections
	    fileItems.forEach(i => i.classList.remove('selected'));
	    // Then select this item
	    this.classList.add('selected');
	});
    });
    
    // Add column sorting functionality
    const headerColumns = document.querySelectorAll('.header-column');
    headerColumns.forEach(column => {
	column.addEventListener('click', function() {
	    // Toggle sort direction
	    const currentDir = this.getAttribute('data-sort-dir') || 'asc';
	    const newDir = currentDir === 'asc' ? 'desc' : 'asc';
	    
	    // Remove sort indicators from all columns
	    headerColumns.forEach(col => {
		col.removeAttribute('data-sort-dir');
		col.textContent = col.textContent.replace(' â²', '').replace(' â¼', '');
	    });
	    
	    // Add sort indicator to this column
	    this.setAttribute('data-sort-dir', newDir);
	    this.textContent += newDir === 'asc' ? ' â²' : ' â¼';
	    
	    // Here you would add actual sorting functionality
	    // This is just a UI demo
	});
    });
    
    // Add ribbon tab switching
    const ribbonTabs = document.querySelectorAll('.ribbon-tab');
    ribbonTabs.forEach(tab => {
	tab.addEventListener('click', function() {
	    ribbonTabs.forEach(t => t.classList.remove('active'));
	    this.classList.add('active');
	    // In a real implementation, you would also update the ribbon content
	});
    });

    // Add toolbar button functionality
    const backButton = document.querySelector('.explorer-toolbar-group .toolbar-button:first-child');
    backButton.addEventListener('click', () => {
	console.log('Back button clicked');
	// In a real implementation, would navigate to previous folder
    });

    const forwardButton = document.querySelector('.explorer-toolbar-group .toolbar-button:nth-child(2)');
    forwardButton.addEventListener('click', () => {
	console.log('Forward button clicked');
	// In a real implementation, would navigate forward in history
    });

    const homeButton = document.querySelector('.explorer-toolbar-group .toolbar-button:nth-child(3)');
    homeButton.addEventListener('click', () => {
	console.log('Home button clicked');
	// In a real implementation, would navigate to home folder
    });

    // Add ribbon button functionality
    const ribbonButtons = document.querySelectorAll('.ribbon-button');
    ribbonButtons.forEach(button => {
	button.addEventListener('click', function() {
	    const action = this.querySelector('span').textContent.toLowerCase();
	    console.log(`Ribbon action: ${action}`);
	    
	    // Example implementation for a few actions
	    switch(action) {
	    case 'new':
		showNewFileDialog();
		break;
	    case 'delete':
		deleteSelectedItem();
		break;
	    case 'rename':
		renameSelectedItem();
		break;
		// Additional cases for other actions
	    }
	});
    });

    // Add sidebar navigation
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
	item.addEventListener('click', function() {
	    // Update active state
	    sidebarItems.forEach(i => i.classList.remove('active'));
	    this.classList.add('active');
	    
	    // Get the location name
	    const locationName = this.querySelector('span').textContent;
	    console.log(`Navigating to: ${locationName}`);
	    
	    // Update address bar
	    updateAddressBar(locationName);
	    
	    // In a real implementation, would load files from this location
	    // For demo, we'll just update the status bar
	    updateStatusBar(`${Math.floor(Math.random() * 20) + 1} items`);
	});
    });

    // Set up double-click to open folders
    const folderItems = document.querySelectorAll('.file-item .file-icon.folder');
    folderItems.forEach(folder => {
	folder.parentElement.addEventListener('dblclick', function() {
	    const folderName = this.querySelector('.file-name').textContent;
	    console.log(`Opening folder: ${folderName}`);
	    
	    // Update address bar
	    const currentPath = document.querySelector('.addressbar-buttons').textContent;
	    updateAddressBar(`${currentPath} > ${folderName}`);
	    
	    // In a real implementation, would load files from this folder
	});
    });
}

// Helper functions for file explorer actions
function showNewFileDialog() {
    // In a real implementation, would show a dialog to create a new file or folder
    alert('New file dialog would appear here');
}

function deleteSelectedItem() {
    const selectedItem = document.querySelector('.file-item.selected');
    if (selectedItem) {
	const fileName = selectedItem.querySelector('.file-name').textContent;
	if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
	    selectedItem.remove();
	    updateStatusBar(`${document.querySelectorAll('.file-item').length} items`);
	}
    } else {
	alert('Please select an item to delete');
    }
}

function renameSelectedItem() {
    const selectedItem = document.querySelector('.file-item.selected');
    if (selectedItem) {
	const fileNameElement = selectedItem.querySelector('.file-name');
	const currentName = fileNameElement.textContent;
	const newName = prompt('Enter new name:', currentName);
	
	if (newName && newName !== currentName) {
	    fileNameElement.textContent = newName;
	}
    } else {
	alert('Please select an item to rename');
    }
}

function updateAddressBar(path) {
    // Update the address bar with the new path
    const addressBar = document.querySelector('.addressbar-buttons');
    if (path.includes('>')) {
	// Path already includes separator
	addressBar.textContent = path;
    } else {
	// Create path with proper formatting
	addressBar.innerHTML = '';
	const parts = path.split('>').map(part => part.trim());
	
	parts.forEach((part, index) => {
	    const span = document.createElement('span');
	    span.textContent = part;
	    addressBar.appendChild(span);
	    
	    if (index < parts.length - 1) {
		const separator = document.createElement('span');
		separator.textContent = ' > ';
		addressBar.appendChild(separator);
	    }
	});
    }
}

function updateStatusBar(countText) {
    const statusCount = document.querySelector('.status-count');
    statusCount.textContent = countText;
}

// Update the openFileExplorer function to initialize our new explorer UI
function openFileExplorer() {
    // Check if explorer is already open
    let explorer = document.getElementById('fileExplorer');
    
    if (explorer) {
	// If already open, just focus the window
	focusWindow(explorer);
    } else {
	// Create and append the file explorer HTML
	const explorerHTML = `
      <!-- File Explorer Window HTML would be here -->
      <!-- This is already defined in explore.html -->
    `;
	
	// In a real implementation, you would insert the HTML
	// For this example, we'll assume the HTML is already in the document
	
	// Show the window
	explorer = document.getElementById('fileExplorer');
	if (explorer) {
	    showWindow(explorer);
	    
	    // Position the window
	    positionWindowInCenter(explorer);
	    
	    // Initialize the explorer functionality
	    initializeFileExplorer();
	} else {
	    console.error('File Explorer element not found in the document');
	}
    }
    
    return explorer;
}

// Function to show a file open dialog
function showOpenFileDialog(options = {}) {
    const explorer = openFileExplorer();
    
    // Set dialog mode
    explorer.setAttribute('data-mode', 'open');
    
    // Set file filter if provided
    if (options.filter) {
	explorer.setAttribute('data-filter', options.filter);
    }
    
    // Set callback for when a file is selected
    window.fileSelectedCallback = options.onSelect || function() {};
    
    // In a real implementation, we would add a "Open" button to the explorer
    // and handle the file selection
    
    return explorer;
}

// Function to show a file save dialog
function showSaveFileDialog(options = {}) {
    const explorer = openFileExplorer();
    
    // Set dialog mode
    explorer.setAttribute('data-mode', 'save');
    
    // Set default filename if provided
    if (options.defaultName) {
	const filenameInput = document.createElement('input');
	filenameInput.type = 'text';
	filenameInput.value = options.defaultName;
	filenameInput.className = 'filename-input';
	
	// Add to bottom of explorer before statusbar
	const statusBar = explorer.querySelector('.explorer-statusbar');
	explorer.insertBefore(filenameInput, statusBar);
    }
    
    // Set callback for when a file is saved
    window.fileSaveCallback = options.onSave || function() {};
    
    return explorer;
}

// Add these to your existing window management functions

function positionWindowInCenter(windowElement) {
    const windowWidth = windowElement.offsetWidth;
    const windowHeight = windowElement.offsetHeight;
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;
    
    windowElement.style.left = `${left}px`;
    windowElement.style.top = `${top}px`;
}

function showWindow(windowElement) {
    windowElement.style.display = 'flex';
    windowElement.classList.add('active');
}

function focusWindow(windowElement) {
    // Bring to front and set as active
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => win.classList.remove('active'));
    windowElement.classList.add('active');
    
    // In a real implementation, would also adjust z-index
}

function openEdgeBrowser() {
    // Check if Edge is already open
    let edgeWindow = document.getElementById('edgeBrowser');

    if (!edgeWindow) {
        // Create the Edge browser window
        edgeWindow = document.createElement('div');
        edgeWindow.classList.add('window');
        edgeWindow.id = 'edgeBrowser';
        edgeWindow.innerHTML = `
            <div class="window-header">
                <div class="window-title">Microsoft Edge</div>
                <div class="window-controls">
                    <div class="window-control minimize" onclick="minimizeWindow('edgeBrowser')"></div>
                    <div class="window-control maximize" onclick="maximizeWindow('edgeBrowser')"></div>
                    <div class="window-control close" onclick="closeWindow('edgeBrowser')"></div>
                </div>
            </div>
            <div class="browser-toolbar">
                <button onclick="goBack('edgeFrame')">←</button>
                <button onclick="goForward('edgeFrame')">→</button>
                <input type="text" id="edgeAddressBar" placeholder="Search or enter website" onkeydown="handleEnter(event, 'edgeFrame')">
                <button onclick="reloadPage('edgeFrame')">⟳</button>
            </div>
            <div class="window-content">
                <iframe id="edgeFrame" src="https://www.google.com/webhp?igu=1" class="browser-frame"></iframe>
            </div>
        `;

        document.body.appendChild(edgeWindow);
    }

    // Show the window
    windows.edgeBrowser = { isOpen: true, isMinimized: false };
    updateWindowState('edgeBrowser');
}

// Handle Enter key in the address bar
function handleEnter(event, frameId) {
    if (event.key === "Enter") {
        const url = document.getElementById('edgeAddressBar').value;
        const iframe = document.getElementById(frameId);

        if (url.includes('.') && !url.includes(' ')) {
            iframe.src = url.startsWith('http') ? url : 'https://' + url;
        } else {
            iframe.src = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
        }
    }
}

// Back, Forward & Reload Controls
function goBack(frameId) { document.getElementById(frameId).contentWindow.history.back(); }
function goForward(frameId) { document.getElementById(frameId).contentWindow.history.forward(); }
function reloadPage(frameId) { document.getElementById(frameId).contentWindow.location.reload(); }

// Call this function when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Attach click handler to file explorer icon or menu item
    const fileExplorerIcon = document.getElementById('fileExplorerIcon');
    if (fileExplorerIcon) {
	fileExplorerIcon.addEventListener('click', openFileExplorer);
    }
});

