"use client";

import { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { useProposal } from "@/context/ProposalContext";
import { useRouter } from "next/navigation";
import ProposalTemplate from "@/app/ui/proposaltemplate";
import { Button } from "@/components/ui/button";
import { ProposalData } from "@/types/Project";
import { Card, CardContent } from "@/components/ui/card";

export default function PreviewPage() {
  const router = useRouter();
  const { proposalData } = useProposal();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isCompleteProposal = (
    data: Partial<ProposalData>
  ): data is ProposalData => {
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
    if (isClient && !isCompleteProposal(proposalData)) {
      router.push("/create");
    }
  }, [isClient, proposalData, router]);

  if (!isClient || !isCompleteProposal(proposalData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const MobilePreview = () => (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Company Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">From</h3>
            <p>{proposalData.companyName}</p>
            <p className="text-sm text-muted-foreground">
              {proposalData.companyAddress}
            </p>
          </div>

          {/* Client Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">To</h3>
            <p>{proposalData.clientName}</p>
            <p>{proposalData.clientCompany}</p>
            <p className="text-sm text-muted-foreground">
              {proposalData.clientAddress}
            </p>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Project</h3>
            <p>{proposalData.projectName}</p>
          </div>

          {/* Components Summary */}
          <div className="space-y-2">
            <h3 className="font-semibold">Components</h3>
            <div className="space-y-4">
              {proposalData.components.map((component, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">{component.serviceName}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {component.description}
                  </p>
                  <p className="text-right mt-2">
                    {proposalData.currency} {component.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t">
            <p className="text-right font-semibold">
              Total: {proposalData.currency}{" "}
              {proposalData.components
                .reduce((sum, component) => sum + (component.subtotal || 0), 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row gap-4 md:gap-0">
        <h1 className="text-2xl font-bold">Preview Proposal</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => router.push("/create")}>
            Edit Proposal
          </Button>
          {isClient && (
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
          )}
        </div>
      </div>

      {isMobile ? (
        // Mobile preview
        <MobilePreview />
      ) : (
        // Desktop PDF viewer
        <div className="w-full h-[calc(100vh-12rem)] border border-gray-200 rounded-lg overflow-hidden">
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <ProposalTemplate data={proposalData} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
}
