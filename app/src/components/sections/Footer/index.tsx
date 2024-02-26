import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { actions } from "store";
import { Typography, Row, Col, Button, Tooltip } from "antd";
import { getIsSecondarySidebarCollapsed } from "store/selectors";
import { PicRightOutlined, ReadOutlined, CalendarOutlined, ApiOutlined } from "@ant-design/icons";
import { FaYCombinator } from "@react-icons/all-files/fa/FaYCombinator";
import { redirectToUrl } from "utils/RedirectionUtils";
import APP_CONSTANTS from "config/constants";
import { Footer } from "antd/lib/layout/layout";
import { trackFooterClicked } from "modules/analytics/events/common/onboarding/footer";
import "./Footer.css";

const { Text } = Typography;
const { PATHS } = APP_CONSTANTS;
const PAGES_WITHOUT_FOOTER = [PATHS.SETTINGS.RELATIVE];

const AppFooter: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const SHOW_YC_BRANDING = false;
  const isSecondarySidebarCollapsed = useSelector(getIsSecondarySidebarCollapsed);
  const isSidebarToggleAllowed = useMemo(
    () =>
      [APP_CONSTANTS.PATHS.RULES.INDEX, APP_CONSTANTS.PATHS.MOCK_SERVER.INDEX].some((path) => pathname.includes(path)),
    [pathname]
  );

  const handleSecondarySidebarToggle = (e: React.MouseEvent) => {
    dispatch(actions.updateSecondarySidebarCollapse(!isSecondarySidebarCollapsed));
    trackFooterClicked("secondary_sidebar_toggle");
  };

  const renderFooterLinks = () => {
    return (
      <div className="app-footer-links">
        <Text
          className="cursor-pointer"
          onClick={() => {
            trackFooterClicked("Book a demo");
            redirectToUrl(APP_CONSTANTS.LINKS.BOOK_A_DEMO, true);
          }}
        >
          <span className="icon__wrapper">
            <CalendarOutlined />
          </span>
          Book a demo
        </Text>
        <Text
          className="cursor-pointer"
          onClick={() => {
            trackFooterClicked("documentation");
            redirectToUrl(APP_CONSTANTS.LINKS.REQUESTLY_DOCS, true);
          }}
        >
          <span className="icon__wrapper">
            <ReadOutlined />
          </span>
          Documentation
        </Text>
        <Text
          className="cursor-pointer"
          onClick={() => {
            trackFooterClicked("API documentation");
            redirectToUrl(APP_CONSTANTS.LINKS.REQUESTLY_API_DOCS, true);
          }}
        >
          <span className="icon__wrapper">
            <ApiOutlined />
          </span>
          API documentation
        </Text>
      </div>
    );
  };

  const renderYCBranding = () => {
    return (
      <Text>
        Backed by{" "}
        <span
          style={{ color: "orange", cursor: "pointer" }}
          onClick={() => window.open("https://twitter.com/ycombinator/status/1468968505596776469", "_blank")}
        >
          <FaYCombinator className="fix-icon-is-up" /> Combinator
        </span>
      </Text>
    );
  };

  if (PAGES_WITHOUT_FOOTER.some((path) => pathname.includes(path))) return null;

  return (
    <>
      <Footer className="app-layout-footer">
        <Row align="middle" justify="space-between" className="w-full">
          {isSidebarToggleAllowed && (
            <Col>
              <Tooltip title={`${isSecondarySidebarCollapsed ? "Expand" : "Collapse"} sidebar`} placement="topRight">
                <Button
                  type="text"
                  icon={<PicRightOutlined />}
                  className="footer-sidebar-toggle-btn"
                  onClick={handleSecondarySidebarToggle}
                />
              </Tooltip>
            </Col>
          )}

          <Col className="ml-auto">{SHOW_YC_BRANDING ? renderYCBranding() : renderFooterLinks()}</Col>
        </Row>
      </Footer>
    </>
  );
};

export default AppFooter;
