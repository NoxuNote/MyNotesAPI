'use strict';
import { Account } from "../orm/models/Account";

/**
 * Creates an account, fails if account already exists
 * @param email Your email
 * @return created account
 **/
export async function createAccount(email: string): Promise<Account> {
	try {
		const createdAccount: Account = await Account.create({ email: email })
		return createdAccount
	} catch (e) {
		return Promise.reject("User already exists");
	}
}