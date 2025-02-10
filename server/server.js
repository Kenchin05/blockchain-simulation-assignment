const express = require('express');
const cors = require('cors');
const Blockchain = require('./blockchain');

// Initialize Express app and blockchain
const app = express();
const blockchain = new Blockchain();

// Middleware setup
app.use(cors());  // Enable CORS for all origins
app.use(express.json());  // Parse JSON request bodies

// Get the entire blockchain and verify its validity
app.get("/getchain", (req, res) => {
    const isValid = blockchain.is_valid_chain();
    res.json({
        chain: blockchain.chain,
        is_valid: isValid
    });
});

// Mine a new block with provided data
app.post("/mineblock", (req, res) => {
    // Get the last block in the chain
    var previous_block = blockchain.chain.slice(-1)[0];
    var previous_hash = blockchain.hash(previous_block);
    var data = req.body.data;
    
    // Create timestamp for the new block
    var date = new Date();
    date = date.toString();

    // Prepare new block structure
    var block = {
        index: blockchain.chain.length + 1,
        timestamp: date,
        nonce: 1,
        previous_hash: previous_hash,
        data: data
    }

    // Perform proof of work to mine the block
    block.nonce = blockchain.proof_of_work(block);
    
    // Add the mined block to the chain
    blockchain.create_block(
        block.previous_hash,
        block.nonce,
        block.index,
        block.data,
        block.timestamp
    );
    
    res.send(block);
});

// Adjust the mining difficulty
app.get("/setDifficulty", (req, res) => {
    const newDifficulty = parseInt(req.query.difficulty);
    if (newDifficulty && newDifficulty > 0) {
        blockchain.block_difficulty = newDifficulty;
        res.json({ message: `Difficulty set to ${newDifficulty}` });
    } else {
        res.status(400).json({ error: "Invalid difficulty value" });
    }
});

// Get the most recent block
app.post("/getPreviousBlock", (req, res) => {
    const lastBlock = blockchain.chain.slice(-1)[0];
    res.json(lastBlock);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Blockchain server running on port ${PORT}`);
});