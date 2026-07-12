import React, { useState } from 'react';
import { KPICard } from '../../components/shared/KPICard';
import { FileText, Download, Calendar, Filter, FileSpreadsheet, File } from 'lucide-react';

export const ReportsExport: React.FC = () => {
  const [reportType, setReportType] = useState('carbon');
  const [format, setFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Report generated and downloaded successfully in ${format.toUpperCase()} format!`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Compliance & Reports Export Center</h1>
        <p className="text-xs text-muted-foreground">Download audited reports for carbon taxation, logistics spreadsheets, and driver billing.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 text-xs">
        <KPICard
          title="Scheduled Reports"
          value="Weekly Carbon Audit"
          icon={<Calendar className="h-4 w-4 text-primary" />}
          comparisonText="Every Sunday at 23:59 UTC"
        />
        <KPICard
          title="Export Target Format"
          value={format.toUpperCase()}
          icon={format === 'csv' ? <FileSpreadsheet className="h-4 w-4 text-success" /> : <File className="h-4 w-4 text-destructive" />}
          comparisonText="Preset rendering encoding"
        />
        <KPICard
          title="System Logs Parsed"
          value="All-Time logs ready"
          icon={<FileText className="h-4 w-4 text-info" />}
          comparisonText="Compliant with GST & ESG audits"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Configurations card */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm lg:col-span-1 text-xs space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
            <Filter className="h-4.5 w-4.5 text-primary" /> Filter Report Scope
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-muted-foreground mb-1">Report Category</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              >
                <option value="carbon">ESG & Carbon Emissions Audit</option>
                <option value="fuel">Fuel Logistics & Expenditures</option>
                <option value="trip">Operations Route Dispatch Log</option>
                <option value="expense">Financial Expense Claims</option>
              </select>
            </div>

            <div>
              <label className="block text-muted-foreground mb-1">Date Range Window</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full rounded border border-border bg-background px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
              >
                <option value="today">Today's Transactions</option>
                <option value="week">Past 7 Days</option>
                <option value="month">Current Month</option>
                <option value="year">Current Fiscal Year</option>
              </select>
            </div>

            <div>
              <label className="block text-muted-foreground mb-1">Download Format</label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={() => setFormat('pdf')}
                    className="text-primary focus:ring-primary"
                  />
                  <span>PDF Document</span>
                </label>
                <label className="flex items-center space-x-1 cursor-pointer">
                  <input
                    type="radio"
                    name="format"
                    value="csv"
                    checked={format === 'csv'}
                    onChange={() => setFormat('csv')}
                    className="text-primary focus:ring-primary"
                  />
                  <span>CSV Spreadsheet</span>
                </label>
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full flex justify-center items-center rounded bg-primary py-2 font-bold text-primary-foreground hover:bg-primary/95 disabled:opacity-50 gap-2"
          >
            <Download className="h-4 w-4" />
            {isExporting ? 'Compiling Log Data...' : 'Export Document'}
          </button>
        </div>

        {/* Recent reports list card */}
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm lg:col-span-2 text-xs space-y-4">
          <h3 className="font-semibold text-foreground border-b border-border pb-2">
            📋 Recently Generated Exports
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-destructive/10 text-destructive">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">carbon_emissions_june_2026.pdf</h4>
                  <p className="text-[10px] text-muted-foreground">Generated by Arjun Sharma • 4.2 MB • Jun 30, 2026</p>
                </div>
              </div>
              <button className="rounded border border-border bg-card p-1.5 text-muted-foreground hover:text-foreground">
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-success/10 text-success">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">fuel_log_summary_q2.csv</h4>
                  <p className="text-[10px] text-muted-foreground">Generated by Priya Patel • 820 KB • Jun 15, 2026</p>
                </div>
              </div>
              <button className="rounded border border-border bg-card p-1.5 text-muted-foreground hover:text-foreground">
                <Download className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded bg-destructive/10 text-destructive">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">trip_dispatch_log_weekly.pdf</h4>
                  <p className="text-[10px] text-muted-foreground">Generated automatically by system • 1.8 MB • Jul 05, 2026</p>
                </div>
              </div>
              <button className="rounded border border-border bg-card p-1.5 text-muted-foreground hover:text-foreground">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportsExport;
