export interface AuditLogType {
  id: string;
  featureName: string;
  previousState: boolean;
  newState: boolean;
  changedBy: string;
  timestamp: string;
}
