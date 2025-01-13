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
      companyName: proposalData.companyName || "companyName",
      companyAddress:
        proposalData.companyAddress ||
        "companyNamecompanyNamecompanyNamecompanyNamecompanyName",
      companyEmail:
        proposalData.companyEmail || "companyName@companyName.companyName",
      companyPhone: proposalData.companyPhone || "123435345345345",
      businessRegNo: proposalData.businessRegNo || "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const clientForm = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientName: proposalData.clientName || "companyName",
      clientCompany: proposalData.clientCompany || "companyName",
      clientAddress:
        proposalData.clientAddress ||
        "companyNamecompanyNamecompanyNamecompanyNamecompanyNamecompanyName",
      projectName:
        proposalData.projectName ||
        "companyNamecompanyNamecompanyNamecompanyNamecompanyName",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const projectComponentsForm = useForm<ProjectComponentFormValues>({
    resolver: zodResolver(projectComponentsFormSchema),
    defaultValues: {
      components: proposalData.components || [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
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
        const components = projectComponentsForm.getValues().components;
        if (!components?.length) {
          projectComponentsForm.setError("components", {
            type: "manual",
            message: "Please add at least one project component",
          });
          return;
        }
        isValid = await projectComponentsForm.trigger();
        console.log("Clicked on Done: ", isValid);
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

                      <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                          <FormField
                            control={projectComponentsForm.control}
                            name={`components.${index}.isFixedPrice`}
                            render={({ field }) => (
                              <FormItem>
                                <div className="space-y-2">
                                  <FormLabel>Pricing Type</FormLabel>
                                  <div className="flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs">
                                        Hourly Rate
                                      </span>
                                      <Switch
                                        checked={field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(checked);
                                          // Reset values when switching
                                          if (checked) {
                                            projectComponentsForm.setValue(
                                              `components.${index}.hours`,
                                              undefined
                                            );
                                          }
                                          updateSubtotal(index);
                                        }}
                                      />
                                      <span className="text-xs">
                                        Fixed Price
                                      </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {field.value
                                        ? "Set a single fixed price for the entire service"
                                        : "Calculate total based on hourly rate × number of hours"}
                                    </p>
                                  </div>
                                </div>
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
                                  <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                      $
                                    </span>
                                    <Input
                                      type="number"
                                      {...field}
                                      className="pl-7"
                                      placeholder="0.00"
                                      value={field.value || ""} // This removes the default 0
                                      onChange={(e) => {
                                        const value = e.target.value
                                          ? parseFloat(e.target.value)
                                          : undefined;
                                        field.onChange(value);
                                        updateSubtotal(index);
                                      }}
                                    />
                                  </div>
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
                                      placeholder="0"
                                      value={field.value || ""} // This removes the default 0
                                      onChange={(e) => {
                                        const value = e.target.value
                                          ? parseFloat(e.target.value)
                                          : undefined;
                                        field.onChange(value);
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

              {projectComponentsForm.formState.errors.components && (
                <p className="text-destructive text-sm mt-2">
                  {projectComponentsForm.formState.errors.components.message}
                </p>
              )}

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
