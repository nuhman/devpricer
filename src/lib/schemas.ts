import * as z from "zod";

export const companyFormSchema = z.object({
  companyName: z.string().min(2, "Proposer name must be at least 2 characters"),
  companyAddress: z.string().min(10, "Please provide a complete address"),
  companyEmail: z.string().email("Please provide a valid email address"),
  companyPhone: z
    .string()
    .regex(
      /^\+?(\d{1,3})?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Please provide a valid phone number"
    ),
  businessRegNo: z.string().optional(),
});

export const clientFormSchema = z.object({
  clientName: z.string().min(2, "Client name must be at least 2 characters"),
  clientCompany: z
    .string()
    .min(2, "Client company must be at least 2 characters"),
  clientAddress: z.string().min(10, "Please provide a complete address"),
  projectName: z.string().min(3, "Project name must be at least 3 characters"),
});

export const projectComponentSchema = z.object({
  id: z.string(),
  serviceName: z.string().min(2, "Service name is required"),
  description: z
    .string()
    .min(10, "Please provide a detailed description (min 10 chars)"),
  rate: z.number().min(1, "Rate must be greater than 0").optional(),
  hours: z.number().optional(),
  isFixedPrice: z.boolean(),
  subtotal: z.number().min(0),
});

export const projectComponentsFormSchema = z.object({
  components: z
    .array(projectComponentSchema)
    .min(1, "Add at least one component"),
  currency: z.string(),
});

export type CompanyFormValues = z.infer<typeof companyFormSchema>;
export type ClientFormValues = z.infer<typeof clientFormSchema>;
export type ProjectComponentFormValues = z.infer<
  typeof projectComponentsFormSchema
>;
