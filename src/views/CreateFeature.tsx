import { Action, ActionPanel, Form, Icon, Toast, showToast } from "@raycast/api";
import { TError, TFeature } from "../types";
import { useState } from "react";
import { useGetAllFeatureTypes } from "../hooks/useGetAllFeatureTypes";
import { validateFeatureName } from "../api";

type FormValues = {
  name: string;
  type: string;
  description?: string;
  impressionData: boolean;
};

export default function CreateFeature({ revalidate }: { revalidate: () => Promise<TFeature[]> }) {
  const [featureName, setFeatureName] = useState("");
  const [featureNameError, setFeatureNameError] = useState("");
  const [selectedFeatureType, setSelectedFeatureType] = useState("");

  const { data: featureTypes, isLoading: isLoadingFeatureType } = useGetAllFeatureTypes();

  const handleValidateFeatureName = async (toast: Toast, name: string) => {
    try {
      await validateFeatureName({
        name,
      });

      return true;
    } catch (err) {
      const errResponse = err as TError;
      const errMessage = errResponse.details[0].message ?? "Invalid feature name";

      toast.style = Toast.Style.Failure;
      toast.title = "Failed";
      toast.message = errMessage;

      return false;
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const toast = await showToast({
      title: "Creating Feature...",
      style: Toast.Style.Animated,
    });

    try {
      const isValid = await handleValidateFeatureName(toast, values.name);

      if (isValid) {
        console.log("Feature created", values);
        await revalidate();
      }
    } catch (err) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed";
      toast.message = "An error occurred while creating the feature";
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm
            title="Create Feature"
            onSubmit={async (values: FormValues) => {
              await handleSubmit(values);
            }}
          />
        </ActionPanel>
      }
      navigationTitle="Create New Feature Toggle"
    >
      <Form.TextField
        id="name"
        title="Name"
        info="Name must be URL-friendly and unique within the project."
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
