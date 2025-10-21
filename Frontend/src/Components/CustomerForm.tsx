import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Text } from "./TextField";
import type { CustomerTypeDTO } from "../interface/interfaces";

// ------ LOCAL TYPE COPY (not imported) ------
type CustomerFormModel = {
  id: number;
  name: string;
  description?: string | null;
  address: string;
  city: string;
  state: string;
  zips: string;
  lastUpdated: string;
  customerTypeId: number;
};

// ------ VALIDATION ------
const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().nullable(),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zips: Yup.string().required("ZIP is required"),
  customerTypeId: Yup.number().required("Type Id required")
});

export default function CustomerForm({
  isUpdate,
  initialValues,
  onSubmit,
  customerTypes
}: {
  isUpdate: boolean,
  initialValues: CustomerFormModel;
  onSubmit: (data: CustomerFormModel) => void;
  customerTypes:  CustomerTypeDTO[]
}) {
  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="max-w-2xl mx-auto bg-white shadow p-6 rounded-xl space-y-4">

            <div className="flex justify-between">
                <Text name="name" label="Name" />
                <Text name="description" label="Description" />
            </div>

            <div className="flex justify-between">
                <Text name="address" label="Address" />
                <Text name="city" label="City" />
            </div>
            <div className="flex justify-between">
                <Text name="state" label="State" />
                <Text name="zips" label="ZIP Code" />
            </div>
          
          
          

          {/* Nested object example */}
          <div>
            <label className="block font-medium mb-1">Customer Type Name</label>
            <Field
              as="select"
              name="customerTypeId"
              
              className="w-full border rounded p-2"
              placeholder="Retail / Wholesale..."
            >
                <option value="">Select Customer Type</option>
                {customerTypes.map((t) => (
                <option key={t.id} value={t.id}>
                    {t.name}
                </option>
                ))}
            </Field>
            <ErrorMessage
              name="customerType.name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
}


