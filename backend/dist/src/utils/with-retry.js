"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
async function withRetry(fn, retries = 5, delay = 500) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        }
        catch (err) {
            if (err instanceof Error &&
                'status' in err &&
                err.status === 429) {
                const wait = delay * Math.pow(2, i);
                console.warn(`Rate limit hit, retrying in ${wait}ms...`);
                await new Promise((r) => setTimeout(r, wait));
            }
            else {
                throw err;
            }
        }
    }
    throw new Error('Too many retries');
}
//# sourceMappingURL=with-retry.js.map