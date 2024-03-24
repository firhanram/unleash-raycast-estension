import { Action, ActionPanel, Detail, openCommandPreferences } from "@raycast/api";
import { ReactNode } from "react";

export default function Error({ errCode, revalidate }: { errCode: string; revalidate?: () => void }) {
  console.log(errCode);
  const getError: () => {
    message: string;
    actions: ReactNode;
  } = () => {
    switch (errCode) {
      case "401":
        return {
          message: "Unauthorized. Please update your token or API in the preferences",
          actions: (
            <ActionPanel>
              <Action title="Open Extension Preferences" onAction={openCommandPreferences} />
            </ActionPanel>
          ),
        };
      case "403":
        return {
          message: "Forbidden. You don't have permission to access this resource",
          actions: null,
        };
      default:
        return {
          message: "Failed to fetch data",
          actions: (
            <ActionPanel>
              <Action title="Reload" onAction={() => revalidate?.()} />
            </ActionPanel>
          ),
        };
    }
  };

  return <Detail markdown={`### ${getError().message}`} actions={getError().actions} />;
}
