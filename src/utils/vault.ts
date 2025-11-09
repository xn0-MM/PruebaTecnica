import fs from 'fs';
import path from 'path';

const storePath = path.resolve('cache/testData.json');

export class Vault {
    static ensureFile() {
        if (!fs.existsSync(path.dirname(storePath))) {
            fs.mkdirSync(path.dirname(storePath), { recursive: true });
        }
        if (!fs.existsSync(storePath)) {
            fs.writeFileSync(storePath, JSON.stringify({}, null, 2));
        }
    }

    static read(): Record<string, any> {
        this.ensureFile();
        return JSON.parse(fs.readFileSync(storePath, 'utf-8'));
    }

    static write(data: Record<string, any>) {
        this.ensureFile();
        fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
    }

    static set(key: string, value: any) {
        const data = this.read();
        data[key] = value;
        this.write(data);
    }

    static get<T = any>(key: string): T {
        const data = this.read();
        return data[key];
    }

    static clear() {
        this.write({});
    }
}
