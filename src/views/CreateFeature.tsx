import { Action, ActionPanel, Form } from "@raycast/api";

export default function CreateFeature({ revalidate }: { revalidate: () => void }) {
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Create Feature"
            onSubmit={async (values) => {
              console.log(values);
              revalidate();
            }}
          />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Name" info="Unique feature name" placeholder="Name" />
      <Form.Dropdown id="type" title="Toggle Type" placeholder="Toggle Type" defaultValue="boolean">
        <Form.Dropdown.Item value="boolean" title="Boolean" />
      </Form.Dropdown>
      <Form.TextArea id="description" title="Description" placeholder="Description" info="Optional" />
      <Form.Checkbox id="impressionData" label="Impression Data" defaultValue={false} />
    </Form>
  );
}
