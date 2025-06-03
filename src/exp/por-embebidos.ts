import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";

class Transaccion {
    @Prop({ type: String, required: true })
    tipo: string

    @Prop({ type: Number, required: true })
    monto: number

    @Prop({ type: Date, default: Date.now })
    fecha: Date
}

@Schema({ collection: 'account' })
export class OdmAccount extends Document {
    @Prop({ type: String, unique: true, index: true, required: true })
    email: string

    @Prop({ type: Boolean, required: true })
    active: boolean

    @Prop({ type: [SchemaTypes.Mixed] })
    transacciones: Transaccion[]
}

export const OdmAccountSchema = SchemaFactory.createForClass(OdmAccount)