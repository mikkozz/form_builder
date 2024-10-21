import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import FieldEdit from "./FieldEdit";

function FormUI({ jsonForm, onFieldUpdate }) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{jsonForm?.title}</CardTitle>
          <CardDescription>{jsonForm?.subheading}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {jsonForm?.fields && jsonForm.fields.length > 0 ? (
            jsonForm.fields.map((field, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <Label htmlFor={field.name}>{field.label}</Label>
                  <div className="py-1.5 flex justify-end">
                    <FieldEdit
                      defaultValue={field}
                      onUpdate={(value) => onFieldUpdate(value, index)}
                    />
                  </div>
                </div>
                {field.type === "textarea" ? (
                  <Textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    className="textarea-class rounded border-gray-300"
                  />
                ) : (
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    name={field.name}
                  />
                )}
              </div>
            ))
          ) : (
            <p>No fields available</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FormUI;
