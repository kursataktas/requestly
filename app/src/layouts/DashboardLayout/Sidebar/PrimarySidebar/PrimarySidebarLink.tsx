import React from "react";
import { NavLink } from "react-router-dom";
import { PrimarySidebarItem } from "../type";
import { trackSidebarClicked } from "modules/analytics/events/common/onboarding/sidebar";
import { snakeCase } from "lodash";

export const PrimarySidebarLink: React.FC<PrimarySidebarItem> = ({
  title,
  path,
  icon,
  activeColor = "var(--primary)",
  isExperimentEnabled = false,
}) => (
  <NavLink
    to={path}
    onClick={() => trackSidebarClicked(snakeCase(title))}
    // className={({ isActive }) => `primary-sidebar-link ${isActive ? "primary-sidebar-active-link" : ""}`}
    className="primary-sidebar-link"
    style={({ isActive }) => {
      return {
        borderLeftColor: isActive ? (isExperimentEnabled ? activeColor : "var(--primary)") : null,
      };
    }}
  >
    <span className="icon__wrapper">{icon}</span>
    <span className="link-title">{title}</span>
  </NavLink>
);
