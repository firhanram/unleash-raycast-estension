import { Action, ActionPanel, Icon, List, useNavigation } from "@raycast/api";
import { useGetAllProjects } from "./hooks/useGetAllProjects";
import Error from "./components/Error";
import Features from "./views/Features";
import { useCachedState } from "@raycast/utils";
import { TError } from "./types";

export default function Projects() {
  const { data, isLoading, error, revalidate } = useGetAllProjects();

  const [, setSelectedProject] = useCachedState("project-id", "");

  const { push } = useNavigation();

  const errResponse = error as TError;

  if (error) {
    return <Error errCode={errResponse.code} revalidate={revalidate} />;
  }

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Projects...">
      {data?.map((project) => (
        <List.Item
          title={project.name}
          key={project.name}
          icon={Icon.Layers}
          subtitle={`#${project.id}`}
          actions={
            <ActionPanel>
              <Action
                title="View Toggles"
                onAction={() => {
                  setSelectedProject(project.id);
                  push(<Features />);
                }}
              />
            </ActionPanel>
          }
          accessories={[
            {
              tag: `${project.featureCount} Toggles`,
              tooltip: "Total number of toggles in this project",
            },
            {
              icon: Icon.ChevronRight,
            },
          ]}
        />
      ))}
    </List>
  );
}
