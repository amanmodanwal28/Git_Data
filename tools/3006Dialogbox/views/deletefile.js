let selectedFiles = []; // Array to hold selected file paths for deletion
let controlKeyPressed = false; // Track whether the control key is pressed
let isDragging = false; // Track whether a drag selection is in progress
selectedfilePathDir


document.addEventListener('keydown', (event) => {
    // console.log('Key pressed:', event.key);
    if (event.key === 'Delete') {
        deleteSelectedFiles();
    }
});
// Function to delete selected files
function deleteSelectedFiles() {

    ipcRenderer.send('delete-request', selectedFiles);

    // Clear selected files array after deletion
    selectedFiles = [];

}

function Comfirmation_Request() {
    ipcRenderer.send('confirm-delete')
}

ipcRenderer.on('delete-status', (event, status) => {
    if (status.success) {
        alert('File deleted successfully!', status.success)
        console.log('File deleted successfully!', status.success)
        deleteSelectedFiles()
            // Handle any UI updates or further logic on successful delete
    } else if (status.cancelled) {
        console.log('Delete operation cancelled.', status.cancelled)
            // Handle cancellation if needed
    }
})


document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'a' || event.key === 'A') {
        selectAllFiles();
    }
});

// Function to select all files
function selectAllFiles() {
    const allFileItems = document.querySelectorAll('.file-list-data-Container');
    selectedFiles = Array.from(allFileItems).map(fileItem => {
        fileItem.classList.add('selected');
        return path.join(selectedfilePathDir, fileItem.innerText.trim());
    });
    console.log('Selected all files:', selectedFiles);
}

// Event listener for handling file selection for deletion
function deleteFileSelection(fileItem, file) {
    fileItem.addEventListener('click', (event) => {
        const selectfilePathPath = path.join(selectedfilePathDir, file);

        // Check if control key is pressed
        if (controlKeyPressed) {
            if (selectedFiles.includes(selectfilePathPath)) {
                // Deselect file if already selected
                selectedFiles = selectedFiles.filter(filePath => filePath !== selectfilePathPath);
                fileItem.classList.remove('selected');
            } else {
                // Select file if not already selected

                selectedFiles.push(selectfilePathPath);
                fileItem.classList.add('selected');

            }
        } else if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                if (!selectedFiles.includes(selectfilePathPath)) {
                    selectedFiles.push(selectfilePathPath);
                }
            } else {
                selectedFiles = selectedFiles.filter(f => f !== filePath);
            }
        } else {
            // Clear selection and select only this file if control key is not pressed
            selectedFiles = [selectfilePathPath];
            const allFileItems = document.querySelectorAll('.file-list-data-Container');
            allFileItems.forEach(item => item.classList.remove('selected'));
            fileItem.classList.add('selected');
        }
        console.log(`fileItem files:`, fileItem);
        console.log(`Selected files:`, file);

        console.log(`Selected files:`, selectedFiles);
    });

}

// Event listener to track control key state
document.addEventListener('keydown', (event) => {
    if (event.key === 'Control' || event.key === 'Meta') {
        controlKeyPressed = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Control' || event.key === 'Meta') {
        controlKeyPressed = false;
    }
});