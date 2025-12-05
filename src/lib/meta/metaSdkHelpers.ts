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
  const token = process.env.META_ACCESS_TOKEN
  if (!token) {
    throw new Error('META_ACCESS_TOKEN environment variable is not defined')
  }
  bizSdk.FacebookAdsApi.init(token)
}
