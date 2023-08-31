import { Database } from "../database.types";

export interface IUserMetadata {
    first_name?: string,
    last_name?: string,
    accnt_type: Database['public']['Tables']
}