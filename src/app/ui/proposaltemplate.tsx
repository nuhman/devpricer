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
  family: "Roboto",
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
    padding: 40,
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    paddingBottom: 20,
    borderBottom: "2px solid #f0f0f0",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    textAlign: "right",
  },
  proposalTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#000000",
    marginBottom: 8,
  },
  proposalSubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 4,
  },
  proposalDate: {
    fontSize: 12,
    color: "#888888",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    gap: 40,
  },
  infoBlock: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 500,
    color: "#666666",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 11,
    marginBottom: 6,
    lineHeight: 1.4,
  },
  infoTextBold: {
    fontSize: 13,
    fontWeight: 500,
    color: "#000000",
    marginBottom: 8,
  },
  tableContainer: {
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f9fafb",
    borderRadius: 6,
    padding: "12px 16px",
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 11,
    fontWeight: 500,
    color: "#666666",
  },
  tableRow: {
    flexDirection: "row",
    padding: "12px 16px",
    borderBottom: "1px solid #f0f0f0",
    minHeight: 50,
    alignItems: "center",
  },
  tableRowHighlight: {
    backgroundColor: "#fafafa",
  },
  tableRowNonHighlight: {
    backgroundColor: "#fff",
  },
  col1: { width: "25%", paddingRight: 10 },
  col2: { width: "35%", paddingRight: 10 },
  col3: { width: "15%", textAlign: "right" },
  col4: { width: "10%", textAlign: "right" },
  col5: { width: "15%", textAlign: "right" },
  serviceName: {
    fontSize: 12,
    fontWeight: 500,
    color: "#000000",
  },
  serviceDescription: {
    fontSize: 11,
    color: "#666666",
    lineHeight: 1.4,
  },
  totalSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: "2px solid #f0f0f0",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#666666",
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 700,
    color: "#000000",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: "center",
    color: "#888888",
    fontSize: 10,
    paddingTop: 20,
    borderTop: "1px solid #f0f0f0",
  },
  badge: {
    backgroundColor: "#e5e7eb",
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: 10,
    color: "#666666",
  },
});

const ProposalTemplate: React.FC<{ data: Partial<ProposalData> }> = ({
  data,
}) => {
  const totalAmount = data?.components?.reduce(
    (sum, component) => sum + component.subtotal,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.proposalTitle}>{data.projectName}</Text>
            <Text style={styles.proposalSubtitle}>Project Proposal</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.badge}>
              <Text>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Company and Client Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>From</Text>
            <Text style={styles.infoTextBold}>{data.companyName}</Text>
            <Text style={styles.infoText}>{data.companyAddress}</Text>
            <Text style={styles.infoText}>{data.companyEmail}</Text>
            <Text style={styles.infoText}>{data.companyPhone}</Text>
            {data.businessRegNo && (
              <Text style={styles.infoText}>Reg No: {data.businessRegNo}</Text>
            )}
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>To</Text>
            <Text style={styles.infoTextBold}>{data.clientName}</Text>
            <Text style={styles.infoText}>{data.clientCompany}</Text>
            <Text style={styles.infoText}>{data.clientAddress}</Text>
          </View>
        </View>

        {/* Services Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.col1]}>Service</Text>
            <Text style={[styles.tableHeaderText, styles.col2]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderText, styles.col3]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.col4]}>Hours</Text>
            <Text style={[styles.tableHeaderText, styles.col5]}>Amount</Text>
          </View>

          {data.components?.map((component, index) => (
            <View
              key={component.id}
              style={[
                styles.tableRow,
                index % 2 === 1
                  ? styles.tableRowHighlight
                  : styles.tableRowNonHighlight,
              ]}
            >
              <View style={styles.col1}>
                <Text style={styles.serviceName}>{component.serviceName}</Text>
              </View>
              <Text style={[styles.serviceDescription, styles.col2]}>
                {component.description}
              </Text>
              <Text style={styles.col3}>
                {component.isFixedPrice
                  ? "Fixed"
                  : `${data.currency} ${component.rate?.toFixed(2)}`}
              </Text>
              <Text style={styles.col4}>
                {component.isFixedPrice ? "-" : component.hours}
              </Text>
              <Text style={styles.col5}>
                {data.currency} {component.subtotal.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>
              {data.currency} {totalAmount?.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This proposal is valid for 30 days from the date of issue. Terms and
          conditions apply.
        </Text>
      </Page>
    </Document>
  );
};

export default ProposalTemplate;
