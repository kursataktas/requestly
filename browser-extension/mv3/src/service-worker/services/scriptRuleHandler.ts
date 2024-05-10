import { CLIENT_MESSAGES } from "common/constants";
import { getEnabledRules } from "common/rulesStore";
import { RuleType, ScriptObject, ScriptRulePair } from "common/types";
import { isBlacklistedURL } from "../../utils";
import { matchSourceUrl } from "./ruleMatcher";
import { injectScript } from "./utils";
import { TAB_SERVICE_DATA, tabService } from "./tabService";

export const applyScriptRules = async (tabId: number, frameId: number, url: string) => {
  if (isBlacklistedURL(url)) {
    return;
  }

  const scriptRules = await getEnabledRules(RuleType.SCRIPT);
  const scripts: ScriptObject[] = [];

  const appliedScriptRuleIds = new Set<string>();

  scriptRules.forEach((scriptRule) => {
    scriptRule.pairs.forEach((scriptRulePair: ScriptRulePair) => {
      if (matchSourceUrl(scriptRulePair.source, url)) {
        scriptRulePair.scripts.forEach((script) => {
          scripts.push(script);
        });
        appliedScriptRuleIds.add(scriptRule.id);
      }
    });
  });

  for (let script of scripts) {
    await injectScript(script, { tabId, frameIds: [frameId] });
  }

  if (appliedScriptRuleIds.size > 0) {
    chrome.tabs.sendMessage(tabId, {
      action: CLIENT_MESSAGES.UPDATE_APPLIED_SCRIPT_RULES,
      ruleIds: Array.from(appliedScriptRuleIds),
    });

    const appliedRuleDetails = tabService.getData(tabId, TAB_SERVICE_DATA.APPLIED_RULE_DETAILS, []);
    appliedRuleDetails.push(...Array.from(appliedScriptRuleIds));

    tabService.setData(tabId, TAB_SERVICE_DATA.APPLIED_RULE_DETAILS, appliedRuleDetails);
  }
};
