const FEATURES = {};

FEATURES.SHARED_LISTS = "shared_lists";
FEATURES.RULES = "rules";
FEATURES.ACTIVE_RULES = "active_rules";
FEATURES.RULE_PAIRS = "rule_pairs";
FEATURES.GROUPS = "groups";
FEATURES.FILES = "files";
FEATURES.EXPORT_IMPORT = "export_import";
FEATURES.EXPORT = "export";
FEATURES.IMPORT = "import";
FEATURES.DARK_MODE = "dark_mode";
FEATURES.BACKUP_RULES = "backup_rules";
FEATURES.SYNCING = "rules_syncing";
FEATURES.ADS = "ads";
FEATURES.LOGS = "logs";
FEATURES.FAV_RULES = "favourite_rules";
FEATURES.RESPONSE_BODY_CHARACTER_LIMIT = "response_body_character_limit";
FEATURES.REQUEST_BODY_CHARACTER_LIMIT = "request_body_character_limit";
FEATURES.SCRIPT_RULE_CHARACTER_LIMIT = "script_rule_character_limit";
FEATURES.TRASH = "trash";
FEATURES.EXECUTION_LOGS = "execution_logs";
FEATURES.CHARACTER_LIMIT = "characters";
FEATURES.RESPONSE_RULE = "response_rule";
FEATURES.REQUEST_RULE = "request_rule";
FEATURES.RESPONSE_MAP_LOCAL = "RESPONSE_MAP_LOCAL";
FEATURES.REDIRECT_MAP_LOCAL = "REDIRECT_MAP_LOCAL";
FEATURES.ASYNC_MODIFY_RESPONSE_BODY = "ASYNC_MODIFY_RESPONSE_BODY";
FEATURES.ASYNC_MODIFY_REQUEST_BODY = "ASYNC_MODIFY_REQUEST_BODY";
FEATURES.SERVE_RESPONSE_WITHOUT_REQUEST = "SERVE_RESPONSE_WITHOUT_REQUEST";
FEATURES.TEST_THIS_RULE = "test_this_rule";
FEATURES.IMPLICIT_TEST_THIS_RULE = "implicit_test_this_rule";
FEATURES.TEST_THIS_RULE_SESSION = "test_this_rule_session";
FEATURES.DESKTOP_APP_TERMINAL_PROXY = "DESKTOP_APP_TERMINAL_PROXY";
FEATURES.DESKTOP_APP_SSL_PROXYING = "DESKTOP_APP_SSL_PROXYING";
FEATURES.DESKTOP_APP_TRAFFIC_TABLE = "DESKTOP_APP_TRAFFIC_TABLE";
FEATURES.EXTENSION_GROUP_PIN_ICON = "EXTENSION_GROUP_PIN_ICON";
FEATURES.EXTENSION_CONSOLE_LOGGER = "EXTENSION_CONSOLE_LOGGER";
FEATURES.FEAT_PRESERVE_REDIRECT_COOKIES = "preserve_redirect_cookies";
FEATURES.ENABLE_TRACKING = "enable_tracking";
FEATURES.REDIRECT_RULE_DEMO_VIDEO_IN_EDITOR = "redirect-rule-tutorial-video-in-editor-experiment";
FEATURES.DESKTOP_USER_PREFERENCES = "desktop_user_preferences";
FEATURES.REGENERATE_SSL_CERTS = "regenerate_ssl_certs";
FEATURES.CREATE_RULE_FROM_TRAFFIC_TABLE = "create-rule-from-traffic-table";
FEATURES.CONNECTED_APPS = "connected-apps";
FEATURES.GRAPHQL_PAYLOAD_FILTER_OPERATOR = "graphql-payload-filter-operator";
FEATURES.CUSTOM_LAUNCH_OPTIONS = "custom-launch-options";
FEATURES.RELAY_AUTH_HEADER = "relay-auth-header";

FEATURES.SCRIPT_RULE = {};
FEATURES.SCRIPT_RULE.ATTRIBUTES_SUPPORT = "script-rule-html-block";

// MARKETING
FEATURES.INTERCEPTOR = {};
FEATURES.INTERCEPTOR.INTERCEPTOR_LAUNCH = "interceptor-launch";

FEATURES.MOCK_V2 = "mock-v2";
FEATURES.USERNAME_UPDATE_SUPPORT = "feat-username-update-support";

// WORKSPACES
FEATURES.WORKSPACES = "workspaces";
FEATURES.OPEN_SOURCE_ANNOUNCEMENT = "open_source_announcement";

// PERSONA SURVEY
FEATURES.PERSONA_SURVEY = "persona-survey";

FEATURES.NETWORK_SESSIONS = "network-sessions"; // todo: replace redundancy
// API CLIENT
FEATURES.API_CLIENT = "api-client";

// session recording
FEATURES.SESSION_ONBOARDING = "session_onboarding";
FEATURES.SESSION_RECORDING = "session_recording";

// saved network logs
FEATURES.SAVED_NETWORK_LOGS = "saved_network_logs";
FEATURES.DESKTOP_SESSIONS = "all_desktop_session_features";

FEATURES.COMPRESS_RULE_PAIRS = "compress_rule_pairs";

export default FEATURES;
