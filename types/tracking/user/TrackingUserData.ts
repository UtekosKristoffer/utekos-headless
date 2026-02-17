// Path: types/tracking/user/TrackingUserData.ts
import type { MetaUserData } from 'types/tracking/meta/MetaUserData'
export type TrackingUserData = MetaUserData & {
  scid?: string | undefined
  click_id?: string | undefined
  epik?: string | undefined
  ttclid?: string | undefined
  ttp?: string | undefined
}
