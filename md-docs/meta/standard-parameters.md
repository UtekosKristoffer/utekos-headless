# Standard Parameters Reference

This document provides a comprehensive reference for standard parameters used
across different platform contexts (Website, App, and Offline).

## Parameter Structure

Each parameter has three variants depending on the platform context:

- **Website Standard Parameters**: Used in web contexts
- **App Standard Parameters**: Used in mobile app contexts (prefixed with `fb_`)
- **Offline Standard Parameters**: Used in offline conversion contexts

---

## Parameters List

### Availability

- **Website**: `availability`
- **App**: `fb_availability`
- **Offline**: `availability`
- **Description**: Value must be `available_soon`, `for_rent`, `for_sale`,
  `off_market`, `recently_sold` or `sale_pending`.

### Body Style

- **Website**: `body_style`
- **App**: `fb_body_style`
- **Offline**: `body_style`
- **Description**: Body style of the vehicle: `CONVERTIBLE`, `COUPE`,
  `HATCHBACK`, `MINIVAN`, `TRUCK`, `SUV`, `SEDAN`, `VAN`, `WAGON`, `CROSSOVER`,
  `OTHER`.

### Check-in Date

- **Website**: `checkin_date`
- **App**: `fb_checkin_date`
- **Offline**: `checkin_date`
- **Description**: The date the user is wanting to check-in to the hotel in the
  hotel's time-zone. We accept dates in `YYYYMMDD`, `YYYY-MM-DD`,
  `YYYY-MM-DDThh:mmTZD` and `YYYY-MM-DDThh:mm:ssTZD`.

### City

- **Website**: `city`
- **App**: `fb_city`
- **Offline**: `city`
- **Description**: Provide the city of the location from user intent.

### Condition of Vehicle

- **Website**: `condition_of_vehicle`
- **App**: `fb_condition_of_vehicle`
- **Offline**: `condition_of_vehicle`
- **Description**: Condition of vehicle.

### Content IDs

- **Website**: `content_ids`
- **App**: `fb_content_ids`
- **Offline**: `content_ids`
- **Description**: The content IDs associated with the event, such as product
  SKUs for items in an AddToCart event. If `content_type` is a product, then
  your content IDs must be an array with a single string value. Otherwise, this
  array can contain any number of string values.

### Content Type

- **Website**: `content_type`
- **App**: `fb_content_type`
- **Offline**: `content_type`
- **Description**: Should be set to `product` or `product_group`:
  - Use `product` if the keys you send represent products. Sent keys could be
    `content_ids` or `contents`.
  - Use `product_group` if the keys you send in `content_ids` represent product
    groups. Product groups are used to distinguish products that are identical
    but have variations such as color, material, size or pattern.

### Contents

- **Website**: `contents`
- **App**: `fb_contents`
- **Offline**: `contents`
- **Description**: A list of JSON objects that contain the product IDs
  associated with the event plus information about the products. Available
  fields: `id`, `quantity`, `item_price`, `delivery_category`.

### Country

- **Website**: `country`
- **App**: `fb_country`
- **Offline**: `country`
- **Description**: Provide the country of the location from user intent.

### Currency

- **Website**: `currency`
- **App**: `fb_currency`
- **Offline**: `currency`
- **Description**: Required for purchase events. The currency for the value
  specified, if applicable. Currency must be a valid ISO 4217 three-digit
  currency code.

### Delivery Category

- **Website**: `delivery_category`
- **App**: `fb_delivery_category`
- **Offline**: `delivery_category`
- **Description**: Optional for purchase events. Type of delivery for a purchase
  event. Supported values are:
  - `in_store` — Customer needs to enter the store to get the purchased product.
  - `curbside` — Customer picks up their order by driving to a store and waiting
    inside their vehicle.
  - `home_delivery` — Purchase is delivered to the customer's home.

### Departing Arrival Date

- **Website**: `departing_arrival_date`
- **App**: `fb_departing_arrival_date`
- **Offline**: `departing_arrival_date`
- **Description**: The date and time for arrival at the destination of the
  outbound journey.

### Departing Departure Date

- **Website**: `departing_departure_date`
- **App**: `fb_departing_departure_date`
- **Offline**: `departing_departure_date`
- **Description**: The date and time for start of the outbound journey.

### Destination Airport

- **Website**: `destination_airport`
- **App**: `fb_destination_airport`
- **Offline**: `destination_airport`
- **Description**: Use official IATA code of destination airport.

### Destination IDs

- **Website**: `destination_ids`
- **App**: `fb_destination_ids`
- **Offline**: `destination_ids`
- **Description**: If you have a destination catalog, you can associate one or
  more destinations in your destination catalog with a specific hotel event.

### DMA Code

- **Website**: `dma_code`
- **App**: `fb_dma_code`
- **Offline**: `dma_code`
- **Description**: The Designated Market Area (DMA) code, which the user looks
  at for offers.

### Drivetrain

- **Website**: `drivetrain`
- **App**: `fb_drivetrain`
- **Offline**: `drivetrain`
- **Description**: Drivetrain of the vehicle: `4X2`, `4X4`, `AWD`, `FWD`, `RWD`,
  `OTHER`, `NONE`.

### Exterior Color

- **Website**: `exterior_color`
- **App**: `fb_exterior_color`
- **Offline**: `exterior_color`
- **Description**: Exterior color.

### Fuel Type

- **Website**: `fuel_type`
- **App**: `fb_fuel_type`
- **Offline**: `fuel_type`
- **Description**: Fuel type of the vehicle: `DIESEL`, `ELECTRIC`, `FLEX`,
  `GASOLINE`, `HYBRID`, `PETROL`, `PLUGIN_HYBRID`, `OTHER`, `NONE`.

### Hotel Score

- **Website**: `hotel_score`
- **App**: `fb_hotel_score`
- **Offline**: `hotel_score`
- **Description**: An indicator representing the relative value of this hotel to
  the advertiser compared to its other hotels.

### Interior Color

- **Website**: `interior_color`
- **App**: `fb_interior_color`
- **Offline**: `interior_color`
- **Description**: Interior color.

### Lead Event Source

- **Website**: `lead_event_source`
- **App**: `lead_event_source`
- **Offline**: `lead_event_source`
- **Description**: Lead event source.

### Lease End Date

- **Website**: `lease_end_date`
- **App**: `fb_lease_end_date`
- **Offline**: `lease_end_date`
- **Description**: Specified using ISO 8601 date format: `YYYY-MM-DD`.

### Lease Start Date

- **Website**: `lease_start_date`
- **App**: `fb_lease_start_date`
- **Offline**: `lease_start_date`
- **Description**: Allows us to recommend properties based off their date
  availability (using `available_dates_price_config` in the catalog), and
  improve the user landing experience (using template tags).

### Listing Type

- **Website**: `listing_type`
- **App**: `fb_listing_type`
- **Offline**: `listing_type`
- **Description**: Value must be `for_rent_by_agent`, `for_rent_by_owner`,
  `for_sale_by_agent`, `for_sale_by_owner`, `foreclosed`, `new_construction` or
  `new_listing`.

### Make

- **Website**: `make`
- **App**: `fb_make`
- **Offline**: `make`
- **Description**: Make or brand of the vehicle.

### Mileage Unit

- **Website**: `mileage.unit`
- **App**: `fb_mileage.unit`
- **Offline**: `mileage.unit`
- **Description**: Mileage unit.

### Mileage Value

- **Website**: `mileage.value`
- **App**: `fb_mileage.value`
- **Offline**: `mileage.value`
- **Description**: Mileage value.

### Model

- **Website**: `model`
- **App**: `fb_model`
- **Offline**: `model`
- **Description**: Model of the vehicle.

### Neighborhood

- **Website**: `neighborhood`
- **App**: `fb_neighborhood`
- **Offline**: `neighborhood`
- **Description**: Neighborhood of interest.

### Net Revenue

- **Website**: `net_revenue`
- **App**: `net_revenue`
- **Offline**: `net_revenue`
- **Description**: The margin value of a conversion event.

### Number of Adults

- **Website**: `num_adults`
- **App**: `fb_num_adults`
- **Offline**: `num_adults`
- **Description**: Number of adults that will be staying.

### Number of Children

- **Website**: `num_children`
- **App**: `fb_num_children`
- **Offline**: `num_children`
- **Description**: Number of children that will be staying.

### Number of Infants

- **Website**: `num_infants`
- **App**: `fb_num_infants`
- **Offline**: `num_infants`
- **Description**: Number of infants that will be staying.

### Number of Items

- **Website**: `num_items`
- **App**: `fb_num_items`
- **Offline**: `num_items`
- **Description**: Use only with InitiateCheckout events. The number of items
  that a user tries to buy during checkout.

### Order ID

- **Website**: `order_id`
- **App**: `fb_order_id`
- **Offline**: `order_id`
- **Description**: The order ID for this transaction as a string.

### Origin Airport

- **Website**: `origin_airport`
- **App**: `fb_origin_airport`
- **Offline**: `origin_airport`
- **Description**: Use official IATA code of departure airport.

### Postal Code

- **Website**: `postal_code`
- **App**: `fb_postal_code`
- **Offline**: `postal_code`
- **Description**: Postal code.

### Predicted LTV

- **Website**: `predicted_ltv`
- **App**: `predicted_ltv`
- **Offline**: `predicted_ltv`
- **Description**: The predicted lifetime value of a conversion event.

### Preferred Baths Range

- **Website**: `preferred_baths_range`
- **App**: `fb_preferred_baths_range`
- **Offline**: `preferred_baths_range`
- **Description**: Number of bathrooms chosen as range.

### Preferred Beds Range

- **Website**: `preferred_beds_range`
- **App**: `fb_preferred_beds_range`
- **Offline**: `preferred_beds_range`
- **Description**: Number of bedrooms chosen as range.

### Preferred Neighborhoods

- **Website**: `preferred_neighborhoods`
- **App**: `fb_preferred_neighborhoods`
- **Offline**: `preferred_neighborhoods`
- **Description**: Preferred neighborhoods.

### Preferred Number of Stops

- **Website**: `preferred_num_stops`
- **App**: `fb_preferred_num_stops`
- **Offline**: `preferred_num_stops`
- **Description**: Indicate the preferred number of stops the user is looking
  for.

### Preferred Price Range

- **Website**: `preferred_price_range`
- **App**: `fb_preferred_price_range`
- **Offline**: `preferred_price_range`
- **Description**: Preferred price range for vehicle. Min/max, up to 2 decimals.

### Preferred Star Ratings

- **Website**: `preferred_star_ratings`
- **App**: `fb_preferred_star_ratings`
- **Offline**: `preferred_star_ratings`
- **Description**: A tuple of minimum and maximum hotel star rating that a user
  is filtering for.

### Price

- **Website**: `price`
- **App**: `fb_price`
- **Offline**: `price`
- **Description**: Cost and currency of the vehicle. Format the price as the
  cost, followed by the ISO currency code, with a space between cost and
  currency.

### Product Catalog ID

- **Website**: `product_catalog_id`
- **App**: `product_catalog_id`
- **Offline**: `product_catalog_id`
- **Description**: Product catalog id.

### Property Type

- **Website**: `property_type`
- **App**: `fb_property_type`
- **Offline**: `property_type`
- **Description**: Must be `apartment`, `condo`, `house`, `land`,
  `manufactured`, `other` or `townhouse`.

### Region

- **Website**: `region`
- **App**: `fb_region`
- **Offline**: `region`
- **Description**: State, district, or region of interest.

### Returning Arrival Date

- **Website**: `returning_arrival_date`
- **App**: `fb_returning_arrival_date`
- **Offline**: `returning_arrival_date`
- **Description**: The date and time when the return journey is done.

### Returning Departure Date

- **Website**: `returning_departure_date`
- **App**: `fb_returning_departure_date`
- **Offline**: `returning_departure_date`
- **Description**: The date and time for start of the return journey.

### Search String

- **Website**: `search_string`
- **App**: `fb_search_string`
- **Offline**: `search_string`
- **Description**: Use only with Search events. A search query made by a user.

### State of Vehicle

- **Website**: `state_of_vehicle`
- **App**: `fb_state_of_vehicle`
- **Offline**: `state_of_vehicle`
- **Description**: State of vehicle.

### Suggested Destinations

- **Website**: `suggested_destinations`
- **App**: `fb_suggested_destinations`
- **Offline**: `suggested_destinations`
- **Description**: Suggested destinations.

### Suggested Home Listings

- **Website**: `suggested_home_listings`
- **App**: `fb_suggested_home_listings`
- **Offline**: `suggested_home_listings`
- **Description**: Suggested home listings.

### Suggested Hotels

- **Website**: `suggested_hotels`
- **App**: `fb_suggested_hotels`
- **Offline**: `suggested_hotels`
- **Description**: Suggested hotels.

### Suggested Jobs

- **Website**: `suggested_jobs`
- **App**: `fb_suggested_jobs`
- **Offline**: `suggested_jobs`
- **Description**: Suggested jobs.

### Suggested Local Service Businesses

- **Website**: `suggested_local_service_businesses`
- **App**: `fb_suggested_local_service_businesses`
- **Offline**: `suggested_local_service_businesses`
- **Description**: Suggested local service businesses.

### Suggested Location Based Items

- **Website**: `suggested_location_based_items`
- **App**: `fb_suggested_location_based_items`
- **Offline**: `suggested_location_based_items`
- **Description**: Suggested location based items.

### Suggested Vehicles

- **Website**: `suggested_vehicles`
- **App**: `fb_suggested_vehicles`
- **Offline**: `suggested_vehicles`
- **Description**: Suggested vehicles.

### Transmission

- **Website**: `transmission`
- **App**: `fb_transmission`
- **Offline**: `transmission`
- **Description**: Transmission of the vehicle: `AUTOMATIC`, `MANUAL`, `OTHER`,
  `NONE`.

### Travel Class

- **Website**: `travel_class`
- **App**: `fb_travel_class`
- **Offline**: `travel_class`
- **Description**: Must be `economy`, `premium`, `business` or `first`.

### Travel End

- **Website**: `travel_end`
- **App**: `fb_travel_end`
- **Offline**: `travel_end`
- **Description**: Travel end date.

### Travel Start

- **Website**: `travel_start`
- **App**: `fb_travel_start`
- **Offline**: `travel_start`
- **Description**: Travel start date.

### Trim

- **Website**: `trim`
- **App**: `fb_trim`
- **Offline**: `trim`
- **Description**: Max characters: 50.

### User Bucket

- **Website**: `user_bucket`
- **App**: `fb_user_bucket`
- **Offline**: `user_bucket`
- **Description**: User bucket.

### Value

- **Website**: `value`
- **App**: `_valueToSum`
- **Offline**: `value`
- **Description**: Required for purchase events or any events that utilize value
  optimization. A numeric value associated with the event. This must represent a
  monetary amount.

### VIN

- **Website**: `vin`
- **App**: `fb_vin`
- **Offline**: `vin`
- **Description**: VIN.

### Year

- **Website**: `year`
- **App**: `fb_year`
- **Offline**: `year`
- **Description**: Year the vehicle was launched in `yyyy` format.

### Item Number

- **Website**: `item_number`
- **App**: `item_number`
- **Offline**: `item_number`
- **Description**: Unique identifier to distinguish events within the same order
  or transaction.

### Ad Type

- **Website**: `ad_type`
- **App**: `ad_type`
- **Offline**: `ad_type`
- **Description**: Ad type.

### Content (Facebook)

- **Website**: `fb_content`
- **App**: `fb_content`
- **Offline**: `fb_content`
- **Description**: A list of JSON object that contains the International Article
  Number (EAN) when applicable, or other product or content identifier(s) as
  well as quantities and prices of the products. Required: `id`, `quantity`.
  Example:
  `"[{\"id\": \"1234\", \"quantity\": 2,}, {\"id\": \"5678\", \"quantity\": 1,}]"`.

### Content ID (Facebook)

- **Website**: `fb_content_id`
- **App**: `fb_content_id`
- **Offline**: `fb_content_id`
- **Description**: International Article Number (EAN) when applicable, or other
  product or content identifier(s). For multiple product ids: e.g.
  `"[\"1234\",\"5678\"]"`.

### Description (Facebook)

- **Website**: `fb_description`
- **App**: `fb_description`
- **Offline**: `fb_description`
- **Description**: A string description.

### Level (Facebook)

- **Website**: `fb_level`
- **App**: `fb_level`
- **Offline**: `fb_level`
- **Description**: Level of a game.

### Max Rating Value (Facebook)

- **Website**: `fb_max_rating_value`
- **App**: `fb_max_rating_value`
- **Offline**: `fb_max_rating_value`
- **Description**: Upper bounds of a rating scale, for example 5 on a 5 star
  scale.

### Payment Info Available (Facebook)

- **Website**: `fb_payment_info_available`
- **App**: `fb_payment_info_available`
- **Offline**: `fb_payment_info_available`
- **Description**: `1` for yes, `0` for no.

### Registration Method (Facebook)

- **Website**: `fb_registration_method`
- **App**: `fb_registration_method`
- **Offline**: `fb_registration_method`
- **Description**: Facebook, Email, Twitter, etc.

### Success (Facebook)

- **Website**: `fb_success`
- **App**: `fb_success`
- **Offline**: `fb_success`
- **Description**: `1` for yes, `0` for no.

### Value to Sum (Internal)

- **Website**: `_valueToSum`
- **App**: `_valueToSum`
- **Offline**: `_valueToSum`
- **Description**: Numeric value of individual event to be summed in reporting.
