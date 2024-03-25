import { Action, ActionPanel, Form, Icon } from "@raycast/api";
import { TFeature } from "../types";
import { useState } from "react";
import { useGetAllFeatureTypes } from "../hooks/useGetAllFeatureTypes";

export default function CreateFeature({ revalidate }: { revalidate: () => Promise<TFeature[]> }) {
  const [featureName, setFeatureName] = useState("");
  const [featureNameError, setFeatureNameError] = useState("");
  const [selectedFeatureType, setSelectedFeatureType] = useState("");

  const { data: featureTypes, isLoading: isLoadingFeatureType } = useGetAllFeatureTypes();

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
      <Form.Dropdown
        id="type"
        title="Toggle Type"
        placeholder="Toggle Type"
        defaultValue={featureTypes?.[0]?.id}
        isLoading={isLoadingFeatureType}
        info={featureTypes?.find((type) => type.id === selectedFeatureType)?.description}
        onChange={(val) => {
          setSelectedFeatureType(val);
        }}
      >
        {featureTypes?.map((type) => (
          <Form.Dropdown.Item key={type.id} value={type.id} title={type.name} icon={Icon.Cd} />
        ))}
      </Form.Dropdown>
      <Form.TextArea id="description" title="Description" placeholder="Description" info="Optional" />
      <Form.Checkbox
        id="impressionData"
        label="Impression Data"
        defaultValue={false}
        info={`"true" if the impression data collection is enabled for the feature, otherwise "false".`}
      />
    </Form>
  );
}
