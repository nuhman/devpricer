export interface ProjectComponent {
  id: string;
  serviceName: string;
  description: string;
  rate: number;
  hours?: number;
  isFixedPrice: boolean;
  subtotal: number;
}

export interface ProposalData {
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  businessRegNo?: string;
  clientName: string;
  clientCompany: string;
  clientAddress: string;
  projectName: string;
  components: ProjectComponent[];
}
