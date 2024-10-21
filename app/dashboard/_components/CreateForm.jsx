import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Wrench } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { JsonForms } from "@/configs/schema";
import { db } from "@/configs";
import moment from "moment";
import { useRouter } from "next/navigation";

const PROMPT =
  "Based on the description, please generate a form in JSON format, including the form title, form subheading, form fields (with field name, placeholder, label, field type, and whether the field is required). Remove this ```json```";

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState();
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description: " + userInput + PROMPT
    );
    console.log(result.response.text());

    if (result.response.text()) {
      const res = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning({ id: JsonForms.id });
      console.log("New form ID: ", res[0].id);
      if (res[0].id) {
        route.push("/edit-form/" + res[0].id);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="w-full" onClick={() => setOpenDialog(true)}>
            <Wrench className="w-4 h-4 mr-2" />
            Create form
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          <div>
            <Textarea
              rows={5}
              placeholder="Type your message here."
              onChange={(event) => setUserInput(event.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={() => onCreateForm()} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
