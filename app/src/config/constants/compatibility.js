// FEATURE COMPATIBILITY VERSIONS
import { CONSTANTS as GLOBAL_CONSTANTS } from "@requestly/requestly-core";
import FEATURES from "./sub/features";

/** NOTE:
 * 1. null -> if the version is never compatiable on appMode
 * 2. for APP_MODES.REMOTE only give version "0.0.1" if compatible
 *    This is a dummy version
 */
export const FEATURE_COMPATIBLE_VERSION = {
  [FEATURES.RESPONSE_MAP_LOCAL]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "0.0.29-beta",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.REDIRECT_MAP_LOCAL]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.4.21",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.REQUEST_PAYLOAD_FILTER]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "0.0.30-beta",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.1.12",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: "0.0.1",
  },
  [FEATURES.ASYNC_MODIFY_RESPONSE_BODY]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: null,
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.SERVE_RESPONSE_WITHOUT_REQUEST]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.5.4",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "23.6.5",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.MODIFY_REQUEST_BODY]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.3.0",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.12.27",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: "0.0.1",
  },
  [FEATURES.UPDATED_REQUEST_BODY_ARGS]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.4.18",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.12.27",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: "0.0.1",
  },
  [FEATURES.ASYNC_MODIFY_REQUEST_BODY]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: null,
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.DESKTOP_APP_TERMINAL_PROXY]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.1.0",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.DESKTOP_APP_SSL_PROXYING]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: null,
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.EXTENSION_GROUP_PIN_ICON]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: null,
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.0.0",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.EXTENSION_CONSOLE_LOGGER]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: null,
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.5.8",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.HEADERS_V2_MIGRATION]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.4.3",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.7.18",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: "0.0.1",
  },
  [FEATURES.MODIFY_API_RESPONSE_STATUS]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "0.0.21-beta",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "22.9.24",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.DESKTOP_USER_PREFERENCES]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.4.19",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
  [FEATURES.NETWORK_SESSIONS]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.5.2",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: null,
  },
  [FEATURES.API_CLIENT]: {
    [GLOBAL_CONSTANTS.APP_MODES.DESKTOP]: "1.5.0",
    [GLOBAL_CONSTANTS.APP_MODES.EXTENSION]: "23.5.9",
    [GLOBAL_CONSTANTS.APP_MODES.REMOTE]: null,
  },
};
