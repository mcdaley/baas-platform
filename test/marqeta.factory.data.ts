//-----------------------------------------------------------------------------
// test/marqeta.factory.data.ts
//-----------------------------------------------------------------------------
import { 
  Units 
}   from '../apps/marqeta-adapter/src/card-products/dto/expiration-offset.dto'
import { 
  FulfillmentProvider, 
  PaymentInstrument,
}   from '../apps/marqeta-adapter/src/card-products/dto/card-product-fulfillment.dto'
import {
  ShippingMethod,
}   from '../apps/marqeta-adapter/src/card-products/dto/shipping.dto'

/**
 * @description Request body for POST /v3/cardproducts
 */
export const createCardProductDtoFactoryData = {
  moolah_demo_1: {
    name:       "Moolah Demo Debit Card Product 01",
    token:      "moolah_demo_debitcard_product_01",
    start_date: "2026-06-01",
    config: {
      poi: {
        ecommerce:  false,
        atm:        false,
        other: {
          allow:                        true,
          card_presence_required:       false,
          cardholder_presence_required: false
        }
      },
      transaction_controls: {
        accepted_countries_token:                     "accept_us_only",
        always_require_pin:                           false,
        always_require_icc:                           false,
        allow_gpa_auth:                               true,
        require_card_not_present_card_security_code:  false,
        allow_mcc_group_authorization_controls:       true,
        ignore_card_suspended_state:                  false,
        allow_network_load:                           false,
        allow_network_load_card_activation:           false,
        allow_quasi_cash:                             false,
        enable_partial_auth_approval:                 true
      },
      fulfillment: {
        shipping: {
          return_address: {
            address1:         "123 Henry St",
            address2:         "Suite 101",
            city:             "Porterville",
            state:            "CA",
            postal_code:      "93257",
            country:          "USA",
            phone:            "8315551212",
            first_name:       "Saki",
            middle_name:      "R",
            last_name:        "Dogger"
          },
          recipient_address: {
            address1:         "1234 Grove Street",
            city:             "Berkeley",
            state:            "CA",
            postal_code:      "94702",
            country:          "USA",
            phone:            "5105551212",
            first_name:       "Jane",
            last_name:        "Doe"
          },
          method:             ShippingMethod.Overnight
        },
        card_personalization: {
          text: {
            name_line_1: {
              value:          "Saki Dogger"
            },
            name_line_2: {
              value:          "Chicken Tooth Music"
            }
          },
          carrier: {
            logo_file:        "my_carrier_logo.png",
            message_line:     "my message"
          },
          images: {
            card: {
              name:           "my_card_logo.png",
              thermal_color:  "Black"
            },
            signature: {
              name:             "my_signature.png"
            },
            carrier_return_window: {
              name:             "my_return_address_image.png"
            }
          }
        },
        payment_instrument:           PaymentInstrument.PhysicalMsr,
        package_id:                   "0",
        all_zero_card_security_code:  false,
        bin_prefix:                   "111111",
        bulk_ship:                    false,
        pan_length:                   "16",
        fulfillment_provider:         FulfillmentProvider.PerfectPlastic
      },
      selective_auth: {
        //* sa_mode:                      1,
        enable_regex_search_chain:    false,
        //* dmd_location_sensitivity:     0
      },
      card_life_cycle: {
        activate_upon_issue:        true,
        expiration_offset: {
          unit:   Units.Years,
          value:  10
        },
        card_service_code:                  101,
        update_expiration_upon_activation:  false
      },
      jit_funding: {
        paymentcard_funding_source: {
          enabled: true
        }
      }
    }
  }
}

/**
 * @description Response from: 
 *  - POST  /v3/cardproducts
 *  - GET   /v3/cardproducts/{cardProductToken}
 *  - PATCH /v3/cardproducts/{cardProductToken}
 */
export const cardProductFactoryData = {
  moolah_demo_1: {
    token:      "moolah_demo_debitcard_product_01",
    name:       "Moolah Demo Debit Card Product 01",
    active:     true,
    start_date: "2026-06-01",
    config: {
      poi: {
        other: {
          allow:                                        true,
          card_presence_required:                       false,
          cardholder_presence_required:                 false,
          track1_discretionary_data:                    "000000",
          track2_discretionary_data:                    "00000"
        },
        ecommerce:                                      false,
        atm:                                            false
      },
      transaction_controls: {
        accepted_countries_token:                       "accept_us_only",
        always_require_pin:                             false,
        always_require_icc:                             false,
        allow_gpa_auth:                                 true,
        require_card_not_present_card_security_code:    false,
        allow_mcc_group_authorization_controls:         true,
        allow_first_pin_set_via_financial_transaction:  false,
        ignore_card_suspended_state:                    false,
        allow_chip_fallback:                            true,
        allow_network_load:                             false,
        allow_network_load_card_activation:             false,
        allow_quasi_cash:                               false,
        enable_partial_auth_approval:                   true,
        address_verification: {
          av_messages: {
            validate:                                   true,
            decline_on_address_number_mismatch:         false,
            decline_on_postal_code_mismatch:            true
          },
          auth_messages: {
            validate:                                   true,
            decline_on_address_number_mismatch:         false,
            decline_on_postal_code_mismatch:            false
          }
        },
        strong_customer_authentication_limits:          {},
        quasi_cash_exempt_mids:                         "984226812886,000984226812886",
        enable_credit_service:                          false
      },
      selective_auth: {
        sa_mode:                                        1,
        enable_regex_search_chain:                      false,
        dmd_location_sensitivity:                       0
      },
      special: {
        merchant_on_boarding:                           false
      },
      card_life_cycle: {
        activate_upon_issue:                            true,
        expiration_offset: {
          unit:                                         Units.Years,
          value:                                        10
        },
        card_service_code:                              101,
        update_expiration_upon_activation:              false
      },
      clearing_and_settlement: {
        overdraft_destination:                          "GPA"
      },
      jit_funding: {
        paymentcard_funding_source: {
          enabled:                                      true,
          refunds_destination:                          ""
        },
        programgateway_funding_source: {
          enabled:                                      false,
          funding_source_token:                         "",
          refunds_destination:                          "",
          always_fund:                                  true
        },
        program_funding_source: {
          enabled:                                      false,
          funding_source_token:                         "",
          refunds_destination:                          ""
        }
      },
      digital_wallet_tokenization: {
        provisioning_controls: {
          manual_entry: {
            enabled:                                    false,
            address_verification: {
              validate:                                 true
            }
          },
          wallet_provider_card_on_file: {
            enabled:                                    false,
            address_verification: {
              validate:                                 true
            }
          },
          in_app_provisioning: {
            enabled:                                    false,
            address_verification: {
              validate:                                 true
            }
          },
          web_push_provisioning: {
            wpp_apple_partner_id:                       "",
            wpp_apple_card_template_id:                 "",
            wpp_google_piaid:                           ""
          }
        },
        card_art_id:                                    ""
      },
      fulfillment: {
        shipping: {
          method:                                       ShippingMethod.Overnight,
          return_address: {
            first_name:                                 "Saki",
            middle_name:                                "R",
            last_name:                                  "Dogger",
            address1:                                   "123 Henry St",
            address2:                                   "Suite 101",
            city:                                       "Porterville",
            state:                                      "CA",
            postal_code:                                "93257",
            country:                                    "USA",
            phone:                                      "8315551212"
          },
          recipient_address: {
            first_name:                                 "Jane",
            last_name:                                  "Doe",
            address1:                                   "1234 Grove Street",
            city:                                       "Berkeley",
            state:                                      "CA",
            postal_code:                                "94702",
            country:                                    "USA",
            phone:                                      "5105551212"
          }
        },
        card_personalization: {
          text: {
            name_line_1: {
              value:                                    "Saki Dogger"
            },
            name_line_2: {
              value:                                    "Chicken Tooth Music"
            }
          },
          images: {
            card: {
              name:                                     "my_card_logo.png",
              thermal_color:                            "Black"
            },
            signature: {
              name:                                     "my_signature.png"
            },
            carrier_return_window: {
              name:                                     "my_return_address_image.png"
            }
          },
          carrier: {
            logo_file:                                  "my_carrier_logo.png",
            message_line:                               "my message"
          }
        },
        payment_instrument:                             PaymentInstrument.PhysicalMsr,
        package_id:                                     "0",
        all_zero_card_security_code:                    false,
        bin_prefix:                                     "111111",
        bulk_ship:                                      false,
        pan_length:                                     "16",
        fulfillment_provider:                           FulfillmentProvider.PerfectPlastic,
        allow_card_creation:                            true,
        uppercase_name_lines:                           true,
        enable_offline_pin:                             false
      }
    },
    created_time:                                       "2022-06-08T16:19:06Z",
    last_modified_time:                                 "2022-06-08T16:19:06Z"
  }
}

/**
 * @description Response from GET /v3/cardproducts
 */
export const cardProductListFactoryData = {
  moolah_demo_01: {
    count:              2,
    start_index:        0,
    end_index:          1,
    is_more:            false,
    data: [
      cardProductFactoryData.moolah_demo_1,
    ]
  }
}

