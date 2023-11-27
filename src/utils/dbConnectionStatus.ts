export type TEventName = 'connected' | 'disconnected' | 'error'

export type TStatusDB = {
  [keyof in TEventName]: (...args: string[]) => void
}

function dbConnectionInfo(): TStatusDB {
  return {
    connected: (...args: string[]): void => console.log(...args),
    disconnected: () => (...args: string[]): void => console.log(...args),
    error: () => (...args: string[]): void => console.error(...args),
  };
}

export default dbConnectionInfo();
