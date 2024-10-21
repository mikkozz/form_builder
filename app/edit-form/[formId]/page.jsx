"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import FormUI from "../_components/FormUI";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setRecord(res[0]);
    console.log(JSON.parse(res[0].jsonform));
    setJsonForm(JSON.parse(res[0].jsonform));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonForm();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonForm = async () => {
    const res = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress.emailAddress)
        )
      );

    console.log(res);
  };
  return (
    <div>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-2">Controller</div>
        <div className="col-span-10">
          <div className="border border-neutral-100 p-4 h-screen flex items-center bg-neutral-50">
            <FormUI jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
