import { Icon, List } from "@raycast/api";
import { useGetAllProjects } from "./hooks/useGetAllProjects";

export default function Projects() {
  const { data, isLoading } = useGetAllProjects();

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Projects...">
      {data?.map((project) => (
        <List.Item
          title={project.name}
          key={project.name}
          icon={Icon.Layers}
          subtitle={`#${project.id}`}
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
