import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";


import { cn } from "@/lib/utils";

export interface SchedulerProps {
  className?: string;
  events?: any[]; // Accept FullCalendar EventInput[] without importing the type here
}

const Scheduler: React.FC<SchedulerProps> = ({ className, events = [] }) => {
  return (
    <div className={cn("w-full overflow-hidden rounded-md border", className)}>
      <FullCalendar
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,dayGridMonth",
        }}
        slotMinTime="07:00:00"
        slotMaxTime="19:00:00"
        firstDay={1}
        nowIndicator
        height={"auto"}
        contentHeight={560}
        expandRows
        dayMaxEventRows={3}
        views={{
          timeGridWeek: {
            weekends: false,
            slotDuration: "00:30:00",
          },
          dayGridMonth: {
            weekends: true,
          },
        }}
        events={events}
        eventClassNames={(arg) => {
          const type = (arg.event.extendedProps as any)?.type as string | undefined;
          const base =
            "rounded-md border px-2 py-1 text-xs font-medium shadow-sm focus:outline-none";
          switch (type) {
            case "deadline":
              return [
                base,
                "bg-destructive text-destructive-foreground border-destructive/20",
              ];
            case "call":
              return [base, "bg-accent text-accent-foreground border-accent/20"];
            case "deep":
              return [base, "bg-primary text-primary-foreground border-primary/20"];
            default:
              return [
                base,
                "bg-secondary text-secondary-foreground border-secondary/20",
              ];
          }
        }}
        eventTimeFormat={{ hour: "2-digit", minute: "2-digit", meridiem: false }}
        dayHeaderFormat={{ weekday: "short", day: "numeric" }}
        stickyHeaderDates
        handleWindowResize
        navLinks={false}
      />
    </div>
  );
};

export default Scheduler;
