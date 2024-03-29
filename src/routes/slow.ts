import type { BaseContext } from "koa";

export async function slow(ctx: BaseContext): Promise<void> {
    const result = await new Promise<{
        start: number;
        actualEnd: number;
        expectedEnd: number;
    }>((resolve, _reject) => {
        const start = Date.now();
        const expectedEnd = start + 10000;

        // eslint-disable-next-line no-constant-condition
        while (true) {
            // this is a heavy calculation
            const now: number = Date.now();

            if (expectedEnd < now) {
                return resolve({
                    start,
                    actualEnd: now,
                    expectedEnd,
                });
            }
        }
    });

    const startedDate = new Date(result.start).toISOString();
    const expectedEndDate = new Date(result.expectedEnd).toISOString();
    const actualEndDate = new Date(result.actualEnd).toISOString();

    ctx.body = `Started at ${startedDate}; Expected to end at ${expectedEndDate}, actual end at ${actualEndDate}`;
}
