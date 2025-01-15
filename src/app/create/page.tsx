"use client";

//app/create/page.tsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProposal } from "@/context/ProposalContext";
import { useRouter } from "next/navigation";
import {
  companyFormSchema,
  clientFormSchema,
  projectComponentsFormSchema,
  CompanyFormValues,
  ClientFormValues,
  ProjectComponentFormValues,
} from "@/lib/schemas";
import { currencies } from "@/lib/data/currencies";
import { mockValues } from "@/lib/data/formMock";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import AlertDialog from "@/app/ui/shared/alertdialog";

import { v4 as uuidv4 } from "uuid";

const steps = [
  "Proposer Details",
  "Client Information",
  "Project Billing Components",
];
const IS_FORM_TEST = false;

export default function CreateProposal() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const {
    proposalData,
    updateCompanyDetails,
    updateClientDetails,
    updateProjectComponents,
    clearProposal,
  } = useProposal();

  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName:
        proposalData.companyName || (IS_FORM_TEST ? mockValues.text : ""),
      companyAddress:
        proposalData.companyAddress || (IS_FORM_TEST ? mockValues.text : ""),
      companyEmail:
        proposalData.companyEmail || (IS_FORM_TEST ? mockValues.email : ""),
      companyPhone:
        proposalData.companyPhone || (IS_FORM_TEST ? mockValues.phone : ""),
      businessRegNo: proposalData.businessRegNo || "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const clientForm = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      clientName:
        proposalData.clientName || (IS_FORM_TEST ? mockValues.text : ""),
      clientCompany:
        proposalData.clientCompany || (IS_FORM_TEST ? mockValues.text : ""),
      clientAddress:
        proposalData.clientAddress || (IS_FORM_TEST ? mockValues.text : ""),
      projectName:
        proposalData.projectName || (IS_FORM_TEST ? mockValues.text : ""),
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const projectComponentsForm = useForm<ProjectComponentFormValues>({
    resolver: zodResolver(projectComponentsFormSchema),
    defaultValues: {
      components: proposalData.components || [],
      currency: proposalData.currency || "USD",
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
        const { components, currency } = projectComponentsForm.getValues();
        if (!components?.length) {
          projectComponentsForm.setError("components", {
            type: "manual",
            message: "Please add at least one billing component",
          });
          return;
        }
        isValid = await projectComponentsForm.trigger();
        console.log("Clicked on Done: ", isValid);
        if (isValid) {
          updateProjectComponents({
            components: components,
            currency: currency,
          });
          setTimeout(() => {
            router.push("/preview");
          }, 0);
        }
        break;
    }
  };

  const addComponent = async () => {
    const currentComponents =
      projectComponentsForm.getValues().components || [];
    const currentCurrency = projectComponentsForm.getValues().currency;

    if (currentComponents.length > 0) {
      const lastComponentIndex = currentComponents.length - 1;
      const isValid = await projectComponentsForm.trigger(
        `components.${lastComponentIndex}`
      );

      if (!isValid) {
        // If the last component isn't valid, don't add a new one
        return;
      }
    }

    const newIndex = currentComponents.length;
    const newComponent = {
      id: uuidv4(),
      serviceName: "",
      description: "",
      rate: undefined,
      hours: undefined,
      isFixedPrice: false,
      subtotal: 0,
    };

    // Update form with new component
    projectComponentsForm.setValue("components", [
      ...currentComponents,
      newComponent,
    ]);

    // Clear any existing errors for the new component
    const errorPaths = [
      `components.${newIndex}`,
      `components.${newIndex}.serviceName`,
      `components.${newIndex}.description`,
      `components.${newIndex}.rate`,
      `components.${newIndex}.hours`,
      `components.${newIndex}.isFixedPrice`,
      `components.${newIndex}.subtotal`,
    ] as const;

    errorPaths.forEach((path) => {
      projectComponentsForm.clearErrors(path);
    });

    // Save to context & localstorage with both components and currency
    updateProjectComponents({
      components: [...currentComponents, newComponent],
      currency: currentCurrency,
    });
  };

  const removeComponent = (index: number) => {
    const currentComponents = projectComponentsForm.getValues().components;
    const currentCurrency = projectComponentsForm.getValues().currency;

    projectComponentsForm.setValue(
      "components",
      currentComponents.filter((_, idx) => idx !== index)
    );

    const errorPaths = [
      `components.${index}`,
      `components.${index}.serviceName`,
      `components.${index}.description`,
      `components.${index}.rate`,
      `components.${index}.hours`,
      `components.${index}.isFixedPrice`,
      `components.${index}.subtotal`,
    ] as const;

    errorPaths.forEach((path) => {
      projectComponentsForm.clearErrors(path);
    });

    // Update context with both components and currency
    updateProjectComponents({
      components: currentComponents.filter((_, idx) => idx !== index),
      currency: currentCurrency,
    });
  };

  const updateSubtotal = (index: number) => {
    const components = projectComponentsForm.getValues().components;
    const component = components[index];
    let newSubtotal = 0;

    if (component.isFixedPrice) {
      // If it's fixed price, use the rate directly
      newSubtotal = component.rate || 0;
    } else {
      // For hourly rate, multiply rate by hours
      const rate = component.rate || 0;
      const hours = component.hours || 0;
      newSubtotal = rate * hours;
    }

    projectComponentsForm.setValue(`components.${index}.subtotal`, newSubtotal);
  };

  const ResetButton = () => {
    const [showDialog, setShowDialog] = useState(false);

    const handleReset = () => {
      // First clear the localStorage and context
      clearProposal();

      // Reset all form states with their initial values
      companyForm.reset({
        companyName: "",
        companyAddress: "",
        companyEmail: "",
        companyPhone: "",
        businessRegNo: "",
      });

      clientForm.reset({
        clientName: "",
        clientCompany: "",
        clientAddress: "",
        projectName: "",
      });

      projectComponentsForm.reset({
        components: [],
        currency: "USD",
      });

      // Reset to first step
      setCurrentStep(0);

      // Close the dialog
      setShowDialog(false);

      // Force a hard reset of all form states
      setTimeout(() => {
        companyForm.clearErrors();
        clientForm.clearErrors();
        projectComponentsForm.clearErrors();
      }, 0);
    };

    return (
      <>
        <Button
          variant="outline"
          className="text-red-500 border-red-200 hover:bg-red-50"
          onClick={() => setShowDialog(true)}
        >
          Reset Form
        </Button>

        <AlertDialog
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={handleReset}
          title="Are you sure?"
          description="This will clear all form data and cannot be undone."
          confirmText="Reset All Data"
          cancelText="Cancel"
          variant="destructive"
        />
      </>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress Steps */}
        <div className="mb-8 space-y-2">
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
                <span className="ml-2 text-sm font-medium hidden sm:inline">
                  {step}
                </span>

                {index < steps.length - 1 && (
                  <div className="w-20 sm:w-24 h-1 mx-2 sm:mx-4 bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: index < currentStep ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Current step text for mobile only */}
          <div className="text-center sm:hidden">
            <span className="text-sm font-medium">{steps[currentStep]}</span>
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
                      <Input {...field} placeholder="John Doe" />
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
                      <Textarea
                        {...field}
                        placeholder="Cipher Labs, MG Road, Kochi"
                      />
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
                    <FormLabel>Client Name or Position</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="CEO" />
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
                      <Input {...field} placeholder="Sunrise Inc." />
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
                      <Textarea {...field} placeholder="MG Road, Kochi" />
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
                      <Input {...field} placeholder="Product Landing Website" />
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
              <div className="mb-8 p-4 rounded-lg bg-muted/50 border-2 border-dashed">
                <FormField
                  control={projectComponentsForm.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Currency</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-black"
                        >
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.code} - {currency.name}{" "}
                              {currency.symbol ? `(${currency.symbol})` : ""}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormDescription>
                        This currency will be used throughout the proposal
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                {projectComponentsForm
                  .watch("components")
                  ?.map((component, index) => (
                    <Card key={component.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold">
                            Billing Component #{index + 1}
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
                                <Input
                                  {...field}
                                  placeholder="Frontend Design & Development"
                                />
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
                                <Textarea
                                  {...field}
                                  placeholder="Mockup designs using Figma & Frontend development using React"
                                />
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
                                      <span className="text-xs absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        {projectComponentsForm.watch(
                                          "currency"
                                        )}
                                      </span>
                                      <Input
                                        type="number"
                                        {...field}
                                        className="pl-11"
                                        placeholder="0.00"
                                        value={field.value || ""}
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
                            Subtotal:{" "}
                            <span className="px-2 text-gray-500">
                              {projectComponentsForm.watch("currency")}
                            </span>
                            {(
                              projectComponentsForm.watch(
                                `components.${index}.subtotal`
                              ) || 0
                            ).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addComponent}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
              >
                Add Billing Component
              </Button>

              {projectComponentsForm.formState.errors.components && (
                <p className="text-destructive text-sm mt-2">
                  {projectComponentsForm.formState.errors.components.message}
                </p>
              )}

              <div className="text-right">
                <p className="text-lg font-bold">
                  Total:{" "}
                  <span className="px-2 text-gray-500">
                    {projectComponentsForm.watch("currency")}
                  </span>
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
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <ResetButton />
          </div>
          <Button
            type="button"
            onClick={handleNext}
            disabled={
              currentStep === 2 &&
              projectComponentsForm.getValues().components.length === 0
            }
          >
            {currentStep === steps.length - 1 ? "Preview" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
