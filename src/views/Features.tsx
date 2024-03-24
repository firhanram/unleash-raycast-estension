import { Icon, List } from "@raycast/api";
import { useGetAllFeatures } from "../hooks/useGetAllFeatures";
import { parseEnvironment } from "../helpers";

export default function Features({ projectId }: { projectId: string }) {
  const { isLoading, data } = useGetAllFeatures(projectId);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Features...">
      {data?.map((feature) => {
        const environments: List.Item.Props["accessories"] = feature.environments.map((env) => {
          return {
            icon: {
              source: env.enabled ? Icon.CheckCircle : Icon.XMarkCircle,
              tintColor: env.enabled ? "#22c55e" : "#f43f5e",
            },
            text: parseEnvironment(env.type),
          };
        });
        return <List.Item key={feature.name} title={feature.name} icon={Icon.Flag} accessories={[...environments]} />;
      })}
    </List>
  );
}
