import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router-dom";

export default function More() {
  return (
    <>
      <Helmet>
        <title>More | Startup Legal COO</title>
        <meta name="description" content="Access compliance & operations, settings, and helpful links." />
        <link rel="canonical" href={window.location.origin + "/more"} />
      </Helmet>

      <header className="py-4">
        <h1 className="text-2xl font-bold">More</h1>
        <p className="text-muted-foreground">Explore additional tools and links</p>
      </header>

      <section className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Compliance & Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <NavLink to="/content" className="story-link">Open content hub</NavLink>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
