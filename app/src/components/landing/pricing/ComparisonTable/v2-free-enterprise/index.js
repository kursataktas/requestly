import React, { useCallback, useState } from "react";
import { RQButton } from "lib/design-system/components";
import sessionImg from "../../../../../assets/icons/session.svg";
import rulesImg from "../../../../../assets/icons/http-rules.svg";
// import BuyForTeamsModal from "../../BuyForTeamsModal";
import ContactUsModal from "components/landing/contactUsModal";
import APP_CONSTANTS from "config/constants";
import FeatureRepresentation from "../../FeatureRepresentation";
import GitHubButton from "react-github-btn";
import { PricingFeatures } from "./pricingFeatures";
import { PricingPlans } from "./pricingPlans";
import underlineIcon from "../../../../../assets/img/icons/common/underline.svg";
import "./index.css";
import { trackViewGithubClicked } from "modules/analytics/events/misc/business";
import StripeClimateBadge from "../../../../../assets/images/pages/pricing-page/Stripe-Climate-Badge.svg";
import { Col, Row, Switch, Tag, Space } from "antd";
import EnterpriseBanner from "./EnterpriseBanner";
import { redirectToCheckout } from "utils/RedirectionUtils";
import WorkspaceDropdown from "components/landing/pricing/WorkspaceDropdown/WorkspaceDropdown";
import { useSelector } from "react-redux";
import { getUserAuthDetails } from "store/selectors";
import { getPlanNameFromId } from "utils/PremiumUtils";
import { actions } from "store";
import { useDispatch } from "react-redux";
import { AUTH } from "modules/analytics/events/common/constants";
import { PricingTable } from "features/pricing";

const PRIVATE_WORKSPACE = {
  name: APP_CONSTANTS.TEAM_WORKSPACES.NAMES.PRIVATE_WORKSPACE,
  id: "private_workspace",
  accessCount: 1,
};

const FreeAndEnterprisePlanTable = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserAuthDetails);

  const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
  const [product, setProduct] = useState(APP_CONSTANTS.PRICING.PRODUCTS.HTTP_RULES);
  const [duration, setDuration] = useState(APP_CONSTANTS.PRICING.DURATION.ANNUALLY);
  const [workspaceToUpgrade, setWorkspaceToUpgrade] = useState(PRIVATE_WORKSPACE);

  const renderButtonsForPlans = useCallback(
    (planName) => {
      const isUserPremium = user?.details?.isPremium;
      const userPlanName = user?.details?.planDetails?.planName;
      const userPlanType = user?.details?.planDetails?.type;
      const userExpiredPlanName =
        user?.details?.planDetails?.status !== "active" ? getPlanNameFromId(user?.details?.planDetails?.planId) : null;
      const isSelectedWorkspacePremium = workspaceToUpgrade?.subscriptionStatus === "active";
      const isPrivateWorksapceSelected = workspaceToUpgrade?.id === PRIVATE_WORKSPACE.id;

      if (planName === APP_CONSTANTS.PRICING.PLAN_NAMES.FREE) {
        if (!user?.details?.isLoggedIn) {
          return (
            <>
              <RQButton
                onClick={() =>
                  dispatch(
                    actions.toggleActiveModal({
                      modalName: "authModal",
                      newValue: true,
                      newProps: {
                        redirectURL: window.location.href,
                        authMode: APP_CONSTANTS.AUTH.ACTION_LABELS.SIGN_UP,
                        eventSource: AUTH.SOURCE.PRICING_PAGE,
                      },
                    })
                  )
                }
                type="primary"
              >
                Signup
              </RQButton>
            </>
          );
        }

        return (
          <>
            <RQButton onClick={() => (window.location.href = "/")} type="primary">
              Use now
            </RQButton>
            {!isUserPremium && <Tag className="current-plan">Current Plan</Tag>}
          </>
        );
      }

      if (isUserPremium) {
        if (userPlanType === "team") {
          if (isPrivateWorksapceSelected || !isSelectedWorkspacePremium) {
            return (
              <RQButton onClick={() => setIsContactUsModalOpen(true)} type="primary">
                Contact us
              </RQButton>
            );
          }
        } else {
          if (!isPrivateWorksapceSelected) {
            return (
              <RQButton onClick={() => setIsContactUsModalOpen(true)} type="primary">
                Contact us
              </RQButton>
            );
          }
        }
      } else {
        if (userExpiredPlanName === planName) {
          if (
            (userPlanType === "individual" && isPrivateWorksapceSelected) ||
            (userPlanType === "team" && !isPrivateWorksapceSelected)
          ) {
            return (
              <>
                <RQButton
                  onClick={() =>
                    redirectToCheckout({
                      mode: isPrivateWorksapceSelected ? "individual" : "team",
                      planName: planName,
                      duration: duration,
                      quantity: workspaceToUpgrade?.accessCount,
                      teamId: isPrivateWorksapceSelected ? null : workspaceToUpgrade?.id,
                    })
                  }
                  type="primary"
                >
                  Renew
                </RQButton>
                {<Tag className="current-plan">Expired</Tag>}
              </>
            );
          }
        }
      }

      if (product === APP_CONSTANTS.PRICING.PRODUCTS.SESSION_REPLAY) {
        if (planName === APP_CONSTANTS.PRICING.PLAN_NAMES.FREE) {
          return (
            <>
              <RQButton onClick={() => (window.location.href = "/")} type="primary">
                Use now
              </RQButton>
              <Tag className="current-plan">Current Plan</Tag>
            </>
          );
        }

        return (
          <RQButton onClick={() => setIsContactUsModalOpen(true)} type="primary">
            Contact us
          </RQButton>
        );
      }

      if (isUserPremium && (isSelectedWorkspacePremium || isPrivateWorksapceSelected) && planName === userPlanName) {
        return (
          <RQButton disabled type="primary">
            Current Plan
          </RQButton>
        );
      }

      return (
        <RQButton
          onClick={() =>
            redirectToCheckout({
              mode: isPrivateWorksapceSelected ? "individual" : "team",
              planName: planName,
              duration: duration,
              quantity: workspaceToUpgrade?.accessCount,
              teamId: isPrivateWorksapceSelected ? null : workspaceToUpgrade?.id,
            })
          }
          disabled={isUserPremium && userPlanName === APP_CONSTANTS.PRICING.PLAN_NAMES.PROFESSIONAL}
          type="primary"
        >
          Upgrade now
        </RQButton>
      );
    },
    [
      duration,
      product,
      user?.details?.isPremium,
      user?.details?.planDetails?.planId,
      user?.details?.planDetails?.planName,
      user?.details?.planDetails?.status,
      user?.details?.planDetails?.type,
      workspaceToUpgrade,
      user?.details?.isLoggedIn,
      dispatch,
    ]
  );

  return (
    <>
      <div className="pricing-table-wrapper">
        <div className="text-center margin-bottom-one">
          <Switch
            size="small"
            checked={duration === APP_CONSTANTS.PRICING.DURATION.ANNUALLY}
            onChange={(checked) => {
              if (checked) {
                setDuration(APP_CONSTANTS.PRICING.DURATION.ANNUALLY);
              } else {
                setDuration(APP_CONSTANTS.PRICING.DURATION.MONTHLY);
              }
            }}
          />
          <span>{"  "}Annual pricing (save 20%)</span>
        </div>
        <div className="text-center">
          <WorkspaceDropdown workspaceToUpgrade={workspaceToUpgrade} setWorkspaceToUpgrade={setWorkspaceToUpgrade} />
        </div>
        <Row>
          <Col className="pricing-table-product-view" xs={24} lg={6}>
            <Col xs={8} sm={8} lg={24}>
              <h1>Products</h1>
            </Col>
            <Col
              className={`pricing-table-product-view-item ${
                product === APP_CONSTANTS.PRICING.PRODUCTS.HTTP_RULES && "active"
              }`}
              onClick={() => {
                setProduct(APP_CONSTANTS.PRICING.PRODUCTS.HTTP_RULES);
              }}
            >
              <div className="pricing-table-product-view-icon">
                <img src={rulesImg} alt="rules" />
              </div>
              <div className="pricing-table-product-view-para">
                <h3>HTTP Rules</h3>
                <p>
                  Intercept & Modify HTTP Requests & Responses. Redirect URLs, Modify Headers, API Request/Response
                  Body, etc
                </p>
              </div>
            </Col>
            <Col
              xs={10}
              sm={12}
              lg={24}
              className={`pricing-table-product-view-item ${
                product === APP_CONSTANTS.PRICING.PRODUCTS.SESSION_REPLAY && "active"
              }`}
              onClick={() => {
                setProduct(APP_CONSTANTS.PRICING.PRODUCTS.SESSION_REPLAY);
              }}
            >
              <div className="pricing-table-product-view-icon">
                <img src={sessionImg} alt="session replay" />
              </div>
              <div className="pricing-table-product-view-para">
                <h3>Session Replay</h3>
                <p>Capture Screen, mouse movement, network, console and more of any browser session</p>
              </div>
            </Col>
          </Col>
          <Col style={{ flex: 1 }}>
            <PricingTable product={product} workspaceToUpgrade={workspaceToUpgrade} duration={duration} />
          </Col>
        </Row>
        <EnterpriseBanner openContactUsModal={() => setIsContactUsModalOpen(true)} />
        <div className="note-container text-gray text-center">
          <span>
            <img alt="StripeClimateBadge" src={StripeClimateBadge} style={{ height: "1em" }} /> At Requestly, we
            contribute 1% of our revenue to carbon removal.&nbsp;
            <a href="https://climate.stripe.com/Ve5kOs" target={"_blank"} rel="noreferrer">
              See how
            </a>
          </span>
        </div>
        <div onClick={trackViewGithubClicked}>
          <GitHubButton
            href="https://github.com/requestly/requestly"
            data-color-scheme="no-preference: dark; light: light; dark: dark;"
            data-size="large"
            data-show-count="false"
            aria-label="Star requestly/requestly on GitHub"
          >
            Requestly on Github
          </GitHubButton>
        </div>
      </div>
      <ContactUsModal
        isOpen={isContactUsModalOpen}
        handleToggleModal={() => setIsContactUsModalOpen(!isContactUsModalOpen)}
      />
    </>
  );
};

export default FreeAndEnterprisePlanTable;
