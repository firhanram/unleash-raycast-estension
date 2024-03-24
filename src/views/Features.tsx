import { Action, ActionPanel, Icon, List, getPreferenceValues } from "@raycast/api";
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
        const url = new URL(getPreferenceValues<Preferences>().api);
        const detailUrl = `${url.origin}/projects/${projectId}/features/${feature.name}`;

        return (
          <List.Item
            key={feature.name}
            title={feature.name}
            icon={Icon.Flag}
            accessories={[...environments]}
            actions={
              <ActionPanel title="Toggle">
                <Action.OpenInBrowser title="Go to Dashboard" url={detailUrl} />
                {feature.environments.map((env) => {
                  const title = `${env.enabled ? "Enabled" : "Disabled"} in ${parseEnvironment(env.type)}`;
                  const icon = env.enabled ? Icon.CheckCircle : Icon.XMarkCircle;

                  return <Action title={title} icon={icon} />;
                })}
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
