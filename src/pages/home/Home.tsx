import { HOME_LINKS_CONFIG} from "@/pages/home/service.ts";
import PageBoilerplate from "@/components/layout/page-boilerplate/PageBoilerplate.tsx";

export default function Home() {
  return (
    <PageBoilerplate slidesConfig={HOME_LINKS_CONFIG} />
  );
}
