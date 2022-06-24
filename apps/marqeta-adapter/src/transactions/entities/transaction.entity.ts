//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/transactions/entities/transaction.entity.ts
//-----------------------------------------------------------------------------

import { 
  IAccount,
  IAccountFunding, 
  IAcquirer, 
  IAddressVerification, 
  IAddressVerificationModel,
  IAddressVerificationSource,
  IAirline,
  IAutoReloadAssociation,
  IAutoReloadModel,
  IAvsInformation,
  IBusinessMetadata,
  ICardholderAddressResponse,
  ICardholderAuthenticationData,
  ICardholderBalance,
  ICardholderMetadata,
  ICardSecurityCodeVerification,
  IChargebackResponse,
  ICurrencyConversion,
  IDepositDepositResponse,
  IDevice,
  IDigitalWalletToken,
  IDigitalWalletTokenMetadata,
  IDisputeModel,
  IFee,
  IFeeDetail,
  IFeeTransferResponse,
  IFraudView,
  IFunding,
  IFundingSourceModel,
  IGatewayLogModel,
  IGatewayResponse,
  IGpa,
  IGpaResponse,
  IGpaReturns,
  IIssuerFraudView,
  IJitAddressVerification,
  IJitFundingApi,
  IJitProgramResponse,
  IMerchantResponseModel,
  IMsa,
  IMsaAggregatedBalances,
  IMsaBalances,
  IMsaOrderResponse,
  IMsaReturns,
  INetwork,
  INetworkFeeModel,
  INetworkFraudView,
  INetworkMetadata,
  IOfferModel,
  IOfferOrderAggregatedBalances,
  IOfferOrderBalances,
  IOfferOrderResponse,
  IOrderScope,
  IOriginalCredit,
  IPeerTransferResponse,
  IPos,
  IPrecedingTransaction,
  IProgram,
  IProgramTransferResponse,
  IRealTimeFeeAssessmentRequest,
  IRealTimeFeeGroup,
  IResponse,
  IRiskAssessment,
  IRiskcontrolTags,
  ISettlementData,
  IStoreResponseModel,
  ITerminalModel,
  ITokenServiceProvider,
  ITransactionCardAcceptor,
  ITransactionMetadata,
  ITransactionModel,
  ITransit,
  IWalletProviderProfile, 
}                               from "@app/baas-marqeta"

import { Card }                 from '../../cards/entities/card.entity'
import { User }                 from '../../users/entities/user.entity'
import { TransactionEventType } from '../dto/transaction-query.dto'

/**
 * @enum CvvType
 */
export enum CvvType {
  Cvv1 = 'CVV1',
  Cvv2 = 'CVV2',
  Icvv = 'ICVV',
}

/**
 * @enum ChargebackChannel
 */
export enum ChargebackChannel {
  Gateway           = 'GATEWAY',
  GatewayAutomated  = 'GATEWAY_AUTOMATED',
  Issuer            = 'ISSUER',
  IssuerAutomated   = 'ISSUER_AUTOMATED',
}

/**
 * @enum ChargebackNetwork
 */
export enum ChargebackNetwork {
  Marqeta     = 'MARQETA',
  Discover    = 'DISCOVER',
  Mastercard  = 'MASTERCARD',
  Pulse       = 'PULSE',
  Visa        = 'VISA',
}

/**
 * @enum ChargebackReason
 */
export enum ChargebackReason {
  ServiceNotProvidedMerchandiseNotReceived    = 'SERVICE_NOT_PROVIDED_MERCHANDISE_NOT_RECEIVED',
  CancelledRecurringTransaction               = 'CANCELLED_RECURRING_TRANSACTION',
  NotAsDescribedOrDefectiveMerchandise        = 'NOT_AS_DESCRIBED_OR_DEFECTIVE_MERCHANDISE',
  FraudMultipleTransactions                   = 'FRAUD_MULTIPLE_TRANSACTIONS',
  FraudTransactio                             = 'FRAUD_TRANSACTION',
  NoAuthorization                             = 'NO_AUTHORIZATION',
  LatePresentment                             = 'LATE_PRESENTMENT',
  TransactionNotRecognized                    = 'TRANSACTION_NOT_RECOGNIZED',
  IncorrectCurrencyOrTransactionCode          = 'INCORRECT_CURRENCY_OR_TRANSACTION_CODE',
  IncorrectTransactionAmountOrAccountNumber   = 'INCORRECT_TRANSACTION_AMOUNT_OR_ACCOUNT_NUMBER',
  NotAuthorizedCardPresent                    = 'NOT_AUTHORIZED_CARD_PRESENT',
  NotAuthorizedCardAbsent                     = 'NOT_AUTHORIZED_CARD_ABSENT',
  CreditNotProcessed                          = 'CREDIT_NOT_PROCESSED',
  NonReceiptOfCashOrLoadTransactionValueAtAtm = 'NON_RECEIPT_OF_CASH_OR_LOAD_TRANSACTION_VALUE_AT_ATM',
}

/**
 * @enum ChargebackState
 */
export enum ChargebackState {
  Initiated       = 'INITIATED',
  Representment   = 'REPRESENTMENT',
  PreArbitration  = 'PREARBITRATION',
  Arbitration     = 'ARBITRATION',
  CaseWon         = 'CASE_WON',
  CaseLost        = 'CASE_LOST',
  NetworkRejected = 'NETWORK_REJECTED',
  Withdrawn       = 'WITHDRAWN',
}

/**
 * @enum DirectDepositState
 */
export enum DirectDepositState {
  Pending   = 'PENDING',
  Applied   = 'APPLIED',
  Reversed  = 'REVERSED',
  Rejected  = 'REJECTED',
}

/**
 * @enum TransactionType
 */
export enum TransactionType {
  Credit = 'CREDIT',
  Debit  = 'DEBIT',
}

/**
 * @enum TransactionDebitOrCredit
 */
export enum TransactionDebitOrCredit {
  Credit        = 'CREDIT',
  Debit         = 'DEBIT',
  PendingCredit = 'PENDING_CREDIT',
  PendingDebit  = 'PENDING_DEBIT',
 
}

/**
 * @enum TransactionTypeFee
 */
export enum TransactionTypeFee {
  Authorization         = 'authorization',
  PindebitAtmWithdrawal = 'pindebit.atm.withdrawal',
  Pindebit              = 'pindebit',
}

/**
 * @enum CreditOrDebitFee
 */
export enum CreditOrDebitFee {
  Credit = 'C',
  Debit  = 'D'
}

/**
 * @enum NetworkFeeType
 */
export enum NetworkFeeType {
  IssuerFee             = 'ISSUER_FEE',
  SwitchFee             = 'SWITCH_FEE',
  PindebitAssocFee      = 'PINDEBIT_ASSOC_FEE',
  AcquirerFee           = 'ACQUIRER_FEE',
  InterchangeFee        = 'INTERCHANGE_FEE',
  CurConvCardholderFee  = 'CUR_CONV_CARDHOLDER_FEE',
  CurConvIssuerFee      = 'CUR_CONV_ISSUER_FEE',
  CrossBorderIssuerFee  = 'CROSS_BORDER_ISSUER_FEE',
}

/**
 * @enum TransactionDeclineReason
 */
export enum TransactionDeclineReason {
  InvalidAmount                     = 'INVALID_AMOUNT',
  InsufficientFunds                 = 'INSUFFICIENT_FUNDS',
  TransactionNotPermitted           = 'TRANSACTION_NOT_PERMITTED',
  SuspectedFraud                    = 'SUSPECTED_FRAUD',
  AmountLimitExceeded               = 'AMOUNT_LIMIT_EXCEEDED',
  TransactionCountLimitExceeded     = 'TRANSACTION_COUNT_LIMIT_EXCEEDED',
  DuplicateTransaction              = 'DUPLICATE_TRANSACTION',
  InvalidMerchant                   = 'INVALID_MERCHANT',
  InvalidCard                       = 'INVALID_CARD',
  NoCreditAccount                   = 'NO_CREDIT_ACCOUNT',
  ExpiredCard                       = 'EXPIRED_CARD',
  NoCheckingAccount                 = 'NO_CHECKING_ACCOUNT',
  NoSavingsAccount                  = 'NO_SAVINGS_ACCOUNT',
  StopPayment                       = 'STOP_PAYMENT',
  RevocationAuthorizationOrder      = 'REVOCATION_AUTHORIZATION_ORDER',
  RevocationAllAuthorizationOrder   = 'REVOCATION_ALL_AUTHORIZATION_ORDER',
  SoftDeclineAuthenticationRequired = 'SOFT_DECLINE_AUTHENTICATION_REQUIRED',
  ClosedAccount                     = 'CLOSED_ACCOUNT',
}

/**
 * @enum JitFundingNotificationType
 */
export enum JitFundingNotificationType {
  PgfsAuthorization                               = 'pgfs.authorization',
  PgfsBalanceinquiry                              = 'pgfs.balanceinquiry',
  PgfsAuthorizationIncremental                    = 'pgfs.authorization.incremental',
  PgfsAuthorizationCapture                        = 'pgfs.authorization.capture',
  PgfsAuthorizationReversal                       = 'pgfs.authorization.reversal',
  PgfsAuth_plus_capture                           = 'pgfs.auth_plus_capture',
  PgfsRefund                                      = 'pgfs.refund',
  PgfsForce_capture                               = 'pgfs.force_capture',
  PgfsAuthorizationCaptureChargeback              = 'pgfs.authorization.capture.chargeback',
  PgfsAuthorizationCaptureChargebackReversal      = 'pgfs.authorization.capture.chargeback.reversal',
  PgfsPindebitChargeback                          = 'pgfs.pindebit.chargeback',
  PgfsPindebitChargebackReversal                  = 'pgfs.pindebit.chargeback.reversal',
  PgfsDisputeCredit                               = 'pgfs.dispute.credit',
  PgfsDisputeDebit                                = 'pgfs.dispute.debit',
  PgfsDirectdepositCredit                         = 'pgfs.directdeposit.credit',
  PgfsDirectdepositDebit                          = 'pgfs.directdeposit.debit',
  PgfsDirectdepositCreditReversal                 = 'pgfs.directdeposit.credit.reversal',
  PgfsDirectdepositDebitReversal                  = 'pgfs.directdeposit.debit.reversal',
  PgfsAdjustmentCredit                            = 'pgfs.adjustment.credit',
  PgfsAdjustmentDebit                             = 'pgfs.adjustment.debit',
  PgfsAuth_plus_captureStandin                    = 'pgfs.auth_plus_capture.standin',
  PgfsAuthorizationStanding                       = 'pgfs.authorization.standin',
  PgfsNetworkLoad                                 = 'pgfs.network.load',
  PgfsOriginalCreditAuthorization                 = 'pgfs.original.credit.authorization',
  PgfsOriginalCreditAuth_plus_capture             = 'pgfs.original.credit.auth_plus_capture',
  PgfsRefundAuthorization                         = 'pgfs.refund.authorization',
  PgfsRefundAuthorizationReversalpgfsBillpayment  = 'pgfs.refund.authorization.reversalpgfs.billpayment',
  PgfsBillpaymentCapture                          = 'pgfs.billpayment.capture',
  PgfsBillpaymentReversal                         = 'pgfs.billpayment.reversal',
  PgfsAuthorizationAccount_verification           = 'pgfs.authorization.account_verification',
}

/**
 * @enum ISAIndicator
 */
export enum ISAIndicator {
  MultiCurrency               = 'MULTI_CURRENCY',
  SingleCurrency              = 'SINGLE_CURRENCY',
  RebateCancelled             = 'REBATE_CANCELLED',
  MultiCurrencyNonUsCountries = 'MULTI_CURRENCY_NON_US_COUNTRIES',
  SingleCurrencyPaidByIssuer  = 'SINGLE_CURRENCY_PAID_BY_ISSUER',
  NoChargeAssed               = 'NO_CHARGE_ASSESSED',
}

/**
 * @enum DeferredHoldBy
 */
export enum DeferredHoldBy {
  Absent      = 'ABSENT',
  Originator  = 'ORIGINATOR',
  Visa        = 'VISA',
}

/**
 * @enum FundingSource
 */
export enum FundingSource {
  Credit              = 'CREDIT',
  Debit               = 'DEBIT',
  Prepaid             = 'PREPAID',
  DepositAccount      = 'DEPOSIT_ACCOUNT',
  Cash                = 'CASH',
  MobileMoneyAccount  = 'MOBILE_MONEY_ACCOUNT',
  NonVisaCredit       = 'NON_VISA_CREDIT',
}

/**
 * @enum AccountType
 */
export enum AccountType {
  Other           = 'OTHER',
  RtnBankAccount  = 'RTN_BANK_ACCOUNT',
  IBan            = 'IBAN',
  CardAccount     = 'CARD_ACCOUNT',
  Email           = 'EMAIL',
  PhoneNumber     = 'PHONE_NUMBER',
  WalletId        = 'WALLET_ID',
  SocialNetworkId = 'SOCIAL_NETWORK_ID',
  BankAccountNumberAndBankIdentificationCode = 'BANK_ACCOUNT_NUMBER_AND_BANK_IDENTIFICATION_CODE',
}

/**
 * @enum OriginalTransactionType
 */
export enum OriginalTransactionType {
  AccountToAccount                  = 'ACCOUNT_TO_ACCOUNT',
  PersonToPerson                    = 'PERSON_TO_PERSON',
  WalletTransfer                    = 'WALLET_TRANSFER',
  MoneyTransferByBank               = 'MONEY_TRANSFER_BY_BANK',
  BusinessToBusiness                = 'BUSINESS_TO_BUSINESS',
  Disbursement                      = 'DISBURSEMENT',
  GovernmentDiesbursement           = 'GOVERNMENT_DISBURSEMENT',
  GamblingPayout                    = 'GAMBLING_PAYOUT',
  Loyalty                           = 'LOYALTY',
  MerchantDisbursement              = 'MERCHANT_DISBURSEMENT',
  OnlineGamblingPayout              = 'ONLINE_GAMBLING_PAYOUT',
  PensionDisbursement               = 'PENSION_DISBURSEMENT',
  PrepaidLoans                      = 'PREPAID_LOADS',
  CardBillPayment                   = 'CARD_BILL_PAYMENT',
  BillPayment                       = 'BILL_PAYMENT',
  CashClaim                         = 'CASH_CLAIM',
  CashIn                            = 'CASH_IN',
  CashOut                           = 'CASH_OUT',
  MobileAirTimePayment              = 'MOBILE_AIR_TIME_PAYMENT',
  MoneyTransferByMerchant           = 'MONEY_TRANSFER_BY_MERCHANT',
  FaceToFaceMerchantPayment         = 'FACE_TO_FACE_MERCHANT_PAYMENT',
  GovernmentPayment                 = 'GOVERNMENT_PAYMENT',
  PaymentsGoodsAndServices          = 'PAYMENTS_GOODS_SERVICES',
  FundsTransfer                     = 'FUNDS_TRANSFER',
  GeneralBusinessoBusinessTransfer  = 'GENERAL_BUSINESS_TO_BUSINESS_TRANSFER',
  CashDeposit                       = 'CASH_DEPOSIT',
}

/**
 * @enum CardDataInputCapability
 */
 export enum CardDataInputCapability {
  Unknown               = 'UNKNOWN',
  NoTerminal            = 'NO_TERMINAL',
  MagStripe             = 'MAG_STRIPE',
  MagStripeContactless  = 'MAG_STRIPE_CONTACTLESS',
  MagStripeKeyEntry     = 'MAG_STRIPE_KEY_ENTRY',
  Chip                  = 'CHIP',
  ChipContactless       = 'CHIP_CONTACTLESS',
  ChipMagStripe         = 'CHIP_MAG_STRIPE',
  ChipMagStripeKeyEntry = 'CHIP_MAG_STRIPE_KEY_ENTRY',
  KeyEntry              = 'KEY_ENTRY',
  Ocr                   = 'OCR',
  Micr                  = 'MICR',
  BarCode               = 'BAR_CODE',
}

/**
 * @enum CardholderAuthenticationMethod
 */
export enum CardholderAuthenticationMethod {
  Unspecified       = 'UNSPECIFIED',
  NonAuthenticated  = 'NON_AUTHENTICATED',
  Signature         = 'SIGNATURE',
  Pin               = 'PIN',
  IdVerified        = 'ID_VERIFIED',
}

/**
 * @enum PanEntryMode
 */
export enum PanEntryMode {
  Unknown               = 'UNKNOWN',
  Manual                = 'MANUAL',
  MagStrip              = 'MAG_STRIPE',
  MagStripeContactless  = 'MAG_STRIPE_CONTACTLESS',
  BarCode               = 'BAR_CODE',
  Ocr                   = 'OCR',
  Micr                  = 'MICR',
  Chip                  = 'CHIP',
  ChipContactless       = 'CHIP_CONTACTLESS',
  CardOnFile            = 'CARD_ON_FILE',
  ChipFallback          = 'CHIP_FALLBACK',
  Other                 = 'OTHER',
}

/**
 * @enum PinEntryMode
 */
export enum PinEntryMode {
  Unknown   = 'UNKNOWN',
  True      = 'TRUE',
  False     = 'FALSE',
  Defective = 'DEFECTIVE',
}

/**
 * @enum TerminalAttendance
 */
export enum TerminalAttendance {
  Unspecified = 'UNSPECIFIED',
  Attended    = 'ATTENDED',
  Unattended  = 'UNATTENDED',
  NoTerminal  = 'NO_TERMINAL',
}

/**
 * @enum TerminalLocation
 */
export enum TerminalLocation {
  OnPremise             = 'ON_PREMISE',
  OffPremiseMerchant    = 'OFF_PREMISE_MERCHANT',
  OffPremiseCardholder  = 'OFF_PREMISE_CARDHOLDER',
  NoTerminal            = 'NO_TERMINAL',
}

/**
 * @enum TerminalType
 */
export enum TerminalType {
  AutoDisoenserWithPin  = 'AUTO_DISPENSER_WITH_PIN',
  SelfService           = 'SELF_SERVICE',
  LimitedAmount         = 'LIMITED_AMOUNT',
  InFlight              = 'IN_FLIGHT',
  Ecommerce             = 'ECOMMERCE',
  Transponder           = 'TRANSPONDER',
}

/**
 * @enum TransactionState
 */
export enum TransactionState {
  Pending     = 'PENDING',
  Cleared     = 'CLEARED',
  Completion  = 'COMPLETION',
  Declined    = 'DECLINED',
  Error       = 'ERROR',
  All         = 'ALL',
}

export enum Subnetwork {
  Visanet         = 'VISANET',
  Visanetdebit    = 'VISANETDEBIT',
  Visainterlink   = 'VISAINTERLINK',
  Visaplus        = 'VISAPLUS',
  Maestro         = 'MAESTRO',
  Cirrus          = 'CIRRUS',
  Mastercarddebit = 'MASTERCARDDEBIT',
  GatewayJit      = 'GATEWAY_JIT',
  ManagedJit      = 'MANAGED_JIT',
}

/**
 * @enum MotoIndicator
 */
 export enum MotoIndicator {
  Unknown     = 'UNKNOWN',
  Manual      = 'MANUAL',
  Recurring   = 'RECURRING',
  Installment = 'INSTALLMENT',
  Others      = 'OTHERS',
}

/**
 * @enum PaymentChannel
 */
export enum PaymentChannel {
  Other     = 'OTHER',
  Atm       = 'ATM',
  Ecommerce = 'ECOMMERCE',
  Mail      = 'MAIL',
  Phone     = 'PHONE',
  Moto      = 'MOTO',
}

/**
 * @enum TransactionCategory
 */
export enum TransactionCategory {
  RetailSale              = 'RETAIL_SALE',
  BillPay                 = 'BILL_PAY',
  Hotel                   = 'HOTEL',
  Healthcare              = 'HEALTH_CARE',
  Restaurant              = 'RESTAURANT',
  AutoRental              = 'AUTO_RENTAL',
  Airline                 = 'AIRLINE',
  Payment                 = 'PAYMENT',
  HospitalizationCollege  = 'HOSPITALIZATION_COLLEGE',
  PhoneMailCommerce       = 'PHONE_MAIL_ECOMMERCE',
  Atm                     = 'ATM',
  Transite                = 'TRANSIT',
}

/**
 * @enum TransitTransactionType
 */
export enum TransitTransactionType {
  PreFunded                         = 'PRE_FUNDED',
  RealTimeAuhorized                 = 'REAL_TIME_AUTHORIZED',
  PostAuthorizedAggregated          = 'POST_AUTHORIZED_AGGREGATED',
  AuthorizedAggregatedSplitClearing = 'AUTHORIZED_AGGREGATED_SPLIT_CLEARING',
  Other                             = 'OTHER',
  DebitRecovery                     = 'DEBIT_RECOVERY',
}

/**
 * @enum TransportationMode
 */
export enum TransportationMode {
  Bus                 = 'BUS',
  Train               = 'TRAIN',
  WaterBorneVehicle   = 'WATER_BORNE_VEHICLE',
  Toll                = 'TOLL',
  Parking             = 'PARKING',
  Taxi                = 'TAXI',
  ParaTransit         = 'PARA_TRANSIT',
  SelfDriveVehicle    = 'SELF_DRIVE_VEHICLE',
  Coach               =  'COACH',
  Locomotive          = 'LOCOMOTIVE',
  PoweredMotorVehicle = 'POWERED_MOTOR_VEHICLE',
  Trailer             = 'TRAILER',
  InterCity           = 'INTER_CITY',
  CableCar            = 'CABLE_CAR',
}

/**
 * @class AccountFunding
 */
export class AccountFunding implements IAccountFunding {
  funding_source?:        FundingSource
  receiver_account_type?: AccountType
  receiver_name?:         string
  screening_score?:       string
  transaction_type?:      OriginalTransactionType
}

/**
 * @class Acquirer
 */
export class Acquirer implements IAcquirer {
  institution_id_code?:         string
  institution_country?:         string
  network_international_id?:    string
  retrieval_reference_number?:  string
  system_trace_audit_number?:   string
}

/**
 * @class AvsInformation
 */
export class AvsInformation implements IAvsInformation {
  postal_code?:     string
  street_address?:  string
  zip?:             string
}

/**
 * @class Response
 */
export class Response implements IResponse {
  additional_information?:  string
  code:                     string
  memo:                     string
}

/**
 * @class AddressVerificationModel
 */
export class AddressVerificationModel implements IAddressVerificationModel {
  on_file?:   AvsInformation
  request?:   AvsInformation
  response?:  Response
}

/**
 * @class AutoReloadAssociation
 */
 export class AutoReloadAssociation implements IAutoReloadAssociation {
  business_token?:      string
  card_product_token?:  string
  user_token?:          string
}

/**
 * @class Gpa
 */
export class Gpa implements IGpa {
  reload_amount:    number
  trigger_amount:   number
}

/**
 * @class Msa
 * @deprecated
 */
export class Msa implements IMsa {
  campaign_token:   string
  reload_amount:    number
  trigger_amount:   number
}

/**
 * @class OrderScope
 */
export class OrderScope implements IOrderScope {
  gpa?: Gpa
  msa?: Msa       /** Deprecated, do not use. */
}

/**
 * @class AutoReloadModel
 */
export class AutoReloadModel implements IAutoReloadModel {
  active?:                        boolean
  association?:                   AutoReloadAssociation
  currency_code:                  string
  funding_source_address_token?:  string
  funding_source_token?:          string
  order_scope:                    OrderScope
  token?:                         string
}

/**
 * @class BusinessMetadata
 */
export class BusinessMetadata implements IBusinessMetadata {
  metadata?:  Record<string, string>
}

/**
 * @class TerminalModel
 * @deprecated
 */
export class TerminalModel implements ITerminalModel {
  card_presence?:             string
  cardholder_presence?:       string
  channel?:                   string
  partial_approval_capable?:  string
  pin_present?:               string
  processing_type?:           string
  tid?:                       string
}

/**
 * @class TransactionCardAcceptor
 */
export class TransactionCardAcceptor implements ITransactionCardAcceptor {
  address?:                           string
  city?:                              string
  country_code?:                      string
  independent_sales_organization_id?: string
  mcc?:                               string
  mcc_groups?:                        string[]
  mid?:                               string
  name?:                              string
  network_mid?:                       string
  payment_facilitator_id?:            string
  poi?:                               TerminalModel  /** Deprecated, do not use. */
  postal_code?:                       string
  state?:                             string
  sub_merchant_id?:                   string
}

/**
 * @class CardSecurityCodeVerification
 */
export class CardSecurityCodeVerification implements ICardSecurityCodeVerification {
  response: Response
  type:     CvvType
}

/**
 * @class CardholderAuthenticationData
 */
export class CardholderAuthenticationData implements ICardholderAuthenticationData {
  acquirer_exemption?:            string[]
  authentication_method?:         string
  authentication_status?:         string
  electronic_commerce_indicator?: string
  issuer_exemption?:              string
  three_ds_message_version?:      string
  verification_result?:           string
  verification_value_created_by?: string
}

/**
 * @class ChargebackResponse
 */
export class ChargebackResponse implements IChargebackResponse {
  amount:               number
  channel:              ChargebackChannel
  created_time:         string
  credit_user:          boolean
  last_modified_time:   string
  memo?:                string
  network:              ChargebackNetwork
  network_case_id?:     string
  reason_code?:         string
  reason_description?:  ChargebackReason
  state:                ChargebackState
  token:                string
  transaction_token:    string
}

/**
 * @class SettlementData
 */
export class SettlementData implements ISettlementData {
  amount?:          number
  conversion_rate?: number
  currency_code?:   string
}

/**
 * @class Network
 */
export class Network implements INetwork {
  conversion_rate?:             number
  dynamic_currency_conversion?: boolean
  original_amount?:             number
  original_currency_code?:      string
  settlement_data?:             SettlementData
}

/**
 * @class CurrencyConversion
 */
export class CurrencyConversion implements ICurrencyConversion {
  network?: Network
}

/**
 * @class AddressVerification
 */
export class AddressVerification implements IAddressVerification {
  name?:            string
  postal_code?:     string
  street_address?:  string
  zip?:             string
}

/**
 * @class Device
 */
export class Device implements IDevice {
  device_id?:     string
  ip_address?:    string
  language_code?: string
  location?:      string
  name?:          string
  phone_number?:  string
  token?:         string
  type?:          string
}

/**
 * @class DigitalWalletTokenMetadata
 */
export class DigitalWalletTokenMetadata implements IDigitalWalletTokenMetadata {
  cardproduct_preferred_notification_language?: string
  issuer_product_config_id?:                    string
}

/**
 * @class TokenServiceProvider
 */
export class TokenServiceProvider implements ITokenServiceProvider {
  correlation_id?:              string
  pan_reference_id:             string
  token_assurance_level?:       string
  token_eligibility_decision?:  string
  token_expiration?:            string
  token_pan?:                   string
  token_reference_id?:          string
  token_requestor_id?:          string
  token_requestor_name?:        string
  token_score?:                 string
  token_type?:                  string
}

/**
 * @class Account
 */
export class Account implements IAccount {
  email_address?: string
  id?:            string
  score?:         string
}

/**
 * @class RiskAssessment
 */
export class RiskAssessment implements IRiskAssessment {
  score?:   string
  version?: string
}

/**
 * @class WalletProviderProfile
 */
export class WalletProviderProfile implements IWalletProviderProfile {
  account?:                 Account
  device_score?:            string
  pan_source?:              string
  reason_code?:             string
  recommendation_reasons?:  string[]
  risk_assessment?:         RiskAssessment
}

/**
 * @class DigitalWalletToken
 */
export class DigitalWalletToken implements IDigitalWalletToken {
  address_verification?:        AddressVerification
  card_token?:                  string
  created_time?:                string
  device?:                      Device
  issuer_eligibility_decision?: string
  last_modified_time?:          string
  metadata?:                    DigitalWalletTokenMetadata
  state?:                       string
  state_reason?:                string
  token?:                       string
  token_service_provider?:      TokenServiceProvider
  user?:                        User
  wallet_provider_profile?:     WalletProviderProfile
}

/**
 * @class DepositDepositResponse
 */
export class DepositDepositResponse implements IDepositDepositResponse {
  amount?:                            number
  business_token?:                    string
  company_discretionary_data?:        string
  company_entry_description?:         string
  company_identification?:            string
  company_name?:                      string
  created_time?:                      string
  direct_deposit_account_token?:      string
  individual_identification_number?:  string
  individual_name?:                   string
  last_modified_time?:                string
  settlement_date?:                   string
  standard_entry_class_code?:         string
  state?:                             DirectDepositState
  state_reason?:                      string
  state_reason_code?:                 string
  token?:                             string
  type?:                              TransactionType
  user_token?:                        string
}

/**
 * @class DisputeModel
 */
export class DisputeModel implements IDisputeModel {
  case_management_identifier?:  string
  reason?:                      string
}

/**
 * @class RealTimeFeeAssessmentRequest
 */
export class RealTimeFeeAssessmentRequest implements IRealTimeFeeAssessmentRequest {
  domestic_enabled?:      boolean
  international_enabled?: boolean
  transaction_type?:      TransactionTypeFee
}


/**
 * @class Fee
 */
export class Fee implements IFee {
  active:                 boolean
  amount:                 number
  created_time:           string
  currency_code:          string
  last_modified_time:     string
  name:                   string
  real_time_assessment?:  RealTimeFeeAssessmentRequest
  tags?:                  string
  token:                  string
}

/**
 * @class FeeDetail
 */
export class FeeDetail implements IFeeDetail {
  fee:                Fee
  memo?:              string
  tags?:              string
  token:              string
  transaction_token:  string
}

/**
 * @class FeeTransferResponse
 */
export class FeeTransferResponse implements IFeeTransferResponse {
  business_token: string
  created_time:   string
  fees:           FeeDetail[]
  tags?:          string
  token:          string
  user_token:     string
}

/**
 * @class NetworkFeeModel
 */
export class NetworkFeeModel implements INetworkFeeModel {
  amount?:        number;
  credit_debit?:  CreditOrDebitFee
  type?:          NetworkFeeType
}

/**
 * @class RiskcontrolTags
 */
export class RiskcontrolTags implements IRiskcontrolTags {
  rule_name?: string
  tag?:       string
  values?:    string[]
}

/**
 * @class IssuerFraudView
 */
export class IssuerFraudView implements IIssuerFraudView {
  recommended_action?:  string
  risk_level?:          string
  riskcontrol_tags?:    RiskcontrolTags[]
  rule_violations?:     string[]
  score?:               number
}

/**
 * @class NetworkFraudView
 */
export class NetworkFraudView implements INetworkFraudView {
  account_risk_score?:                        string
  account_risk_score_reason_code?:            string
  transaction_risk_score?:                    number
  transaction_risk_score_reason_code?:        string
  transaction_risk_score_reason_description?: string
}

/**
 * @class FraudView
 */
export class FraudView implements IFraudView {
  issuer?:  IssuerFraudView
  network?: NetworkFraudView
}

/**
 * @class CardholderBalance
 */
export class CardholderBalance implements ICardholderBalance {
  available_balance:  number
  balances:           Record<string, ICardholderBalance>
  cached_balance:     number
  credit_balance:     number
  currency_code:      string
  impacted_amount?:   number
  last_updated_time:  string
  ledger_balance:     number
  pending_credits:    number
}

/**
 * @class AddressVerificationSource
 */
export class AddressVerificationSource implements IAddressVerificationSource {
  on_file?:   AvsInformation
  response?:  Response
}

/**
 * @class JitAddressVerification
 */
export class JitAddressVerification implements IJitAddressVerification {
  gateway?: AddressVerificationSource
  issuer?:  AddressVerificationSource
  request?: AvsInformation
}

/**
 * @class JitFundingApi
 */
export class JitFundingApi implements IJitFundingApi {
  acting_user_token?:                             string
  address_verification?:                          JitAddressVerification
  amount:                                         number
  balances?:                                      Record<string, ICardholderBalance>
  business_token?:                                string
  decline_reason?:                                TransactionDeclineReason
  incremental_authorization_jit_funding_tokens?:  string[]
  memo?:                                          string;
  method:                                         JitFundingNotificationType
  original_jit_funding_token?:                    string
  tags?:                                          string
  token:                                          string
  user_token:                                     string
}

/**
 * @class JitProgramResponse
 */
export class JitProgramResponse implements IJitProgramResponse {
  jit_funding: JitFundingApi;
}

/**
 * @class GatewayResponse
 */
export class GatewayResponse implements IGatewayResponse {
  code:   string
  data?:  JitProgramResponse
}

/**
 * @class GatewayLogModel
 */
export class GatewayLogModel implements IGatewayLogModel {
  duration?:      number
  message:        string
  order_number:   string;
  response?:      GatewayResponse
  timed_out?:     boolean
  transaction_id: string
}

/**
 * @class FundingSourceModel
 */
export class FundingSourceModel implements IFundingSourceModel {
  active:             boolean;
  created_time:       string;
  is_default_account: boolean;
  last_modified_time: string;
  token:              string;
  type:               string;
}

/**
 * @class CardholderAddressResponse
 */
export class CardholderAddressResponse implements ICardholderAddressResponse {
  active?:              boolean
  address_1:            string
  address_2?:           string
  business_token?:      string
  city:                 string
  country:              string
  created_time:         string
  first_name:           string
  is_default_address?:  boolean
  last_modified_time:   string
  last_name:            string
  phone?:               string
  postal_code:          string
  state:                string
  token:                string
  user_token?:          string
  zip:                  string
}

/**
 * @class Funding
 */
export class Funding implements IFunding {
  amount?:          number
  gateway_log?:     GatewayLogModel
  source:           FundingSourceModel
  source_address?:  CardholderAddressResponse
}

/**
 * @class GpaResponse
 */
export class GpaResponse implements IGpaResponse {
  amount:                         number
  business_token?:                string
  created_time:                   string
  currency_code:                  string
  fees?:                          FeeDetail[]
  funding:                        Funding
  funding_source_address_token?:  string
  funding_source_token:           string
  gateway_message?:               string
  gateway_token?:                 number
  jit_funding?:                   JitFundingApi
  last_modified_time:             string
  memo?:                          string
  response:                       Response
  state:                          string
  tags?:                          string
  token:                          string
  transaction_token:              string
  user_token?:                    string
}

/**
 * @class GpaReturns
 */
export class GpaReturns implements IGpaReturns {
  amount:                         number
  created_time:                   string
  funding:                        Funding
  funding_source_address_token?:  string
  funding_source_token:           string
  jit_funding?:                   JitFundingApi
  last_modified_time:             string
  memo?:                          string
  original_order_token?:          string
  response:                       Response
  state:                          string
  tags?:                          string
  token:                          string
  transaction_token:              string
}

/**
 * @class MerchantResponseModel
 * @deprecated
 */
export class MerchantResponseModel implements IMerchantResponseModel {
  active?:            boolean
  address1?:          string
  address2?:          string
  city?:              string
  contact?:           string
  contact_email?:     string
  country?:           string
  created_time:       string
  last_modified_time: string
  latitude?:          number
  longitude?:         number
  name:               string
  partial_auth_flag?: boolean
  phone?:             string
  province?:          string
  state?:             string
  token?:             string
  zip?:               string
}

/**
 * @class MsaAggregatedBalances
 * @deprecated
 */
export class MsaAggregatedBalances implements IMsaAggregatedBalances {
  available_balance:  number
  balances:           Record<string, IMsaAggregatedBalances>
  cached_balance:     number
  credit_balance:     number
  currency_code:      string
  impacted_amount?:   number
  last_updated_time:  string
  ledger_balance:     number
  pending_credits:    number
}

/**
 * @class MsaBalances
 * @deprecated
 */
export class MsaBalances implements IMsaBalances {
  available_balance:    number
  balances:             Record<string, IMsaBalances>
  cached_balance:       number
  credit_balance:       number
  currency_code:        string
  impacted_amount?:     number
  last_updated_time:    string
  ledger_balance:       number
  pending_credits:      number
}

/**
 * @class MsaReturns
 * @deprecated
 */
export class MsaReturns implements IMsaReturns {
  active:                 boolean
  aggregated_balances:    MsaAggregatedBalances;
  amount:                 number
  business_token?:        string
  campaign_token:         string
  created_time:           string
  currency_code:          string
  end_date?:              string
  funding:                Funding
  last_modified_time:     string
  last_transaction_date:  string
  order_balances:         MsaBalances
  original_order_token:   string
  reward_amount:          number
  reward_trigger_amount:  number
  start_date?:            string
  token?:                 string
  transaction_token:      string
  unloaded_amount?:       number
  user_token?:            string
}

/**
 * @class MsaOrderResponse
 * @deprecated
 */
export class MsaOrderResponse implements IMsaOrderResponse {
  active:                 boolean
  aggregated_balances:    MsaAggregatedBalances
  business_token?:        string
  campaign_token:         string
  created_time:           string
  currency_code:          string
  end_date?:              string
  funding:                Funding
  last_modified_time:     string
  last_transaction_date:  string
  order_balances:         MsaBalances
  purchase_amount:        number
  reward_amount:          number
  reward_trigger_amount:  number
  start_date?:            string
  token?:                 string
  transaction_token:      string
  unloaded_amount?:       number
  user_token?:            string
}

/**
 * @class NetworkMetadata
 */
export class NetworkMetadata implements INetworkMetadata {
  product_id?:                  string
  program_id?:                  string
  spend_qualifier?:             string
  surcharge_free_atm_network?:  string
}

/**
 * @class OfferModel
 * @deprecated
 */
export class OfferModel implements IOfferModel {
  active?:                boolean
  campaign_token:         string
  currency_code:          string
  end_date?:              string
  name:                   string
  purchase_amount:        number
  reward_amount:          number
  reward_trigger_amount?: number
  start_date?:            string
  token?:                 string
}

/**
 * @class OfferOrderAggregatedBalances
 * @deprecated
 */
export class OfferOrderAggregatedBalances implements IOfferOrderAggregatedBalances {
  available_balance:  number
  balances:           Record<string, IOfferOrderAggregatedBalances>
  cached_balance:     number
  credit_balance:     number
  currency_code:      string
  impacted_amount?:   number
  last_updated_time:  string
  ledger_balance:     number
  pending_credits:    number
}

/**
 * @class OfferOrderBalances
 * @deprecated
 */
export class OfferOrderBalances implements IOfferOrderBalances {
  available_balance:  number
  balances:           Record<string, IOfferOrderBalances>
  cached_balance:     number
  credit_balance:     number
  currency_code:      string
  impacted_amount?:   number
  last_updated_time:  string
  ledger_balance:     number
  pending_credits:    number
}

/**
 * @class OfferOrderResponse
 * @deprecated
 */
export class OfferOrderResponse implements IOfferOrderResponse {
  business_token?:            string
  created_time:               string
  funding?:                   Funding
  last_modified_time:         string
  last_transaction_date:      string
  offer?:                     OfferModel
  order_aggregated_balances:  OfferOrderAggregatedBalances
  order_balances:             OfferOrderBalances
  token:                      string
  user_token?:                string
}

/**
 * @class OriginalCredit
 */
export class OriginalCredit implements IOriginalCredit {
  deferred_hold_by?:    DeferredHoldBy
  funding_source?:      FundingSource
  screening_score?:     string
  sender_account_type?: AccountType
  sender_address?:      string;
  sender_city?:         string
  sender_country?:      string
  sender_name?:         string
  sender_state?:        string
  transaction_purpose?: string
  transaction_type?:    OriginalTransactionType
}

/**
 * @class Pos
 */
export class Pos implements IPos {
  card_data_input_capability?:        CardDataInputCapability
  card_holder_presence?:              boolean
  card_presence?:                     boolean
  cardholder_authentication_method?:  CardholderAuthenticationMethod
  country_code?:                      string
  is_installment?:                    boolean
  is_recurring?:                      boolean
  pan_entry_mode?:                    PanEntryMode
  partial_approval_capable?:          boolean
  pin_entry_mode?:                    PinEntryMode
  pin_present?:                       boolean
  purchase_amount_only?:              boolean
  terminal_attendance?:               TerminalAttendance
  terminal_id?:                       string
  terminal_location?:                 TerminalLocation
  terminal_type?:                     TerminalType
  zip?:                               string
}


/**
 * @class PeerTransferResponse
 */
export class PeerTransferResponse implements IPeerTransferResponse {
  amount:                     number
  created_time:               string
  currency_code:              string
  memo?:                      string
  recipient_business_token?:  string
  recipient_user_token?:      string
  sender_business_token?:     string
  sender_user_token?:         string
  tags?:                      string
  token:                      string
}

/**
 * @class PrecedingTransaction
 */
export class PrecedingTransaction implements IPrecedingTransaction {
  amount?:  number
  token?:   string
}

/**
 * @class Program
 */
export class Program implements IProgram {
  long_code:  string
  program_id: string
  short_code: string
}

/**
 * @class ProgramTransferResponse
 */
export class ProgramTransferResponse implements IProgramTransferResponse {
  amount:             number
  business_token?:    string
  created_time?:      string
  currency_code:      string
  fees?:              FeeDetail[]
  jit_funding?:       JitFundingApi
  memo?:              string
  tags?:              string
  token?:             string
  transaction_token:  string
  type_token:         string
  user_token?:        string
}

/**
 * @class RealTimeFeeGroup
 */
export class RealTimeFeeGroup implements IRealTimeFeeGroup {
  active:               boolean
  created_time?:        string
  fee_tokens?:          string[]
  last_modified_time?:  string
  name:                 string
  token:                string
}

/**
 * @class StoreResponseModel
 * @deprecated
 */
export class StoreResponseModel implements IStoreResponseModel {
  active?:                    boolean
  address1:                   string
  address2?:                  string
  city:                       string
  contact?:                   string
  contact_email?:             string
  country?:                   string
  created_time:               string
  keyed_auth_cvv_enforced?:   boolean
  last_modified_time:         string
  latitude?:                  number
  longitude?:                 number
  merchant_token:             string
  mid:                        string
  name:                       string
  network_mid?:               string
  partial_approval_capable?:  boolean
  partial_auth_flag?:         boolean
  phone?:                     string
  postal_code?:               string
  province?:                  string
  state:                      string
  token?:                     string
  zip?:                       string
}

/**
 * @class Airline
 */
export class Airline implements IAirline {
  depart_date?:       string
  origination_city?:  string
  passenger_name?:    string
}

/**
 * @class Transit
 */
export class Transit implements ITransit {
  transaction_type?:    TransitTransactionType
  transportation_mode?: TransportationMode
}

/**
 * @class TransactionMetadata
 */
export class TransactionMetadata implements ITransactionMetadata {
  airline?:                         Airline
  authorization_life_cycle?:        number
  cross_border_transaction?:        boolean
  is_deferred_authorization?:       boolean
  is_lodging_auto_rental?:          boolean;
  lodging_auto_rental_start_date?:  string;
  moto_indicator?:                  MotoIndicator
  payment_channel?:                 PaymentChannel
  transaction_category?:            TransactionCategory
  transit?:                         Transit
}

/**
 * @class CardholderMetadata
 */
export class CardholderMetadata implements ICardholderMetadata {
  metadata?: Record<string, string>;
}

/**
 * @class Transaction
 */
export class Transaction implements ITransactionModel {
  account_funding?:                     AccountFunding
  acquirer?:                            Acquirer
  acquirer_fee_amount?:                 number
  acquirer_reference_id?:               string
  acting_user_token:                    string
  address_verification?:                AddressVerificationModel
  advice_reason_code?:                  string
  advice_reason_details?:               string
  amount:                               number
  amount_to_be_released?:               number
  approval_code?:                       string
  auto_reload?:                         AutoReloadModel
  batch_number?:                        string
  business?:                            BusinessMetadata
  business_token?:                      string
  card?:                                Card
  card_acceptor?:                       TransactionCardAcceptor
  card_holder_model?:                   User
  card_product_token?:                  string
  card_security_code_verification?:     CardSecurityCodeVerification
  card_token?:                          string
  cardholder_authentication_data?:      CardholderAuthenticationData
  cash_back_amount?:                    number
  chargeback?:                          ChargebackResponse
  clearing_record_sequence_number?:     string
  created_time?:                        string
  currency_code?:                       string
  currency_conversion?:                 CurrencyConversion
  digital_wallet_token?:                DigitalWalletToken
  direct_deposit?:                      DepositDepositResponse
  dispute?:                             DisputeModel
  duration?:                            number
  enhanced_data_token?:                 string
  fee?:                                 Fee
  fee_transfer?:                        FeeTransferResponse
  fees?:                                NetworkFeeModel[]
  fraud?:                               FraudView
  from_account?:                        string
  gpa?:                                 CardholderBalance
  gpa_order?:                           GpaResponse
  gpa_order_unload?:                    GpaReturns
  identifier:                           string
  incremental_authorization_transaction_tokens?:  string[]
  is_preauthorization?:                 boolean
  isaIndicator?:                        ISAIndicator
  issuer_interchange_amount?:           number
  issuer_payment_node?:                 string
  issuer_received_time?:                string
  merchant?:                            MerchantResponseModel
  msa_order_unload?:                    MsaReturns
  msa_orders?:                          MsaOrderResponse[]
  multi_clearing_sequence_count?:       string
  multi_clearing_sequence_number?:      string
  network?:                             string
  network_metadata?:                    NetworkMetadata
  network_reference_id?:                string
  offer_orders?:                        OfferOrderResponse[]
  original_credit?:                     OriginalCredit
  peer_transfer?:                       PeerTransferResponse
  polarity?:                            TransactionDebitOrCredit
  pos?:                                 Pos
  preceding_related_transaction_token?: string
  preceding_transaction?:               PrecedingTransaction
  program?:                             Program
  program_transfer?:                    ProgramTransferResponse
  real_time_fee_group?:                 RealTimeFeeGroup
  request_amount?:                      number
  response?:                            Response
  settlement_date?:                     string
  standin_approved_by?:                 string
  standin_by?:                          string
  standin_reason?:                      string
  state:                                TransactionState
  store?:                               StoreResponseModel
  subnetwork?:                          Subnetwork
  token:                                string
  transaction_attributes?:              Record<string, string>
  transaction_metadata?:                TransactionMetadata
  type:                                 TransactionEventType
  user?:                                ICardholderMetadata
  user_token?:                          string
  user_transaction_time?:               string
}
