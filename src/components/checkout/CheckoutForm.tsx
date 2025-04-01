import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CreditCard, Truck, Home, MapPin, CheckCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  deliveryMethod: z.enum(["school", "home"]),
  schoolName: z.string().optional().or(z.literal("")),
  studentName: z.string().optional().or(z.literal("")),
  studentClass: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  zipCode: z.string().optional().or(z.literal("")),
  paymentMethod: z.enum(["credit", "debit", "pix", "boleto"]),
  cardNumber: z.string().optional().or(z.literal("")),
  cardName: z.string().optional().or(z.literal("")),
  cardExpiry: z.string().optional().or(z.literal("")),
  cardCvc: z.string().optional().or(z.literal("")),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

const CheckoutForm = () => {
  const [step, setStep] = useState<"delivery" | "payment" | "confirmation">(
    "delivery",
  );
  const [orderComplete, setOrderComplete] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      deliveryMethod: "school",
      schoolName: "",
      studentName: "",
      studentClass: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: "credit",
      cardNumber: "",
      cardName: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const deliveryMethod = form.watch("deliveryMethod");
  const paymentMethod = form.watch("paymentMethod");

  const onSubmit = (data: CheckoutFormValues) => {
    if (step === "delivery") {
      setStep("payment");
    } else if (step === "payment") {
      setStep("confirmation");
    } else {
      // Process the order
      console.log("Order submitted:", data);
      setOrderComplete(true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      {orderComplete ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Order Confirmed!
            </CardTitle>
            <CardDescription className="text-center">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
            <p className="text-lg">Order #12345</p>
            <p className="text-sm text-muted-foreground mt-2">
              You will receive an email confirmation shortly.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => (window.location.href = "/")}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {step === "delivery" && "Delivery Information"}
              {step === "payment" && "Payment Information"}
              {step === "confirmation" && "Order Confirmation"}
            </CardTitle>
            <CardDescription>
              {step === "delivery" &&
                "Choose how you want to receive your products"}
              {step === "payment" && "Select your preferred payment method"}
              {step === "confirmation" &&
                "Review your order details before confirming"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {step === "delivery" && (
                  <>
                    <FormField
                      control={form.control}
                      name="deliveryMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Delivery Method</FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="school" id="school" />
                              <label
                                htmlFor="school"
                                className="flex items-center cursor-pointer"
                              >
                                <Home className="mr-2 h-5 w-5" />
                                <div>
                                  <p className="font-medium">School Pickup</p>
                                  <p className="text-sm text-muted-foreground">
                                    Collect your order at the school
                                  </p>
                                </div>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="home" id="home" />
                              <label
                                htmlFor="home"
                                className="flex items-center cursor-pointer"
                              >
                                <Truck className="mr-2 h-5 w-5" />
                                <div>
                                  <p className="font-medium">Home Delivery</p>
                                  <p className="text-sm text-muted-foreground">
                                    Delivered to your address
                                  </p>
                                </div>
                              </label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {deliveryMethod === "school" ? (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="schoolName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>School Name</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a school" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="school1">
                                      Escola Municipal João da Silva
                                    </SelectItem>
                                    <SelectItem value="school2">
                                      Colégio Estadual Maria Santos
                                    </SelectItem>
                                    <SelectItem value="school3">
                                      Instituto Educacional Futuro
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="studentName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Student Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter student's full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="studentClass"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Class/Grade</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. 5th Grade - Room B"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Street address"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="SP">
                                        São Paulo
                                      </SelectItem>
                                      <SelectItem value="RJ">
                                        Rio de Janeiro
                                      </SelectItem>
                                      <SelectItem value="MG">
                                        Minas Gerais
                                      </SelectItem>
                                      <SelectItem value="BA">Bahia</SelectItem>
                                      <SelectItem value="RS">
                                        Rio Grande do Sul
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="ZIP Code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </>
                )}

                {step === "payment" && (
                  <>
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Payment Method</FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-3"
                          >
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="credit" id="credit" />
                              <label
                                htmlFor="credit"
                                className="flex items-center cursor-pointer"
                              >
                                <CreditCard className="mr-2 h-5 w-5" />
                                <div>
                                  <p className="font-medium">Credit Card</p>
                                  <p className="text-sm text-muted-foreground">
                                    Pay with Visa, Mastercard, etc.
                                  </p>
                                </div>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="debit" id="debit" />
                              <label
                                htmlFor="debit"
                                className="flex items-center cursor-pointer"
                              >
                                <CreditCard className="mr-2 h-5 w-5" />
                                <div>
                                  <p className="font-medium">Debit Card</p>
                                  <p className="text-sm text-muted-foreground">
                                    Direct payment from your bank account
                                  </p>
                                </div>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="pix" id="pix" />
                              <label
                                htmlFor="pix"
                                className="flex items-center cursor-pointer"
                              >
                                <MapPin className="mr-2 h-5 w-5" />
                                <div>
                                  <p className="font-medium">PIX</p>
                                  <p className="text-sm text-muted-foreground">
                                    Instant payment method
                                  </p>
                                </div>
                              </label>
                            </div>
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                              <RadioGroupItem value="boleto" id="boleto" />
                              <label
                                htmlFor="boleto"
                                className="flex items-center cursor-pointer"
                              >
                                <MapPin className="mr-2 h-5 w-5" />
                                <div>
                                  <p className="font-medium">Boleto</p>
                                  <p className="text-sm text-muted-foreground">
                                    Pay with a bank slip
                                  </p>
                                </div>
                              </label>
                            </div>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {(paymentMethod === "credit" ||
                      paymentMethod === "debit") && (
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Card Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name on Card</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardExpiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/YY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardCvc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "pix" && (
                      <div className="border p-4 rounded-md flex flex-col items-center">
                        <div className="bg-gray-200 w-48 h-48 flex items-center justify-center mb-4">
                          <p className="text-sm text-center">
                            PIX QR Code will be generated here
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          Scan the QR code with your banking app to complete the
                          payment
                        </p>
                      </div>
                    )}

                    {paymentMethod === "boleto" && (
                      <div className="border p-4 rounded-md">
                        <p className="text-sm text-muted-foreground mb-4">
                          A bank slip (boleto) will be generated after you
                          confirm your order. You can pay it at any bank,
                          lottery house, or through your banking app.
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <p className="font-mono text-xs">
                            12345.67890 12345.678901 12345.678901 1
                            12345678901234
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {step === "confirmation" && (
                  <div className="space-y-6">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Photo Calendar</span>
                          <span>R$ 59,90</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Photo Mug</span>
                          <span>R$ 39,90</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Photo Frame (3 pack)</span>
                          <span>R$ 89,90</span>
                        </div>
                        {deliveryMethod === "home" && (
                          <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>R$ 15,00</span>
                          </div>
                        )}
                        <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                          <span>Total</span>
                          <span>
                            {deliveryMethod === "home"
                              ? "R$ 204,70"
                              : "R$ 189,70"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Delivery Information</h3>
                      {deliveryMethod === "school" ? (
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">School:</span> Escola
                            Municipal João da Silva
                          </p>
                          <p>
                            <span className="font-medium">Student:</span> Ana
                            Clara Oliveira
                          </p>
                          <p>
                            <span className="font-medium">Class:</span> 5th
                            Grade - Room B
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Address:</span> Rua
                            das Flores, 123
                          </p>
                          <p>
                            <span className="font-medium">City/State:</span> São
                            Paulo, SP
                          </p>
                          <p>
                            <span className="font-medium">ZIP Code:</span>{" "}
                            01234-567
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <div className="space-y-1 text-sm">
                        {paymentMethod === "credit" && (
                          <>
                            <p>
                              <span className="font-medium">Method:</span>{" "}
                              Credit Card
                            </p>
                            <p>
                              <span className="font-medium">Card:</span> ••••
                              •••• •••• 3456
                            </p>
                          </>
                        )}
                        {paymentMethod === "debit" && (
                          <>
                            <p>
                              <span className="font-medium">Method:</span> Debit
                              Card
                            </p>
                            <p>
                              <span className="font-medium">Card:</span> ••••
                              •••• •••• 3456
                            </p>
                          </>
                        )}
                        {paymentMethod === "pix" && (
                          <p>
                            <span className="font-medium">Method:</span> PIX
                          </p>
                        )}
                        {paymentMethod === "boleto" && (
                          <p>
                            <span className="font-medium">Method:</span> Boleto
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  {step !== "delivery" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        setStep(step === "payment" ? "delivery" : "payment")
                      }
                    >
                      Back
                    </Button>
                  )}
                  <Button type="submit" className="ml-auto">
                    {step === "delivery" && "Continue to Payment"}
                    {step === "payment" && "Review Order"}
                    {step === "confirmation" && "Place Order"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CheckoutForm;
