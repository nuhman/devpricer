"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ProposalData, ProjectComponent } from "@/types/Project";

const STORAGE_KEY = "proposal_data";

interface ProposalContextType {
  proposalData: Partial<ProposalData>;
  updateCompanyDetails: (data: Partial<ProposalData>) => void;
  updateClientDetails: (data: Partial<ProposalData>) => void;
  updateProjectComponents: (components: ProjectComponent[]) => void;
  clearProposal: () => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(
  undefined
);

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [proposalData, setProposalData] = useState<Partial<ProposalData>>(
    () => {
      // Initialize state from localStorage if available
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          try {
            return JSON.parse(saved);
          } catch (e) {
            console.error("Error parsing stored proposal data:", e);
          }
        }
      }
      return { components: [] };
    }
  );

  // Save to localStorage whenever proposalData changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(proposalData));
    }
  }, [proposalData]);

  const updateCompanyDetails = (data: Partial<ProposalData>) => {
    setProposalData((prev) => {
      const updated = {
        ...prev,
        ...data,
      };
      return updated;
    });
  };

  const updateClientDetails = (data: Partial<ProposalData>) => {
    setProposalData((prev) => {
      const updated = {
        ...prev,
        ...data,
      };
      return updated;
    });
  };

  const updateProjectComponents = (components: ProjectComponent[]) => {
    setProposalData((prev) => {
      const updated = {
        ...prev,
        components,
      };
      return updated;
    });
  };

  const clearProposal = () => {
    // Clear all data by setting to initial state
    const initialState = { components: [] };
    setProposalData(initialState);
    // Ensure localStorage is completely cleared
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      // Double-check to ensure it's cleared
      localStorage.clear();
    }
  };

  return (
    <ProposalContext.Provider
      value={{
        proposalData,
        updateCompanyDetails,
        updateClientDetails,
        updateProjectComponents,
        clearProposal,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposal() {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error("useProposal must be used within a ProposalProvider");
  }
  return context;
}
