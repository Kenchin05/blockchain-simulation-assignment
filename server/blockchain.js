const { createHash } = require('crypto');

class Blockchain {
    constructor() {
        // Initialize blockchain with empty chain array and default difficulty
        this.chain = [];
        this.block_difficulty = 5;  // Number of leading zeros required in hash
        
        // Create genesis block (first block in the chain)
        this.create_block("0", 1, 1, "Genesis Block", new Date().toString());
    }

    // Creates a new block and adds it to the chain
    create_block(previous_hash, nonce, index, data, timeStamp) {
        // Block structure definition
        const block = {
            index: index,                // Position in the chain
            timeStamp: timeStamp,        // Time of block creation
            data: data,                  // Block's payload/data
            previous_hash: previous_hash, // Hash of previous block
            nonce: nonce                 // Number used for proof of work
        };
        
        this.chain.push(block);
        return block;
    }

    // Calculates SHA-256 hash of a block
    hash(block) {
        // Concatenate block properties for hashing
        var blockstr = "" + block.index + block.previous_hash + block.data + block.timeStamp + "" + block.nonce;
        // Create and return SHA-256 hash
        var hash_operation = createHash('sha256').update(blockstr).digest('hex');
        return hash_operation;
    }

    // Implements Proof of Work mechanism
    proof_of_work(block) {
        var nonce = 1;
        var check_proof = false;

        // Keep trying different nonces until we find one that gives required number of leading zeros
        while (check_proof == false) {
            block.nonce = nonce;
            var hash_operation = this.hash(block);

            // Check if hash has required number of leading zeros
            if (hash_operation.slice(0, this.block_difficulty) == '0'.repeat(this.block_difficulty)) {
                check_proof = true;
            } else {
                nonce += 1;
            }
        }

        return nonce;
    }

    // Validates the entire blockchain
    is_valid_chain() {
        var index = 1;

        // Check each block's link to previous block
        while (index < this.chain.length) {
            // Verify that current block's previous_hash matches actual hash of previous block
            if (this.hash(this.chain[index - 1]) != this.chain[index].previous_hash) {
                return false;
            }
            index += 1;
        }
        return true;
    }
}

module.exports = Blockchain;