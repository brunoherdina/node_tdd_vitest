import { expect, test } from "vitest";
import { getFutureDate } from "./get-future-date";

test('increases date with one year', () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;

    expect(getFutureDate(`${currentYear}-08-10`).getFullYear()).toEqual(nextYear);
})