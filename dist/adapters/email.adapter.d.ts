export declare class EmailAdapter {
    sendEmailForConfirmation(email: string, code: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
    sendEmailForPasswordRecovery(email: string, code: string): Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
}
