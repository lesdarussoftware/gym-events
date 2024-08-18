import { db } from "./db";

export class ActivationService {

    static async isActivated(): Promise<boolean> {
        const records = await db.activation.toArray();
        return records.length === 1 && records[0].is_activated;
    }

    static async activate(): Promise<void> {
        await db.activation.add({ is_activated: true });
    }

}