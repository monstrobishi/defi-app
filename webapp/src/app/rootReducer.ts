import { combineReducers } from "@reduxjs/toolkit";
import appReducer from "./reducer";
import walletReducer from "../containers/WalletPage/reducer";
import settingsReducer from "../containers/SettingsPage/reducer";
import blockchainReducer from "../containers/BlockchainPage/reducer";
import masterNodesReducer from "../containers/MasternodesPage/reducer";
import { i18nReducer } from "react-redux-i18n";

export default combineReducers({
  app: appReducer,
  wallet: walletReducer,
  settings: settingsReducer,
  blockchain: blockchainReducer,
  masterNodes: masterNodesReducer,
  i18n: i18nReducer,
});