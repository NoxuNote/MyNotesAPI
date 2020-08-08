'use strict';
import { Account } from "../orm/models/Account";

/**
 * Creates an account, fails if account already exists
 * @param email Your email
 * @return created account
 **/
export async function createAccount(partialAccount: Partial<Account>): Promise<Account> {
	try {
		const createdAccount: Account = await Account.create(partialAccount)
		return createdAccount
	} catch (e) {
		return Promise.reject("User already exists");
	}
}