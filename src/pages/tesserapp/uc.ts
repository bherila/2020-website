import * as fs from 'fs';
import {getParamsWithUuid, optional, required} from "./schemaHelpers";
import {ApiDescription, Argument, IEntity, ISchema} from "./schema";
import {gCsType} from "./cstypes";

const header = "// WARNING: This file is auto generated! Manual changes may be lost.";

const schema: ISchema = {
    batchInfo: {
        properties: {
            batchId: required('uuid'),
            batchCreated: required('timestamp'),
            batchPrintDate: optional('timestamp'),
            batchComment: optional('string'),
            batchFlag: required('int')
        },
        sql: {
            table: 'ship_batch',
            searchProperties: ['batchId'],
            readOnly: false,
            identityProperty: 'batchId',
            columnOverride: {
                batchId: 'ship_batch_id',
                batchCreated: 'ship_batch_created', 
                batchPrintDate: 'ship_batch_print_date', 
                batchComment: 'ship_batch_comment', 
                batchFlag: 'ship_batch_flag'
            }
        }
    },
    orderTime: {
        properties: {
            orderGuid: required('uuid'),
            timestamp: required('timestamp')
        }
    },
    // codeWithOrder: {
    //     properties: {
    //         code: required('string'),
    //         usedWithOrders: required('set<uuid>'),
    //         redeemedForCredit: required('set<creditTime>'),
    //         isReferral: required('bool'),
    //         dateRedeemed: optional('datetime')
    //     }
    // },
    creditTime: {
        properties: {
            creditId: required('uuid'),
            creditDate: required('timestamp'),
            dateUsed: optional('timestamp'),
            originalAmt: required('decimal')
        }
    },
    nhCohort: {
        properties: {
            cohortPeriod: required('string'),
            cohortSize: required('int'),
            totalQty: required('int'),
            totalOrders: required('int'),
            totalRev: required('decimal'),
            userLifetimeMth: required('int'),
            totalCogs: required('decimal'),
            totalDiscount: required('decimal'),
            totalCreditRdmp: required('decimal')
        }
    },
    misc: {
        properties: {
            id: required('uuid'),
            created: required('timestamp'),
            key: {
                type: 'string',
                required: false,
                minLength: 0,
                maxLength: 255
            },
            numericValue: {
                type: 'int',
                required: false
            },
            stringValue: {
                type: 'text',
                required: false
            },
            stringValue2: {
                type: 'text',
                required: false
            },
            guidValue: {
                type: 'uuid',
                required: false
            }
        },
        sql: {
            identityProperty: 'id',
            searchProperties: ['id', 'key', 'guidValue', ['key', 'guidValue']],
            table: 'misc',
            columnOverride: {
                numericValue: 'val_num',
                stringValue: 'val_str',
                stringValue2: 'val_str2',
                guidValue: 'val_guid'
            }
        }
    },
    offerInfo: {
        properties: {
            offerGuid: required('uuid'),
            title: optional('string'),
            subtitle: optional('string'),
            offerImgCsv: optional('string'),
            offerContent: optional('string'),
            lifecycleUrl: optional('string'),
            wineryNotes: optional('string'),
            wineryName: optional('string'),
            wineryAbout: optional('string'),
            shippingAvailability: optional('string'),
            minQtyAllow: required('int'),
            maxQtyAllow: required('int'),
            pricePerBottle: required('decimal'),
            expiryDate: optional('timestamp'),
            startDate: optional('timestamp'),
            url: required('string'),
            dateCreated: required('timestamp'),
            isApproved: required('bool'),
            isSideDeal: required('bool'),
            isFeatured: required('bool'),
            priority: required('int'),
            metaTitle: optional('string'),
            metaDescription: optional('string'),
            metaKeywords: optional('string'),
            buyText: optional('string'),
            enableDoubleDown: required('bool'),
            enableAutobuy: required('bool'),
            adminNotes: optional('string'),
            offerItemName: optional('string'),
            offerItemNamePlural: optional('string'),
            capturedDate: optional('string'),
            enablePromo: required('bool'),
            enableCredit: required('bool'),
            enableTax: required('bool'),
            scrambleRatio: required('int'),
            brandingPartner: optional('string'),
            bottlesRemaining: required('int'),
            offerTotal: required('decimal'),
            offerTax: required('decimal'),
            offerPq: required('decimal'),
            offerDisc: required('decimal'),
            offerCred: required('decimal'),
            offerUniq: required('decimal'),
            cacheRefreshTime: optional('timestamp'),
            allowRecurrence: required('bool'),
            isClosed: required('bool'),
            primaryVarietal: optional('string'),
        },
        sql: {
            table: "offerv2_offer",
            identityProperty: 'offerGuid',
            readOnly: false,
            searchProperties: ['offerGuid', 'url'],
            columnOverride: {
                offerGuid: "offer_guid",
                title: "offer_title",
                subtitle: "offer_subtitle",
                offerImgCsv: "offer_img",
                offerContent: "offer_content",
                lifeCode: "offer_lifecode",
                lifecycleUrl: "offer_lifecycle_url",
                wineryNotes: "offer_winemakrnote",
                wineryName: "offer_wineryname",
                wineryAbout: "offer_wineryabout",
                shippingAvailability: "offer_shipnotes",
                minQtyAllow: "offer_min_qty",
                maxQtyAllow: "offer_max_qty",
                pricePerBottle: "offer_price",
                expiryDate: "offer_expiry",
                startDate: "offer_start",
                url: "offer_url_key",
                dateCreated: "offer_date",
                isApproved: "offer_approved",
                isSideDeal: "offer_is_side_deal",
                isFeatured: "offer_is_featured",
                priority: "offer_priority",
                metaTitle: "offer_meta_title",
                metaDescription: "offer_meta_description",
                metaKeywords: "offer_meta_keywords",
                buyText: "offer_buy_text",
                enableDoubleDown: "offer_enable_spinagain",
                enableAutobuy: "offer_enable_autobuy",
                adminNotes: "offer_admin_notes",
                offerItemName: "offer_item_name",
                offerItemNamePlural: "offer_item_name_pl",
                capturedDate: "offer_captured_dt",
                enablePromo: "offer_promo_allowed",
                enableCredit: "offer_credit_allowed",
                enableTax: "offer_enable_tax",
                scrambleRatio: "offer_scramble_ratio",
                brandingPartner: "offer_branding_partner",
                bottlesRemaining: "offer_cache_btl_remaining",
                offerTotal: "offer_cache_btl_total",
                cacheLiveFeedJson: "offer_cache_live_feed_json",
                cacheItemGroupsJson: "offer_cache_item_group_json",
                offerTax: "offer_cache_tax",
                offerPq: "offer_cache_pq",
                offerDisc: "offer_cache_disc",
                offerCred: "offer_cache_cred",
                offerUniq: "offer_cache_unique_buyers",
                cacheRefreshTime: "offer_cache_refresh_dt",
                allowRecurrence: "offer_can_recur",
                isClosed: "offer_is_closed",
                primaryVarietal: "offer_primary_varietal",
            }
        }
    },
    order_v4: { // Created when the order is placed.
      properties: {
          orderGuid: required('uuid'),
          orderUser: required('uuid'),
          orderQty: required('int'), // count of orderItem
          orderSubtotal: required('decimal'),
          orderTax: required('decimal'),
          orderType: required('int'), // 1=offer, 2=shipment, 3=marketplace, etc.
          orderDateCreated: required('timestamp'),
          orderDateFulfilled: optional('timestamp'),
          orderDateRejected: optional('timestamp'),
          
          // Finance fields.
          // We don't really care about whether it was a "credit" or "promo" but rather which "account"
          // is paying for the purchase.
          amtPaidByReferral: required('decimal'), // referral discounts/credits go here.
          amtPaidByCustomerService: required('decimal'), // customer service discounts/credits, including swaps.
          amtPaidByMarketing: required('decimal'), // marketing discounts/credits (i.e. end of month promo)
          amtPaidByGiftCard: required('decimal'), // customer's credit balance
          amtPaidByCard: required('decimal'), // amount charged to customer's card
          
          // COGS Fields.
          orderEstimatedCogs: required('decimal'), // estimated COGS "liability" at time order is placed
          orderEstimatedShipCost: required('decimal'), // estimated Shipping Cost "liability" at time order is placed
          orderEstimatedLaborCost: required('decimal'), // estimated labor cost "liability" at time order is placed
          
          // Credit card payment fields.
          ccPaymentId: optional('uuid'),
          ccTransactionId: optional('string'),
          ccTransactionAuthCode: optional('string'),
          ccRefundId: optional('string'),
          ccRefundAuthCode: optional('string')
      }  
    },
    orderDerivedData: { // Calculated when requested, not stored in database directly.
      properties: {
          // keys (for looking up in SQL VIEW order_derived_data)
          user_guid: required('uuid'),
          order_guid: required('uuid'),
          
          // existing calculated metrics fields:
          order_timestamp: required('uuid'),
          order_user_nth: required('int'),
          order_days_since_lp: required('int'),
          order_days_since_fp: required('int'),
          order_days_since_signup: required('int'),
          user_email: required('string'),
          user_is_testaccount: required('bool'),
          
          // new
          orderCurrentCogs: required('int'), // COGS of the manifests CURRENTLY allocated to order i.e. after swaps
      }  
    },
    orderLineItem: { // Created when the order is placed. For an order from daily offer, there would be 1 line item to order X bottles from the offer.
        properties: {
            orderGuid: required('uuid'),
            itemId: required('uuid'),
            itemQty: required('int'),
            itemUnitPrice: required('decimal'),
            itemTax: required('decimal'),
            
        }
    },
    promoAllowed: {
        properties: {
            userGuid: required('uuid'),
            isAllowed: required('bool')
        }
    },
    session: {
        properties: {
            partition: required('string'),
            row: required('string'),
            userId: required('uuid'),
            createdAt: required('timestamp')
        },
        kvStore: {
            table: 'session',
            partitionKeyProp: 'partition',
            rowKeyProp: 'row',
        },
    },
    skuToSupplierRelation: {
        properties: {
            relationId: required('uuid'),
            sku: required('string'),
            supplierGuid: required('uuid')
        },
        sql: {
            table: 'sku_to_supplier',
            identityProperty: 'relationId',
            readOnly: false,
            searchProperties: ['sku', 'supplierGuid'],
            columnOverride: {
                sku: 'sku',
                supplierGuid: 'supplier_guid',
                relationId: 'id'
            }
        }
    },
    supplier: {
        properties: {
            supplierGuid: required('uuid'),
            supplierName: required('string'),
            supplierContactName1: optional('string'),
            supplierContactAlternateName: optional('string'),
            supplierContact: optional('string'),
            supplierPreferredPayment: optional('string'),
            supplierPreferredCourier: optional('string')
        },
        sql: {
            table: 'supplier',
            identityProperty: 'supplierGuid',
            readOnly: false,
            searchProperties: ['supplierGuid'],
            columnOverride: {
                supplierGuid: 'supplier_guid',
                supplierName: 'supplier_name',
                supplierContactName1: 'supplier_contact_name1',
                supplierContactAlternateName: 'supplier_contact_name2',
                supplierContact: 'supplier_contact_email',
                supplierPreferredPayment: 'supplier_preferred_payment',
                supplierPreferredCourier: 'supplier_preferred_courier',
            }
        }
    },
    userAuth: {
        properties: {
            email: {
                type: "string",
                required: true,
                maxLength: 100,
                minLength: 1
            },
            password: {
                type: "string",
                required: true,
                maxLength: 100,
                minLength: 1
            }
        }
    },
    userCreditView: {
        properties: {
            userEmail: required('string'),
            userGuid: required('uuid'),
            eventName: required('string'),
            eventDate: required('timestamp'),
            amount: required('decimal'),
            balance: required('decimal'),
            creditComment: optional('string'),
            creditUsedWithOrders: optional('string'),
            creditRefundForOrder: optional('string'),
            creditGuid: required('uuid'),
            creditForManifest: optional('uuid'),
            creditForGiftCard: optional('string'),
            creditForShipment: {
                type: 'uuid',
                noStore: true
            },
            upgradeEligible: optional('bool'),
            shipmentEligible: optional('bool'),
            itemEligible: optional('bool'),
            chMd5: optional('string')
        },
        sql: {
            table: 'user_credit_view',
            identityProperty: 'chMd5',
            searchProperties: ['userEmail', 'userGuid', 'creditGuid'],
            readOnly: true,
            columnOverride: {
                chMd5:'ch_hash',
                eventDate:'event_date',
                userEmail:'user_email',
                userGuid:'n_user_guid',
                event: 'event',
                amount:'credit_added',
                creditComment:'credit_comment',
                creditUsedWithOrders:'credit_used_with_orders',
                creditRefundForOrder:'cr_refund_order',
                creditGuid:'credit_guid',
                creditForManifest:'cr_for_mf',
                creditForGiftCard:'cr_for_gc',
                upgradeEligible:'cr_can_upgrade',
                shipmentEligible:'cr_can_ship',
                itemEligible:'cr_can_singleitem',
            }
        }
    },
    userAuthResponse: {
        properties: {
            emailOk: required('bool'),
            isAuthenticated: required('bool'),
            hasEmail: required('bool'),
            hasPassword: required('bool'),
            hasFbToken: required('bool'),
            session: required('session'),
            user: required('user')
        },
    },
    userLoginRecord: {
        properties: {
            loginRecordId: required('uuid'),
            loginUserId: required('uuid'),
            loginTime: required('timestamp'),
            loginNext: required('string')
        },
    },
    user: {
        properties: {
            id: {
                type: 'uuid',
                required: true
            },
            email: {
                type: "string",
                required: true,
                maxLength: 100,
                minLength: 1
            },
            password: {
                type: "string",
                required: true,
                maxLength: 100,
                minLength: 1
            }
        },
        sql: {
            identityProperty: 'id',
            table: 'user_list',
            searchProperties: ['id', 'email'],
            columnOverride: {
                email: 'user_email',
                password: 'user_password_hash',
                id: 'user_guid'
            }
        }
    },
    address: {
        properties: {
            id: {
                type: "uuid",
                required: true
            },
            userId: {
                type: "uuid",
                required: true
            },
            address1: {
                type: "string",
                required: true,
                maxLength: 100,
                minLength: 1
            },
            address2: {
                type: "string",
                required: false,
                maxLength: 100,
                minLength: 0
            },
            city: {
                type: "string",
                required: true,
                maxLength: 100,
                minLength: 1
            },
            state: {
                type: "string",
                required: true,
                maxLength: 2,
                minLength: 2
            },
            zip: {
                type: "string",
                required: true,
                maxLength: 5,
                minLength: 5
            }
        },
        sql: {
            identityProperty: 'id',
            searchProperties: ['id', 'userId'],
            table: 'user_address',
            columnOverride: {}
        }
    }
};


function camel(str: string): string {
    return str.replace(/^\w/, c => c.toUpperCase());
}

function buildSql(name: string, model: IEntity) {
    function csType(modelPropName: string) {
        return gCsType(model, model.properties[modelPropName]);
    }
    
    function emitSql() {
        if (!model.sql) return '';
        const propNames = Object.keys(model.properties)
            .filter(property => 
                !model.properties[property].noStore && 
                model.properties[property].type.indexOf('<') < 0);
        
        const cn = camel(name);
        const genericType = `<${cn}>`;
        const colNames: Record<string, string> = {};
        for (const propName of propNames) {
            colNames[propName] = (model.sql.columnOverride || {})[propName] || propName;
        }
        const idProp = model.sql.identityProperty;
        const idCol = colNames[idProp];
        if (typeof idCol === 'undefined') {
            throw `idCol ${model.sql.identityProperty || 'undefined'} not found on model ${name}`;
        }
        const stringList = 'new List<string>()';
        return `
        ${!model.sql.readOnly ? `
        public const string PgSqlInsert = @"INSERT INTO ${model.sql.table || name} (${propNames.map(pn => colNames[pn]).join(', ')}) 
            VALUES (${propNames.map(pn => `@${camel(pn)}`).join(', ')})";

        // ReSharper disable once IdentifierTypo
        public const string PgSqlUpsert = @"INSERT INTO ${model.sql.table || name} (${propNames.map(pn => colNames[pn]).join(', ')}) 
            VALUES (${propNames.map(pn => `@${camel(pn)}`).join(', ')})
            ON CONFLICT (${idCol}) DO UPDATE SET ${propNames
            .filter(pn => pn !== idProp)
            .map(pn => `
                ${colNames[pn]} = excluded.${colNames[pn]}`).join(',')}";
        ` : ''}
        public const string PgSqlSelectAll = @"SELECT ${propNames.map(pn => colNames[pn]).join(', ')}
            FROM ${model.sql.table || name} LIMIT @take OFFSET @skip";

        public const string PgSqlSelectByIdentity = @"SELECT ${propNames.map(pn => colNames[pn]).join(', ')}
            FROM ${model.sql.table || name} WHERE ${idCol} = ANY(@${camel(idProp)})";

        public const string PgSqlDeleteByIdentity = @"DELETE FROM ${model.sql.table || name} WHERE ${idCol} = ANY(@${camel(idProp)})";

        public static readonly string[] ColumnNames = new [] {${propNames.map(pn => `
            "${colNames[pn]}"`).join(',')}
        };
        
        public static IReadOnlyList${genericType} Load${cn}(this IDbConnection connection, int skip = 0, int take = 1000) {
            return connection.Query(PgSqlSelectAll, new {skip, take})
                .Select(BuildFromDynamicRow)
                .Cast${genericType}()
                .ToList();
        }
        
        public static IReadOnlyList${genericType} Load${cn}(this IDbConnection connection, params ${csType(idProp)}[] id) {
            return connection.Query(PgSqlSelectByIdentity, new { id })
                .Select(BuildFromDynamicRow)
                .Cast${genericType}()
                .ToList();
        }
        
        public static IReadOnlyList${genericType} Find${cn}(this IDbConnection connection, ${cn} prototype, int skip = 0, int take = 1000) {
            var filters = ${stringList};
            var dp = new DynamicParameters();
            filters.Add("TRUE");
            ${propNames.map(pn => `
            if (prototype.${camel(pn)} != default(${csType(pn)})) {
                dp.Add("@${camel(pn)}", prototype.${camel(pn)});
                filters.Add("${colNames[pn]} = @${camel(pn)}");
            }
            `).join('')}
            var sql = @"SELECT ${propNames.map(pn => colNames[pn]).join(', ')}
                FROM ${model.sql.table || name}
                WHERE " + string.Join(" AND ", filters) +" LIMIT @dpReservedTake OFFSET @dpReservedSkip";
            dp.Add("dpReservedTake", take);
            dp.Add("dpReservedSkip", skip);
            return connection.Query(sql, dp)
                .Select(BuildFromDynamicRow)
                .Cast${genericType}()
                .ToList();
        }
        ${!model.sql.readOnly ? `
        public static int Save(this IDbConnection connection, ${cn} entity, bool validate = true) {
            if (validate) entity.Validate(); 
            return connection.Execute(PgSqlInsert, entity);
        }
        
        public static int SaveOrUpdate(this IDbConnection connection, ${cn} entity, bool validate = true) {
            if (validate) entity.Validate();
            return connection.Execute(PgSqlUpsert, entity);
        }` : ''}

        public static ${cn} BuildFromDynamicRow(dynamic row) {
            return new ${cn}.Builder()${propNames.map(pn => `
                .Set${camel(pn)}((${csType(pn)})(row.${colNames[pn]} ?? default(${csType(pn)})))`).join('')}
                .ValidateAndBuild();
        }`;
    }


    // make the class
    if (!model.sql) return null;
    return `${header}
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;

namespace UC.Models.Sql {
    public static class ${camel(name)}SqlUtility {
        ${emitSql()}
    }
}
`;
}


function buildTableHelper(name: string, model: IEntity) {
    function csType(modelPropName: string) {
        return gCsType(model, model.properties[modelPropName]);
    }

    function emitNoSql() {
        if (!model.kvStore) return '';
        const propNames = Object.keys(model.properties)
            .filter(property =>
                !model.properties[property].noStore &&
                model.properties[property].type.indexOf('<') < 0);

        const cn = camel(name);
        const tbl = model.kvStore.table;
        const pk = model.kvStore.partitionKeyProp;
        const rk = model.kvStore.rowKeyProp;
        const genericType = `<${cn}>`;
        const dict = 'IDictionary<string, EntityProperty>';

        const propNamesWithoutKeys = propNames.filter(pn => pn !== pk && pn !== rk);

        return `
        public static IEnumerable${genericType} Retrieve${cn}(this CloudTableClient client, string ${pk} = null) {
            TableContinuationToken token = null;
			var table = client.GetTableReference("${tbl}");
			var q = new TableQuery();
			if (!String.IsNullOrEmpty(${pk})) {
				q.FilterString = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, ${pk});
			}
			do {
				var queryResult = Task.Run(() => table.ExecuteQuerySegmentedAsync(q, Resolve${camel(cn)}, token)).GetAwaiter().GetResult();
				foreach (var item in queryResult.Results) yield return item;
				token = queryResult.ContinuationToken;
			} while (token != null);
		}
        ${['InsertOrReplace', 'InsertOrMerge', 'Insert', 'Merge', 'Replace'].map(op => `
        public static async Task${genericType} ${op}(this CloudTableClient client, ${cn} value) {
			var operation = TableOperation.${op}(Entity(value));
			var result = await client.GetTableReference("${tbl}").ExecuteAsync(operation);
			return (${camel(cn)}) result.Result;
		}
		`).join('')}
		private static DynamicTableEntity Entity(${camel(cn)} value) {
			var entity = new DynamicTableEntity(value.${camel(pk)}, value.${camel(rk)});
			entity.ETag = "*";
			${propNamesWithoutKeys.map(pn => `
			entity.Properties.Add("${camel(pn)}", new EntityProperty(value.${camel(pn)}));`).join('')}
			return entity;
		}
		
		private static ${camel(cn)} Resolve${camel(cn)}(string pk, string rk, DateTimeOffset ds, ${dict} properties, string eTag) {
            var entity = new ${cn}.Builder()
                .Set${camel(pk)}(pk)
                .Set${camel(rk)}(rk);
            ${propNamesWithoutKeys.map(pn => `
			if (properties.TryGetValue("${camel(pn)}", out var ${pn})) {
				entity.Set${camel(pn)}((${csType(pn)}) ${pn}.PropertyAsObject);
			}`).join('')}
			return entity.Build();
		}`;
    }


    // make the class
    if (!model.kvStore) return null;
    return `${header}
using Microsoft.Extensions.Logging;
using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace UC.Models.TableServiceExtensions {
    public static class ${camel(name)}TableServiceExtensions {
        ${emitNoSql()}
    }
}
`;
}

function buildEntity<TModel extends IEntity>(name: string, model: TModel) {
    function csType(modelPropName: string) {
        return gCsType(model, model.properties[modelPropName]);
    }

    function emitProperties() {
        const propNames = Object.keys(model.properties);
        return propNames.map(propName => `
        [JsonProperty("${propName}")] public ${csType(propName)} ${camel(propName)} { get; protected set; } 
        `).join('');
    }

    function copyConstructor() {
        const propNames = Object.keys(model.properties);
        if (propNames.indexOf('value') > -1) {
            throw `propName 'value' is not supported`;
        }
        return `
        public ${camel(name)}(${camel(name)} @value) {
            ${propNames.map(propName => `
            this.${camel(propName)} = @value.${camel(propName)};`).join('')}
        }
        `;
    }

    function allArgsConstructor() {
        const propNames = Object.keys(model.properties);
        return `
        public ${camel(name)}() {}
        public ${camel(name)}(${propNames.map(propName => `
            ${csType(propName)} ${propName}`).join(',')}) {
                ${propNames.map(propName => `
            this.${camel(propName)} = ${propName};`).join('')}
        }
        `;
    }

    function builderClass() {
        const outerClassName = name;
        const properties = model.properties;
        return `
        public sealed class Builder {
            private ${camel(outerClassName)} _buildingObject;
            
            public Builder() {
                _buildingObject = new ${camel(outerClassName)}();     
            }
            
            public Builder(${camel(outerClassName)} @value) {
                _buildingObject = new ${camel(outerClassName)}(@value);
            }
            
            ${Object.keys(properties).map(propName => `
            public Builder Set${camel(propName)}(${csType(propName)} new${camel(propName)}) {
                _buildingObject.${camel(propName)} = new${camel(propName)};
                return this;                
            }
            `).join('')}
            
            /// Apply all the non-default values in the given newValues object.
            public Builder Merge(${camel(outerClassName)} newValues) {
                ${Object.keys(properties).map(propName => `
                if (newValues.${camel(propName)} != default(${csType(propName)})) {
                    _buildingObject.${camel(propName)} = newValues.${camel(propName)};
                }`).join('')}
                return this;
            }
            
            public ${camel(outerClassName)} Build() {
                return _buildingObject;
            }
            
            public ${camel(outerClassName)} ValidateAndBuild() {
                _buildingObject.Validate();
                return _buildingObject;
            }
        }
        
        public Builder ToBuilder() {
            return new Builder(this);
        }`;
    }

    function toJson() {
        return `public string ToJson() {
            return JsonConvert.SerializeObject(this);
        }
        `;
    }
    
    function equalsAndHashCode() {
        const cn = camel(name);
        const propNames = Object.keys(model.properties);
        return `
        public override bool Equals(object obj) {
            return Equals(obj as ${cn});
        }

        public bool Equals(${cn} other) {
            return other != null && ${propNames.map(propName => `
                   ${camel(propName)} == other.${camel(propName)}`).join(" &&")};
        }

        public override int GetHashCode() {
            int hashCode = 244290743;${propNames
            .map(propName => `
            hashCode = hashCode * -1521134295 + EqualityComparer<${csType(propName)}>.Default.GetHashCode(${camel(propName)});`)
            .join('')}
            return hashCode;
        }

        public static bool operator ==(${cn} left, ${cn} right) {
            return EqualityComparer${'<' + cn + '>'}.Default.Equals(left, right);
        }

        public static bool operator !=(${cn} left, ${cn} right) {
            return !(left == right);
        }`;
    }

    function buildValidationLogic(propName: string, prop: Argument) {
        let code = `var @value = this.${camel(propName)};`;
        if (prop.type === 'string') {
            if (!!prop.required) {
                code += `
                if (String.IsNullOrWhiteSpace(@value)) {
                    throw new ValidationException($"${camel(propName)} cannot be null"); 
                }`;
            }
            if ('minLength' in prop && typeof prop.minLength === 'number' && prop.minLength >= 0) {
                code += `
                if (@value != null && @value.Length < ${prop.minLength}) {
                    throw new ValidationException($"${camel(propName)} must be at least ${prop.minLength} characters."); 
                }`;
            }
            if ('maxLength' in prop && typeof prop.maxLength === 'number' && prop.maxLength >= 0) {
                code += `
                if (@value != null && @value.Length > ${prop.maxLength}) {
                    throw new ValidationException($"${camel(propName)} must be no longer than ${prop.maxLength} characters."); 
                }`;
            }
            if ('minLength' in prop && 'maxLength' in prop && !!prop.maxLength && !!prop.minLength && prop.maxLength < prop.minLength) {
                throw `Property ${propName} has maxLength < minLength!`;
            }
            return code;
        }
        const csType = gCsType(model, prop) || (prop.type in schema && camel(prop.type));
        if (['int', 'bool', 'decimal'].indexOf(csType || prop.type) >= 0) {
            return '';
        }
        if (!!csType) {
            if (!!prop.required) {
                code += `
                if (@value == default(${csType})) {
                    throw new ValidationException($"${camel(propName)} cannot be null/empty"); 
                }`;
            }
            return code;
        }
        else {
            throw `Type ${prop.type} isn't supported!`;
        }
    }

    function validators() {
        const propNames = Object.keys(model.properties);
        return `#region validators
        
        ${propNames.map(property => `
        protected void Validate${camel(property)}() {
            ${buildValidationLogic(property, model.properties[property])}
        }
        `).join('')}
        
        public void Validate() {${propNames.map(property => `
            Validate${camel(property)}();`).join('')}
        }
        
        #endregion`;
    }

    // make the class
    const genericName = `<${camel(name)}>`;
    return `${header}
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UC.Models {
    public class ${camel(name)} : IEquatable${genericName} {
        ${emitProperties()}
        ${copyConstructor()}
        ${allArgsConstructor()}
        ${builderClass()}
        ${validators()}
        ${equalsAndHashCode()}
        ${toJson()}
    }
    
    public class ${camel(name)}NotFoundException : KeyNotFoundException {
        public ${camel(name)}NotFoundException(Guid id) : base("${camel(name)} not found: " + id) {
		}
		public ${camel(name)}NotFoundException(string id) : base("${camel(name)} not found: " + id) {
		}
    }
}
`;
}

for (const x of Object.keys(schema)) {
    fs.writeFileSync(`generated/Models.${camel(x)}.cs`, buildEntity(x, schema[x]));
    
    const sqlFile = buildSql(x, schema[x]);
    if (!!sqlFile) {
        fs.writeFileSync(`generated/Sql.${camel(x)}.cs`, sqlFile);
    }
    
    const tblFile = buildTableHelper(x, schema[x]);
    if (!!tblFile) {
        fs.writeFileSync(`generated/NoSql.${camel(x)}.cs`, tblFile);
    }
}
