import { MLSData } from '@/app/api/mls/MlsDbInterface'

const listing = {
  listingIdSHA: '1421346255153501081',
  compassPropertyId: 63714126481134990,
  feedListingId: '1421346255153501081',
  listingType: 2,
  sourceFilters: [0],
  location: {
    prettyAddress: '300 Claire Place',
    streetNumber: '300',
    street: 'Claire',
    streetType: 'Pl',
    neighborhood: 'Central Menlo Park',
    subNeighborhoods: ['Central Menlo Park', 'Menlo Park', 'San Mateo County'],
    city: 'Menlo Park',
    state: 'CA',
    zipCode: '94025',
    longitude: -122.1810572,
    latitude: 37.4420943,
    geoId: 'sf',
    timezone: 'America/Los_Angeles',
    countyFipsCode: '06081',
  },
  size: {
    bedrooms: 4,
    fullBathrooms: 3,
    totalBathrooms: 3,
    bathrooms: 3,
    squareFeet: 2635,
  },
  status: 14,
  localizedStatus: 'Active - Coming Soon',
  price: {
    lastKnown: 4500000,
    perSquareFoot: 1707.7798861480076,
    formatted: '$4,500,000',
  },
  date: {
    updated: 1697248877212,
  },
  latestTransaction: true,
  buildingInfo: {
    buildingIdSHA: '4c4f17c22df0e1156ed68e23beb0c91a5a0ace4a',
    buildingAddress: '300 Claire Pl',
  },
  detailedInfo: {
    propertyType: {
      masterType: {
        GLOBAL: ['Single Family'],
      },
    },
    assessorDetails: {
      assessorInfo: {
        title: 'Assessor Information',
        propertyTax: {
          taxYear: '2022',
          tax: '$8,546',
          dateUpdated: 1670457600000,
          monthlyTax: '$712',
        },
        assessment: {
          title: 'Taxable Value',
          landValue: 239466,
          additionsValue: 307820,
          year: '2023',
          previousValue: '$536,556',
          dateUpdated: 1670457600000,
        },
      },
      categories: [
        {
          name: 'Home Facts',
          subCategories: [
            {
              fields: [
                {
                  key: 'Beds',
                  value: '4',
                },
                {
                  key: 'Total Finished SqFt',
                  value: '2,635 SqFt',
                },
                {
                  key: 'Above Grade Finished SqFt',
                  value: '2,635 SqFt',
                },
                {
                  key: 'Stories',
                  value: '2',
                },
                {
                  key: 'Lot Size',
                  value: '11,000 SqFt',
                },
                {
                  key: 'Style',
                  value: 'Single Family Residence',
                },
                {
                  key: 'Year Built',
                  value: '1951',
                },
                {
                  key: 'Zoning',
                  value: 'R10010',
                },
                {
                  key: 'County',
                  value: 'SAN MATEO',
                },
                {
                  key: 'APN',
                  value: '071-370-190',
                },
                {
                  key: 'Fireplace Type',
                  value: 'Has Fireplace',
                },
              ],
            },
          ],
        },
      ],
    },
  },
}

function findFact(list: any, searchKey: string): string | null {
  if (Array.isArray(list)) {
    for (let item of list) {
      const res = findFact(item, searchKey)
      if (res != null) {
        return res
      }
    }
  }
  const { key, value } = list
  if (key === searchKey && typeof value === 'string') {
    return value
  }
  const subitems = Object.keys(list)
  for (let item of subitems) {
    const res = findFact(list[item], searchKey)
    if (res != null) {
      return res
    }
  }
  return null
}

export function parseFromCompass(): MLSData {
  return {
    listingIdSHA: listing.listingIdSHA,
    compassPropertyId: listing.compassPropertyId.toString(),
    prettyAddress: listing.location.prettyAddress,
    neighborhood: listing.location.neighborhood,
    city: listing.location.city,
    state: listing.location.state,
    zip: listing.location.zipCode,
    longitude: listing.location.longitude,
    latitude: listing.location.latitude,
    geoId: listing.location.geoId,
    countyFipsCode: listing.location.countyFipsCode,
    bedrooms: listing.size.bedrooms,
    bathrooms: listing.size.bathrooms,
    totalBathrooms: listing.size.totalBathrooms,
    fullBathrooms: listing.size.fullBathrooms,
    squareFeet: listing.size.squareFeet,
    status: listing.status,
    localizedStatus: listing.localizedStatus,
    lastPrice: listing.price.lastKnown,
    perSquareFoot: listing.price.perSquareFoot,
    buildingIdSHA: listing.buildingInfo.buildingIdSHA,
    homeFactsJson:
      listing.detailedInfo.assessorDetails.assessorInfo.propertyTax.tax,
    // landValue: listing.detailedInfo.assessorDetails.assessorInfo.assessment.landValue,
    totalFinishedSqft:
      listing.detailedInfo.assessorDetails.assessorInfo.assessment
        .additionsValue,
    stories: Number(findFact(listing.detailedInfo.assessorDetails, 'Stories')),
    totalAboveGradeFinishedSqft: Number(
      findFact(
        listing.detailedInfo.assessorDetails,
        'Above Grade Finished SqFt',
      ),
    ),
    lotSize: findFact(listing.detailedInfo.assessorDetails, 'Lot Size'),
    style: findFact(listing.detailedInfo.assessorDetails, 'Style'),
    yearBuilt: Number(
      findFact(listing.detailedInfo.assessorDetails, 'Year Built'),
    ),
    zoning: findFact(listing.detailedInfo.assessorDetails, 'Zoning'),
    county: findFact(listing.detailedInfo.assessorDetails, 'County'),
    apn: findFact(listing.detailedInfo.assessorDetails, 'APN'),
    hasFireplace:
      findFact(listing.detailedInfo.assessorDetails, 'Fireplace Type') ===
      'Has Fireplace'
        ? 1
        : 0,
    hasPool: null,
    hasAirConditioning: null,
    hasView: null,
  }
}
