"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProposalData, ProjectComponent } from "@/types/Project";

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
  const [proposalData, setProposalData] = useState<Partial<ProposalData>>({
    components: [],
  });

  const updateCompanyDetails = (data: Partial<ProposalData>) => {
    setProposalData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateClientDetails = (data: Partial<ProposalData>) => {
    setProposalData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const updateProjectComponents = (components: ProjectComponent[]) => {
    setProposalData((prev) => ({
      ...prev,
      components,
    }));
  };

  const clearProposal = () => {
    setProposalData({ components: [] });
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
