"use client";

import { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useProposal } from "@/context/ProposalContext";
import { useRouter } from "next/navigation";
import ProposalTemplate from "@/app/ui/proposaltemplate";
import { Button } from "@/components/ui/button";
import { ProposalData } from "@/types/Project";

export default function PreviewPage() {
  const router = useRouter();
  const { proposalData } = useProposal();
  const [isClient, setIsClient] = useState(false);

  const isCompleteProposal = (
    data: Partial<ProposalData>
  ): data is ProposalData => {
    console.log("Validation checks:", {
      companyName: !!data.companyName,
      companyAddress: !!data.companyAddress,
      companyEmail: !!data.companyEmail,
      companyPhone: !!data.companyPhone,
      clientName: !!data.clientName,
      clientCompany: !!data.clientCompany,
      clientAddress: !!data.clientAddress,
      projectName: !!data.projectName,
      currency: !!data.currency,
      components: !!data.components,
    });

    return !!(
      data.companyName &&
      data.companyAddress &&
      data.companyEmail &&
      data.companyPhone &&
      data.clientName &&
      data.clientCompany &&
      data.clientAddress &&
      data.projectName &&
      data.currency &&
      data.components
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      console.log("Full proposal data:", proposalData);

      if (!proposalData.companyName) {
        console.log("Redirecting: Missing company name");
        router.push("/create");
      } else if (!proposalData.components?.length) {
        console.log("Redirecting: No components");
        router.push("/create");
      } else if (!isCompleteProposal(proposalData)) {
        console.log("Redirecting: Failed complete proposal check");
        router.push("/create");
      } else {
        console.log("Proposal data is complete!");
      }
    }
  }, [isClient, proposalData, router]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isCompleteProposal(proposalData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Preview Proposal</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push("/create")}>
            Edit Proposal
          </Button>
          {isClient && (
            <div>
              <PDFDownloadLink
                document={<ProposalTemplate data={proposalData} />}
                fileName={`${proposalData.projectName.replace(
                  /\s+/g,
                  "-"
                )}-proposal.pdf`}
                style={{ textDecoration: "none" }}
              >
                {/* @ts-expect-error - Known issue with react-pdf types */}
                {({ loading }) => (
                  <Button disabled={loading}>
                    {loading ? "Preparing..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[calc(100vh-12rem)] border border-gray-200 rounded-lg overflow-hidden">
        {isClient && (
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <ProposalTemplate data={proposalData} />
          </PDFViewer>
        )}
      </div>
    </div>
  );
}
