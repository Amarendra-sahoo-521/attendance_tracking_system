import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LeaveType } from "../../common.enum";

@Entity('leave_entitlements')
export class LeaveEntitlementsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  theme!: string;

  @Column()
  days!: number;
}