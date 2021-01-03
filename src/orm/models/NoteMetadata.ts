import { Model, Table, Column, PrimaryKey, Default, BelongsTo, ForeignKey, AllowNull, Index, HasOne } from "sequelize-typescript";
import { UUIDV4, UUID, DataTypes } from "sequelize";
import { Account } from "./Account";
import { NoteContent } from "./NoteContent";

@Table
export class NoteMetadata extends Model<NoteMetadata> {

    @PrimaryKey
    @Default(UUIDV4)
    @Column(UUID)
    uuid!: string

    @AllowNull(false)
    @Default("My note")
    @Column(DataTypes.TEXT)
    title!: string    
    
    @Column(DataTypes.TEXT)
    description!: string

    @Column(DataTypes.TEXT)
    author!: string

    @AllowNull(false)
    @Default(new Date())
    @Column
    createdAt!: Date

    @AllowNull(false)
    @Index({order: 'DESC'})
    @Default(new Date())
    @Column
    lastEdit!: Date

    @AllowNull(false)
    @Default(1)
    @Column
    version!: number

    @Default({})
    @Column(DataTypes.JSON)
    data!: Object

    @ForeignKey(() => Account)
    @AllowNull(false)
    @Column(UUID)
    accountUuid!: string;

    @BelongsTo(() => Account)
    account!: Account

    @HasOne(() => NoteContent)
    noteContent!: NoteContent;

}