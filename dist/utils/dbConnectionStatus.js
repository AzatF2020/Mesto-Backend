function dbConnectionInfo() {
    return {
        connected: (...args) => console.log(...args),
        disconnected: () => (...args) => console.log(...args),
        error: () => (...args) => console.error(...args),
    };
}
export default dbConnectionInfo();
