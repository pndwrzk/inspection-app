"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface UploadContextType {
  uploads: string[];
  addUpload: (upload: string) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploads, setUploads] = useState<string[]>([]);

  const addUpload = (upload: string) => {
    setUploads([...uploads, upload]);
  };

  const value = useMemo(() => ({ uploads, addUpload }), [uploads]);

  return (
    <UploadContext.Provider value={value}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) throw new Error("useUpload must be used within UploadProvider");
  return context;
}
