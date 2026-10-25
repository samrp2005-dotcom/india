import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

export interface RawCollectionRow {
  BUCKET?: string;
  FIN_TYPE?: string;
  SOURCE?: string;
  IS_MIGRATED?: string;
  PCHFL_RESOLUTIONSTATUS?: boolean | string;
  PCHFL_RESOLUTIONTYPE?: string;
  DP_RESOLUTION?: number;
  PCHFL_REPAYMENTFREQUENCY?: string;
  MONTH_NAME?: string | Date;
  PRODUCT_LINE?: string;
  FINAL_PRODUCT_CATEGORY?: string;
  BOUNCE_FLAG?: number;
  PAYMENT_MODE?: string;
  ENTITY?: string;
  DISTRICT?: string;
  STATE?: string;
  ZONE?: string;
  DISPOSITION_TAG?: string;
  DISPOSITION_TAG_CATG?: string;
  AGENCY_NAME?: string;
  DP_RES_MONTHEND?: number;
  WRITE_OFF_FLAG?: number;
  BUSINESS_ALLOC_TYPE?: string;
  CITY_TIER?: string;
  PRODUCT_CATEGORY_FINAL?: string;
  GEOGRAPHY?: string;
  NO_ACCOUNTS?: number;
  POS_CRS?: number;
  AUM_ON_BOOK?: number;
  AUM_OFF_BOOK?: number;
  WRITE_OFF_AMT?: number;
  STATUS_DATE?: string | Date;
  [key: string]: any;
}

export interface RawSalesRow {
  YEAR?: number;
  MONTH?: number;
  DATE?: number;
  DATESERIES?: string | Date;
  FIN_TYPE?: string;
  BRANCH?: string;
  LEAD_SOURCE?: string;
  PRODUCT_CAMPAIGN?: string;
  DEPT?: string;
  ZONE?: string;
  GEO?: string;
  CLUSTER?: string;
  LOGIN_AMOUNT?: number;
  LOGIN_COUNT?: number;
  DECISION_COUNT?: number;
  SANCTIONED_AMOUNT?: number;
  SANCTION_COUNT?: number;
  SANCTION_YIELD?: number;
  DISB_AMOUNT?: number;
  DISB_COUNT?: number;
  DISB_YIELD?: number;
  FINAL_SANCTIONED_AMOUNT?: number;
  FINAL_SANCTION_COUNT?: number;
  [key: string]: any;
}

export interface ParsedDataset {
  collections: RawCollectionRow[];
  sales: RawSalesRow[];
  sourceFile: string;
  ingestTimestamp: string;
}

/**
 * Convert Excel serial date to ISO string if applicable
 */
export function parseExcelDate(val: any): string | null {
  if (!val) return null;
  if (val instanceof Date) {
    return val.toISOString().split('T')[0];
  }
  if (typeof val === 'number') {
    // Excel base date: 1899-12-30
    const d = new Date(Math.round((val - 25569) * 86400 * 1000));
    return isNaN(d.getTime()) ? String(val) : d.toISOString().split('T')[0];
  }
  return String(val);
}

export function loadWorkbookData(filePath: string): ParsedDataset {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const wb = XLSX.readFile(filePath, { cellDates: true });
  
  const collSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('collection')) || wb.SheetNames[0];
  const salesSheetName = wb.SheetNames.find(s => s.toLowerCase().includes('sales')) || wb.SheetNames[1];

  const collectionsRaw = XLSX.utils.sheet_to_json<RawCollectionRow>(wb.Sheets[collSheetName], { defval: null });
  const salesRaw = XLSX.utils.sheet_to_json<RawSalesRow>(wb.Sheets[salesSheetName], { defval: null });

  return {
    collections: collectionsRaw,
    sales: salesRaw,
    sourceFile: path.basename(filePath),
    ingestTimestamp: new Date().toISOString()
  };
}
