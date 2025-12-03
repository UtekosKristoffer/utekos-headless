// Path: src/lib/meta/metaSdkHelpers.ts

import * as bizSdk from 'facebook-nodejs-business-sdk'
export const {
  FacebookAdsApi,
  ServerEvent,
  UserData: FacebookUserData,
  CustomData: FacebookCustomData,
  EventRequest: FacebookEventRequest
} = bizSdk
export function facebookApiInit() {
  const token = process.env.META_SYSTEM_USER_TOKEN!
  bizSdk.FacebookAdsApi.init(token)
}
