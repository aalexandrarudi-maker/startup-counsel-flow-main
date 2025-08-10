import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Clients() {
  return (
    <>
      <Helmet>
        <title>Client Pipeline & CRM | Startup Legal COO</title>
        <meta name="description" content="Track prospects, revenue progress, and next follow-ups toward your €130k goal." />
        <link rel="canonical" href={window.location.origin + "/clients"} />
      </Helmet>

      <header className="py-4">
        <h1 className="text-2xl font-bold">Client Pipeline</h1>
        <p className="text-muted-foreground">Visual funnel, follow-ups, and projections</p>
      </header>

      <section className="grid gap-4">
        {["LinkedIn Engagement", "Website Visitors", "Consultation Requests", "Proposal Sent", "Retainer Signed"].map((stage) => (
          <Card key={stage} className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{stage}</CardTitle>
              <Button variant="secondary" size="sm">
                View <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Keep momentum — next action queued.
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
