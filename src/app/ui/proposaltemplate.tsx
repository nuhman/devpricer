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

// Register custom fonts - using Roboto as an example
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
    padding: 30,
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#333333",
  },
  headerContainer: {
    marginBottom: 20,
    borderBottom: "2px solid #2563eb",
    paddingBottom: 10,
  },
  proposalTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#2563eb",
    marginBottom: 10,
  },
  proposalDate: {
    fontSize: 14,
    color: "#64748b",
  },
  infoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBlock: {
    width: "45%",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#2563eb",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  infoText: {
    fontSize: 12,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  projectSection: {
    marginBottom: 30,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 4,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: "#1e293b",
    marginBottom: 10,
    textAlign: "center",
    textTransform: "capitalize",
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: 10,
    fontSize: 12,
    fontWeight: 500,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#e2e8f0",
    borderBottomWidth: 1,
    padding: 10,
    minHeight: 40,
    alignItems: "center",
  },
  tableRowEven: {
    backgroundColor: "#f8fafc",
  },
  col1: { width: "25%", textAlign: "left" },
  col2: { width: "35%", textAlign: "left" },
  col3: { width: "15%", textAlign: "right" },
  col4: { width: "10%", textAlign: "right",},
  col5: { width: "15%", textAlign: "right" },
  totalSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: "#2563eb",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: "#1e293b",
    marginRight: 20,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 700,
    color: "#2563eb",
    marginLeft: "4px",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: "center",
    color: "#64748b",
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 20,
  },
});

interface ProposalTemplateProps {
  data: ProposalData;
}

const ProposalTemplate: React.FC<ProposalTemplateProps> = ({ data }) => {
  const totalAmount = data.components.reduce(
    (sum, component) => sum + component.subtotal,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.proposalTitle}>
            Proposal - {data.projectName}
          </Text>
          <Text style={styles.proposalDate}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        {/* Company and Client Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>From</Text>
            <Text style={[styles.infoText, { fontWeight: 500 }]}>
              {data.companyName}
            </Text>
            <Text style={styles.infoText}>{data.companyAddress}</Text>
            <Text style={styles.infoText}>{data.companyEmail}</Text>
            <Text style={styles.infoText}>{data.companyPhone}</Text>
            {data.businessRegNo && (
              <Text style={styles.infoText}>Reg No: {data.businessRegNo}</Text>
            )}
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>To</Text>
            <Text style={[styles.infoText, { fontWeight: 500 }]}>
              {data.clientName}
            </Text>
            <Text style={styles.infoText}>{data.clientCompany}</Text>
            <Text style={styles.infoText}>{data.clientAddress}</Text>
          </View>
        </View>

        {/* Components Table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.col1}>Service</Text>
            <Text style={styles.col2}>Description</Text>
            <Text style={styles.col3}>Rate</Text>
            <Text style={styles.col4}>Hours</Text>
            <Text style={styles.col5}>Amount</Text>
          </View>

          {data.components.map((component, index) => (
            <View
              key={component.id}
              style={[
                styles.tableRow,
                index % 2 === 1
                  ? styles.tableRowEven
                  : {
                      backgroundColor: "#fff",
                    },
              ]}
            >
              <Text style={styles.col1}>{component.serviceName}</Text>
              <Text style={styles.col2}>{component.description}</Text>
              <Text style={styles.col3}>
                {component.isFixedPrice ? (
                  "Fixed"
                ) : (
                  <Text> {component.rate?.toFixed(2)}</Text>
                )}
              </Text>
              <Text style={styles.col4}>
                {component.isFixedPrice ? "-" : component.hours}
              </Text>
              <Text style={styles.col5}>{component.subtotal.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={{ fontSize: 14 }}>{data.currency}</Text>
            <Text style={styles.totalAmount}>{totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          This proposal is valid for 30 days from the date of issue.
        </Text>
      </Page>
    </Document>
  );
};

export default ProposalTemplate;
