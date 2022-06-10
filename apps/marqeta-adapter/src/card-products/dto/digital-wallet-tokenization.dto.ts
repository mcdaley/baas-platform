//----------------------------------------------------------------------------------
// apps/marqeta-adapter/src/card-products/dto/digital-wallet-tokenization.dto.ts
//----------------------------------------------------------------------------------
import { 
  IsBoolean,
  IsOptional, 
  IsString,
  ValidateNested, 
}                                           from "class-validator"

import { 
  IDigitalWalletTokenAddressVerification,
  IDigitalWalletTokenization, 
  IInAppProvisioning, 
  IManualEntry, 
  IProvisioningControls,
  IWalletProviderCardOnFile,
}                                           from "@app/baas-marqeta"

/**
 * @class DigitalWalletTokenAddressVerificationDto
 */
 export class DigitalWalletTokenAddressVerificationDto implements IDigitalWalletTokenAddressVerification {
  @IsOptional()
  @IsBoolean()
  validate?: boolean
}

/**
 * @class WalletProviderCardOnFileDto
 */
 export class WalletProviderCardOnFileDto implements IWalletProviderCardOnFile {
  address_verification?: IDigitalWalletTokenAddressVerification;
  
  @IsOptional()
  @IsBoolean()
  enabled?: boolean
}

/**
 * @class ManualEntryDto
 */
 export class ManualEntryDto implements IManualEntry {
  address_verification?: IDigitalWalletTokenAddressVerification;
  
  @IsOptional()
  @IsBoolean()
  enabled?: boolean
}

/**
 * @class InAppProvisioningControlsDto
 */
 export class InAppProvisioningControlsDto implements IInAppProvisioning {
  address_verification?: IDigitalWalletTokenAddressVerification;
  
  @IsOptional()
  @IsBoolean()
  enabled?: boolean
}

/**
 * @class ProvisioningControlsDto
 */
 export class ProvisioningControlsDto implements IProvisioningControls {
  @IsOptional()
  @ValidateNested()
  in_app_provisioning?:           InAppProvisioningControlsDto
  
  @IsOptional()
  @ValidateNested()
  manual_entry?:                  ManualEntryDto
  
  @IsOptional()
  @ValidateNested()
  wallet_provider_card_on_file?:  WalletProviderCardOnFileDto;
}

/**
 * @class DigitalWalletTokenizationDto
 */
export class DigitalWalletTokenizationDto implements IDigitalWalletTokenization {
  @IsOptional()
  @IsString()
  card_art_id?: string;

  @IsOptional()
  @ValidateNested()
  provisioning_controls?: ProvisioningControlsDto
}








