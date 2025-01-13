"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProposal } from "@/context/ProposalContext";
import {
  companyFormSchema,
  clientFormSchema,
  projectComponentsFormSchema,
  CompanyFormValues,
  ClientFormValues,
  ProjectComponentFormValues,
} from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
//import { ProjectComponent } from "@/types/Project";
import { v4 as uuidv4 } from "uuid";

const steps = ["Proposer Details", "Client Information", "Project Components"];

export default function CreateProposal() {
  const [currentStep, setCurrentStep] = useState(0);
  const {
    proposalData,
    updateCompanyDetails,
    updateClientDetails,
    updateProjectComponents,
  } = useProposal();

  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: proposalData.companyName || "",
      companyAddress: proposalData.companyAddress || "",
      companyEmail: proposalData.companyEmail || "",
      companyPhone: proposalData.companyPhone || "",
      businessRegNo: proposalData.businessRegNo || "",
    },
  });

  const clientForm = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientName: proposalData.clientName || "",
      clientCompany: proposalData.clientCompany || "",
      clientAddress: proposalData.clientAddress || "",
      projectName: proposalData.projectName || "",
    },
  });

  const projectComponentsForm = useForm<ProjectComponentFormValues>({
    resolver: zodResolver(projectComponentsFormSchema),
    defaultValues: {
      components: proposalData.components || [],
    },
  });

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 0:
        isValid = await companyForm.trigger();
        if (isValid) {
          updateCompanyDetails(companyForm.getValues());
          setCurrentStep(1);
        }
        break;
      case 1:
        isValid = await clientForm.trigger();
        if (isValid) {
          updateClientDetails(clientForm.getValues());
          setCurrentStep(2);
        }
        break;
      case 2:
        isValid = await projectComponentsForm.trigger();
        if (isValid) {
          updateProjectComponents(projectComponentsForm.getValues().components);
          // Handle form completion
        }
        break;
    }
  };

  const addComponent = () => {
    const currentComponents =
      projectComponentsForm.getValues().components || [];
    projectComponentsForm.setValue("components", [
      ...currentComponents,
      {
        id: uuidv4(),
        serviceName: "",
        description: "",
        rate: 0,
        isFixedPrice: false,
        subtotal: 0,
      },
    ]);
  };

  const removeComponent = (index: number) => {
    const currentComponents = projectComponentsForm.getValues().components;
    projectComponentsForm.setValue(
      "components",
      currentComponents.filter((_, idx) => idx !== index)
    );
  };

  const updateSubtotal = (index: number) => {
    const components = projectComponentsForm.getValues().components;
    const component = components[index];

    if (component.isFixedPrice) {
      component.subtotal = component.rate;
    } else {
      component.subtotal = (component.rate || 0) * (component.hours || 0);
    }

    projectComponentsForm.setValue(`components.${index}`, component);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${
                    index <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                `}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium">{step}</span>
                {index < steps.length - 1 && (
                  <div className="w-24 h-1 mx-4 bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: index < currentStep ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Proposer Details Step */}
        {currentStep === 0 && (
          <Form {...companyForm}>
            <form className="space-y-4">
              <FormField
                control={companyForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={companyForm.control}
                name="companyAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proposer Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={companyForm.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={companyForm.control}
                  name="companyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        )}

        {/* Client Information Step */}
        {currentStep === 1 && (
          <Form {...clientForm}>
            <form className="space-y-4">
              <FormField
                control={clientForm.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={clientForm.control}
                name="clientCompany"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Company</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={clientForm.control}
                name="clientAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={clientForm.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}

        {/* Project Components Step */}
        {currentStep === 2 && (
          <Form {...projectComponentsForm}>
            <form className="space-y-6">
              {projectComponentsForm
                .watch("components")
                ?.map((component, index) => (
                  <Card key={component.id} className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">
                          Component #{index + 1}
                        </h4>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeComponent(index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <FormField
                        control={projectComponentsForm.control}
                        name={`components.${index}.serviceName`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectComponentsForm.control}
                        name={`components.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-center space-x-4">
                        <FormField
                          control={projectComponentsForm.control}
                          name={`components.${index}.isFixedPrice`}
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    updateSubtotal(index);
                                  }}
                                />
                              </FormControl>
                              <FormLabel>Fixed Price</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={projectComponentsForm.control}
                          name={`components.${index}.rate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {projectComponentsForm.watch(
                                  `components.${index}.isFixedPrice`
                                )
                                  ? "Fixed Price"
                                  : "Hourly Rate"}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(parseFloat(e.target.value));
                                    updateSubtotal(index);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {!projectComponentsForm.watch(
                          `components.${index}.isFixedPrice`
                        ) && (
                          <FormField
                            control={projectComponentsForm.control}
                            name={`components.${index}.hours`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Hours</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                      field.onChange(
                                        parseFloat(e.target.value)
                                      );
                                      updateSubtotal(index);
                                    }}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          Subtotal: $
                          {projectComponentsForm
                            .watch(`components.${index}.subtotal`)
                            .toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}

              <Button
                type="button"
                variant="outline"
                onClick={addComponent}
                className="w-full"
              >
                Add Component
              </Button>

              <div className="text-right">
                <p className="text-lg font-bold">
                  Total: $
                  {projectComponentsForm
                    .watch("components")
                    ?.reduce(
                      (sum, component) => sum + (component.subtotal || 0),
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </form>
          </Form>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button type="button" onClick={handleNext}>
            {currentStep === steps.length - 1 ? "Generate PDF" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
