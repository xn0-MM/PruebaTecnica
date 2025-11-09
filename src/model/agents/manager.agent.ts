import { BaseAgent, ICredentials } from './base.agent';
import { Vault } from '@/utils/vault';


export class ManagerAgent extends BaseAgent {
    private static instance: ManagerAgent | null = null;

    private constructor() {
        super();
    }

    static getInstance(): ManagerAgent {
        if (!ManagerAgent.instance) {
            ManagerAgent.instance = new ManagerAgent();
        }
        return ManagerAgent.instance;
    }

    init(): void {
        try {
            const creds = Vault.get<ICredentials>('managerCredentials');
            // eslint-disable-next-line
            if (!creds) {
                throw new Error('No se encontraron credenciales en Vault');
            }

            this.setCredentials(creds);
        } catch (error) {
            console.error('[VaultManager:init] Error al inicializar credenciales:', (error as Error).message);
            throw error;
        }
    }

    getRole(): string {
        return 'Manager';
    }

    static reset(): void {
        ManagerAgent.instance = null;
    }
}
