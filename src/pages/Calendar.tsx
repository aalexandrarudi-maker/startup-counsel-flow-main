import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STORAGE_KEY_API = "gcal_api_key";
const STORAGE_KEY_CAL = "gcal_calendar_id";

export default function CalendarPage() {
  const [apiKey, setApiKey] = useState("");
  const [calendarId, setCalendarId] = useState("");

  useEffect(() => {
    setApiKey(localStorage.getItem(STORAGE_KEY_API) || "");
    setCalendarId(localStorage.getItem(STORAGE_KEY_CAL) || "");
  }, []);

  const isConnected = apiKey && calendarId;

  const eventSources = useMemo(() => {
    return isConnected
      ? [
          {
            googleCalendarId: calendarId,
            className:
              "rounded-md border px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground",
          } as any,
        ]
      : [];
  }, [isConnected, calendarId]);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY_API, apiKey);
    localStorage.setItem(STORAGE_KEY_CAL, calendarId);
  };

  return (
    <>
      <Helmet>
        <title>Calendar | Startup Legal COO</title>
        <meta
          name="description"
          content="Visual calendar with work week and monthly views, with optional Google Calendar integration."
        />
        <link rel="canonical" href={window.location.origin + "/calendar"} />
      </Helmet>

      <header className="py-4">
        <h1 className="text-2xl font-bold">Calendar — Work Week & Month</h1>
        <p className="text-muted-foreground mt-1">Connect Google Calendar or use the built-in scheduler.</p>
      </header>

      <section className="space-y-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Google Calendar Connection</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Google API Key</Label>
              <Input
                id="apiKey"
                placeholder="Paste your public API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                For a secure setup and OAuth, connect Supabase in Lovable and we’ll store credentials server-side.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendarId">Calendar ID</Label>
              <Input
                id="calendarId"
                placeholder="example@gmail.com or your_public_calendar_id@group.calendar.google.com"
                value={calendarId}
                onChange={(e) => setCalendarId(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Button variant="accent" onClick={handleSave}>Save Connection</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="overflow-hidden rounded-md border p-0">
            <FullCalendar
              plugins={[
                timeGridPlugin,
                dayGridPlugin,
                interactionPlugin,
                ...(isConnected ? [googleCalendarPlugin] : []),
              ]}
              initialView="timeGridWeek"
              headerToolbar={{ left: "prev,next today", center: "title", right: "timeGridWeek,dayGridMonth" }}
              slotMinTime="07:00:00"
              slotMaxTime="19:00:00"
              firstDay={1}
              nowIndicator
              height={"auto"}
              contentHeight={700}
              expandRows
              dayMaxEventRows={3}
              views={{ timeGridWeek: { weekends: false, slotDuration: "00:30:00" } }}
              eventSources={eventSources}
              eventTimeFormat={{ hour: "2-digit", minute: "2-digit", meridiem: false }}
              dayHeaderFormat={{ weekday: "short", day: "numeric" }}
              stickyHeaderDates
              handleWindowResize
              navLinks={false}
              googleCalendarApiKey={isConnected ? apiKey : undefined}
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
}
