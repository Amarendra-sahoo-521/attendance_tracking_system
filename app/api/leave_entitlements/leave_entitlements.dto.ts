import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator";
import { Example } from "tsoa";
import { LeaveType } from "../common.enum";

export class LeaveEntitlementsCreateDTO {
  @IsString()
  type!: string;

  @IsString()
  theme!: string;

  @IsNumber()
  days!: number;
}

export class UpdateLeaveEntitlementsDTO {
  @IsString()
  type!: string;

  @IsString()
  theme!: string;

  @IsNumber()
  days!: number;
}
