import { ErrorMessage, Field } from "formik";

export const Text = ({ name, label }: { name: string; label: string }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <Field
      name={name}
      className="w-full border rounded p-2"
      placeholder={label}
    />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);