import PageBoilerplate from "@/components/layout/page-boilerplate/PageBoilerplate.tsx";
import { PROJECTS_LINKS_CONFIG } from "@/pages/projects/service.ts";

export default function Projects() {
  return (
    <PageBoilerplate slidesConfig={PROJECTS_LINKS_CONFIG} />
  );
}
