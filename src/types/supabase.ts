export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      photos: {
        Row: {
          id: string;
          url: string;
          userId: string;
          uploadDate: string;
          eventId: string | null;
          tags: string[] | null;
        };
        Insert: {
          id?: string;
          url: string;
          userId: string;
          uploadDate: string;
          eventId?: string | null;
          tags?: string[] | null;
        };
        Update: {
          id?: string;
          url?: string;
          userId?: string;
          uploadDate?: string;
          eventId?: string | null;
          tags?: string[] | null;
        };
      };
      events: {
        Row: {
          id: string;
          name: string;
          date: string;
          schoolId: string;
        };
        Insert: {
          id?: string;
          name: string;
          date: string;
          schoolId: string;
        };
        Update: {
          id?: string;
          name?: string;
          date?: string;
          schoolId?: string;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          schoolId: string;
          qrCode: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          schoolId: string;
          qrCode?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          schoolId?: string;
          qrCode?: string | null;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}
