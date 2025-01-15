import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ProposalData } from "@/types/Project";

// Register Inter font for a more modern look
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: "Inter",
    fontSize: 12,
    color: "#1a1a1a",
  },
  header: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 40,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#9ca3af",
  },
  content: {
    padding: "0 40px",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 60,
    marginBottom: 40,
  },
  infoBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#6b7280",
    marginBottom: 8,
  },
  infoContent: {
    fontSize: 14,
    lineHeight: 1.6,
  },
  servicesSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 20,
    paddingBottom: 8,
    borderBottom: "1px solid #e5e7eb",
  },
  serviceItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 12,
    color: "#4b5563",
    marginBottom: 12,
  },
  serviceDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 12,
    marginTop: 12,
  },
  totalSection: {
    marginTop: 40,
    padding: 30,
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: "#9ca3af",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 700,
    marginTop: 4,
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    paddingTop: 20,
    borderTop: "1px solid #e5e7eb",
  },
});

const ModernProposalTemplate = ({ data }: { data: Partial<ProposalData> }) => {
  const totalAmount = data.components?.reduce(
    (sum, component) => sum + component.subtotal,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{data.projectName}</Text>
          <Text style={styles.headerSubtitle}>Project Proposal</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.infoGrid}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>From</Text>
              <Text style={styles.infoContent}>
                {data.companyName}
                {"\n"}
                {data.companyAddress}
                {"\n"}
                {data.companyEmail}
                {"\n"}
                {data.companyPhone}
              </Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>For</Text>
              <Text style={styles.infoContent}>
                {data.clientName}
                {"\n"}
                {data.clientCompany}
                {"\n"}
                {data.clientAddress}
              </Text>
            </View>
          </View>

          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Project Components</Text>
            {data.components?.map((component, index) => (
              <View key={index} style={styles.serviceItem}>
                <Text style={styles.serviceName}>{component.serviceName}</Text>
                <Text style={styles.serviceDesc}>{component.description}</Text>
                <View style={styles.serviceDetails}>
                  <Text>
                    {component.isFixedPrice
                      ? "Fixed Price"
                      : `${component.hours} hours @ ${data.currency}${component.rate}/hr`}
                  </Text>
                  <Text>
                    {data.currency} {component.subtotal.toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Total Investment</Text>
            <Text style={styles.totalAmount}>
              {data.currency} {totalAmount?.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          This proposal is valid for 30 days from{" "}
          {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
};

export default ModernProposalTemplate;
