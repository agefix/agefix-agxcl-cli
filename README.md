# @agefix/agxcl-cli

Official command-line interface for AGXCL smart contract development on the AgeFix blockchain.

## 🚀 Quick Start

### Installation

```bash
npm install -g @agefix/agxcl-cli
```

### Initialize a New Project

```bash
agxcl init my-healthcare-contract
cd my-healthcare-contract
```

### Compile Contracts

```bash
agxcl compile
```

### Deploy to Testnet

```bash
agxcl deploy --network testnet
```

## 📋 Commands

### Project Management

#### `agxcl init <project-name>`
Initialize a new AGXCL smart contract project with:
- Basic project structure
- Sample contract template
- Configuration file
- Development environment setup

**Example:**
```bash
agxcl init my-defi-protocol
cd my-defi-protocol
```

#### `agxcl compile`
Compile all AGXCL smart contracts in the `contracts/` directory:
- Validates contract syntax
- Generates bytecode and ABI
- Outputs artifacts to `build/` directory

**Example:**
```bash
agxcl compile
# Output: ✅ Compiled 3 contracts successfully
```

#### `agxcl deploy [options]`
Deploy compiled contracts to specified network:
- `--network <network>`: Target network (development, testnet, mainnet)
- `--contract <name>`: Specific contract to deploy
- Supports both public and private chains
- Automatic gas estimation and optimization

**Example:**
```bash
agxcl deploy --network testnet --contract MyToken
```

### Wallet Management

#### `agxcl wallet create`
Create a new wallet with encrypted private key storage.

**Example:**
```bash
agxcl wallet create
# Enter passphrase: ********
# ✅ Wallet created: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5
# Private key encrypted and stored in ~/.agxcl/wallets/
```

#### `agxcl wallet import <private-key>`
Import an existing wallet using a private key.

**Example:**
```bash
agxcl wallet import 0x1234567890abcdef...
# Enter passphrase: ********
# ✅ Wallet imported: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5
```

#### `agxcl wallet list`
List all wallets stored in the CLI.

**Example:**
```bash
agxcl wallet list
# Wallets:
#   1. 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5 (default)
#   2. 0x8B3192f2F0F14F6E8E1f8C6b3d4e5f6a7b8c9d0e
```

#### `agxcl wallet balance [address]`
Check AGX, CURE, and VITA token balances for a wallet.

**Example:**
```bash
agxcl wallet balance
# Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5
# AGX:  15,250.50
# CURE: 5,000.00
# VITA: 2,500.00
# Total Value (USD): $45,375.75
```

#### `agxcl wallet send <token> <to> <amount>`
Send tokens to another address.

**Example:**
```bash
agxcl wallet send AGX 0x8B3192f2F0F14F6E8E1f8C6b3d4e5f6a7b8c9d0e 100
# Enter passphrase: ********
# ✅ Transaction sent: 0xabcd1234...
# Amount: 100 AGX
# Gas fee: 0.05 AGX
```

### Staking & Rewards

#### `agxcl stake lock <amount> [duration]`
Lock CURE tokens for staking rewards with optional lock duration.

**Duration options:** `none`, `1week`, `1month`, `3months`, `1year`

**Example:**
```bash
agxcl stake lock 10000 3months
# Enter passphrase: ********
# ✅ Staked 10,000 CURE
# Lock Period: 3 months (1.5x multiplier)
# Base APY: 12.5%
# Effective APY: 18.75%
# Estimated Yearly Rewards: 1,875 CURE
# Unlock Date: 2026-02-13
```

#### `agxcl stake unlock <stake-id>`
Unlock staked CURE tokens after lock period expires.

**Example:**
```bash
agxcl stake unlock stake_abc123
# Enter passphrase: ********
# ✅ Unlocked 10,000 CURE
# Total Rewards Earned: 468.75 CURE
```

#### `agxcl stake status`
View all active staking positions and rewards.

**Example:**
```bash
agxcl stake status
# Active Stakes:
#   1. Stake ID: stake_abc123
#      Amount: 10,000 CURE
#      Lock Period: 3 months (1.5x multiplier)
#      APY: 18.75%
#      Pending Rewards: 468.75 CURE
#      Unlock Date: 2026-02-13
#   
#   2. Stake ID: stake_def456
#      Amount: 5,000 CURE
#      Lock Period: none (1.0x multiplier)
#      APY: 12.5%
#      Pending Rewards: 156.25 CURE
#      Unlocked: Yes
#
# Total Staked: 15,000 CURE
# Total Pending Rewards: 625 CURE
```

#### `agxcl rewards claim [stake-id]`
Claim accumulated staking rewards.

**Example:**
```bash
agxcl rewards claim stake_abc123
# Enter passphrase: ********
# ✅ Claimed 468.75 CURE rewards
# New balance: 5,468.75 CURE
```

#### `agxcl rewards history`
View complete staking and reward claim history.

**Example:**
```bash
agxcl rewards history
# Reward History:
#   2025-11-13: Claimed 468.75 CURE (stake_abc123)
#   2025-10-13: Claimed 312.50 CURE (stake_abc123)
#   2025-09-13: Claimed 156.25 CURE (stake_def456)
#
# Total Rewards Claimed: 937.50 CURE
```

### Governance Commands

#### `agxcl governance propose <type> <title> <description>`
Create a new governance proposal.

**Proposal types:** `parameter_change`, `treasury_spend`, `gauge_weight`

**Example:**
```bash
agxcl governance propose parameter_change \
  "Increase Protocol Fee to 0.5%" \
  "This proposal aims to increase protocol sustainability..."
# Enter passphrase: ********
# ✅ Proposal created: prop_xyz789
# Voting Period: 7 days
# Quorum Required: 10%
# Voting Starts: 2025-11-14
# Voting Ends: 2025-11-21
```

#### `agxcl governance vote <proposal-id> <vote> [reason]`
Cast a vote on an active proposal.

**Vote options:** `for`, `against`, `abstain`

**Example:**
```bash
agxcl governance vote prop_xyz789 for "This change improves sustainability"
# Enter passphrase: ********
# ✅ Vote cast successfully
# Voting Power: 10,000 CURE
# Your Vote: For
# Current Results:
#   For: 125,000 (62.5%)
#   Against: 50,000 (25%)
#   Abstain: 25,000 (12.5%)
```

#### `agxcl governance proposals [--status]`
List all governance proposals with optional status filter.

**Status options:** `all`, `active`, `pending`, `succeeded`, `defeated`, `executed`

**Example:**
```bash
agxcl governance proposals --status active
# Active Proposals:
#   1. prop_xyz789: Increase Protocol Fee to 0.5%
#      Status: Active
#      For: 125,000 (62.5%) | Against: 50,000 (25%)
#      Quorum: Met (75% turnout)
#      Ends: 2025-11-21
#
#   2. prop_abc456: Fund Mobile App Development
#      Status: Active
#      For: 80,000 (40%) | Against: 20,000 (10%)
#      Quorum: Not Met (50% turnout)
#      Ends: 2025-11-25
```

#### `agxcl governance gauge-vote <weights>`
Vote on gauge weight distribution across protocols.

**Example:**
```bash
agxcl governance gauge-vote --defi 40 --gaming 30 --nft 20 --governance 10
# Enter passphrase: ********
# ✅ Gauge weights updated
# Voting Power Used: 10,000 CURE
# Weight Allocation:
#   DeFi: 40%
#   Gaming: 30%
#   NFT: 20%
#   Governance: 10%
# Next Epoch Starts: 2025-11-20
```

#### `agxcl governance gauges`
View current gauge weight distribution.

**Example:**
```bash
agxcl governance gauges
# Current Gauge Weights (Epoch 42):
#   DeFi: 45% (450,000 votes) - 1.8x emission multiplier
#   Gaming: 30% (300,000 votes) - 1.2x emission multiplier
#   NFT: 15% (150,000 votes) - 0.6x emission multiplier
#   Governance: 10% (100,000 votes) - 0.4x emission multiplier
#
# Next Epoch: 2025-11-20 (7 days remaining)
```

#### `agxcl governance stats`
View comprehensive governance statistics.

**Example:**
```bash
agxcl governance stats
# Governance Statistics:
#   Total CURE Locked: 1,250,000
#   Participation Rate: 65%
#   Active Proposals: 2
#   Total Proposals: 15
#   Proposals Passed: 10 (66.7%)
#   Current Epoch: 42
#   Active Bribes: 5
#   Total Bribe Value: $25,000
```

### Validator Operations

#### `agxcl validate`
Validate validator node setup:
- Check AGX stake requirements (100,000 AGX minimum)
- Verify network connectivity
- Validate node configuration
- Test blockchain synchronization

**Example:**
```bash
agxcl validate
# Validator Validation Results:
# ✅ AGX Balance: 150,000 (requirement: 100,000)
# ✅ Network Connectivity: Connected to mainnet
# ✅ Node Configuration: Valid
# ✅ Blockchain Sync: Synced (block 1,234,567)
# 
# Ready to deploy validator node
```

#### `agxcl validator deploy --stake <amount>`
Deploy a validator node with specified stake amount.

**Example:**
```bash
agxcl validator deploy --stake 100000
# Enter passphrase: ********
# Deploying validator node...
# ✅ Validator node deployed
# Validator Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5
# Staked Amount: 100,000 AGX
# Status: Active
# Expected Annual Rewards: 15,000 AGX (15% APY)
```

#### `agxcl validator status`
Check validator node status and performance.

**Example:**
```bash
agxcl validator status
# Validator Status:
#   Address: 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb5
#   Status: Active
#   Stake: 100,000 AGX
#   Uptime: 99.8%
#   Blocks Validated: 1,234
#   Total Rewards Earned: 1,250 AGX
#   Last Active: 2 minutes ago
```

#### `agxcl validator rewards`
View validator rewards and performance metrics.

**Example:**
```bash
agxcl validator rewards
# Validator Rewards:
#   Protocol Fees (60%): 750 AGX
#   Block Rewards (30%): 375 AGX
#   Longevity Bonus (10%): 125 AGX
#   Total Earned: 1,250 AGX
#   
#   Performance Metrics:
#     Uptime: 99.8%
#     Consensus Participation: 100%
#     Health Data Verified: 5,432 records
```

### Network & Debugging

#### `agxcl network stats`
View real-time network statistics and health metrics.

**Example:**
```bash
agxcl network stats
# AgeFix Network Statistics:
#   Chain: Mainnet
#   Current Block: 1,234,567
#   Block Time: 3.2s
#   Active Validators: 42
#   Total Transactions: 5,432,109
#   Network TVL: $125,000,000
#   AGX Price: $3.45
```

#### `agxcl version`
Display version information and system diagnostics.

**Example:**
```bash
agxcl version
# @agefix/agxcl-cli version 1.2.3
# Node.js: v18.17.0
# Network: mainnet
# RPC Endpoint: https://api.mainnet.agefix.com
```

## 🌐 Network Configuration

The CLI supports multiple networks out of the box:

### Development (Local)
```json
{
  "endpoint": "http://localhost:8001",
  "chainType": "public"
}
```

### Testnet
```json
{
  "endpoint": "https://api.testnet.agefix.com",
  "chainType": "public"
}
```

### Mainnet
```json
{
  "endpoint": "https://api.mainnet.agefix.com",
  "chainType": "public"
}
```

## 🏥 Healthcare-Specific Features

### Medical Data Contracts
```agxcl
contract MedicalRecord {
    mapping(address => PatientData) private records;
    
    modifier onlyAuthorized(address patient) {
        require(hasConsent(patient, msg.sender), "Unauthorized access");
        _;
    }
    
    function accessRecord(address patient) 
        public 
        onlyAuthorized(patient) 
        returns (PatientData) {
        return records[patient];
    }
}
```

### HIPAA-Compliant Access Control
```agxcl
contract ConsentManagement {
    struct Consent {
        address patient;
        address provider;
        uint256 expiryDate;
        bool isActive;
    }
    
    mapping(bytes32 => Consent) public consents;
    
    function grantConsent(address provider, uint256 duration) public {
        bytes32 consentId = keccak256(abi.encodePacked(msg.sender, provider));
        consents[consentId] = Consent({
            patient: msg.sender,
            provider: provider,
            expiryDate: block.timestamp + duration,
            isActive: true
        });
    }
}
```

## 💰 Validator Operations

### Stake AGX Tokens
```bash
# Check current balance
agxcl balance --address 0xYourAddress

# Validate stake requirements
agxcl validate

# Deploy validator node (requires 100,000 AGX)
agxcl deploy-validator --stake 100000
```

### Monitor Validator Performance
```bash
# Check validator status
agxcl validator status

# View rewards and performance
agxcl validator rewards

# Monitor network participation
agxcl network stats
```

## 🔧 Project Structure

```
my-healthcare-contract/
├── contracts/               # AGXCL smart contracts
│   └── MyContract.agxcl
├── tests/                   # Contract tests
├── scripts/                 # Deployment scripts
├── build/                   # Compiled artifacts
└── agxcl.config.json       # Project configuration
```

### Configuration File (agxcl.config.json)
```json
{
  "name": "my-healthcare-contract",
  "version": "1.0.0",
  "networks": {
    "development": {
      "endpoint": "http://localhost:8001",
      "chainType": "public"
    },
    "testnet": {
      "endpoint": "https://api.testnet.agefix.com",
      "chainType": "public"
    },
    "mainnet": {
      "endpoint": "https://api.mainnet.agefix.com",
      "chainType": "public"
    }
  },
  "compiler": {
    "version": "0.8.0"
  }
}
```

## 🔐 Security Features

- **HIPAA Compliance**: Built-in privacy protection for medical data
- **Access Control**: Role-based permissions and consent management
- **Audit Logging**: Immutable audit trails for all medical data access
- **Encryption**: End-to-end encryption for sensitive healthcare information

## 📚 Examples

### Basic AGX Token Contract
```agxcl
contract SimpleToken {
    mapping(address => uint256) public balances;
    
    constructor(uint256 initialSupply) {
        balances[msg.sender] = initialSupply;
    }
    
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
```

### Healthcare Provider Registry
```agxcl
contract ProviderRegistry {
    struct Provider {
        string name;
        string specialty;
        bool isVerified;
        uint256 registrationDate;
    }
    
    mapping(address => Provider) public providers;
    
    modifier onlyVerified() {
        require(providers[msg.sender].isVerified, "Provider not verified");
        _;
    }
    
    function registerProvider(string memory name, string memory specialty) public {
        providers[msg.sender] = Provider({
            name: name,
            specialty: specialty,
            isVerified: false,
            registrationDate: block.timestamp
        });
    }
}
```

## 🛠️ Development Workflow

1. **Initialize**: `agxcl init my-contract`
2. **Develop**: Write contracts in `contracts/` directory
3. **Compile**: `agxcl compile` to check syntax and generate artifacts
4. **Test**: Run on development network
5. **Deploy**: `agxcl deploy --network testnet` for testing
6. **Mainnet**: `agxcl deploy --network mainnet` for production

## 📖 Additional Resources

- [AGXCL Language Reference](https://agefix.com/developers/agxcl)
- [Smart Contract Security Best Practices](https://agefix.com/developers/security)
- [Healthcare Blockchain Examples](https://github.com/agefix/agxcl-examples)
- [Validator Node Setup Guide](https://agefix.com/developers/validators)

## 🔗 Links

- [Website](https://agefix.com)
- [Documentation](https://agefix.com/developers)
- [GitHub](https://github.com/agefix/agxcl-cli)
- [NPM Package](https://www.npmjs.com/package/@agefix/agxcl-cli)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**AgeFix** - Revolutionizing Healthcare Through Blockchain Technology