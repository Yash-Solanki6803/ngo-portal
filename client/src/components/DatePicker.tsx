import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const DatePicker: React.FC<{
  date: Date | string | null;
  setDate: (date: any) => void;
  name: string;
}> = ({ date, setDate, name }) => {
  const [open, setOpen] = useState(false); // Track popover state

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date: Date) => {
            // The event object is not passed to the onSelect callback so we need to create a synthetic event object
            if (date) {
              setDate({ target: { name: name, value: date } });
              setOpen(false);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
};
