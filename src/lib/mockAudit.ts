
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
  suggestions?: string[];
}

export const generateMockAudit = (code: string): AuditReport => {
  // Extract contract name from code
  const contractNameMatch = code.match(/contract\s+(\w+)/);
  const contractName = contractNameMatch ? contractNameMatch[1] : "Unknown";
  
  // Check for reentrancy vulnerabilities
  const hasReentrancy = code.includes('transfer') && !code.includes('ReentrancyGuard');
  
  // Check for timestamp dependence
  const hasTimestampDependence = code.includes('block.timestamp') || code.includes('now');
  
  // Check for blockhash usage
  const hasBlockhashUsage = code.includes('blockhash');
  
  // Check if explicit function visibility modifiers are used
  const missingVisibility = code.includes('function') && 
    !code.includes('function public') && 
    !code.includes('function private') && 
    !code.includes('function internal') && 
    !code.includes('function external');
  
  // Determine security score based on vulnerabilities
  let securityScore = 7;
  if (hasReentrancy) securityScore -= 2;
  if (hasTimestampDependence) securityScore -= 1;
  if (hasBlockhashUsage) securityScore -= 1;
  
  // Determine code quality based on visibility modifiers
  let codeQualityScore = 7;
  if (missingVisibility) codeQualityScore -= 1;
  
  // Check for documentation
  const hasDocumentation = code.includes('///') || code.includes('/**');
  let documentationScore = hasDocumentation ? 7 : 5;
  
  // Generate findings based on code analysis
  const findings: Finding[] = [];
  
  if (hasReentrancy) {
    findings.push({
      id: "SEC-001",
      severity: "high",
      title: "Potential reentrancy vulnerability in withdrawal function",
      description: "The contract contains functions that perform external calls before updating state variables, which could lead to reentrancy attacks.",
      code: `function withdraw(uint256 amount) {
  require(balances[msg.sender] >= amount);
  payable(msg.sender).transfer(amount);  // External call before state update
  balances[msg.sender] -= amount;
}`,
      suggestion: `function withdraw(uint256 amount) {
  require(balances[msg.sender] >= amount);
  balances[msg.sender] -= amount;  // Update state before external call
  payable(msg.sender).transfer(amount);
}`
    });
  }
  
  if (hasTimestampDependence) {
    findings.push({
      id: "SEC-002",
      severity: "medium",
      title: "Timestamp dependency may be manipulated by miners",
      description: "The contract relies on `block.timestamp` for critical operations. Miners can manipulate timestamps slightly, which may affect time-sensitive logic.",
      code: code.includes('block.timestamp') ? 
        `if (block.timestamp >= endTime) { /* ... */ }` : 
        `if (now >= endTime) { /* ... */ }`,
      suggestion: `Consider using block numbers and time averages for less sensitive time measurements, or accept the risk for operations with a time window larger than miners can manipulate (>30 seconds).`
    });
  }
  
  if (hasBlockhashUsage) {
    findings.push({
      id: "SEC-003",
      severity: "low",
      title: "Using block.blockhash for randomness is not secure",
      description: "The contract uses blockhash as a source of randomness, which can be manipulated by miners.",
      code: `uint256 random = uint256(blockhash(block.number - 1)) % 100;`,
      suggestion: `Use a secure source of randomness such as an oracle or commit-reveal schemes for randomness.`
    });
  }
  
  if (missingVisibility) {
    findings.push({
      id: "QUAL-001",
      severity: "info",
      title: "Consider using explicit function visibility modifiers",
      description: "Some functions in the contract don't explicitly specify their visibility (public, private, internal, or external).",
      suggestion: "Add explicit visibility modifiers to all functions and state variables to improve code readability and avoid potential security issues."
    });
  }
  
  if (!hasDocumentation) {
    findings.push({
      id: "DOC-001",
      severity: "low",
      title: "Insufficient documentation",
      description: "The contract and its functions lack comprehensive documentation, making it difficult for users and developers to understand their purpose and behavior.",
      suggestion: "Add NatSpec comments to document the contract and all public/external functions."
    });
  }
  
  // More advanced checks
  if (code.includes('selfdestruct') || code.includes('suicide')) {
    findings.push({
      id: "SEC-004",
      severity: "high",
      title: "Contract uses selfdestruct/suicide",
      description: "The contract can be destroyed using selfdestruct, which might not be intended and poses a security risk if not properly protected.",
      suggestion: "Make sure selfdestruct is used securely and with proper access control if intended. If not necessary, remove it."
    });
  }
  
  // Gas optimization suggestions
  if (code.includes('for (')) {
    findings.push({
      id: "GAS-001",
      severity: "low",
      title: "Unbounded loops may cause gas issues",
      description: "The contract contains loops that might iterate over unbounded data structures, which can lead to out-of-gas errors.",
      suggestion: "Consider adding limits to loops or pagination mechanisms for large data sets."
    });
  }
  
  // Generate improvement suggestions
  const suggestions = [
    "Add comprehensive NatSpec documentation to all public and external functions.",
    "Implement events for all significant state changes to improve off-chain observability.",
    "Consider using OpenZeppelin's ReentrancyGuard for functions that perform external calls.",
    "Follow the checks-effects-interactions pattern to prevent reentrancy vulnerabilities.",
    "Cache frequently accessed storage variables in memory to reduce gas costs.",
  ];
  
  // Additional contract-specific suggestions
  if (hasTimestampDependence) {
    suggestions.push("Replace block.timestamp with block numbers for sensitive time-dependent logic.");
  }
  
  if (hasBlockhashUsage) {
    suggestions.push("Use a proper source of randomness from an oracle like Chainlink VRF instead of blockhash.");
  }
  
  if (code.includes('mapping')) {
    suggestions.push("Consider adding getter functions for complex mappings to improve usability.");
  }
  
  return {
    contractName,
    summary: `The smart contract ${contractName} has been audited for security vulnerabilities, performance optimization, and general code quality. ${
      findings.filter(f => f.severity === 'critical').length > 0 ? 
      "Critical vulnerabilities were found that could compromise the security of the contract." : 
      "No critical vulnerabilities were found that could compromise the security of the contract."
    } The code structure is ${codeQualityScore >= 7 ? "relatively clean and well-organized" : "in need of improvement"}.`,
    metrics: {
      security: securityScore,
      performance: 8,
      gasEfficiency: 8,
      codeQuality: codeQualityScore,
      documentation: documentationScore,
      otherKeyAreas: 7
    },
    findings,
    suggestions: suggestions
  };
};
