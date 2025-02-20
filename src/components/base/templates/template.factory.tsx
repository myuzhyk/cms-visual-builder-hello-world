import { useQuery } from "@apollo/client";
import { MetadataQuery } from "./metadata.graphql";
import { ExperienceTemplate } from "../experience/blankexperience/experience.template";
import { NewAboutTemplate } from "../page/newabout/newabout.template";
import { JustPageTemplate } from "../page/justpage/justpage.template";

const TemplateFactory = ({ url }: { url: string }) => {
  const { data: metadata } = useQuery(MetadataQuery, {
    skip: !url,
    variables: { url },
    notifyOnNetworkStatusChange: true,
    onError: (error) => console.error("GraphQL Error:", error),
  });

  const type =
    metadata?.content?.items?.[0]?._metadata?.types?.[0] ?? "default";

  const contentGuid = metadata?.content?.items?.[0]?._metadata?.key;

  switch (type) {
    case "BlankExperience":
      return <ExperienceTemplate {...{ contentGuid }} />;
    case "JustPage":
      return <JustPageTemplate {...{ contentGuid }} />;
    case "BlankPage":
      return <NewAboutTemplate {...{ contentGuid }} />;
    default:
      return <ExperienceTemplate {...{ contentGuid }} />;
  }
};

export default TemplateFactory;
