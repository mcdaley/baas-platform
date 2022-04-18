//-----------------------------------------------------------------------------
// libs/baas-interfaces/src/debit-cards/debit-card.enum.ts
//-----------------------------------------------------------------------------
export enum CardType {
  Debit = 'debit',
}

export enum BusinessNameOnCard {
  Dba     = 'dba',        // Default
  Legal   = 'legal',
  Custom  = 'custom',     
}

export enum Delivery {
  Standard          = 'standard',           // Default
  Priority          = 'priority',           // Expidited delivery
  PrioritySaturday  = 'priority_saturday',  // Expidited weekend delivery
}

export enum Packaging {
  Regular           = 'regular',          // Automated fulfillment for existing customers on standard card replacements. 
  Special           = 'special',          // Manual fulfillment for new customers. 
  NewAcquisition    = 'new_acquisiton',   // Special fulfillment for new customers to a separate vendor.
  Migration         = 'migration',        // Special fulfillment for migration customers
}

export enum CardStatus {
  Active        = 'active',
  BlockedDebit  = 'blocked_debit',
  BlockedCredit = 'blocked_credit',
  Blocked       = 'blocked',
  Inactive      = 'inactive',
  Canceled      = 'canceled'
}

export enum BlockReason {
  Lost            = 'lost', 
  Stolen          = 'stolen', 
  Fraud           = 'fraud', 
  Security        = 'security', 
  Internal        = 'internal', 
  TemporaryBlock  = 'temporary_block', 
  BadDebit        = 'bad_debt',
}

export enum ReissueReason {
  NameChange          = 'name_change',
  DamagedCard         = 'damaged_card',
  NotReceived         = 'not_received',
  AtmOrPosNotWorking  = 'atm_or_pos_not_working',
  Upgrade             = 'upgrade',
}