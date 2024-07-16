import { trackEvent } from "modules/analytics";
import { REQUEST_BOT } from "./constants";

export const trackAskAIClicked = (source: string) => {
  const params = { source };
  trackEvent(REQUEST_BOT.ASK_AI_CLICKED, params);
};

export const trackGetHumanSupportClicked = () => {
  trackEvent(REQUEST_BOT.GET_HUMAN_SUPPORT_CLICKED);
};
