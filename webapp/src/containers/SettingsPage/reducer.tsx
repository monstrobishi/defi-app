import { createSlice } from '@reduxjs/toolkit';
import { getAppConfigUnit } from './service';

export const initialState = {
  isFetching: false,
  settingsError: 'Unsupported language.',
  appConfig: {
    language: '',
    unit: getAppConfigUnit(),
    displayMode: '',
    launchAtLogin: false,
    minimizedAtLaunch: false,
    pruneBlockStorage: false,
    scriptVerificationThreads: 0,
    blockStorage: '',
    databaseCache: '',
  },
  isUpdating: false,
  isUpdated: false,
  languages: [],
  amountUnits: [],
  displayModes: [],
};

const configSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    getSettingOptionsRequest(state) {},
    getSettingOptionsSuccess(state, action) {
      state.languages = action.payload.languages;
      state.amountUnits = action.payload.amountUnits;
      state.displayModes = action.payload.displayModes;
    },
    getSettingOptionsFailure(state, action) {
      state.languages = [];
      state.amountUnits = [];
      state.displayModes = [];
    },
    getInitialSettingsRequest(state) {
      state.isFetching = true;
    },
    getInitialSettingsSuccess(state, action) {
      state.appConfig = action.payload;
      state.isFetching = false;
      state.settingsError = '';
    },
    getInitialSettingsFailure(state, action) {
      state.isFetching = false;
      state.settingsError = action.payload;
    },
    updateSettingsRequest(state, action) {
      state.isUpdating = true;
    },
    updateSettingsSuccess(state, action) {
      state.appConfig = action.payload;
      state.isUpdating = false;
      state.settingsError = '';
    },
    updateSettingsFailure(state, action) {
      state.isUpdating = false;
      state.settingsError = action.payload;
    },
  },
});

const { actions, reducer } = configSlice;

export const {
  getSettingOptionsRequest,
  getSettingOptionsSuccess,
  getSettingOptionsFailure,
  getInitialSettingsRequest,
  getInitialSettingsSuccess,
  getInitialSettingsFailure,
  updateSettingsRequest,
  updateSettingsSuccess,
  updateSettingsFailure,
} = actions;

export default reducer;
