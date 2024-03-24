import { Icon, List } from "@raycast/api";

export default function Features({ projectId }: { projectId: string }) {
  console.log(projectId);
  return (
    <List isLoading={false} searchBarPlaceholder="Search Features...">
      <List.Item icon={Icon.Flag} title="Feature" />
    </List>
  );
}
