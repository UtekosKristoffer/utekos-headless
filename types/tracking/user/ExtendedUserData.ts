// Path: types/tracking/user/ExtendedUserData.ts
import type { MetaUserData } from 'types/tracking/meta/MetaUserData'
export type ExtendedUserData = MetaUserData & {
  scid?: string | undefined
  click_id?: string | undefined
  epik?: string | undefined
  email_hash?: string | undefined
}
