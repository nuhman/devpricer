// app/ui/proposaltemplate.tsx
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ProposalData } from "@/types/Project";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 30,
  },
  proposerInfo: {
    marginBottom: 20,
  },
  clientInfo: {
    marginBottom: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  subheading: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Helvetica-Bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: "Helvetica",
  },
  tableContainer: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#F9FAFB",
    fontFamily: "Helvetica-Bold",
  },
  tableCell: {
    flex: 1,
    padding: 5,
  },
  serviceName: {
    width: "20%",
    padding: 5,
  },
  description: {
    width: "35%",
    padding: 5,
  },
  rate: {
    width: "15%",
    padding: 5,
    textAlign: "right",
  },
  hours: {
    width: "15%",
    padding: 5,
    textAlign: "right",
  },
  subtotal: {
    width: "15%",
    padding: 5,
    textAlign: "right",
  },
  total: {
    marginTop: 20,
    borderTopWidth: 2,
    borderTopColor: "#000",
    paddingTop: 10,
  },
});

interface ProposalTemplateProps {
  data: ProposalData;
}

const ProposalTemplate: React.FC<ProposalTemplateProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Project Proposal</Text>
        <Text style={styles.text}>{new Date().toLocaleDateString()}</Text>
      </View>

      {/* Proposer Information */}
      <View style={styles.proposerInfo}>
        <Text style={styles.subheading}>From:</Text>
        <Text style={styles.text}>{data.companyName}</Text>
        <Text style={styles.text}>{data.companyAddress}</Text>
        <Text style={styles.text}>{data.companyEmail}</Text>
        <Text style={styles.text}>{data.companyPhone}</Text>
        {data.businessRegNo && (
          <Text style={styles.text}>Reg No: {data.businessRegNo}</Text>
        )}
      </View>

      {/* Client Information */}
      <View style={styles.clientInfo}>
        <Text style={styles.subheading}>To:</Text>
        <Text style={styles.text}>{data.clientName}</Text>
        <Text style={styles.text}>{data.clientCompany}</Text>
        <Text style={styles.text}>{data.clientAddress}</Text>
      </View>

      {/* Project Details */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Project: {data.projectName}</Text>
      </View>

      {/* Components Table */}
      <View style={styles.section}>
        <Text style={styles.subheading}>Project Components</Text>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.serviceName}>
              <Text>Service</Text>
            </View>
            <View style={styles.description}>
              <Text>Description</Text>
            </View>
            <View style={styles.rate}>
              <Text>Rate</Text>
            </View>
            <View style={styles.hours}>
              <Text>Hours</Text>
            </View>
            <View style={styles.subtotal}>
              <Text>Subtotal</Text>
            </View>
          </View>

          {/* Table Rows */}
          {data.components.map((component) => (
            <View key={component.id} style={styles.tableRow}>
              <View style={styles.serviceName}>
                <Text style={styles.text}>{component.serviceName}</Text>
              </View>
              <View style={styles.description}>
                <Text style={styles.text}>{component.description}</Text>
              </View>
              <View style={styles.rate}>
                <Text style={styles.text}>
                  {component.isFixedPrice
                    ? "Fixed"
                    : `${data.currency} ${component.rate}`}
                </Text>
              </View>
              <View style={styles.hours}>
                <Text style={styles.text}>
                  {component.isFixedPrice ? "-" : component.hours}
                </Text>
              </View>
              <View style={styles.subtotal}>
                <Text style={styles.text}>
                  {data.currency} {component.subtotal.toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          {/* Total */}
          <View style={[styles.tableRow, styles.total]}>
            <View style={styles.serviceName}>
              <Text style={styles.subheading}>Total</Text>
            </View>
            <View style={styles.description}>
              <Text></Text>
            </View>
            <View style={styles.rate}>
              <Text></Text>
            </View>
            <View style={styles.hours}>
              <Text></Text>
            </View>
            <View style={styles.subtotal}>
              <Text style={styles.subheading}>
                {data.currency}{" "}
                {data.components
                  .reduce((sum, component) => sum + component.subtotal, 0)
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProposalTemplate;
