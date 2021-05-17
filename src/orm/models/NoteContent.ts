import { Model, Table, Column, Default, BelongsTo, ForeignKey, AllowNull, Index } from "sequelize-typescript";
import { UUID, DataTypes } from "sequelize";
import { NoteMetadata } from "./NoteMetadata";

@Table
export class NoteContent extends Model<NoteContent> {
    
    @Index
    @ForeignKey(() => NoteMetadata)
    @AllowNull(false)
    @Column(UUID)
    uuid!: string;
    
    @AllowNull(false)
    @Default('{ "time": 1621267535000, "blocks": []}')
    @Column(DataTypes.TEXT)
    content!: string;
    
    @BelongsTo(() => NoteMetadata)
    noteMetadata!: NoteMetadata

}