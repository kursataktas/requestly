import { BillingTeamDetails } from "features/settings/components/BillingTeam/types";
import { ReducerKeys } from "store/constants";
import { RootState } from "store/types";

export const getAvailableBillingTeams = (state: RootState): BillingTeamDetails[] => {
  return state[ReducerKeys.BILLING].availableBillingTeams;
};

export const getBillingTeamById = (id: string) => (state: RootState): BillingTeamDetails | undefined => {
  const allAvailableBillingTeams = getAvailableBillingTeams(state);
  return allAvailableBillingTeams.find((billingTeam) => billingTeam.id === id);
};
