
export interface ICredentials {
    id: string;
    password: string;
}

export abstract class BaseAgent implements ICredentials {
    protected _id: string = '';
    protected _password: string = '';

    get id(): string {
        return this._id;
    }

    get password(): string {
        return this._password;
    }

    set id(value: string) {
        this._id = value;
    }

    set password(value: string) {
        this._password = value;
    }

    protected constructor(init?: Partial<BaseAgent>) {
        Object.assign(this, init);
    }

    setCredentials(creds: ICredentials): void {
        this._id = creds.id;
        this._password = creds.password;
    }

    getCredentials(): ICredentials {
        return { id: this._id, password: this._password };
    }

    toJSON(): ICredentials {
        return {
            id: this.id,
            password: this.password,
        }
    }

    abstract getRole(): string;
}

