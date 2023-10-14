// JavaScript for Dashboard

/* document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll('.block');
    const canvas = document.querySelector('.canvas');

    // Initialize draggable blocks
    blocks.forEach(block => {
        block.draggable = true;
        block.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', block.innerText);
        });
    });

    // Allow dropping blocks into the canvas
    canvas.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    canvas.addEventListener('drop', function (event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const newBlock = document.createElement('div');
        newBlock.className = 'block';
        newBlock.innerText = data;
        newBlock.draggable = true;
        // Additional logic for connecting blocks and generating Rust code can be added here
        canvas.appendChild(newBlock);
    });

}); */


// const { launchSmartContract } = require('./solana');


// JavaScript for Dashboard

document.addEventListener("DOMContentLoaded", function () {
    const blocks = document.querySelectorAll('.block');
    // const canvas = document.querySelector('canvas');
    // const canvas = document.getElementById('canvas');
    const rustCodeDisplay = document.querySelector('.rust-code pre');

    const canvasDrawingArea = document.querySelector('.canvas-drawing-area');
    const canvas = document.querySelector('.connections-canvas');
    // const rustCodeDisplay = document.querySelector('.rust-code pre');


    // Initialize draggable blocks
    blocks.forEach(block => {
        block.draggable = true;
        block.addEventListener('dragstart', function (event) {
            event.dataTransfer.setData('text/plain', block.innerText);
        });
    });

    let selectedBlock = null;
    let drawingConnection = false;

    // Event listeners for block interactions
    blocks.forEach(block => {
        block.addEventListener('mousedown', function (event) {
            selectedBlock = block;
            drawingConnection = true;
        });
        block.addEventListener('mouseup', function (event) {
            drawingConnection = false;
        });
    });

    // Allow dropping blocks into the canvas
    canvasDrawingArea.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    canvasDrawingArea.addEventListener('drop', function (event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const newBlock = document.createElement('div');
        newBlock.className = 'block';
        newBlock.innerText = data;
        newBlock.draggable = true;
        canvasDrawingArea.appendChild(newBlock);
        console.log("Ths 1 run, "+ data);
        updateRustCode(); // Update Rust code when a new block is added
        drawConnections();
    });

     /* // Update connections and draw them whenever a block is dropped
     canvas.addEventListener('drop', function (event) {
        // ... (previous code)

        // Draw connections between blocks
        drawConnections();
    }); */


    canvas.addEventListener('mousemove', function (event) {
        if (drawingConnection && selectedBlock) {
            const rect = selectedBlock.getBoundingClientRect();
            const x = rect.x + rect.width;
            const y = rect.y + rect.height / 2;
            const canvasRect = canvas.getBoundingClientRect();
            const lineEndX = event.clientX - canvasRect.x;
            const lineEndY = event.clientY - canvasRect.y;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(lineEndX, lineEndY);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });

    canvas.addEventListener('mouseup', function (event) {
        if (drawingConnection && selectedBlock) {
            drawingConnection = false;
            const rect = selectedBlock.getBoundingClientRect();
            const x = rect.x + rect.width;
            const y = rect.y + rect.height / 2;
            const canvasRect = canvas.getBoundingClientRect();
            const lineEndX = event.clientX - canvasRect.x;
            const lineEndY = event.clientY - canvasRect.y;

            // Store connection information (for advanced use, you can save this data for later use)
            const connectionInfo = {
                startX: x,
                startY: y,
                endX: lineEndX,
                endY: lineEndY,
                fromBlock: selectedBlock.innerText,
                toBlock: event.target.innerText
            };

            // Draw the connection line
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(lineEndX, lineEndY);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });


        // Map to store connections
        const connections = [];

        canvas.addEventListener('mouseup', function (event) {
            // ... (previous code)
    
            // Store connection information
            if (drawingConnection && selectedBlock) {
                drawingConnection = false;
                const rect = selectedBlock.getBoundingClientRect();
                const x = rect.x + rect.width;
                const y = rect.y + rect.height / 2;
                const canvasRect = canvas.getBoundingClientRect();
                const lineEndX = event.clientX - canvasRect.x;
                const lineEndY = event.clientY - canvasRect.y;
    
                const connectionInfo = {
                    startX: x,
                    startY: y,
                    endX: lineEndX,
                    endY: lineEndY,
                    fromBlock: selectedBlock.innerText,
                    toBlock: event.target.innerText
                };
    
                connections.push(connectionInfo);
                updateRustCode();
            }
        });

    function updateRustCode() {
        const blocksInCanvas = document.querySelectorAll('.canvas-drawing-area .block');
        const rustCode = Array.from(blocksInCanvas).map(block => {
            code_ = RUSTgenerateContent(block.innerText);
            return code_; // For simplicity, each block's text is a function call in Rust
        }).join('\n');

        rustCodeDisplay.innerText = rustCode;
    }

    /* function updateRustCode() {
        // Generate Rust code based on connections
        let rustCode = '';
        connections.forEach(connection => {
            rustCode += `${connection.fromBlock}();\n`;
        });

        rustCodeDisplay.innerText = rustCode;
    } */

    // Launch buttons (Testnet and Mainnet)
    const testnetButton = document.querySelector('.testnet-button');
    const mainnetButton = document.querySelector('.mainnet-button');
    const errorDisplay = document.querySelector('.error-message');

    testnetButton.addEventListener('click', async function () {
        const rustCode = rustCodeDisplay.innerText;
        try {
            const signature = await launchSmartContract(rustCode);
            console.log(`Smart contract launched on Testnet with signature: ${signature}`);
            errorDisplay.textContent = ''; // Clear previous errors if any
        } catch (error) {
            console.error('Error launching smart contract:', error.message);
            errorDisplay.textContent = error.message; // Display error message to the user
        }
    });


    mainnetButton.addEventListener('click', function () {
        // Logic to launch smart contract on mainnet goes here
        console.log('Launching on Mainnet...');
    });


    const clearButton = document.querySelector('.clear-button');

    clearButton.addEventListener('click', function () {
        // Clear connections and Rust code
        connections.length = 0;
        updateRustCode();

        // Clear canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });


    // Adding the export button to the project....
    const exportButton = document.querySelector('.export-button');

    exportButton.addEventListener('click', function () {
        const rustCode = rustCodeDisplay.innerText;

        // Create a Blob containing the Rust code
        const blob = new Blob([rustCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        // Create a temporary anchor element and trigger a click event to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'smart_contract.rs'; // Set the desired file name
        document.body.appendChild(a);
        a.click();

        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    });


    // Adding the Import function to the project...
    const importFileInput = document.getElementById('import-file');
    const importButton = document.querySelector('.import-button');

    importButton.addEventListener('click', function () {
        const file = importFileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const importedCode = event.target.result;
                // Update the displayed Rust code with the imported code
                rustCodeDisplay.innerText = importedCode;
                // Clear previous errors if any
                errorDisplay.textContent = '';
                // Clear connections (since they are not imported)
                connections.length = 0;
                // Update canvas (clear any drawn lines)
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            };

            reader.readAsText(file);
        } else {
            errorDisplay.textContent = 'Please select a valid .rs file.';
        }
    });



    // Adding a save button to the project
    const saveButton = document.querySelector('.save-button');

    saveButton.addEventListener('click', function () {
        const currentState = {
            rustCode: rustCodeDisplay.innerText,
            connections: connections
        };

        try {
            // Save the current state to localStorage
            localStorage.setItem('smartContractApp', JSON.stringify(currentState));
            console.log('Work saved successfully.');
            // Clear previous errors if any
            errorDisplay.textContent = '';
        } catch (error) {
            console.error('Error saving work:', error);
            errorDisplay.textContent = 'Failed to save work. Please try again.';
        }
    });

    // Check if there's a saved state and load it on page load
    const savedState = localStorage.getItem('smartContractApp');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        rustCodeDisplay.innerText = parsedState.rustCode;
        connections.push(...parsedState.connections);
        updateRustCode();
    }



    // Adding the draw function for the canvas 

    function drawConnections() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections between blocks
        connections.forEach(connection => {
            const startBlock = document.querySelector(`.block:contains('${connection.fromBlock}')`);
            const endBlock = document.querySelector(`.block:contains('${connection.toBlock}')`);

            if (startBlock && endBlock) {
                const startRect = startBlock.getBoundingClientRect();
                const startX = startRect.x + startRect.width;
                const startY = startRect.y + startRect.height / 2;
                const endRect = endBlock.getBoundingClientRect();
                const endX = endRect.x;
                const endY = endRect.y + endRect.height / 2;

                // Draw connection line
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = '#3498db';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
    }

   
});







// Function to generate content with multiple lines
function RUSTgenerateContent(data) {
    if (data == "Sol Start Block"){
        return `use solana_program::{
account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, program_error::ProgramError, pubkey::Pubkey, msg,
};
        
// Declare the program entrypoint
entrypoint!(process_instruction);`;
    }
    else if (data == "create-acc-sol"){
        return `use solana_program::{
            account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, program_error::ProgramError, pubkey::Pubkey, msg,
        };`;
    }
    else if (data == "Transfer Funds"){
        return `// Define the token transfer logic
fn transfer_tokens(accounts: &mut [AccountInfo], amount: u64) -> ProgramResult {
    // Ensure the account data passed to the program is valid
    let accounts_iter = &mut accounts.iter();
    let sender_account = next_account_info(accounts_iter)?;
    let recipient_account = next_account_info(accounts_iter)?;

    // Parse account data to access token balances
    let mut sender_data = sender_account.try_borrow_mut_data()?;
    let mut recipient_data = recipient_account.try_borrow_mut_data()?;

    // Read and update token balances
    let mut sender_balance = u64::from_le_bytes(*sender_data.get(..8).ok_or(ProgramError::InvalidAccountData)?);
    let mut recipient_balance = u64::from_le_bytes(*recipient_data.get(..8).ok_or(ProgramError::InvalidAccountData)?);

    // Perform token transfer (for demonstration purposes, no overflow/underflow checks)
    if sender_balance >= amount {
        sender_balance -= amount;
        recipient_balance += amount;

        // Update account data with new balances
        sender_data[..8].copy_from_slice(&sender_balance.to_le_bytes());
        recipient_data[..8].copy_from_slice(&recipient_balance.to_le_bytes());

        msg!("Token transferred successfully!");
    } else {
        return Err(ProgramError::InsufficientFunds);
    }

    Ok(())
}`;
    }
    // return `Line 1
    // Line 2
    // Line 3
    // Line 4
    // Line 5`;
}
