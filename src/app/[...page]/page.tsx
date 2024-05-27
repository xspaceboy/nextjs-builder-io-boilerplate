import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const links: any[] = await builder.getAll("nav-link", { prerender: false });

  const builderModelName = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      <header className="w-full">
        <nav className="flex items-center space-x-2 px-[8rem]">
          {links.map((link, index) => (
            <a key={index} href={link.data.url} className="px-6 py-3 font-semibold hover:text-blue-500">
              {link.data.label}
            </a>
          ))}
        </nav>
      </header>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
