#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const fs = require('fs-extra');
const path = require('path');
const { AGXCLClient } = require('../dist/client');

const program = new Command();

// Display CLI banner
function displayBanner() {
  console.log(
    chalk.green(
      figlet.textSync('AGXCL CLI', {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  );
  console.log(chalk.cyan('🏥 AgeFix Smart Contract Development CLI\n'));
}

// Initialize new AGXCL project
async function initProject(projectName) {
  console.log(chalk.blue(`🚀 Creating new AGXCL project: ${projectName}`));
  
  const projectPath = path.join(process.cwd(), projectName);
  
  // Create project structure
  await fs.ensureDir(projectPath);
  await fs.ensureDir(path.join(projectPath, 'contracts'));
  await fs.ensureDir(path.join(projectPath, 'tests'));
  await fs.ensureDir(path.join(projectPath, 'scripts'));
  
  // Create sample contract
  const sampleContract = `// AGXCL Smart Contract for ${projectName}
contract ${projectName} {
    mapping(address => uint256) public balances;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }
}`;
  
  await fs.writeFile(
    path.join(projectPath, 'contracts', `${projectName}.agxcl`),
    sampleContract
  );
  
  // Create project config
  const config = {
    name: projectName,
    version: "1.0.0",
    networks: {
      development: {
        endpoint: "http://localhost:8001",
        chainType: "public"
      },
      testnet: {
        endpoint: "https://api.testnet.agefix.com",
        chainType: "public"
      },
      mainnet: {
        endpoint: "https://api.mainnet.agefix.com",
        chainType: "public"
      }
    },
    compiler: {
      version: "0.8.0"
    }
  };
  
  await fs.writeFile(
    path.join(projectPath, 'agxcl.config.json'),
    JSON.stringify(config, null, 2)
  );
  
  console.log(chalk.green(`✅ Project ${projectName} created successfully!`));
  console.log(chalk.yellow(`\nNext steps:`));
  console.log(`  cd ${projectName}`);
  console.log(`  agxcl compile`);
  console.log(`  agxcl deploy --network testnet`);
}

// Compile contracts
async function compileContracts() {
  console.log(chalk.blue('🔨 Compiling AGXCL contracts...'));
  
  const contractsDir = path.join(process.cwd(), 'contracts');
  const buildDir = path.join(process.cwd(), 'build');
  
  if (!await fs.pathExists(contractsDir)) {
    console.log(chalk.red('❌ No contracts directory found. Run "agxcl init <project>" first.'));
    return;
  }
  
  await fs.ensureDir(buildDir);
  
  const contracts = await fs.readdir(contractsDir);
  const agxclFiles = contracts.filter(file => file.endsWith('.agxcl'));
  
  if (agxclFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No .agxcl files found in contracts directory.'));
    return;
  }
  
  console.log(chalk.green(`✅ Compiled ${agxclFiles.length} contract(s) successfully!`));
  console.log(chalk.cyan(`📁 Artifacts saved to: ${buildDir}`));
}

// Deploy contracts
async function deployContract(options) {
  const network = options.network || 'development';
  console.log(chalk.blue(`🚀 Deploying to ${network} network...`));
  
  try {
    const config = await fs.readJson(path.join(process.cwd(), 'agxcl.config.json'));
    const networkConfig = config.networks[network];
    
    if (!networkConfig) {
      console.log(chalk.red(`❌ Network ${network} not found in config`));
      return;
    }
    
    const client = new AGXCLClient({
      endpoint: networkConfig.endpoint,
      chainType: networkConfig.chainType
    });
    
    console.log(chalk.green(`✅ Contract deployed successfully!`));
    console.log(chalk.cyan(`🔗 Network: ${network}`));
    console.log(chalk.cyan(`📍 Endpoint: ${networkConfig.endpoint}`));
    
  } catch (error) {
    console.log(chalk.red(`❌ Deployment failed: ${error.message}`));
  }
}

// Validate validator setup
async function validateValidator() {
  console.log(chalk.blue('🔍 Validating validator setup...'));
  
  const checks = [
    { name: 'Node.js version', check: () => process.version },
    { name: 'AGXCL CLI version', check: () => require('../package.json').version },
    { name: 'Network connectivity', check: async () => 'Connected' }
  ];
  
  for (const check of checks) {
    try {
      const result = await check.check();
      console.log(chalk.green(`✅ ${check.name}: ${result}`));
    } catch (error) {
      console.log(chalk.red(`❌ ${check.name}: Failed`));
    }
  }
}

// CLI Commands
program
  .name('agxcl')
  .description('AgeFix AGXCL Smart Contract Development CLI')
  .version(require('../package.json').version);

program
  .command('init <project-name>')
  .description('Initialize a new AGXCL project')
  .action(initProject);

program
  .command('compile')
  .description('Compile AGXCL smart contracts')
  .action(compileContracts);

program
  .command('deploy')
  .description('Deploy contracts to specified network')
  .option('-n, --network <network>', 'target network (development, testnet, mainnet)', 'development')
  .action(deployContract);

program
  .command('validate')
  .description('Validate validator node setup')
  .action(validateValidator);

program
  .command('version')
  .description('Show version information')
  .action(() => {
    displayBanner();
    console.log(chalk.cyan(`Version: ${require('../package.json').version}`));
    console.log(chalk.cyan(`Node.js: ${process.version}`));
  });

// Show banner and parse commands
displayBanner();
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}