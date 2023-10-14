







// ... (previous code)

const { launchSmartContract } = require('./solana');

document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const testnetButton = document.querySelector('.testnet-button');

    testnetButton.addEventListener('click', async function () {
        const rustCode = rustCodeDisplay.innerText;
        try {
            const signature = await launchSmartContract(rustCode);
            console.log(`Smart contract launched on Testnet with signature: ${signature}`);
        } catch (error) {
            console.error('Error launching smart contract:', error);
        }
    });

    // ... (previous code remains the same)
});







// ... (previous code)

document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    

    // ... (previous code remains the same)
});





document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)
    // ... (previous code remains the same)
});





document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)


    // ... (previous code remains the same)
});








document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)


    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    function drawConnections() {
        // ... (previous code)

        // Draw connections between blocks
        connections.forEach((connection, index) => {
            // ... (previous code)

            // Draw "Delete" button next to each connection
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.innerText = 'Delete';
            deleteButton.style.position = 'absolute';
            deleteButton.style.left = ((startX + endX) / 2) + 'px';
            deleteButton.style.top = ((startY + endY) / 2) + 'px';

            // Add event listener to delete the connection when the button is clicked
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent canvas click event from firing

                // Remove the connection and redraw connections
                connections.splice(index, 1);
                drawConnections();
            });

            canvas.parentElement.appendChild(deleteButton);
        });
    }

    // ... (previous code remains the same)

    // Event listener to clear canvas and redraw connections when a block is dropped
    canvas.addEventListener('drop', function (event) {
        // ... (previous code)

        // Remove existing delete buttons before redrawing connections
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => button.remove());

        // Draw connections between blocks
        drawConnections();
    });

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const canvasContainer = document.querySelector('.canvas-container');
    let selectedBlock = null;

    canvasContainer.addEventListener('dblclick', function (event) {
        // Get the clicked block
        const clickedBlock = event.target.closest('.block');
        
        if (clickedBlock) {
            selectedBlock = clickedBlock;
            // Enable editing mode for the selected block
            selectedBlock.contentEditable = true;
            selectedBlock.focus();

            // Disable editing mode when the user presses Enter or blurs the block
            selectedBlock.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Update the connections and Rust code when editing is done
                    updateConnections();
                    updateRustCode();
                    selectedBlock.contentEditable = false;
                }
            });

            selectedBlock.addEventListener('blur', function () {
                // Update the connections and Rust code when editing is done
                updateConnections();
                updateRustCode();
                selectedBlock.contentEditable = false;
            });
        }
    });

    // ... (previous code remains the same)

    // Update connections and redraw them whenever a block is edited
    function updateConnections() {
        // Clear existing connections
        connections.length = 0;

        // Find all input and output points of blocks and update connections
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            const inputs = block.querySelectorAll('.input');
            const outputs = block.querySelectorAll('.output');

            inputs.forEach(input => {
                const inputRect = input.getBoundingClientRect();
                outputs.forEach(output => {
                    const outputRect = output.getBoundingClientRect();
                    if (checkCollision(inputRect, outputRect)) {
                        connections.push({
                            fromBlock: output.innerText,
                            toBlock: input.innerText
                        });
                    }
                });
            });
        });

        // Redraw connections
        drawConnections();
    }

    // ... (previous code remains the same)
});










document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let resizingBlock = null;
    let initialMouseX = 0;
    let initialBlockWidth = 0;

    // Event listener to start resizing a block when the user clicks and holds the mouse button
    canvasContainer.addEventListener('mousedown', function (event) {
        const clickedBlock = event.target.closest('.block');
        if (clickedBlock) {
            resizingBlock = clickedBlock;
            initialMouseX = event.clientX;
            initialBlockWidth = resizingBlock.offsetWidth;

            // Prevent text selection during resizing
            document.body.style.userSelect = 'none';

            // Event listener to handle block resizing based on mouse movement
            document.addEventListener('mousemove', handleResize);

            // Event listener to stop resizing when the user releases the mouse button
            document.addEventListener('mouseup', function stopResize() {
                resizingBlock = null;
                initialMouseX = 0;
                initialBlockWidth = 0;

                // Allow text selection after resizing
                document.body.style.userSelect = 'auto';

                // Remove the event listeners for resizing
                document.removeEventListener('mousemove', handleResize);
                document.removeEventListener('mouseup', stopResize);
            });
        }
    });

    // Function to handle block resizing based on mouse movement
    function handleResize(event) {
        if (resizingBlock) {
            const deltaX = event.clientX - initialMouseX;
            const newWidth = Math.max(initialBlockWidth + deltaX, 100); // Minimum block width

            // Resize the block
            resizingBlock.style.width = newWidth + 'px';
        }
    }

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let creatingComment = false;
    let commentStartX = 0;
    let commentStartY = 0;

    // Event listener to start creating a comment when the user clicks on the canvas
    canvas.addEventListener('mousedown', function (event) {
        creatingComment = true;
        commentStartX = event.clientX;
        commentStartY = event.clientY;

        // Create a comment element at the initial mouse position
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.style.left = commentStartX + 'px';
        comment.style.top = commentStartY + 'px';

        // Event listener to stop creating a comment when the user releases the mouse button
        document.addEventListener('mouseup', function stopCreatingComment() {
            if (creatingComment) {
                // Add contentEditable property for user to edit the comment text
                comment.contentEditable = true;
                canvas.parentElement.appendChild(comment);
            }

            // Reset variables and remove event listener
            creatingComment = false;
            commentStartX = 0;
            commentStartY = 0;
            document.removeEventListener('mouseup', stopCreatingComment);
        });
    });

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    // Event listener to start creating a comment when the user clicks on the canvas
    canvas.addEventListener('mousedown', function (event) {
        creatingComment = true;
        commentStartX = event.clientX;
        commentStartY = event.clientY;

        // Create a comment element at the initial mouse position
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.style.left = commentStartX + 'px';
        comment.style.top = commentStartY + 'px';

        // Add a "Delete" button to the comment
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-comment-button';
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            comment.remove();
        });
        comment.appendChild(deleteButton);

        // Event listener to stop creating a comment when the user releases the mouse button
        document.addEventListener('mouseup', function stopCreatingComment() {
            if (creatingComment) {
                // Add contentEditable property for user to edit the comment text
                comment.contentEditable = true;
                canvas.parentElement.appendChild(comment);
            }

            // Reset variables and remove event listener
            creatingComment = false;
            commentStartX = 0;
            commentStartY = 0;
            document.removeEventListener('mouseup', stopCreatingComment);
        });
    });

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let connectingComment = false;
    let startBlock = null;

    // Event listener to start connecting a comment to a block when the user clicks on a comment
    document.addEventListener('mousedown', function (event) {
        const clickedComment = event.target.closest('.comment');
        if (clickedComment) {
            connectingComment = true;
            const commentRect = clickedComment.getBoundingClientRect();
            startBlock = {
                x: commentRect.x + commentRect.width,
                y: commentRect.y + commentRect.height / 2
            };

            // Event listener to handle connecting a comment to a block based on mouse movement
            canvas.addEventListener('mousemove', handleCommentBlockConnection);

            // Event listener to stop connecting the comment when the user releases the mouse button
            document.addEventListener('mouseup', function stopConnectingComment() {
                connectingComment = false;
                startBlock = null;

                // Remove the event listeners for connecting comments
                canvas.removeEventListener('mousemove', handleCommentBlockConnection);
                document.removeEventListener('mouseup', stopConnectingComment);
            });
        }
    });

    // Function to handle connecting a comment to a block based on mouse movement
    function handleCommentBlockConnection(event) {
        if (connectingComment && startBlock) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Draw connection line between comment and block
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(startBlock.x, startBlock.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = '#f1c40f'; // Color for comment-block connections
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    }

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let draggingElement = null;
    let offset = { x: 0, y: 0 };

    // Event listener to start dragging a block or comment when the user clicks on it
    document.addEventListener('mousedown', function (event) {
        draggingElement = event.target.closest('.block, .comment');
        if (draggingElement) {
            offset.x = event.clientX - draggingElement.getBoundingClientRect().left;
            offset.y = event.clientY - draggingElement.getBoundingClientRect().top;

            // Event listener to handle dragging based on mouse movement
            document.addEventListener('mousemove', handleDrag);

            // Event listener to stop dragging when the user releases the mouse button
            document.addEventListener('mouseup', function stopDrag() {
                draggingElement = null;
                offset = { x: 0, y: 0 };

                // Remove the event listeners for dragging
                document.removeEventListener('mousemove', handleDrag);
                document.removeEventListener('mouseup', stopDrag);
            });
        }
    });

    // Function to handle dragging the block or comment based on mouse movement
    function handleDrag(event) {
        if (draggingElement) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Update the position of the dragged element
            draggingElement.style.left = mouseX - offset.x + 'px';
            draggingElement.style.top = mouseY - offset.y + 'px';
        }
    }

    // ... (previous code remains the same)
});








document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let selectedElement = null;

    // Event listener to select a block or comment when the user clicks on it
    document.addEventListener('mousedown', function (event) {
        selectedElement = event.target.closest('.block, .comment');
        if (selectedElement) {
            // Add a border to indicate the selected element
            selectedElement.style.border = '2px solid #3498db'; // Border color: a light blue shade

            // Event listener to change the color of the selected element when the user presses a key
            document.addEventListener('keydown', function changeColor(event) {
                if (selectedElement) {
                    const keyCode = event.keyCode;
                    switch (keyCode) {
                        case 49: // Key '1': Change color to red
                            selectedElement.style.backgroundColor = '#e74c3c'; // Red color
                            break;
                        case 50: // Key '2': Change color to green
                            selectedElement.style.backgroundColor = '#2ecc71'; // Green color
                            break;
                        case 51: // Key '3': Change color to yellow
                            selectedElement.style.backgroundColor = '#f39c12'; // Yellow color
                            break;
                        case 52: // Key '4': Change color to blue
                            selectedElement.style.backgroundColor = '#3498db'; // Blue color
                            break;
                    }
                }
            });
        }
    });

    // ... (previous code remains the same)
});








document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let editingLabelElement = null;

    // Event listener to start editing a label when the user double-clicks on a block or comment
    document.addEventListener('dblclick', function (event) {
        editingLabelElement = event.target.closest('.block, .comment');
        if (editingLabelElement) {
            // Enable editing mode for the label
            const labelContent = editingLabelElement.querySelector('.label');
            labelContent.contentEditable = true;
            labelContent.focus();

            // Event listener to handle editing the label when the user presses Enter or blurs the label
            labelContent.addEventListener('keydown', function handleLabelEdit(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    // Update the label content and disable editing mode
                    labelContent.contentEditable = false;
                }
            });

            labelContent.addEventListener('blur', function () {
                // Update the label content and disable editing mode when the label loses focus
                labelContent.contentEditable = false;
            });
        }
    });

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const exportButton = document.querySelector('.export-button');

    exportButton.addEventListener('click', function () {
        // Prepare canvas configuration for export
        const canvasConfig = {
            blocks: [],
            comments: [],
            connections: []
        };

        // Gather block information
        const blocks = document.querySelectorAll('.block');
        blocks.forEach(block => {
            const blockConfig = {
                id: block.getAttribute('id'),
                position: {
                    x: block.style.left,
                    y: block.style.top
                },
                color: block.style.backgroundColor,
                label: block.querySelector('.label').innerText
            };
            canvasConfig.blocks.push(blockConfig);
        });

        // Gather comment information
        const comments = document.querySelectorAll('.comment');
        comments.forEach(comment => {
            const commentConfig = {
                id: comment.getAttribute('id'),
                position: {
                    x: comment.style.left,
                    y: comment.style.top
                },
                color: comment.style.backgroundColor,
                label: comment.querySelector('.label').innerText
            };
            canvasConfig.comments.push(commentConfig);
        });

        // Gather connection information
        canvasConfig.connections = connections;

        // Convert canvas configuration to JSON and download as a file
        const jsonString = JSON.stringify(canvasConfig);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'canvas-config.json';
        a.click();
    });

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const importButton = document.querySelector('.import-button');
    const fileInput = document.querySelector('.file-input');

    // Event listener to trigger file input click when the user clicks the import button
    importButton.addEventListener('click', function () {
        fileInput.click();
    });

    // Event listener to handle file selection from the file input
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            // Parse the JSON data from the imported file
            const importedConfig = JSON.parse(e.target.result);

            // Clear existing canvas content
            clearCanvas();

            // Reconstruct the canvas based on the imported configuration
            importedConfig.blocks.forEach(blockConfig => {
                createBlock(blockConfig.position.x, blockConfig.position.y, blockConfig.color, blockConfig.label, blockConfig.id);
            });

            importedConfig.comments.forEach(commentConfig => {
                createComment(commentConfig.position.x, commentConfig.position.y, commentConfig.color, commentConfig.label, commentConfig.id);
            });

            // Restore connections based on the imported configuration
            connections = importedConfig.connections;

            // Redraw blocks, comments, and connections
            drawBlocks();
            drawComments();
            drawConnections();
        };

        // Read the imported file as text
        reader.readAsText(file);
    });

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    // Event listener to delete a block or comment when the user presses the Delete key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Delete' || event.key === 'Backspace') {
            // Delete selected block
            const selectedBlock = document.querySelector('.block.selected');
            if (selectedBlock) {
                const blockId = selectedBlock.getAttribute('id');
                // Remove block from the canvas
                selectedBlock.remove();
                // Remove connections associated with the deleted block
                connections = connections.filter(connection => connection.fromBlock !== blockId && connection.toBlock !== blockId);
                // Redraw the canvas after deletion
                drawConnections();
            }

            // Delete selected comment
            const selectedComment = document.querySelector('.comment.selected');
            if (selectedComment) {
                const commentId = selectedComment.getAttribute('id');
                // Remove comment from the canvas
                selectedComment.remove();
                // Remove connections associated with the deleted comment
                connections = connections.filter(connection => connection.fromBlock !== commentId && connection.toBlock !== commentId);
                // Redraw the canvas after deletion
                drawConnections();
            }
        }
    });

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const canvasContainer = document.querySelector('.canvas-container');
    let zoomLevel = 1; // Initial zoom level

    // Event listener to handle mouse wheel zooming on the canvas
    canvasContainer.addEventListener('wheel', function (event) {
        // Calculate the new zoom level based on the mouse wheel delta
        zoomLevel += event.deltaY * -0.01;
        // Limit zoom level within specified bounds (for example, between 0.5 and 2)
        zoomLevel = Math.min(Math.max(0.5, zoomLevel), 2);
        
        // Apply the zoom transformation to the canvas container
        canvasContainer.style.transform = `scale(${zoomLevel})`;
    });

    // ... (previous code remains the same)
});









document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const undoButton = document.querySelector('.undo-button');
    const redoButton = document.querySelector('.redo-button');
    const MAX_HISTORY_LENGTH = 20; // Maximum number of actions to store in history

    let history = [];
    let historyIndex = -1;

    // Function to save canvas state to history
    function saveToHistory() {
        const canvasState = {
            blocks: Array.from(document.querySelectorAll('.block')).map(block => block.outerHTML),
            comments: Array.from(document.querySelectorAll('.comment')).map(comment => comment.outerHTML),
            connections: JSON.parse(JSON.stringify(connections)),
            zoomLevel: zoomLevel
        };

        // Add canvas state to history
        history.push(canvasState);
        // Limit the history length
        if (history.length > MAX_HISTORY_LENGTH) {
            history.shift();
        }

        // Update history index
        historyIndex = history.length - 1;
    }

    // Function to restore canvas state from history
    function restoreFromHistory(index) {
        if (index >= 0 && index < history.length) {
            const canvasState = history[index];

            // Restore blocks and comments
            document.querySelector('.canvas-container').innerHTML = canvasState.blocks.join('') + canvasState.comments.join('');
            // Restore connections
            connections = canvasState.connections;
            // Restore zoom level
            zoomLevel = canvasState.zoomLevel;

            // Redraw canvas elements and connections
            drawBlocks();
            drawComments();
            drawConnections();
        }
    }

    // Event listener to handle undo button click
    undoButton.addEventListener('click', function () {
        if (historyIndex > 0) {
            historyIndex--;
            restoreFromHistory(historyIndex);
        }
    });

    // Event listener to handle redo button click
    redoButton.addEventListener('click', function () {
        if (historyIndex < history.length - 1) {
            historyIndex++;
            restoreFromHistory(historyIndex);
        }
    });

    // Event listener to save canvas state to history on mouseup (after a drag operation is completed)
    document.addEventListener('mouseup', function () {
        saveToHistory();
    });

    // ... (previous code remains the same)
});









document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let resizingElement = null;
    let resizeStartX = 0;
    let resizeStartY = 0;
    let originalWidth = 0;
    let originalHeight = 0;

    // Event listener to start resizing a block or comment when the user clicks on the resize handle
    document.addEventListener('mousedown', function (event) {
        const resizeHandle = event.target.closest('.resize-handle');
        if (resizeHandle) {
            resizingElement = resizeHandle.parentElement;
            resizeStartX = event.clientX;
            resizeStartY = event.clientY;
            originalWidth = resizingElement.offsetWidth;
            originalHeight = resizingElement.offsetHeight;

            // Event listener to handle resizing based on mouse movement
            document.addEventListener('mousemove', handleResize);

            // Event listener to stop resizing when the user releases the mouse button
            document.addEventListener('mouseup', function stopResize() {
                resizingElement = null;
                resizeStartX = 0;
                resizeStartY = 0;
                originalWidth = 0;
                originalHeight = 0;

                // Remove the event listeners for resizing
                document.removeEventListener('mousemove', handleResize);
                document.removeEventListener('mouseup', stopResize);
            });
        }
    });

    // Function to handle resizing the block or comment based on mouse movement
    function handleResize(event) {
        if (resizingElement) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Calculate the new width and height based on mouse movement
            const newWidth = originalWidth + (mouseX - resizeStartX);
            const newHeight = originalHeight + (mouseY - resizeStartY);

            // Set the new width and height to the resizing element
            resizingElement.style.width = `${newWidth}px`;
            resizingElement.style.height = `${newHeight}px`;
        }
    }

    // ... (previous code remains the same)
});









document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const canvas = document.querySelector('.canvas-container');
    let connections = []; // Array to store connections between blocks and comments

    // Function to draw connections between blocks and comments
    function drawConnections() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#3498db'; // Connection line color
        ctx.lineWidth = 2;

        connections.forEach(connection => {
            const fromBlock = document.getElementById(connection.fromBlock);
            const toBlock = document.getElementById(connection.toBlock);
            const startX = fromBlock.offsetLeft + fromBlock.offsetWidth;
            const startY = fromBlock.offsetTop + fromBlock.offsetHeight / 2;
            const endX = toBlock.offsetLeft;
            const endY = toBlock.offsetTop + toBlock.offsetHeight / 2;

            // Draw a line from the output point of the fromBlock to the input point of the toBlock
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        });
    }

    // Event listener to handle creating connections between blocks and comments
    document.addEventListener('mousedown', function (event) {
        const outputBlock = event.target.closest('.block .output');
        const inputBlock = event.target.closest('.block .input');
        const outputComment = event.target.closest('.comment .output');
        const inputComment = event.target.closest('.comment .input');

        if (outputBlock || outputComment) {
            const fromElementId = outputBlock ? outputBlock.parentElement.id : outputComment.parentElement.id;
            const startPosition = {
                x: event.clientX,
                y: event.clientY
            };

            // Event listener to handle mouse movement for creating connections
            function handleMouseMove(event) {
                const endPosition = {
                    x: event.clientX,
                    y: event.clientY
                };

                // Draw a temporary connection line as the user drags the mouse
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.strokeStyle = '#3498db'; // Connection line color
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(startPosition.x, startPosition.y);
                ctx.lineTo(endPosition.x, endPosition.y);
                ctx.stroke();
            }

            // Event listener to handle mouseup for creating connections
            function handleMouseUp(event) {
                const inputElementId = inputBlock ? inputBlock.parentElement.id : inputComment.parentElement.id;

                // Add the connection to the connections array
                connections.push({
                    fromBlock: fromElementId,
                    toBlock: inputElementId
                });

                // Draw connections on the canvas
                drawConnections();

                // Remove the temporary connection line
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Remove event listeners for creating connections
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }

            // Add event listeners for creating connections
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
    });

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    let draggingConnection = null;
    let dragStartX = 0;
    let dragStartY = 0;

    // Event listener to start dragging a connection when the user clicks on it
    document.addEventListener('mousedown', function (event) {
        const connection = event.target.closest('.connection');
        if (connection) {
            draggingConnection = connection;
            dragStartX = event.clientX;
            dragStartY = event.clientY;

            // Event listener to handle dragging the connection based on mouse movement
            document.addEventListener('mousemove', handleConnectionDrag);

            // Event listener to stop dragging the connection when the user releases the mouse button
            document.addEventListener('mouseup', function stopConnectionDrag() {
                draggingConnection = null;
                dragStartX = 0;
                dragStartY = 0;

                // Remove the event listeners for dragging connections
                document.removeEventListener('mousemove', handleConnectionDrag);
                document.removeEventListener('mouseup', stopConnectionDrag);
            });
        }
    });

    // Function to handle dragging the connection based on mouse movement
    function handleConnectionDrag(event) {
        if (draggingConnection) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Calculate the distance moved by the mouse
            const deltaX = mouseX - dragStartX;
            const deltaY = mouseY - dragStartY;

            // Update the position of the connection
            const connectionRect = draggingConnection.getBoundingClientRect();
            draggingConnection.style.left = connectionRect.left + deltaX + 'px';
            draggingConnection.style.top = connectionRect.top + deltaY + 'px';

            // Update the drag start position for the next mousemove event
            dragStartX = mouseX;
            dragStartY = mouseY;
        }
    }

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    // Event listener to handle creating a new comment on double-click
    document.addEventListener('dblclick', function (event) {
        // Check if the double-click occurred on an empty area of the canvas
        if (event.target.closest('.canvas-container') === event.target) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            // Create a new comment at the double-clicked position
            createComment(mouseX, mouseY);
        }
    });

    // Function to create a new comment on the canvas
    function createComment(x, y) {
        // Generate a unique ID for the comment
        const commentId = 'comment-' + Date.now();

        // Create a new comment element
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.id = commentId;
        comment.style.left = x + 'px';
        comment.style.top = y + 'px';

        // Create a resize handle for the comment
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle');
        comment.appendChild(resizeHandle);

        // Create a label for the comment (editable by the user)
        const label = document.createElement('span');
        label.classList.add('label');
        label.contentEditable = true;
        label.innerText = 'Comment';
        comment.appendChild(label);

        // Append the comment to the canvas container
        document.querySelector('.canvas-container').appendChild(comment);

        // Add event listeners for moving and resizing the comment
        enableDragging(comment);
    }

    // Function to enable dragging for an element
    function enableDragging(element) {
        let offsetX, offsetY;

        // Event listener to handle mousedown for dragging
        element.addEventListener('mousedown', function (event) {
            offsetX = event.clientX - element.getBoundingClientRect().left;
            offsetY = event.clientY - element.getBoundingClientRect().top;

            // Event listener to handle mousemove for dragging
            function handleDragMove(event) {
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;

                // Update the position of the element
                element.style.left = x + 'px';
                element.style.top = y + 'px';
            }

            // Event listener to handle mouseup for stopping dragging
            function handleDragEnd() {
                // Remove event listeners for dragging
                document.removeEventListener('mousemove', handleDragMove);
                document.removeEventListener('mouseup', handleDragEnd);
            }

            // Add event listeners for dragging
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
        });
    }

    // ... (previous code remains the same)
});









document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const saveButton = document.querySelector('.save-button');
    const localStorageKey = 'smart-contract-project';

    // Event listener to handle saving the canvas configuration to local storage
    saveButton.addEventListener('click', function () {
        const canvasConfig = {
            blocks: Array.from(document.querySelectorAll('.block')).map(block => {
                return {
                    id: block.id,
                    position: {
                        x: block.style.left,
                        y: block.style.top
                    },
                    color: block.style.backgroundColor,
                    label: block.querySelector('.label').innerText
                };
            }),
            comments: Array.from(document.querySelectorAll('.comment')).map(comment => {
                return {
                    id: comment.id,
                    position: {
                        x: comment.style.left,
                        y: comment.style.top
                    },
                    color: comment.style.backgroundColor,
                    label: comment.querySelector('.label').innerText
                };
            }),
            connections: connections,
            zoomLevel: zoomLevel
        };

        // Save canvas configuration to local storage
        localStorage.setItem(localStorageKey, JSON.stringify(canvasConfig));
        alert('Project saved successfully!');
    });

    // Event listener to handle loading the canvas configuration from local storage
    const loadButton = document.querySelector('.load-button');
    loadButton.addEventListener('click', function () {
        // Load canvas configuration from local storage
        const savedConfig = localStorage.getItem(localStorageKey);
        if (savedConfig) {
            const canvasConfig = JSON.parse(savedConfig);

            // Clear existing canvas content
            clearCanvas();

            // Reconstruct the canvas based on the saved configuration
            canvasConfig.blocks.forEach(blockConfig => {
                createBlock(blockConfig.position.x, blockConfig.position.y, blockConfig.color, blockConfig.label, blockConfig.id);
            });

            canvasConfig.comments.forEach(commentConfig => {
                createComment(commentConfig.position.x, commentConfig.position.y, commentConfig.color, commentConfig.label, commentConfig.id);
            });

            // Restore connections and zoom level
            connections = canvasConfig.connections;
            zoomLevel = canvasConfig.zoomLevel;

            // Redraw canvas elements and connections
            drawBlocks();
            drawComments();
            drawConnections();

            alert('Project loaded successfully!');
        } else {
            alert('No saved project found.');
        }
    });

    // ... (previous code remains the same)
});








document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const exportButton = document.querySelector('.export-button');

    // Event listener to handle exporting the canvas configuration as a JSON file
    exportButton.addEventListener('click', function () {
        const canvasConfig = {
            blocks: Array.from(document.querySelectorAll('.block')).map(block => {
                return {
                    id: block.id,
                    position: {
                        x: block.style.left,
                        y: block.style.top
                    },
                    color: block.style.backgroundColor,
                    label: block.querySelector('.label').innerText
                };
            }),
            comments: Array.from(document.querySelectorAll('.comment')).map(comment => {
                return {
                    id: comment.id,
                    position: {
                        x: comment.style.left,
                        y: comment.style.top
                    },
                    color: comment.style.backgroundColor,
                    label: comment.querySelector('.label').innerText
                };
            }),
            connections: connections,
            zoomLevel: zoomLevel
        };

        // Convert canvas configuration to JSON string
        const jsonString = JSON.stringify(canvasConfig, null, 2);

        // Create a Blob with the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a temporary anchor element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'smart_contract_project.json';

        // Append the anchor element to the DOM and trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Remove the temporary anchor element from the DOM
        document.body.removeChild(downloadLink);
    });

    // ... (previous code remains the same)
});








document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const importInput = document.querySelector('.import-input');
    const importButton = document.querySelector('.import-button');

    // Event listener to handle importing a smart contract project from a JSON file
    importButton.addEventListener('click', function () {
        // Trigger the file input element to open the file selection dialog
        importInput.click();
    });

    // Event listener to handle file selection for importing
    importInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        // Event listener to handle file reading completion
        reader.onload = function (fileEvent) {
            const importedConfig = JSON.parse(fileEvent.target.result);

            // Clear existing canvas content
            clearCanvas();

            // Reconstruct the canvas based on the imported configuration
            importedConfig.blocks.forEach(blockConfig => {
                createBlock(blockConfig.position.x, blockConfig.position.y, blockConfig.color, blockConfig.label, blockConfig.id);
            });

            importedConfig.comments.forEach(commentConfig => {
                createComment(commentConfig.position.x, commentConfig.position.y, commentConfig.color, commentConfig.label, commentConfig.id);
            });

            // Restore connections and zoom level
            connections = importedConfig.connections;
            zoomLevel = importedConfig.zoomLevel;

            // Redraw canvas elements and connections
            drawBlocks();
            drawComments();
            drawConnections();

            alert('Project imported successfully!');
        };

        // Read the selected file as text
        reader.readAsText(file);
    });

    // ... (previous code remains the same)
});








document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const zoomInButton = document.querySelector('.zoom-in-button');
    const zoomOutButton = document.querySelector('.zoom-out-button');

    const MIN_ZOOM_LEVEL = 0.5;
    const MAX_ZOOM_LEVEL = 2;
    const ZOOM_STEP = 0.1;

    // Event listener to handle zooming in
    zoomInButton.addEventListener('click', function () {
        if (zoomLevel < MAX_ZOOM_LEVEL) {
            zoomLevel += ZOOM_STEP;
            applyZoom();
        }
    });

    // Event listener to handle zooming out
    zoomOutButton.addEventListener('click', function () {
        if (zoomLevel > MIN_ZOOM_LEVEL) {
            zoomLevel -= ZOOM_STEP;
            applyZoom();
        }
    });

    // Function to apply the current zoom level to the canvas
    function applyZoom() {
        const canvasContainer = document.querySelector('.canvas-container');
        canvasContainer.style.transform = `scale(${zoomLevel})`;
    }

    // ... (previous code remains the same)
});











document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const deleteButton = document.querySelector('.delete-button');

    // Event listener to handle deleting selected blocks, comments, and connections
    deleteButton.addEventListener('click', function () {
        const selectedElements = document.querySelectorAll('.selected');

        // Delete selected blocks
        selectedElements.forEach(element => {
            if (element.classList.contains('block')) {
                const blockId = element.id;
                // Remove the block from the DOM
                element.remove();
                // Remove the block's connections
                connections = connections.filter(connection => connection.fromBlock !== blockId && connection.toBlock !== blockId);
            }
        });

        // Delete selected comments
        selectedElements.forEach(element => {
            if (element.classList.contains('comment')) {
                const commentId = element.id;
                // Remove the comment from the DOM
                element.remove();
                // Remove the comment's connections
                connections = connections.filter(connection => connection.fromBlock !== commentId && connection.toBlock !== commentId);
            }
        });

        // Redraw canvas elements and connections
        drawBlocks();
        drawComments();
        drawConnections();

        // Clear the selected class after deletion
        clearSelection();
    });

    // Function to clear the selected class from all elements
    function clearSelection() {
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(element => {
            element.classList.remove('selected');
        });
    }

    // ... (previous code remains the same)
});









document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const colorPicker = document.querySelector('.color-picker');
    const labelInput = document.querySelector('.label-input');
    const applyButton = document.querySelector('.apply-button');

    // Event listener to handle applying custom styles to selected blocks and comments
    applyButton.addEventListener('click', function () {
        const selectedElements = document.querySelectorAll('.selected');

        const selectedColor = colorPicker.value;
        const selectedLabel = labelInput.value;

        // Apply custom styles to selected blocks and comments
        selectedElements.forEach(element => {
            if (element.classList.contains('block')) {
                // Apply custom color and label to blocks
                element.style.backgroundColor = selectedColor;
                element.querySelector('.label').innerText = selectedLabel;
            } else if (element.classList.contains('comment')) {
                // Apply custom color and label to comments
                element.style.backgroundColor = selectedColor;
                element.querySelector('.label').innerText = selectedLabel;
            }
        });

        // Clear the selected class after applying styles
        clearSelection();
    });

    // Function to clear the selected class from all elements
    function clearSelection() {
        const selectedElements = document.querySelectorAll('.selected');
        selectedElements.forEach(element => {
            element.classList.remove('selected');
        });
    }

    // ... (previous code remains the same)
});











document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const duplicateButton = document.querySelector('.duplicate-button');

    // Event listener to handle duplicating selected blocks and comments
    duplicateButton.addEventListener('click', function () {
        const selectedElements = document.querySelectorAll('.selected');

        // Duplicate selected blocks and comments
        selectedElements.forEach(element => {
            if (element.classList.contains('block')) {
                // Duplicate blocks
                const duplicateBlock = element.cloneNode(true);
                const offsetX = 20; // Offset to prevent overlapping
                const offsetY = 20; // Offset to prevent overlapping

                // Calculate new position for the duplicated block
                const currentX = parseInt(duplicateBlock.style.left, 10);
                const currentY = parseInt(duplicateBlock.style.top, 10);
                duplicateBlock.style.left = currentX + offsetX + 'px';
                duplicateBlock.style.top = currentY + offsetY + 'px';

                // Generate a new unique ID for the duplicated block
                duplicateBlock.id = 'block-' + Date.now();

                // Append the duplicated block to the canvas container
                document.querySelector('.canvas-container').appendChild(duplicateBlock);
            } else if (element.classList.contains('comment')) {
                // Duplicate comments
                const duplicateComment = element.cloneNode(true);
                const offsetX = 20; // Offset to prevent overlapping
                const offsetY = 20; // Offset to prevent overlapping

                // Calculate new position for the duplicated comment
                const currentX = parseInt(duplicateComment.style.left, 10);
                const currentY = parseInt(duplicateComment.style.top, 10);
                duplicateComment.style.left = currentX + offsetX + 'px';
                duplicateComment.style.top = currentY + offsetY + 'px';

                // Generate a new unique ID for the duplicated comment
                duplicateComment.id = 'comment-' + Date.now();

                // Append the duplicated comment to the canvas container
                document.querySelector('.canvas-container').appendChild(duplicateComment);
            }
        });

        // Redraw canvas elements and connections after duplication
        drawBlocks();
        drawComments();
        drawConnections();

        // Clear the selected class after duplication
        clearSelection();
    });

    // ... (previous code remains the same)
});









document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const addInputButton = document.querySelector('.add-input-button');
    const addOutputButton = document.querySelector('.add-output-button');

    // Event listener to handle adding input points to selected blocks
    addInputButton.addEventListener('click', function () {
        const selectedBlocks = document.querySelectorAll('.block.selected');

        selectedBlocks.forEach(block => {
            const inputPoint = document.createElement('div');
            inputPoint.classList.add('input-point');
            block.appendChild(inputPoint);
        });
    });

    // Event listener to handle adding output points to selected blocks
    addOutputButton.addEventListener('click', function () {
        const selectedBlocks = document.querySelectorAll('.block.selected');

        selectedBlocks.forEach(block => {
            const outputPoint = document.createElement('div');
            outputPoint.classList.add('output-point');
            block.appendChild(outputPoint);
        });
    });

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const canvasContainer = document.querySelector('.canvas-container');
    let isConnecting = false;
    let startConnectionPoint = null;

    // Event listener to handle starting a connection from an output point
    canvasContainer.addEventListener('mousedown', function (event) {
        const outputPoint = event.target.closest('.output-point');
        if (outputPoint) {
            isConnecting = true;
            startConnectionPoint = outputPoint;
        }
    });

    // Event listener to handle ending a connection at an input point
    canvasContainer.addEventListener('mouseup', function (event) {
        if (isConnecting) {
            const inputPoint = event.target.closest('.input-point');
            if (inputPoint) {
                const connection = {
                    fromBlock: startConnectionPoint.parentElement.id,
                    toBlock: inputPoint.parentElement.id
                };
                connections.push(connection);

                // Redraw canvas connections after adding a new connection
                drawConnections();
            }
            isConnecting = false;
            startConnectionPoint = null;
        }
    });

    // Function to draw all connections on the canvas
    function drawConnections() {
        // Remove existing connections from the canvas
        document.querySelectorAll('.connection').forEach(connection => connection.remove());

        // Draw new connections based on the connections array
        connections.forEach(connection => {
            const fromBlock = document.getElementById(connection.fromBlock);
            const toBlock = document.getElementById(connection.toBlock);
            if (fromBlock && toBlock) {
                const connectionLine = document.createElement('div');
                connectionLine.classList.add('connection');
                const fromBlockRect = fromBlock.getBoundingClientRect();
                const toBlockRect = toBlock.getBoundingClientRect();
                connectionLine.style.width = Math.sqrt(Math.pow(toBlockRect.left - fromBlockRect.right, 2) + Math.pow((toBlockRect.top + toBlockRect.height / 2) - (fromBlockRect.top + fromBlockRect.height / 2), 2)) + 'px';
                connectionLine.style.transformOrigin = 'top left';
                connectionLine.style.transform = `rotate(${Math.atan2((toBlockRect.top + toBlockRect.height / 2) - (fromBlockRect.top + fromBlockRect.height / 2), toBlockRect.left - fromBlockRect.right)}rad)`;
                connectionLine.style.left = fromBlockRect.right + 'px';
                connectionLine.style.top = fromBlockRect.top + fromBlockRect.height / 2 + 'px';
                canvasContainer.appendChild(connectionLine);
            }
        });
    }

    // ... (previous code remains the same)
});







document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const canvasContainer = document.querySelector('.canvas-container');
    let selectedElement = null;
    let offsetX, offsetY;

    // Event listener to handle starting the drag operation
    canvasContainer.addEventListener('mousedown', function (event) {
        selectedElement = event.target.closest('.block, .comment');
        if (selectedElement) {
            offsetX = event.clientX - selectedElement.getBoundingClientRect().left;
            offsetY = event.clientY - selectedElement.getBoundingClientRect().top;
            selectedElement.classList.add('selected');
        }
    });

    // Event listener to handle dragging the selected element
    canvasContainer.addEventListener('mousemove', function (event) {
        if (selectedElement) {
            selectedElement.style.left = (event.clientX - offsetX) + 'px';
            selectedElement.style.top = (event.clientY - offsetY) + 'px';
        }
    });

    // Event listener to handle ending the drag operation
    canvasContainer.addEventListener('mouseup', function () {
        if (selectedElement) {
            selectedElement.classList.remove('selected');
            selectedElement = null;
        }
    });

    // ... (previous code remains the same)
});






document.addEventListener("DOMContentLoaded", function () {
    // ... (previous code)

    const saveButton = document.querySelector('.save-button');

    // Event listener to handle saving the project to local storage
    saveButton.addEventListener('click', function () {
        const canvasConfig = {
            blocks: Array.from(document.querySelectorAll('.block')).map(block => {
                return {
                    id: block.id,
                    position: {
                        x: block.style.left,
                        y: block.style.top
                    },
                    color: block.style.backgroundColor,
                    label: block.querySelector('.label').innerText
                };
            }),
            comments: Array.from(document.querySelectorAll('.comment')).map(comment => {
                return {
                    id: comment.id,
                    position: {
                        x: comment.style.left,
                        y: comment.style.top
                    },
                    color: comment.style.backgroundColor,
                    label: comment.querySelector('.label').innerText
                };
            }),
            connections: connections,
            zoomLevel: zoomLevel
        };

        // Save the canvas configuration to local storage
        localStorage.setItem('smartContractProject', JSON.stringify(canvasConfig));
        
        alert('Project saved successfully!');
    });

    // Event listener to handle loading the project from local storage
    const loadButton = document.querySelector('.load-button');
    loadButton.addEventListener('click', function () {
        const savedCanvasConfig = localStorage.getItem('smartContractProject');
        if (savedCanvasConfig) {
            const canvasConfig = JSON.parse(savedCanvasConfig);

            // Clear existing canvas content
            clearCanvas();

            // Reconstruct the canvas based on the saved configuration
            canvasConfig.blocks.forEach(blockConfig => {
                createBlock(blockConfig.position.x, blockConfig.position.y, blockConfig.color, blockConfig.label, blockConfig.id);
            });

            canvasConfig.comments.forEach(commentConfig => {
                createComment(commentConfig.position.x, commentConfig.position.y, commentConfig.color, commentConfig.label, commentConfig.id);
            });

            // Restore connections and zoom level
            connections = canvasConfig.connections;
            zoomLevel = canvasConfig.zoomLevel;

            // Redraw canvas elements and connections
            drawBlocks();
            drawComments();
            drawConnections();

            alert('Project loaded successfully!');
        } else {
            alert('No saved project found.');
        }
    });

    // ... (previous code remains the same)
});
















