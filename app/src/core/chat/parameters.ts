import { defaultModel } from "./openai";
import { Parameters } from "./types";

export const defaultParameters: Parameters = {
  temperature: 0.2,
  model: defaultModel,
};

export function loadParameters(
  id: string | null | undefined = null
): Parameters {
  const apiKey =
    "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" || undefined;
  const key = id ? `parameters-${id}` : "parameters";
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parameters = JSON.parse(raw) as Parameters;
      parameters.apiKey = apiKey;
      return parameters;
    }
  } catch (e) {}
  return id ? loadParameters() : { ...defaultParameters, apiKey };
}

export function saveParameters(id: string, parameters: Parameters) {
  if (parameters) {
    const apiKey = parameters.apiKey;
    delete parameters.apiKey;

    localStorage.setItem(`parameters-${id}`, JSON.stringify(parameters));
    localStorage.setItem("parameters", JSON.stringify(parameters));

    // localStorage.setItem(
    //   `openai-api-key`,
    //   "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"
    // );
  }
}
