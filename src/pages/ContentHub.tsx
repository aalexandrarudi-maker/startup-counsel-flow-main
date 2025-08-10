import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Newspaper, MessageSquare } from "lucide-react";

export default function ContentHub() {
  return (
    <>
      <Helmet>
        <title>Startup Legal Content Engine | Startup Legal COO</title>
        <meta name="description" content="Plan, generate, and schedule founder-friendly legal content to grow your pipeline." />
        <link rel="canonical" href={window.location.origin + "/content"} />
      </Helmet>

      <header className="py-4">
        <h1 className="text-2xl font-bold">Startup Legal Content Engine</h1>
        <p className="text-muted-foreground">Content streak: 12 weeks • Founders engaged: 847 this week</p>
      </header>

      <section className="grid gap-4">
        {[
          { icon: Newspaper, title: "New AI regulations hitting SaaS startups" },
          { icon: MessageSquare, title: "Series A legal gotchas founders miss" },
          { icon: Flame, title: "German startup compliance reality check" },
        ].map((t) => (
          <Card key={t.title}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <t.icon className="h-5 w-5" /> {t.title}
              </CardTitle>
              <Button variant="accent">Generate Founder-Friendly Post</Button>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Optimized for founder consumption and engagement.
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
