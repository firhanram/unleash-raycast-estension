import { Action, ActionPanel, Form } from "@raycast/api";
import { TFeature } from "../types";
import { useState } from "react";

export default function CreateFeature({ revalidate }: { revalidate: () => Promise<TFeature[]> }) {
  const [featureName, setFeatureName] = useState("");
  const [featureNameError, setFeatureNameError] = useState("");

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
      <Form.TextField
        id="name"
        title="Name"
        info="Unique feature name"
        placeholder="Name"
        value={featureName}
        onChange={(val) => {
          const name = val.trim();
          setFeatureName(name);

          if (name.length > 0) {
            setFeatureNameError("");
          }
        }}
        error={featureNameError}
        onBlur={(ev) => {
          const value = ev.target.value?.trim();

          if (value?.length === 0) {
            setFeatureNameError("Required");
          }
        }}
      />
      <Form.Dropdown id="type" title="Toggle Type" placeholder="Toggle Type" defaultValue="boolean">
        <Form.Dropdown.Item value="boolean" title="Boolean" />
      </Form.Dropdown>
      <Form.TextArea id="description" title="Description" placeholder="Description" info="Optional" />
      <Form.Checkbox
        id="impressionData"
        label="Impression Data"
        defaultValue={false}
        info="true if the impression data collection is enabled for the feature, otherwise false."
      />
    </Form>
  );
}
