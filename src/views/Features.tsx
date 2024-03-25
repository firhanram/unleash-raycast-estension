import { Action, ActionPanel, Icon, List, Toast, getPreferenceValues, showToast, useNavigation } from "@raycast/api";
import { useGetAllFeatures } from "../hooks/useGetAllFeatures";
import { generateErrorMessage, parseEnvironment } from "../helpers";
import { TFeatureToggleParams } from "../types";
import { disableFeature, enableFeature } from "../api";
import { useCachedState } from "@raycast/utils";
import CreateFeature from "./CreateFeature";

export default function Features() {
  const [projectId] = useCachedState("project-id", "");
  const { isLoading, data, revalidate } = useGetAllFeatures(projectId);

  const { push } = useNavigation();

  const handleEnableFeature = async (params: TFeatureToggleParams) => {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: `Toggling feature ${params.featureName}...`,
    });

    try {
      await enableFeature(params);
      await revalidate();

      toast.style = Toast.Style.Success;
      toast.title = "Feature Enabled";
      toast.message = `Enabled ${params.featureName} in ${parseEnvironment(params.environment)}`;
    } catch (err) {
      toast.style = Toast.Style.Failure;

      if (err instanceof Error) {
        toast.title = generateErrorMessage(err.message);
      }

      toast.message = `Failed to enable ${params.featureName} in ${parseEnvironment(params.environment)}`;
    }
  };

  const handleDisableFeature = async (params: TFeatureToggleParams) => {
    const toast = await showToast({
      style: Toast.Style.Animated,
      title: `Toggling feature ${params.featureName}...`,
    });

    try {
      await disableFeature(params);
      await revalidate();

      toast.style = Toast.Style.Success;
      toast.title = "Feature Disabled";
      toast.message = `Disabled ${params.featureName} in ${parseEnvironment(params.environment)}`;
    } catch (err) {
      toast.style = Toast.Style.Failure;

      if (err instanceof Error) {
        toast.title = generateErrorMessage(err.message);
      }

      toast.title = `Failed to disable ${params.featureName} in ${parseEnvironment(params.environment)}`;
    }
  };

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search Features..." navigationTitle="Features">
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
                  const title = `${env.enabled ? "Disable" : "Enable"} in ${parseEnvironment(env.type)}`;
                  const icon = env.enabled ? Icon.XMarkCircle : Icon.CheckCircle;

                  const handleToggle = () => {
                    if (env.enabled) {
                      handleDisableFeature({
                        environment: env.type,
                        featureName: feature.name,
                        projectId,
                      });
                      return;
                    }

                    handleEnableFeature({
                      environment: env.type,
                      featureName: feature.name,
                      projectId,
                    });
                  };

                  return <Action title={title} icon={icon} key={env.type} onAction={() => handleToggle()} />;
                })}
                <Action
                  title="Create New Feature Toggle"
                  icon={Icon.PlusCircle}
                  onAction={() => push(<CreateFeature revalidate={revalidate} />)}
                />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
