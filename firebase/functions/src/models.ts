import { z } from "zod";

export interface FormConfig {
  schema: z.ZodObject<z.ZodRawShape>;
  notifyEmail: string;
  subject: string;
  confirmationSubject: string;
  requiredFields: string[];
  optionalFields: string[];
}

const formConfigs: Record<string, FormConfig> = {
  "contact": {
    schema: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      restaurant: z.string().optional(),
      phone: z.string().optional(),
      message: z.string().min(1),
    }),
    requiredFields: ["name", "email", "message"],
    optionalFields: ["restaurant", "phone"],
    notifyEmail: "info@teremu.com",
    subject: "Nuevo mensaje de contacto — Teremu",
    confirmationSubject: "Hemos recibido tu mensaje — Teremu",
  },
  "request-demo": {
    schema: z.object({
      name: z.string().min(1),
      email: z.string().email(),
      restaurant: z.string().optional(),
      phone: z.string().optional(),
      locations: z.union([z.string(), z.number()]).optional(),
      message: z.string().min(1),
    }),
    requiredFields: ["name", "email", "message"],
    optionalFields: ["restaurant", "phone", "locations"],
    notifyEmail: "info@teremu.com",
    subject: "Solicitud de demo — Teremu",
    confirmationSubject: "Gracias por tu interés en Teremu",
  },
  // Add more form types here (e.g. "newsletter") following the same shape.
};

export default formConfigs;
