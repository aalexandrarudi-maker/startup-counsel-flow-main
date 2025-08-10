import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Tasks() {
  return (
    <>
      <Helmet>
        <title>Daily Tasks & Coaching | Startup Legal COO</title>
        <meta name="description" content="Must-do today, content creation, business development, and admin tasks with progress coaching." />
        <link rel="canonical" href={window.location.origin + "/tasks"} />
      </Helmet>

      <header className="py-4">
        <h1 className="text-2xl font-bold">Your Daily Momentum</h1>
        <p className="text-muted-foreground">Your productivity is inspiring!</p>
        <div className="mt-3 w-full max-w-md">
          <Progress value={42} className="h-2" />
        </div>
      </header>

      <section className="space-y-4 pb-4">
        {[
          { title: "Must Do Today", tone: "danger" },
          { title: "Content Creation", tone: "primary" },
          { title: "Business Development", tone: "success" },
          { title: "Administrative", tone: "muted" },
        ].map((cat) => (
          <Card key={cat.title} className="animate-enter">
            <CardHeader>
              <CardTitle>{cat.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-start gap-3">
                    <Checkbox className="h-6 w-6" />
                    <div>
                      <p className="font-medium leading-snug">Sample task {i}</p>
                      <p className="text-xs text-muted-foreground">~20 min • Why this matters: momentum</p>
                    </div>
                  </div>
                  <Button variant={cat.tone === 'danger' ? 'danger' : cat.tone === 'success' ? 'success' : cat.tone === 'primary' ? 'default' : 'secondary'} size="sm">
                    Complete
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
