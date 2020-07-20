import {ApiDescription} from "./schema";
import {getParamsWithUuid, required} from "./schemaHelpers";
const dailyAtMidnight = "0 0 * * * *";
const defaultApiActions = [{ callback: 'handleRequest' }];
const api: ApiDescription = {
    backgroundJobs: {
        sendEmail: {
            type: 'queue',
            params: {
                to: required('string'),
                from: required('string'),
                subject: required('string'),
                body: required('string')
            },
            actions: defaultApiActions
        },
        updateStock: {
            type: 'cron',
            at: dailyAtMidnight,
            actions: defaultApiActions
        }
    },
    services: {
        promoGroup: {
            whoUsedPromoGroup: {
                method: 'get',
                paramd: getParamsWithUuid('string')
            }
        },
        session: {
            getSession: {
                method: 'get',
                params: getParamsWithUuid('uuid'),
                auth: false
            }
        },
        user: {
            getUser: {
                method: 'get',
                params: {
                    id: required('uuid')
                },
                responseType: 'user'
            },
            signUp: {
                method: 'post',
                params: {
                    user: required('user')
                },
                responseType: 'user'
            },
            signIn: {
                method: 'post'
            }
        },
        supplier: {
            getSupplier: {
                method: 'get',

            }
        }
    }
};
