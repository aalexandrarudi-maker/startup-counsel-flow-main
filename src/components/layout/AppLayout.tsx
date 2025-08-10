import { PropsWithChildren } from "react";
import { BottomNav } from "@/components/navigation/BottomNav";

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Your personal law firm growth command center</p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20 animate-fade-in">
        {children}
      </main>

      <BottomNav />
    </div>
  );
}
