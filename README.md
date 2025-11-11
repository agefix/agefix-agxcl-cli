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

### `agxcl init <project-name>`
Initialize a new AGXCL smart contract project with:
- Basic project structure
- Sample contract template
- Configuration file
- Development environment setup

### `agxcl compile`
Compile all AGXCL smart contracts in the `contracts/` directory:
- Validates contract syntax
- Generates bytecode and ABI
- Outputs artifacts to `build/` directory

### `agxcl deploy [options]`
Deploy compiled contracts to specified network:
- `--network <network>`: Target network (development, testnet, mainnet)
- Supports both public and private chains
- Automatic gas estimation and optimization

### `agxcl validate`
Validate validator node setup:
- Check AGX stake requirements (100,000 AGX minimum)
- Verify network connectivity
- Validate node configuration
- Test blockchain synchronization

### `agxcl version`
Display version information and system diagnostics.

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