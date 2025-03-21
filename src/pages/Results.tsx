
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Background from '@/components/Background';
import AuditMetrics from '@/components/AuditMetrics';
import { AuditReport, generateMockAudit, Finding } from '@/lib/mockAudit';
import { AlertTriangle, ArrowLeft, Download, FileText, Info, Shield, Zap } from 'lucide-react';

const SeverityBadge: React.FC<{ severity: Finding['severity'] }> = ({ severity }) => {
  const colors = {
    critical: "bg-audit-red text-white",
    high: "bg-orange-500 text-white",
    medium: "bg-audit-yellow text-black",
    low: "bg-audit-blue text-white",
    info: "bg-gray-400 text-black",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[severity]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
};

const FindingItem: React.FC<{ finding: Finding }> = ({ finding }) => {
  return (
    <Card className="mb-4 glass-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex gap-2 items-center mb-1">
              <Badge variant="outline" className="text-xs font-mono">
                {finding.id}
              </Badge>
              <SeverityBadge severity={finding.severity} />
            </div>
            <CardTitle className="text-lg">{finding.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300 mb-3">
          {finding.description}
        </CardDescription>
        
        {finding.code && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Problematic Code:</p>
            <pre className="bg-black/50 p-3 rounded-md overflow-x-auto text-xs">
              <code>{finding.code}</code>
            </pre>
          </div>
        )}
        
        {finding.suggestion && (
          <div>
            <p className="text-sm text-gray-400 mb-1">Suggested Fix:</p>
            <pre className="bg-black/50 p-3 rounded-md overflow-x-auto text-xs">
              <code>{finding.suggestion}</code>
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const VulnerabilityItem: React.FC<{ title: string; severity: Finding['severity'] }> = ({ title, severity }) => {
  const colors = {
    critical: "bg-audit-red/20 text-audit-red border-audit-red/30",
    high: "bg-orange-500/20 text-orange-500 border-orange-500/30",
    medium: "bg-audit-yellow/20 text-audit-yellow border-audit-yellow/30",
    low: "bg-audit-blue/20 text-audit-blue border-audit-blue/30",
    info: "bg-gray-400/20 text-gray-400 border-gray-400/30",
  };

  const icons = {
    critical: <AlertTriangle className="w-4 h-4 mr-2" />,
    high: <AlertTriangle className="w-4 h-4 mr-2" />,
    medium: <AlertTriangle className="w-4 h-4 mr-2" />,
    low: <Info className="w-4 h-4 mr-2" />,
    info: <Info className="w-4 h-4 mr-2" />,
  };

  return (
    <div className={`p-3 rounded-md mb-3 border ${colors[severity]} flex items-center`}>
      {icons[severity]}
      <span>{title}</span>
    </div>
  );
};

const Results: React.FC = () => {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const contractCode = sessionStorage.getItem('contractCode');
    if (!contractCode) {
      navigate('/');
      return;
    }
    
    const timer = setTimeout(() => {
      const generatedReport = generateMockAudit(contractCode);
      setReport(generatedReport);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  const handleBack = () => {
    navigate('/');
  };

  const handleDownloadReport = () => {
    if (!report) return;
    
    const reportText = `
# AuditAI Smart Contract Audit Report

## Contract: ${report.contractName}

${report.summary}

## Security Metrics
- Security: ${report.metrics.security}/10
- Performance: ${report.metrics.performance}/10
- Gas Efficiency: ${report.metrics.gasEfficiency}/10
- Code Quality: ${report.metrics.codeQuality}/10
- Documentation: ${report.metrics.documentation}/10
- Overall: ${(report.metrics.security + report.metrics.performance + report.metrics.gasEfficiency + 
              report.metrics.codeQuality + report.metrics.documentation) / 5}/10

## Findings

${report.findings.map(f => `
### ${f.id}: ${f.title} (${f.severity.toUpperCase()})

${f.description}

${f.code ? `**Problematic Code:**
\`\`\`solidity
${f.code}
\`\`\`` : ''}

${f.suggestion ? `**Suggested Fix:**
\`\`\`solidity
${f.suggestion}
\`\`\`` : ''}
`).join('\n')}

## Suggestions for Improvement
${report.suggestions?.map(s => `- ${s}`).join('\n') || 'No suggestions available.'}

Generated by AuditAI - ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.contractName}_audit_report.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Background />
        <div className="text-center z-10">
          <div className="w-16 h-16 border-t-2 border-b-2 border-audit-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Analyzing contract...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Background />
        <div className="text-center z-10">
          <p className="text-white text-lg">No contract data found. Please return to the main page.</p>
          <Button 
            className="mt-4 bg-gradient-to-r from-audit-blue to-audit-purple"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
          </Button>
        </div>
      </div>
    );
  }

  // Calculate overall score
  const overallScore = ((
    report.metrics.security + 
    report.metrics.performance + 
    report.metrics.gasEfficiency + 
    report.metrics.codeQuality + 
    report.metrics.documentation
  ) / 5).toFixed(1);

  return (
    <div className="min-h-screen pb-12 relative overflow-hidden">
      <Background />
      
      <div className="container max-w-4xl mx-auto z-10 pt-4 px-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            className="mb-4 text-white bg-white/10 border-white/20 hover:bg-white/20"
            onClick={handleBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Editor
          </Button>
          
          <Button 
            className="mb-4 bg-gradient-to-r from-audit-blue to-audit-purple"
            onClick={handleDownloadReport}
          >
            <Download className="mr-2 h-4 w-4" /> Download Report
          </Button>
        </div>
        
        <Card className="glass-card animate-fade-in border-white/10 bg-black/40">
          <CardHeader className="border-b border-white/10">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-audit-blue" />
                <CardTitle className="text-2xl">Audit Results</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8 text-white/60 hover:text-white">
                <span className="sr-only">Close</span>
                <span aria-hidden="true">×</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col items-start mb-8">
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-audit-blue" />
                AuditAI
              </h2>
              <h3 className="text-lg font-medium mb-3">Audit Report</h3>
              <p className="text-gray-300 mb-6">{report.summary}</p>
              
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <span className="text-audit-blue">⚪</span> Metric Scores
              </h3>
              
              <div className="w-full">
                <div className="flex flex-wrap justify-center items-start gap-4">
                  <div className="flex items-center justify-center">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#333"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke={parseFloat(overallScore) >= 8 ? "#27AE60" : parseFloat(overallScore) >= 6 ? "#F2C94C" : "#EB5757"}
                          strokeWidth="8"
                          strokeDasharray={2 * Math.PI * 45}
                          strokeDashoffset={(2 * Math.PI * 45) * (1 - parseFloat(overallScore) / 10)}
                          transform="rotate(-90 50 50)"
                          className="animate-[circle-progress_1.5s_ease-out_forwards]"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-white">{overallScore}/10</span>
                        <span className="text-sm text-gray-400">Overall</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <AuditMetrics metrics={report.metrics} />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-audit-red" />
                Vulnerabilities
              </h3>
              
              {['critical', 'high', 'medium', 'low', 'info'].map((severity) => {
                const severityFindings = report.findings.filter(f => f.severity === severity);
                if (severityFindings.length === 0) return null;
                
                return (
                  <div key={severity} className="mb-6">
                    <h4 className="text-lg font-medium mb-3 capitalize">{severity}</h4>
                    {severityFindings.map(finding => (
                      <VulnerabilityItem 
                        key={finding.id} 
                        title={finding.title} 
                        severity={finding.severity} 
                      />
                    ))}
                  </div>
                );
              })}
              
              <Accordion type="single" collapsible className="w-full mt-4">
                {['critical', 'high', 'medium', 'low', 'info'].map((severity) => {
                  const severityFindings = report.findings.filter(f => f.severity === severity);
                  if (severityFindings.length === 0) return null;
                  
                  return (
                    <AccordionItem value={severity} key={severity} className="border-white/10">
                      <AccordionTrigger className="text-lg hover:no-underline hover:bg-white/5 px-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <SeverityBadge severity={severity as Finding['severity']} />
                          <span>
                            Detail View: {severity.charAt(0).toUpperCase() + severity.slice(1)} Issues ({severityFindings.length})
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-2">
                        {severityFindings.map(finding => (
                          <FindingItem key={finding.id} finding={finding} />
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-audit-yellow" />
                Suggestions for Improvement
              </h3>
              
              <div className="space-y-3">
                {report.suggestions?.map((suggestion, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-audit-yellow/20 flex items-center justify-center text-audit-yellow text-sm">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300">{suggestion}</p>
                  </div>
                )) || (
                  <div className="p-4 rounded-md bg-white/5 text-gray-400">
                    No suggestions available.
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
