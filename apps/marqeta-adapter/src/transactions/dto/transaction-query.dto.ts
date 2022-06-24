//-----------------------------------------------------------------------------
// apps/marqeta-adapter/src/transactions/dto/transactions.query.dto.ts
//-----------------------------------------------------------------------------
import {
  IsBoolean,
  IsEnum,
  IsOptional, 
  IsString, 
  Length,
}                                 from 'class-validator'
import { Type }                   from 'class-transformer'

import { MarqetaSearchQueryDto }  from '../../cards/dto/card-query.dto'

/**
 * @enum TransactionEventType
 */
export enum TransactionEventType {
  GpaCredt = 'gpa.credit',
  GpaCreditPending = 'gpa.credit.pending',
  GpaCreditPendingReversal = 'gpa.credit.pending.reversal',
  GpaCreditReversal = 'gpa.credit.reversal',
  GpaCreditNetworkload = 'gpa.credit.networkload',
  GpaCreditNetworkloadReversal = 'gpa.credit.networkload.reversal',
  GpeDebitNetworkload = 'gpa.debit.networkload',
  GpaDebit = 'gpa.debit',
  GpaDebitPending = 'gpa.debit.pending',
  GpaDebitPendingReversal = 'gpa.debit.pending.reversal',
  GpaGrant = 'gpa.grant',
  GpaCreditIssueroperator = 'gpa.credit.issueroperator',
  GpaDebitIssuerOperator = 'gpa.debit.issueroperator',
  GpaCreditChargeback = 'gpa.credit.chargeback',
  GpaCreditChargebackReversal = 'gpa.credit.chargeback.reversal',
  GpaCreditBillpayment = 'gpa.credit.billpayment',
  GpaCreditAuthorizationBillpayment = 'gpa.credit.authorization.billpayment',
  GpaCreditAuthorizationBillpaymentReversal = 'gpa.credit.authorization.billpayment.reversal',
  MsaCreditPending = 'msa.credit.pending',
  MsaCreditPendingReversal = 'msa.credit.pending.reversal',
  MsaCreditReversal = 'msa.credit.reversal',
  MsaCredit = 'msa.credit',
  MsaDebitPending = 'msa.debit.pending',
  MsaDebitPendingReversal = 'msa.debit.pending.reversal',
  MsaDebit = 'msa.debit',
  MsaCreditChargeback = 'msa.credit.chargeback',
  MsaCreditChargebackReversal = 'msa.credit.chargeback.reversal',
  Authorization = 'authorization',
  AuthorizationAdvice = 'authorization.advice',
  AuthorizationReversal = 'authorization.reversal',
  AuthorizationClearing = 'authorization.clearing',
  AuthorizationReversalIssueexpiration = 'authorization.reversal.issuerexpiration',
  DisputeCredit = 'dispute.credit',
  DisputeDebit = 'dispute.debit',
  AuthorizationClearingChargeback = 'authorization.clearing.chargeback',
  AuthorizationClearingChargebackReversal = 'authorization.clearing.chargeback.reversal',
  Refund = 'refund',
  PindebitAtmWithdrawal = 'pindebit.atm.withdrawal',
  PindebitBalanceinquiry = 'pindebit.balanceinquiry',
  PindebitCashback = 'pindebit.cashback',
  Pindebit = 'pindebit',
  ProgramreserveCredit = 'programreserve.credit',
  ProgramreserveDebit = 'programreserve.debit',
  FeeChargePending = 'fee.charge.pending',
  FeeCharge = 'fee.charge',
  FeeChargePendingRefund = 'fee.charge.pending.refund',
  FundsExpire = 'funds.expire',
  RewardEarn = 'reward.earn',
  TransferPeer = 'transfer.peer',
  TransferFee = 'transfer.fee',
  AccountCredit = 'account.credit',
  AccountDebit = 'account.debit',
  balanceinquiry = 'balanceinquiry',
  AuthorizationAtmWithdrawal = 'authorization.atm.withdrawal',
  AuthorizationClearingAtmWithdrawal = 'authorization.clearing.atm.withdrawal',
  AuthorizationCashback = 'authorization.cashback',
  AuthorizationClearingCashback = 'authorization.clearing.cashback',
  TransferProgram = 'transfer.program',
  AuthorizationQuasiCash = 'authorization.quasi.cash',
  AuthorizationClearingQuasiCash = 'authorization.clearing.quasi.cash',
  AuthorizationIncremental= 'authorization.incremental',
  GpaCreditAuthorization = 'gpa.credit.authorization',
  GpaCreditAuthorizationReversal = 'gpa.credit.authorization.reversal',
  GpaDebitReversal = 'gpa.debit.reversal',
  OriginalCreditAuthorization = 'original.credit.authorization',
  OriginalCreditAuthorizationREversal = 'original.credit.authorization.reversal',
  OriginalCreditAuthorizationClearing = 'original.credit.authorization.clearing',
  OriginalCreditAuth_plus_capture = 'original.credit.auth_plus_capture',
  OriginalCreditAuth_plus_captureReversal = 'original.credit.auth_plus_capture.reversal',
  RefundAuthorization = 'refund.authorization',
  RefundAuthorizationAdvice = 'refund.authorization.advice',
  RefundAuthorizationClearing = 'refund.authorization.clearing',
  RefundAuthorizationReversal = 'refund.authorization.reversal',
  TokenActivationRequest = 'token.activation-request',
  TokenAdvice = 'token.advice',
  PindebitAuthorization = 'pindebit.authorization',
  PindebitAuthorizationClearing = 'pindebit.authorization.clearing',
  PindebitAuthorizationReversal = 'pindebit.authorization.reversal',
  PindebitAuthorizationReversalIssueexpiration = 'pindebit.authorization.reversal.issuerexpiration',
  AuthorizationStandin = 'authorization.standin',
  AuthorizationClearingChargebackCompleted = 'authorization.clearing.chargeback.completed',
  AuthorizationClearingChargebackProvisionalCredit = 'authorization.clearing.chargeback.provisional.credit',
  AuthorizationClearingChargebackProvisionalDebit = 'authorization.clearing.chargeback.provisional.debit',
  AuthorizationClearingChargebackWriteoff = 'authorization.clearing.chargeback.writeoff',
  DirectdepositCredit = 'directdeposit.credit',
  DirectdepositCreditPending = 'directdeposit.credit.pending',
  DirectdepositCreditReject = 'directdeposit.credit.reject',
  DirectdepositCreditPendingReversal = 'directdeposit.credit.pending.reversal',
  DirectdepositCreditReversal = 'directdeposit.credit.reversal',
  DirectdepositDebit = 'directdeposit.debit',
  DirectdepositDebitPending = 'directdeposit.debit.pending',
  DirectdepositDebitReject = 'directdeposit.debit.reject',
  DirectdepositDebitReversal = 'directdeposit.debit.reversal',
  DirectdepositDebitPendingReversal = 'directdeposit.debit.pending.reversal',
  FeeChargeReversal = 'fee.charge.reversal',
  PindebitChargeback = 'pindebit.chargeback',
  PindebitChargebackCompleted = 'pindebit.chargeback.completed',
  PindebitChargebackProvisionalCredit = 'pindebit.chargeback.provisional.credit',
  PindebitChargebackProvisionalDebit = 'pindebit.chargeback.provisional.debit',
  PindebitChargebackReversal = 'pindebit.chargeback.reversal',
  PindebitChargebackWriteoff = 'pindebit.chargeback.writeoff',
  PindebitCreditAdjustment = 'pindebit.credit.adjustment',
  PindebitQuasicash = 'pindebit.quasicash',
  PindebitRefund = 'pindebit.refund',
  PindebitRefundReversal = 'pindebit.refund.reversal',
  PindebitReversal = 'pindebit.reversal',
  PindebitTransfer = 'pindebit.transfer',
  PushtocardDebit = 'pushtocard.debit',
  PushtocardReversal = 'pushtocard.reversal',
  Unknown = 'unknown',
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

/**
 * @enum TransactionPolarity
 */
export enum TransactionPolarity {
  Credit        = 'CREDIT', 
  Debit         = 'DEBIT', 
  PendingCredit = 'PENDING_CREDIT', 
  PendingDebit  = 'PENDING_DEBIT',
}

/**
 * @enum TransactionVersion
 */
export enum TransactionVersion {
  V1 = 'v1', 
  V2 = 'v2', 
  V3 = 'v3',
}

/**
 * @class MarqetaTransactionsQueryDto
 * 
 * Defines the query parameters when fetching a list of transactions from 
 * Marqeta.
 */
export class MarqetaTransactionsQueryDto extends MarqetaSearchQueryDto {
  @IsOptional()
  @IsEnum(TransactionEventType)
  type?: TransactionEventType

  @IsOptional()
  @IsString()
  @Length(1,36)
  user_token?: string

  @IsOptional()
  @IsString()
  @Length(1,36)
  business_token?: string

  @IsOptional()
  @IsString()
  @Length(1,36)
  acting_user_token?: string
  
  @IsOptional()
  @IsString()
  @Length(1,36)
  card_token?: string 

  @IsOptional()
  @IsEnum(TransactionState)
  state?: TransactionState

  @IsOptional()
  @IsEnum(TransactionVersion)
  version?: TransactionVersion

  @IsOptional()
  @IsBoolean()
  verbose?: boolean
}

/**
 * @class MarqetaTransactionsByFundingSourceQueryDto
 * 
 * Defines query paramters when fetching a list of transactions using the
 * Marqeta API, GET /transactions/fundingsource/{:fundingSourceToken}
 */
export class MarqetaTransactionsByFundingSourceQueryDto extends MarqetaSearchQueryDto {
  @IsOptional()
  @IsEnum(TransactionEventType)
  type?: TransactionEventType

  @IsOptional()
  @IsEnum(TransactionPolarity)
  polarity?: TransactionPolarity

  @IsOptional()
  @IsEnum(TransactionVersion)
  version?: TransactionVersion

  @IsOptional()
  @IsBoolean()
  verbose?: boolean
}

/**
 * @class MarqetaTransactionsByTokenQueryDto
 * 
 * Defines query parameters when fetching a single transaction by the 
 * transaction token in the Marqeta GET /transactions/{:token} API.
 */
export class MarqetaTransactionsByTokenQueryDto {
  @IsOptional()
  @IsString()
  fields?:  string

  @IsOptional()
  @IsEnum(TransactionVersion)
  version?: TransactionVersion

  @IsOptional()
  @IsBoolean()
  verbose?: boolean
}