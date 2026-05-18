import { ContentEditor } from "@/components/admin/ContentEditor";
import { fetchPageContent } from "@/lib/data/content";
import { Info } from "lucide-react";

export default async function AdminAbout() {
  const [missionContent, philosophyContent, approachContent] = await Promise.all([
    fetchPageContent("about", "mission"),
    fetchPageContent("about", "philosophy"),
    fetchPageContent("about", "approach"),
  ]);

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Info className="w-6 h-6" />
          About Us Editor
        </h1>
        <p className="text-muted-foreground mt-1">Edit About Us page content.</p>
      </div>

      <ContentEditor
        page="about"
        section="mission"
        title="Mission Section"
        fields={[
          { key: "headline", label: "Section Heading" },
          { key: "body", label: "Mission Statement", type: "textarea" },
        ]}
        initialValues={missionContent as Record<string, string>}
      />

      <ContentEditor
        page="about"
        section="philosophy"
        title="Philosophy Section"
        fields={[
          { key: "headline", label: "Section Heading" },
          { key: "body", label: "Philosophy Statement", type: "textarea" },
        ]}
        initialValues={philosophyContent as Record<string, string>}
      />

      <ContentEditor
        page="about"
        section="approach"
        title="Approach Section"
        fields={[
          { key: "headline", label: "Main Heading" },
          { key: "subheadline", label: "Sub-heading" },
        ]}
        initialValues={approachContent as Record<string, string>}
      />
    </div>
  );
}
