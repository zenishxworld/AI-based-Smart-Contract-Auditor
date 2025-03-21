
export interface Finding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  code?: string;
  suggestion?: string;
}

export interface AuditReport {
  contractName: string;
  summary: string;
  metrics: {
    security: number;
    performance: number;
    gasEfficiency: number;
    codeQuality: number;
    documentation: number;
    otherKeyAreas: number;
  };
  findings: Finding[];
}

export const generateMockAudit = (code: string): AuditReport => {
  // Extract contract name from code
  const contractNameMatch = code.match(/contract\s+(\w+)/);
  const contractName = contractNameMatch ? contractNameMatch[1] : "Unknown";
  
  return {
    contractName,
    summary: `The smart contract ${contractName} has been audited for security vulnerabilities, performance optimization, and general code quality. No critical vulnerabilities were found that could compromise the security of the contract. The code structure is relatively clean and well-organized.`,
    metrics: {
      security: 7,
      performance: 8,
      gasEfficiency: 8,
      codeQuality: 7,
      documentation: 6,
      otherKeyAreas: 7
    },
    findings: [
      {
        id: "SEC-001",
        severity: "medium",
        title: "Potential Reentrancy Vulnerability",
        description: "The contract contains functions that perform external calls before updating state variables, which could lead to reentrancy attacks.",
        code: `function withdraw(uint256 amount) public {
  require(balances[msg.sender] >= amount, "Insufficient balance");
  payable(msg.sender).transfer(amount);  // External call before state update
  balances[msg.sender] -= amount;
}`,
        suggestion: `function withdraw(uint256 amount) public {
  require(balances[msg.sender] >= amount, "Insufficient balance");
  balances[msg.sender] -= amount;  // Update state before external call
  payable(msg.sender).transfer(amount);
}`
      },
      {
        id: "GAS-001",
        severity: "low",
        title: "Unnecessary Storage Reads",
        description: "Multiple reads of the same storage variable within a function increase gas costs.",
        code: `function processData(uint256 value) public {
  require(value <= maxValue, "Value too high");
  if (value + totalValue <= maxValue) {
    totalValue += value;
  }
}`,
        suggestion: `function processData(uint256 value) public {
  uint256 _maxValue = maxValue;  // Cache storage variable
  require(value <= _maxValue, "Value too high");
  uint256 _totalValue = totalValue;  // Cache storage variable
  if (value + _totalValue <= _maxValue) {
    totalValue = _totalValue + value;
  }
}`
      },
      {
        id: "QUAL-001",
        severity: "info",
        title: "Missing Events for State Changes",
        description: "The contract modifies state variables without emitting corresponding events, which makes it harder to track changes off-chain.",
        suggestion: "Define and emit events for all significant state changes to improve contract observability."
      },
      {
        id: "DOC-001",
        severity: "low",
        title: "Insufficient Documentation",
        description: "The contract and its functions lack comprehensive documentation, making it difficult for users and developers to understand their purpose and behavior.",
        suggestion: "Add NatSpec comments to document the contract and all public/external functions."
      }
    ]
  };
};
