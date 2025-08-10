import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { CalendarDays, FileText, ShieldAlert, Users, Calendar as CalendarIcon } from "lucide-react";
import Scheduler from "@/components/calendar/Scheduler";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";


interface FocusTask { id: string; title: string; minutes: number; done: boolean; dueDate: string }

const Index = () => {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const [tasks, setTasks] = useState<FocusTask[]>([
    { id: "t1", title: "Reach out to 3 SaaS founders on LinkedIn", minutes: 20, done: false, dueDate: todayStr },
    { id: "t2", title: "Draft 'SaaS Compliance Reality Check' outline", minutes: 35, done: false, dueDate: todayStr },
    { id: "t3", title: "Review upcoming compliance deadlines", minutes: 15, done: false, dueDate: todayStr },
  ]);

  const todaysTasks = useMemo(() => tasks.filter((t) => t.dueDate === todayStr), [tasks, todayStr]);
  const progress = useMemo(
    () => (todaysTasks.length ? (todaysTasks.filter((t) => t.done).length / todaysTasks.length) * 100 : 0),
    [todaysTasks]
  );

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    const doneNow = tasks.find((t) => t.id === id)?.done === false;
    if (doneNow) toast.success("Amazing work! You're building something incredible!");
  };

  const [openId, setOpenId] = useState<string | null>(null);

  const handleReschedule = (id: string, date: Date) => {
    const newDateStr = format(date, "yyyy-MM-dd");
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, dueDate: newDateStr } : t)));
    toast.success(
      newDateStr === todayStr ? "Task scheduled for today" : `Task rescheduled to ${format(date, "PP")}`
    );
  };
  // Sample calendar events (Work Week + Month)
  const now = new Date();
  const day = now.getDay(); // Sunday = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7)); // shift to Monday
  monday.setHours(0, 0, 0, 0);

  const span = (offset: number, sh: number, sm: number, eh: number, em: number) => {
    const start = new Date(monday);
    start.setDate(monday.getDate() + offset);
    start.setHours(sh, sm, 0, 0);
    const end = new Date(monday);
    end.setDate(monday.getDate() + offset);
    end.setHours(eh, em, 0, 0);
    return { start, end };
  };

  const scheduleEvents = [
    {
      title: "Data protection filing deadline",
      start: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1),
      allDay: true,
      display: "block",
      extendedProps: { type: "deadline" },
    },
    {
      title: "Client call — SaaS founder (Berlin)",
      ...span(2, 10, 0, 11, 0),
      extendedProps: { type: "call" },
    },
    {
      title: "Deep Work — Draft compliance post",
      ...span(0, 13, 0, 15, 0),
      extendedProps: { type: "deep" },
    },
    {
      title: "Deep Work — Contract review",
      ...span(3, 9, 0, 12, 0),
      extendedProps: { type: "deep" },
    },
  ];

  return (
    <>
      <Helmet>
        <title>Law Firm Growth Dashboard | Startup Legal COO</title>
        <meta name="description" content="Mobile growth dashboard for a solo European startup lawyer: daily focus, content engine, compliance, and client pipeline." />
        <link rel="canonical" href={window.location.origin + "/"} />
      </Helmet>
      <aside aria-label="Inspirational note" className="mb-3">
        <p className="text-sm text-muted-foreground">“Unleash Your Power Within.” — Tony Robbins</p>
      </aside>

      <header className="py-4">
        <h1 className="text-2xl font-bold">Law Firm Growth Dashboard — Good morning! Ready to build your empire today? 🚀</h1>
        <p className="text-muted-foreground mt-1">Overall progress toward quarterly goals</p>
        <div className="mt-3 w-full max-w-md">
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      <section className="space-y-4 pb-4">
        <Card className="shadow-[var(--shadow-elegant)]">
          <CardHeader>
            <CardTitle>Today's Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todaysTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={task.done}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="h-6 w-6"
                    aria-label={`Mark ${task.title} complete`}
                  />
                  <div>
                    <p className="font-medium leading-snug">{task.title}</p>
                    <p className="text-xs text-muted-foreground">~{task.minutes} min • You've got this!</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Popover open={openId === task.id} onOpenChange={(open) => setOpenId(open ? task.id : null)}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" aria-label={`Reschedule ${task.title}`}>
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        Reschedule
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="p-0">
                      <Calendar
                        mode="single"
                        selected={new Date(task.dueDate)}
                        onSelect={(date) => {
                          if (!date) return;
                          handleReschedule(task.id, date);
                          setOpenId(null);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button variant={task.done ? "success" : "accent"} size="sm" onClick={() => toggleTask(task.id)}>
                    {task.done ? "Completed" : "Complete Task"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Thought Leadership Pipeline</CardTitle>
              <span className="text-xs text-success">3/3 startup insights published</span>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Next up: <strong>SaaS Compliance Reality Check</strong></p>
              <Button variant="accent">Generate Startup Content</Button>
              <p className="text-xs text-muted-foreground">Founders are listening!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><ShieldAlert className="h-5 w-5" /> Compliance Status</CardTitle>
              <span className="text-xs text-success">Green: Breathing easy</span>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Next 30 days: All good • No urgent deadlines</p>
              <Button variant="secondary">Open Compliance Calendar</Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Client Pipeline</CardTitle>
              <span className="text-xs text-primary">€6.4k / €10.8k this month</span>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">Next follow-up due: <strong>Tomorrow</strong></p>
              <div className="flex gap-2">
                <Button variant="hero">You're building something amazing</Button>
                <Button variant="secondary">View Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                <CardTitle>This Week</CardTitle>
              </div>
              <div aria-label="Calendar legend" className="flex items-center gap-3 text-xs">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Deadline</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Client call</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Deep work</span>
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Scheduler events={scheduleEvents} />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default Index;
