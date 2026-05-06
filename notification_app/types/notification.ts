export type NotificationType = "Placement" | "Result" | "Event";

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

export type LogPackage = 
  | "api" 
  | "component" 
  | "hook" 
  | "page" 
  | "state" 
  | "style" 
  | "auth" 
  | "config" 
  | "middleware" 
  | "utils";
