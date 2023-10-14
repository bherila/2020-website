/*
create table mls_data
(
    id                          int            not null auto_increment primary key,
    listingIdSHA                varchar(40)    null,
    compassPropertyId           varchar(32)    null,
    prettyAddress               varchar(255)   not null,
    neighborhood                varchar(255)   null,
    city                        varchar(255)   null,
    state                       varchar(255)   null,
    zip                         varchar(255)   null,
    longitude                   decimal(10, 7) null,
    latitude                    decimal(10, 7) null,
    geoId                       varchar(10)    null,
    countyFipsCode              varchar(8)     null,
    bedrooms                    int            null,
    bathrooms                   decimal(2, 1)  null,
    totalBathrooms              decimal(2, 1)  null,
    fullBathrooms               decimal(2, 1)  null,
    squareFeet                  int            null,
    status                      int            null,
    localizedStatus             varchar(255)   null,
    lastPrice                   int            null,
    perSquareFoot               decimal(6, 4)  null,
    buildingIdSHA               varchar(40)    null,
    homeFactsJson               mediumtext     null,
    stories                     int            null,
    totalFinishedSqft           int            null,
    totalAboveGradeFinishedSqft int            null,
    lotSize                     varchar(20)    null,
    style                       varchar(20)    null,
    yearBuilt                   int            null,
    zoning                      varchar(20)    null,
    county                      varchar(20)    null,
    apn                         varchar(20)    null,
    hasFireplace                tinyint(1)     null,
    hasPool                     tinyint(1)     null,
    hasAirConditioning          tinyint(1)     null,
    hasView                     tinyint(1)     null
);
*/

import { z } from 'zod'

export interface MLSData {
  id?: number
  listingIdSHA: string | null
  compassPropertyId: string | null
  prettyAddress: string
  neighborhood: string | null
  city: string | null
  state: string | null
  zip: string | null
  longitude: number | null
  latitude: number | null
  geoId: string | null
  countyFipsCode: string | null
  bedrooms: number | null
  bathrooms: number | null
  totalBathrooms: number | null
  fullBathrooms: number | null
  squareFeet: number | null
  status: number | null
  localizedStatus: string | null
  lastPrice: number | null
  perSquareFoot: number | null
  buildingIdSHA: string | null
  homeFactsJson: string | null
  stories: number | null
  totalFinishedSqft: number | null
  totalAboveGradeFinishedSqft: number | null
  lotSize: string | null
  style: string | null
  yearBuilt: number | null
  zoning: string | null
  county: string | null
  apn: string | null
  hasFireplace: number | null
  hasPool: number | null
  hasAirConditioning: number | null
  hasView: number | null
}

export const MLSDataSchema = z.object({
  id: z.number().optional(),
  listingIdSHA: z.string().nullable(),
  compassPropertyId: z.string().nullable(),
  prettyAddress: z.string(),
  neighborhood: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  longitude: z.number().nullable(),
  latitude: z.number().nullable(),
  geoId: z.string().nullable(),
  countyFipsCode: z.string().nullable(),
  bedrooms: z.number().nullable(),
  bathrooms: z.number().nullable(),
  totalBathrooms: z.number().nullable(),
  fullBathrooms: z.number().nullable(),
  squareFeet: z.number().nullable(),
  status: z.number().nullable(),
  localizedStatus: z.string().nullable(),
  lastPrice: z.number().nullable(),
  perSquareFoot: z.number().nullable(),
  buildingIdSHA: z.string().nullable(),
  homeFactsJson: z.string().nullable(),
  stories: z.number().nullable(),
  totalFinishedSqft: z.number().nullable(),
  totalAboveGradeFinishedSqft: z.number().nullable(),
  lotSize: z.string().nullable(),
  style: z.string().nullable(),
  yearBuilt: z.number().nullable(),
  zoning: z.string().nullable(),
  county: z.string().nullable(),
  apn: z.string().nullable(),
  hasFireplace: z.number().nullable(),
  hasPool: z.number().nullable(),
  hasAirConditioning: z.number().nullable(),
  hasView: z.number().nullable(),
})

/*
create table mls_data_assessor
(
    id             int not null auto_increment primary key,
    mls_data_id    int not null,
    taxYear        int,
    tax            varchar(20),
    dateUpdated    bigint,
    monthlyTax     varchar(20),
    landValue      int,
    additionsValue int,
    year           int,
    previousValue  int
)
*/
export interface MLSDataAssessor {
  id?: number
  mls_data_id: number
  taxYear: number | null
  tax: string | null
  dateUpdated: bigint | null
  monthlyTax: string | null
  landValue: number | null
  additionsValue: number | null
  year: number | null
  previousValue: number | null
}

export const MLSDataAssessorSchema = z.object({
  id: z.number().optional(),
  mls_data_id: z.number(),
  taxYear: z.number().nullable(),
  tax: z.string().nullable(),
  dateUpdated: z.bigint().nullable(),
  monthlyTax: z.string().nullable(),
  landValue: z.number().nullable(),
  additionsValue: z.number().nullable(),
  year: z.number().nullable(),
  previousValue: z.number().nullable(),
})
