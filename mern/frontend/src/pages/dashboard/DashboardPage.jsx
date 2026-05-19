import { useState } from "react";
import { Crown, Sparkles } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { MetricGrid } from "@/components/data/MetricGrid";
import { ResponsiveRecordView } from "@/components/data/ResponsiveRecordView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { RoleGuard } from "@/components/common/RoleGuard";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppPreset } from "@/hooks/useAppPreset";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/utils/constants";

const DEMO_AREAS = [
  "Session",
  "Customize",
  "Resources",
  "Auth",
  "Layout",
  "Theme",
  "Data display",
  "Pagination",
];

export default function DashboardPage() {
  const { user } = useAuth();
  const preset = useAppPreset();
  const ui = preset.ui || {};
  const dataDisplay = preset.dataDisplay || {};
  const [tipsOpen, setTipsOpen] = useState(false);

  const metrics = [
    { label: "User", value: user?.name || "Active", description: user?.email },
    { label: "Role", value: user?.role || "user", description: "Role-aware UI is ready." },
    { label: "Theme", value: preset.brand.name, description: "Driven by app-preset.js." },
    { label: "Layout", value: preset.layout.shell.protected, description: "Responsive shell mode." },
  ];

  const columns = [
    { key: "area", label: "Area" },
    { key: "status", label: "Status" },
    { key: "next", label: "Next Step" },
  ];

  const rows = DEMO_AREAS.map((area) => {
    const card = preset.dashboardCards.find((c) => c.title === area);
    return {
      id: area,
      area,
      status: card ? "Template" : "Ready",
      next: card?.description || "Swap presets via loom customize or app-preset.js.",
    };
  });

  return (
    <PageWrapper className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome, {user?.name}. {preset.brand.tagline}.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => setTipsOpen(true)}>
          <Sparkles className="mr-2 h-4 w-4" aria-hidden />
          UI tips
        </Button>
      </section>

      <MetricGrid items={metrics} template={dataDisplay.metrics} />
      <ResponsiveRecordView columns={columns} rows={rows} template={dataDisplay.records} />

      <div className="grid gap-[var(--data-gap)] md:grid-cols-2">
        <RoleGuard role={ROLES.ADMIN} fallback={<Skeleton className="h-44" />}>
          <Card variant={ui.card}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5" aria-hidden />
                Admin tools
              </CardTitle>
              <CardDescription>
                TODO: Customize — add admin-only business workflows here.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Protected backend routes can use requireRole(&quot;admin&quot;).
            </CardContent>
          </Card>
        </RoleGuard>
      </div>

      <AppModal
        open={tipsOpen}
        onOpenChange={setTipsOpen}
        variant={ui.modal}
        title="Make it yours"
        description="Swap theme, layout, data display, and UI variants without touching component code."
        footer={
          <Button type="button" onClick={() => setTipsOpen(false)}>
            Got it
          </Button>
        }
      >
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>
            <code className="text-foreground">loom customize ui set studio</code> — card, modal,
            select, pagination personalities
          </li>
          <li>
            <code className="text-foreground">loom customize theme set clinicSoft</code> — color
            tokens
          </li>
          <li>
            Edit <code className="text-foreground">frontend/src/config/app-preset.js</code> for full
            control
          </li>
        </ul>
      </AppModal>
    </PageWrapper>
  );
}
