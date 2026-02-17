// Path: types/tracking/meta/event/MetaEventData.ts

import type { MetaContentItem } from '../MetaContentItem'

export type MetaEventData = {
  value?: number | undefined
  currency?: string | undefined
  content_name?: string | undefined
  content_type?: string | undefined
  content_category?: string | undefined
  content_ids?: string[] | undefined
  contents?: MetaContentItem[] | undefined
  num_items?: number | undefined
  order_id?: string | undefined
  search_string?: string | undefined
}
