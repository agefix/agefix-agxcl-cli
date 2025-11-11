import axios from 'axios';
import chalk from 'chalk';

export interface NetworkConfig {
  endpoint: string;
  chainType: 'public' | 'private';
}

export interface AGXCLClientConfig {
  endpoint: string;
  chainType: 'public' | 'private';
  apiKey?: string;
}

export class AGXCLClient {
  private config: AGXCLClientConfig;

  constructor(config: AGXCLClientConfig) {
    this.config = config;
  }

  /**
   * Deploy a smart contract to the AgeFix blockchain
   */
  async deployContract(contractCode: string, constructorArgs: any[] = []): Promise<string> {
    try {
      const response = await axios.post(`${this.config.endpoint}/api/contracts/deploy`, {
        code: contractCode,
        args: constructorArgs,
        chainType: this.config.chainType
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      return response.data.contractAddress;
    } catch (error: any) {
      throw new Error(`Contract deployment failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get contract information
   */
  async getContract(contractAddress: string): Promise<any> {
    try {
      const response = await axios.get(`${this.config.endpoint}/api/contracts/${contractAddress}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch contract: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Call a contract method
   */
  async callContract(contractAddress: string, method: string, args: any[] = []): Promise<any> {
    try {
      const response = await axios.post(`${this.config.endpoint}/api/contracts/${contractAddress}/call`, {
        method,
        args
      }, {
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` })
        }
      });

      return response.data.result;
    } catch (error: any) {
      throw new Error(`Contract call failed: ${error.response?.data?.message || error.message}`);
    }
  }

  /**
   * Get network status
   */
  async getNetworkStatus(): Promise<any> {
    try {
      const response = await axios.get(`${this.config.endpoint}/health`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Network unreachable: ${error.message}`);
    }
  }

  /**
   * Validate AGX balance for transactions
   */
  async getBalance(address: string): Promise<number> {
    try {
      const response = await axios.get(`${this.config.endpoint}/api/wallet/balance/${address}`);
      return response.data.balance;
    } catch (error: any) {
      throw new Error(`Balance check failed: ${error.response?.data?.message || error.message}`);
    }
  }
}

/**
 * Utility functions for contract compilation and validation
 */
export class ContractUtils {
  /**
   * Validate AGXCL contract syntax
   */
  static validateContract(contractCode: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Basic syntax validation
    if (!contractCode.includes('contract ')) {
      errors.push('Contract declaration not found');
    }
    
    if (!contractCode.includes('{') || !contractCode.includes('}')) {
      errors.push('Invalid contract structure');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Extract contract name from code
   */
  static extractContractName(contractCode: string): string | null {
    const match = contractCode.match(/contract\s+(\w+)/);
    return match ? match[1] : null;
  }
}

/**
 * Validator utilities for node setup
 */
export class ValidatorUtils {
  /**
   * Check if required AGX stake is available
   */
  static async checkStakeRequirement(client: AGXCLClient, address: string): Promise<boolean> {
    try {
      const balance = await client.getBalance(address);
      const requiredStake = 100000; // 100,000 AGX
      
      if (balance >= requiredStake) {
        console.log(chalk.green(`✅ Sufficient AGX balance: ${balance.toLocaleString()} AGX`));
        return true;
      } else {
        console.log(chalk.red(`❌ Insufficient AGX balance. Required: ${requiredStake.toLocaleString()}, Available: ${balance.toLocaleString()}`));
        return false;
      }
    } catch (error) {
      console.log(chalk.red(`❌ Error checking balance: ${error}`));
      return false;
    }
  }

  /**
   * Validate network connectivity to master nodes
   */
  static async validateNetworkConnectivity(endpoints: string[]): Promise<boolean> {
    const results = await Promise.allSettled(
      endpoints.map(endpoint => axios.get(`${endpoint}/health`, { timeout: 5000 }))
    );

    const successful = results.filter(result => result.status === 'fulfilled').length;
    const percentage = (successful / endpoints.length) * 100;

    console.log(chalk.cyan(`📊 Network connectivity: ${successful}/${endpoints.length} nodes (${percentage.toFixed(1)}%)`));
    
    return percentage >= 50; // At least 50% of nodes must be reachable
  }
}