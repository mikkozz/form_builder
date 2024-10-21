import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";

function FieldEdit({ defaultValue, onUpdate }) {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);
  return (
    <div className="flex gap-3 items-center">
      <Popover>
        <PopoverTrigger>
          <Edit className="w-4 h-4 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-2">
          <h2 className="font-semibold">Edit Fields</h2>
          <div>
            <Label className="text-sm">Label name</Label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-sm">Placeholder</Label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <div>
            <Button
              size="sm"
              onClick={() =>
                onUpdate({
                  label: label,
                  placeholder: placeholder,
                })
              }
            >
              Update
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <Trash2 className="w-4 h-4 text-red-500 cursor-pointer" />
    </div>
  );
}

export default FieldEdit;
